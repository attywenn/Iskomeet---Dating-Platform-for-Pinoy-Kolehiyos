import { useEffect, useState } from 'react'
import {
  CapIcon,
  FlameIcon,
  VerifiedBadgeIcon,
} from '../components/icons'
import { SUC_COLORS } from '../data/site-content'
import * as api from '../lib/api'
import { navigate } from '../lib/router'
import { useSession } from '../lib/session'
import type { SessionUser } from '../lib/types'

// ─── Cooldown helpers ──────────────────────────────────────────────────────────

function daysSince(isoDate?: string): number {
  if (!isoDate) return Infinity
  const diff = Date.now() - new Date(isoDate).getTime()
  return diff / (1000 * 60 * 60 * 24)
}

function nextAllowedDate(isoDate: string | undefined, cooldownDays: number): string {
  if (!isoDate) return 'now'
  const next = new Date(new Date(isoDate).getTime() + cooldownDays * 24 * 60 * 60 * 1000)
  return next.toLocaleDateString([], { year: 'numeric', month: 'long', day: 'numeric' })
}

// ─── Settings Page ──────────────────────────────────────────────────────────────

function SettingsSection({ user, onBack }: { user: SessionUser; onBack: () => void }) {
  const { updateUser } = useSession()

  // Local field states
  const [name, setName] = useState(`${user.firstName ?? ''} ${user.lastName ?? ''}`.trim())
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [username, setUsername] = useState(user.username)
  const [university, setUniversity] = useState(user.universityName ?? '')
  const [location, setLocation] = useState(user.location ?? '')
  const [interestsInput, setInterestsInput] = useState((user.interests ?? []).join(', '))

  const [savedField, setSavedField] = useState<string | null>(null)
  const [fieldError, setFieldError] = useState<string | null>(null)

  const cl = user.changelog ?? {}

  const cooldowns = {
    name: 60,
    password: 1,
    username: 7,
    university: 60,
    location: 60,
    interests: 7,
  }

  function canChange(field: keyof typeof cooldowns): boolean {
    const changedAt = cl[`${field}ChangedAt` as keyof typeof cl]
    return daysSince(changedAt) >= cooldowns[field]
  }

  function cooldownMsg(field: keyof typeof cooldowns): string {
    const changedAt = cl[`${field}ChangedAt` as keyof typeof cl]
    const days = cooldowns[field]
    return `You can change this again on ${nextAllowedDate(changedAt, days)}.`
  }

  function showSaved(field: string) {
    setSavedField(field)
    setFieldError(null)
    setTimeout(() => setSavedField(null), 3000)
  }

  function showError(msg: string) {
    setFieldError(msg)
    setSavedField(null)
    setTimeout(() => setFieldError(null), 4000)
  }

  function saveName() {
    if (!canChange('name')) { showError(cooldownMsg('name')); return }
    const trimmed = name.trim()
    if (!trimmed) { showError('Name cannot be empty.'); return }
    const parts = trimmed.split(' ')
    const firstName = parts[0]
    const lastName = parts.slice(1).join(' ') || ''
    const updated: SessionUser = {
      ...user,
      firstName,
      lastName,
      changelog: { ...cl, nameChangedAt: new Date().toISOString() },
    }
    updateUser(updated)
    showSaved('name')
  }

  function savePassword() {
    if (!canChange('password')) { showError(cooldownMsg('password')); return }
    if (password.length < 8 || password.length > 20) {
      showError('Password must be 8–20 characters.')
      return
    }
    if (!/[^A-Za-z0-9]/.test(password)) {
      showError('Password must contain at least 1 symbol.')
      return
    }
    if (password !== confirmPassword) {
      showError('Passwords do not match.')
      return
    }
    // Persist password change directly into stored accounts
    const allAccounts = api.getStoredAccounts()
    const updatedAccounts = allAccounts.map((a) =>
      a.username.toLowerCase() === user.username.toLowerCase()
        ? { ...a, password }
        : a,
    )
    localStorage.setItem('wellfleet:users', JSON.stringify(updatedAccounts))
    const updated: SessionUser = {
      ...user,
      changelog: { ...cl, passwordChangedAt: new Date().toISOString() },
    }
    updateUser(updated)
    setPassword('')
    setConfirmPassword('')
    showSaved('password')
  }

  function saveUsername() {
    if (!canChange('username')) { showError(cooldownMsg('username')); return }
    const trimmed = username.trim()
    if (!/^[A-Za-z0-9_]{8,20}$/.test(trimmed)) {
      showError('Username: 8–20 characters, letters/numbers/underscore only.')
      return
    }
    // Check uniqueness
    const accounts = api.getStoredAccounts()
    const taken = accounts.some(
      (a) => a.username.toLowerCase() === trimmed.toLowerCase() && a.username.toLowerCase() !== user.username.toLowerCase(),
    )
    if (taken) { showError('That username is already taken.'); return }

    // Update stored account key
    const updatedAccounts = accounts.map((a) =>
      a.username.toLowerCase() === user.username.toLowerCase()
        ? { ...a, username: trimmed, profile: { ...a.profile, username: trimmed } }
        : a,
    )
    localStorage.setItem('wellfleet:users', JSON.stringify(updatedAccounts))

    const updated: SessionUser = {
      ...user,
      username: trimmed,
      changelog: { ...cl, usernameChangedAt: new Date().toISOString() },
    }
    updateUser(updated)
    showSaved('username')
  }

  function saveUniversity() {
    if (!canChange('university')) { showError(cooldownMsg('university')); return }
    const trimmed = university.trim()
    if (!trimmed) { showError('University cannot be empty.'); return }
    const updated: SessionUser = {
      ...user,
      universityName: trimmed,
      suc: trimmed,
      changelog: { ...cl, universityChangedAt: new Date().toISOString() },
    }
    updateUser(updated)
    showSaved('university')
  }

  function saveLocation() {
    if (!canChange('location')) { showError(cooldownMsg('location')); return }
    const trimmed = location.trim()
    if (!trimmed) { showError('Location cannot be empty.'); return }
    const updated: SessionUser = {
      ...user,
      location: trimmed,
      changelog: { ...cl, locationChangedAt: new Date().toISOString() },
    }
    updateUser(updated)
    showSaved('location')
  }

  function saveInterests() {
    if (!canChange('interests')) { showError(cooldownMsg('interests')); return }
    const items = interestsInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
    if (items.length > 5) { showError('You can have at most 5 interests.'); return }
    if (items.length === 0) { showError('Please enter at least one interest.'); return }
    const updated: SessionUser = {
      ...user,
      interests: items,
      changelog: { ...cl, interestsChangedAt: new Date().toISOString() },
    }
    updateUser(updated)
    setInterestsInput(items.join(', '))
    showSaved('interests')
  }

  function FieldRow({
    label,
    field,
    children,
    onSave,
    canEdit,
    cooldown,
  }: {
    label: string
    field: string
    children: React.ReactNode
    onSave: () => void
    canEdit: boolean
    cooldown: string
  }) {
    return (
      <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{label}</span>
          {!canEdit && (
            <span className="text-[10px] text-amber-600 font-semibold">Locked</span>
          )}
        </div>
        {children}
        {!canEdit && (
          <p className="mt-1 text-[10px] text-slate-400">{cooldown}</p>
        )}
        {canEdit && (
          <button
            type="button"
            onClick={onSave}
            className="mt-2 rounded-xl bg-brand-500 px-4 py-1.5 text-xs font-bold text-white hover:bg-brand-600 transition-colors"
          >
            Save
          </button>
        )}
        {savedField === field && (
          <p className="mt-1 text-[11px] font-semibold text-emerald-600">Saved successfully.</p>
        )}
      </div>
    )
  }

  return (
    <div className="relative flex min-h-full flex-col bg-slate-50">
      <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-slate-100 bg-white/95 px-4 backdrop-blur-md">
        <button
          type="button"
          onClick={onBack}
          className="flex h-8 w-8 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 transition-colors"
        >
          ←
        </button>
        <h1 className="text-lg font-black tracking-tight text-slate-900">Settings</h1>
      </header>

      <div className="flex-1 p-4 space-y-3">
        {fieldError && (
          <div className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-medium text-rose-700">
            {fieldError}
          </div>
        )}

        {/* Name */}
        <FieldRow
          label="Full Name (changeable every 2 months)"
          field="name"
          onSave={saveName}
          canEdit={canChange('name')}
          cooldown={cooldownMsg('name')}
        >
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={!canChange('name')}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-brand-500 disabled:opacity-50"
          />
        </FieldRow>

        {/* Password */}
        <FieldRow
          label="Password (changeable every 1 day)"
          field="password"
          onSave={savePassword}
          canEdit={canChange('password')}
          cooldown={cooldownMsg('password')}
        >
          <div className="space-y-2">
            <input
              type="password"
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={!canChange('password')}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-brand-500 disabled:opacity-50"
            />
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={!canChange('password')}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-brand-500 disabled:opacity-50"
            />
          </div>
        </FieldRow>

        {/* Username */}
        <FieldRow
          label="Username (changeable every 7 days)"
          field="username"
          onSave={saveUsername}
          canEdit={canChange('username')}
          cooldown={cooldownMsg('username')}
        >
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={!canChange('username')}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-brand-500 disabled:opacity-50"
          />
        </FieldRow>

        {/* University */}
        <FieldRow
          label="University (changeable every 2 months)"
          field="university"
          onSave={saveUniversity}
          canEdit={canChange('university')}
          cooldown={cooldownMsg('university')}
        >
          <input
            value={university}
            onChange={(e) => setUniversity(e.target.value)}
            disabled={!canChange('university')}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-brand-500 disabled:opacity-50"
          />
        </FieldRow>

        {/* Location */}
        <FieldRow
          label="Location (changeable every 2 months)"
          field="location"
          onSave={saveLocation}
          canEdit={canChange('location')}
          cooldown={cooldownMsg('location')}
        >
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            disabled={!canChange('location')}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-brand-500 disabled:opacity-50"
          />
        </FieldRow>

        {/* Interests */}
        <FieldRow
          label="Interests — up to 5 (changeable every 7 days)"
          field="interests"
          onSave={saveInterests}
          canEdit={canChange('interests')}
          cooldown={cooldownMsg('interests')}
        >
          <input
            value={interestsInput}
            onChange={(e) => setInterestsInput(e.target.value)}
            placeholder="Reading, Music, Coffee…"
            disabled={!canChange('interests')}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-brand-500 disabled:opacity-50"
          />
          <p className="mt-1 text-[10px] text-slate-400">Comma-separated, max 5.</p>
        </FieldRow>

        {/* Date of Birth — read-only */}
        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Date of Birth</span>
            <span className="text-[10px] text-slate-400 font-semibold">Not changeable</span>
          </div>
          <p className="text-sm font-medium text-slate-700">
            {user.dateOfBirth
              ? new Date(user.dateOfBirth).toLocaleDateString([], {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })
              : 'Not provided'}
          </p>
        </div>
      </div>
    </div>
  )
}

