import { useState } from 'react'
import {
  CapIcon,
  FlameIcon,
  VerifiedBadgeIcon,
} from '../components/icons'
import { SUC_COLORS } from '../data/mock'
import * as api from '../lib/api'
import { navigate } from '../lib/router'
import { useSession } from '../lib/session'

export function ProfilePage() {
  const { user, refresh, signOut } = useSession()
  const [editing, setEditing] = useState(false)
  const [bio, setBio] = useState(user?.bio || '')
  const [savedNotice, setSavedNotice] = useState(false)

  if (!user) {
    navigate({ name: 'signin' })
    return null
  }

  const likes = api.getLikes()
  const convos = api.getConversations()
  const campusColor = SUC_COLORS[user.suc]

  function handleSaveBio() {
    api.updateCurrentUser({ bio })
    refresh()
    setEditing(false)
    setSavedNotice(true)
    setTimeout(() => setSavedNotice(false), 3000)
  }

  return (
    <div className="relative flex min-h-full flex-col bg-slate-50">
      {/* Top Header */}
      <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-slate-100 bg-white/95 px-4 backdrop-blur-md">
        <h1 className="text-lg font-black tracking-tight text-slate-900">Scholar Profile</h1>
        <button
          type="button"
          onClick={() => {
            signOut()
            navigate({ name: 'landing' })
          }}
          className="text-xs font-bold text-rose-600 hover:text-rose-700"
        >
          Sign Out
        </button>
      </header>

      {/* Main Profile Content */}
      <div className="flex-1 p-4 space-y-4">
        {/* Scholar ID Card Container */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-5 text-white shadow-xl">
          {/* Decorative Campus Seal Watermark */}
          <div className="pointer-events-none absolute -right-6 -bottom-6 text-white/5">
            <CapIcon className="h-44 w-44" />
          </div>

          <div className="relative z-10 flex items-start gap-4">
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border-2 border-white/20 shadow-md">
              <img
                src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=800&q=80'}
                alt={user.username}
                className="h-full w-full object-cover"
              />
              <span className="absolute bottom-1 right-1 h-3 w-3 rounded-full bg-emerald-500 border-2 border-slate-900" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <h2 className="truncate text-xl font-black">{user.username}</h2>
                <VerifiedBadgeIcon className="h-5 w-5 text-sky-400 shrink-0" />
              </div>
              <p className="mt-0.5 text-xs font-semibold text-rose-300">{user.program}</p>
              <div className="mt-2 flex items-center gap-1.5">
                <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-bold text-slate-200 border border-white/10">
                  {user.yearLevel || '3rd Year'}
                </span>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                    campusColor ? campusColor.badge : 'bg-brand-500/80 text-white'
                  }`}
                >
                  {campusColor?.short || 'Verified'} Iskolar
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 border-t border-white/10 pt-3">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Campus Affiliation</p>
            <p className="text-xs font-bold text-slate-200">{user.suc}</p>
          </div>
        </div>

        {/* Stats Row */}
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
            <span className="text-lg font-black text-amber-500">100%</span>
            <span className="text-[10px] font-semibold text-slate-500">Campus Vetted</span>
          </div>
        </div>

        {/* Bio Editor */}
        <div className="rounded-3xl bg-white p-5 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">My Scholar Bio</h3>
            {!editing ? (
              <button
                type="button"
                onClick={() => setEditing(true)}
                className="text-xs font-bold text-brand-600 hover:underline"
              >
                Edit Bio
              </button>
            ) : null}
          </div>

          {editing ? (
            <div className="mt-3">
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                className="w-full rounded-2xl border border-slate-200 p-3 text-xs text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                placeholder="Write a charming campus bio..."
              />
              <div className="mt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-500 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveBio}
                  className="rounded-xl bg-brand-500 px-4 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-brand-600"
                >
                  Save Changes
                </button>
              </div>
            </div>
          ) : (
            <p className="mt-2 text-xs leading-relaxed text-slate-700 font-medium">
              {user.bio || 'Proud Iskolar ng Bayan looking for meaningful connections and study buddies! 🎓'}
            </p>
          )}

          {savedNotice ? (
            <p className="mt-2 text-[11px] font-semibold text-emerald-600">✓ Bio updated successfully!</p>
          ) : null}
        </div>

        {/* Interests & Lifestyle */}
        <div className="rounded-3xl bg-white p-5 shadow-sm border border-slate-100">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Vibes & Passions</h3>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {(user.interests || ['☕ Cold Brew', '📚 Library Dates', '♟️ Chess', '🎧 OPM Indie']).map((item) => (
              <span
                key={item}
                className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Quick Links */}
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
              <span className="text-base">🔍</span>
              <span className="text-sm">Browse Campus Hub</span>
            </div>
            <span>→</span>
          </button>
        </div>
      </div>
    </div>
  )
}