// ─── Main Profile Page ─────────────────────────────────────────────────────────

export function ProfilePage() {
  const { user, signOut } = useSession()
  const [showSettings, setShowSettings] = useState(false)

  useEffect(() => {
    if (!user) {
      navigate({ name: 'signin' })
    }
  }, [user])

  if (!user) return null

  if (showSettings) {
    return <SettingsSection user={user} onBack={() => setShowSettings(false)} />
  }

  const likes = api.getLikes()
  const convos = api.getConversations()
  const campusName = user.universityName ?? user.suc ?? 'University'
  const campusColor = SUC_COLORS[campusName] ?? {
    bg: 'bg-rose-50',
    text: 'text-brand-600',
    badge: 'bg-brand-500 text-white',
    short: campusName.slice(0, 4).toUpperCase(),
  }

  const displayName =
    user.firstName && user.lastName
      ? `${user.firstName} ${user.lastName}`
      : user.firstName ?? user.username

  function handleLogout() {
    signOut()
    navigate({ name: 'landing' })
  }

  return (
    <div className="relative flex min-h-full flex-col bg-slate-50">
      <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-slate-100 bg-white/95 px-4 backdrop-blur-md">
        <h1 className="text-lg font-black tracking-tight text-slate-900">Scholar Profile</h1>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowSettings(true)}
            className="rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors"
          >
            Settings
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-bold text-rose-600 hover:bg-rose-100 transition-colors"
          >
            Log out
          </button>
        </div>
      </header>

      <div className="flex-1 p-4 space-y-4">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-5 text-white shadow-xl">
          <div className="pointer-events-none absolute -right-6 -bottom-6 text-white/5">
            <CapIcon className="h-44 w-44" />
          </div>

          <div className="relative z-10 flex items-start gap-4">
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border-2 border-white/20 shadow-md bg-slate-700 flex items-center justify-center">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={displayName}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-2xl font-black text-white">
                  {(user.firstName?.[0] ?? user.username[0]).toUpperCase()}
                </span>
              )}
              <span className="absolute bottom-1 right-1 h-3 w-3 rounded-full bg-emerald-500 border-2 border-slate-900" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <h2 className="truncate text-xl font-black">{displayName}</h2>
                <VerifiedBadgeIcon className="h-5 w-5 text-sky-400 shrink-0" />
              </div>
              <p className="mt-0.5 text-xs font-semibold text-rose-300">@{user.username}</p>
              <div className="mt-2 flex items-center gap-1.5">
                {user.yearLevel && (
                  <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-bold text-slate-200 border border-white/10">
                    {user.yearLevel}
                  </span>
                )}
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                    campusColor.badge
                  }`}
                >
                  {campusColor.short}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 border-t border-white/10 pt-3 space-y-1">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Campus Affiliation</p>
              <p className="text-xs font-bold text-slate-200">{campusName}</p>
            </div>
            {user.location && (
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Location</p>
                <p className="text-xs font-bold text-slate-200">{user.location}</p>
              </div>
            )}
            {user.dateOfBirth && (
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Date of Birth</p>
                <p className="text-xs font-bold text-slate-200">
                  {new Date(user.dateOfBirth).toLocaleDateString([], {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="flex flex-col items-center justify-center rounded-2xl bg-white p-3 text-center shadow-sm border border-slate-100">
            <span className="text-lg font-black text-slate-900">{likes.length}</span>
            <span className="text-[10px] font-semibold text-slate-500">Sparks Sent</span>
          </div>
          <div className="flex flex-col items-center justify-center rounded-2xl bg-white p-3 text-center shadow-sm border border-slate-100">
            <span className="text-lg font-black text-brand-600">{convos.length}</span>
            <span className="text-[10px] font-semibold text-slate-500">Active Chats</span>
          </div>
          <div className="flex flex-col items-center justify-center rounded-2xl bg-white p-3 text-center shadow-sm border border-slate-100">
            <span className="text-lg font-black text-amber-500">SUC</span>
            <span className="text-[10px] font-semibold text-slate-500">Campus Verified</span>
          </div>
        </div>

        {user.bio && (
          <div className="rounded-3xl bg-white p-5 shadow-sm border border-slate-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">About Me</h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-700 font-medium">
              {user.bio}
            </p>
          </div>
        )}

        {user.interests && user.interests.length > 0 && (
          <div className="rounded-3xl bg-white p-5 shadow-sm border border-slate-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Interests</h3>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {user.interests.map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() => navigate({ name: 'match' })}
            className="flex w-full items-center justify-between rounded-2xl bg-gradient-to-r from-brand-500 to-rose-500 p-4 text-left font-bold text-white shadow-md shadow-rose-500/20 active:scale-[0.99] transition-all"
          >
            <div className="flex items-center gap-2.5">
              <FlameIcon className="h-5 w-5" />
              <span className="text-sm">Explore Discover Stack</span>
            </div>
            <span>→</span>
          </button>

          <button
            type="button"
            onClick={() => navigate({ name: 'search' })}
            className="flex w-full items-center justify-between rounded-2xl bg-white p-4 text-left font-bold text-slate-800 border border-slate-200 shadow-sm hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <span className="text-sm">Browse Campus Hub</span>
            </div>
            <span>→</span>
          </button>
        </div>
      </div>
    </div>
  )
}
