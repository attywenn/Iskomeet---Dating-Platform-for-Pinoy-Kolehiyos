import { useEffect, useState } from 'react'
import { MenuDrawer } from '../components/MenuDrawer'
import {
  CapIcon,
  CloseIcon,
  FlameIcon,
  HeartIcon,
  MapPinIcon,
  MenuIcon,
  RewindIcon,
  SparklesIcon,
  StarSparkIcon,
  VerifiedBadgeIcon,
} from '../components/icons'
import { APP_NAME, SUC_COLORS } from '../data/mock'
import * as api from '../lib/api'
import { navigate } from '../lib/router'
import { useSession } from '../lib/session'
import type { Profile } from '../lib/types'

export function MatchPage() {
  const { user } = useSession()
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [index, setIndex] = useState(0)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const [likes, setLikes] = useState<string[]>(() => api.getLikes())
  const [menuOpen, setMenuOpen] = useState(false)
  const [matchModalOpen, setMatchModalOpen] = useState(false)
  const [matchedProfile, setMatchedProfile] = useState<Profile | null>(null)
  const [showFullBio, setShowFullBio] = useState(false)
  const [actionFeedback, setActionFeedback] = useState<'like' | 'pass' | 'superlike' | null>(null)

  useEffect(() => {
    void api.getProfiles().then(setProfiles)
  }, [])

  useEffect(() => {
    if (!user) navigate({ name: 'signin' })
  }, [user])

  if (!user) return null

  const profile = profiles[index]
  const isLiked = profile ? likes.includes(profile.id) : false
  const photos = profile?.photos && profile.photos.length > 0 ? profile.photos : profile ? [profile.avatar] : []

  function handleLike(isSuperLike = false) {
    if (!profile) return
    setActionFeedback(isSuperLike ? 'superlike' : 'like')
    const updated = api.toggleLike(profile.id)
    setLikes(updated)

    // Trigger match celebration on like
    setTimeout(() => {
      setMatchedProfile(profile)
      setMatchModalOpen(true)
      setActionFeedback(null)
    }, 400)
  }

  function handlePass() {
    setActionFeedback('pass')
    setTimeout(() => {
      setIndex((curr) => (curr + 1) % profiles.length)
      setCurrentPhotoIndex(0)
      setShowFullBio(false)
      setActionFeedback(null)
    }, 300)
  }

  function handleRewind() {
    setIndex((curr) => (curr - 1 + profiles.length) % profiles.length)
    setCurrentPhotoIndex(0)
    setShowFullBio(false)
  }

  function nextPhoto() {
    if (photos.length > 1) {
      setCurrentPhotoIndex((curr) => (curr + 1) % photos.length)
    }
  }

  function prevPhoto() {
    if (photos.length > 1) {
      setCurrentPhotoIndex((curr) => (curr - 1 + photos.length) % photos.length)
    }
  }

  const campusColor = profile ? SUC_COLORS[profile.suc] || { bg: 'bg-rose-50', text: 'text-brand-600', badge: 'bg-brand-500 text-white', short: profile.suc.slice(0, 4) } : null

  return (
    <div className="relative flex min-h-full flex-col bg-slate-50">
      {/* App Top Bar */}
      <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-slate-100 bg-white px-4">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-500 text-white shadow-sm">
            <FlameIcon className="h-5 w-5" />
          </span>
          <span className="text-lg font-black tracking-tight text-slate-900">{APP_NAME}</span>
          <span className="ml-1 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
            Iskolar Mode
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-full text-slate-600 hover:bg-slate-100 active:scale-95 transition-all"
          >
            <MenuIcon className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Main Discover Card Canvas */}
      <div className="flex flex-1 flex-col px-4 py-3">
        {profile ? (
          <div className="relative flex flex-1 flex-col overflow-hidden rounded-3xl bg-white shadow-xl shadow-slate-900/8 border border-slate-100">
            {/* Action Feedback Stamp Overlay */}
            {actionFeedback ? (
              <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center bg-slate-950/20 backdrop-blur-[2px]">
                {actionFeedback === 'like' && (
                  <div className="rotate-[-12deg] rounded-2xl border-2 border-emerald-500 bg-white/95 px-5 py-1.5 text-xl font-black uppercase tracking-widest text-emerald-600 shadow-lg">
                    LIKE
                  </div>
                )}
                {actionFeedback === 'pass' && (
                  <div className="rotate-[12deg] rounded-2xl border-2 border-rose-500 bg-white/95 px-5 py-1.5 text-xl font-black uppercase tracking-widest text-rose-600 shadow-lg">
                    PASS
                  </div>
                )}
                {actionFeedback === 'superlike' && (
                  <div className="rotate-[-6deg] rounded-2xl border-2 border-sky-500 bg-white/95 px-5 py-1.5 text-xl font-black uppercase tracking-widest text-sky-600 shadow-lg">
                    SUPER LIKE
                  </div>
                )}
              </div>
            ) : null}

            {/* Photo Container */}
            <div className="relative h-[390px] w-full shrink-0 overflow-hidden bg-slate-900">
              <img
                src={photos[currentPhotoIndex] || profile.avatar}
                alt={`${profile.name}, student at ${profile.suc}`}
                className="h-full w-full object-cover object-center transition-all duration-300"
              />

              {/* Photo Tap Navigation (left/right halves) */}
              {photos.length > 1 ? (
                <>
                  <button
                    type="button"
                    aria-label="Previous photo"
                    onClick={prevPhoto}
                    className="absolute left-0 top-0 h-full w-1/3 cursor-pointer"
                  />
                  <button
                    type="button"
                    aria-label="Next photo"
                    onClick={nextPhoto}
                    className="absolute right-0 top-0 h-full w-1/3 cursor-pointer"
                  />

                  {/* Photo Progress Indicators */}
                  <div className="absolute top-3 inset-x-3 z-10 flex gap-1.5">
                    {photos.map((_, i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                          i === currentPhotoIndex ? 'bg-white shadow-sm' : 'bg-white/40'
                        }`}
                      />
                    ))}
                  </div>
                </>
              ) : null}

              {/* Gradient Scrim for text readability */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

              {/* University Badge on Photo */}
              <div className="absolute top-4 left-3 z-10">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-extrabold shadow-md backdrop-blur-md ${
                    campusColor ? campusColor.badge : 'bg-brand-500 text-white'
                  }`}
                >
                  <CapIcon className="h-3.5 w-3.5" />
                  {campusColor?.short || 'SUC'}
                </span>
              </div>

              {/* Online Pulse Badge */}
              {profile.online ? (
                <div className="absolute top-4 right-3 z-10 flex items-center gap-1.5 rounded-full bg-emerald-950/70 px-2.5 py-1 text-[11px] font-semibold text-emerald-400 backdrop-blur-md border border-emerald-500/30">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Online now</span>
                </div>
              ) : null}

              {/* Primary Scholar Name & Campus info on card */}
              <div className="absolute bottom-4 inset-x-4 z-10 text-white">
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-black tracking-tight">{profile.name}, {profile.age}</h2>
                  {profile.verified ? (
                    <VerifiedBadgeIcon className="h-6 w-6 text-sky-400 shrink-0" />
                  ) : null}
                </div>

                <div className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-slate-200">
                  <CapIcon className="h-4 w-4 shrink-0 text-amber-300" />
                  <span className="truncate">{profile.program}</span>
                </div>

                <div className="mt-1 flex items-center justify-between text-xs text-slate-300">
                  <div className="flex items-center gap-1">
                    <MapPinIcon className="h-3.5 w-3.5 text-rose-400" />
                    <span>{profile.distance || profile.suc}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowFullBio(!showFullBio)}
                    className="flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur-md hover:bg-white/30 transition-colors"
                  >
                    <span>{showFullBio ? 'Less info ▴' : 'View Bio ▾'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Profile Content Details */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Scholar Bio */}
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">About Scholar</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-700 font-medium">{profile.bio}</p>
              </div>

              {/* University Campus Badge */}
              <div className="flex items-center gap-2.5 rounded-2xl bg-slate-50 p-3 border border-slate-100">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm border border-slate-200 text-brand-600">
                  <CapIcon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Campus & College</p>
                  <p className="truncate text-xs font-bold text-slate-900">{profile.suc}</p>
                  <p className="text-[11px] font-medium text-brand-600">{profile.yearLevel}</p>
                </div>
              </div>

              {/* Interest Pills */}
              {profile.interests && profile.interests.length > 0 ? (
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Vibes & Interests</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {profile.interests.map((interest) => (
                      <span
                        key={interest}
                        className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-200 transition-colors"
                      >
                        {interest}
                      </span>
                    ))}
                    {profile.mbti ? (
                      <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-bold text-purple-700 border border-purple-100">
                        MBTI: {profile.mbti}
                      </span>
                    ) : null}
                    {profile.zodiac ? (
                      <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700 border border-amber-100">
                        {profile.zodiac}
                      </span>
                    ) : null}
                  </div>
                </div>
              ) : null}

              {/* Hinge-style Prompts */}
              {profile.prompts && profile.prompts.length > 0 ? (
                <div className="space-y-3 pt-1">
                  {profile.prompts.map((prompt, pIdx) => (
                    <div
                      key={pIdx}
                      className="rounded-2xl border border-rose-100/80 bg-gradient-to-br from-rose-50/50 to-pink-50/30 p-4 shadow-sm"
                    >
                      <div className="flex items-center gap-1.5 text-xs font-bold text-brand-600">
                        <SparklesIcon className="h-4 w-4" />
                        <span>{prompt.question}</span>
                      </div>
                      <p className="mt-2 text-sm font-medium leading-relaxed text-slate-800">
                        &ldquo;{prompt.answer}&rdquo;
                      </p>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>

            {/* Modern Floating Action Controls Bar */}
            <div className="sticky bottom-0 z-20 flex items-center justify-around border-t border-slate-100 bg-white/95 px-6 py-3.5 backdrop-blur-md">
              {/* Rewind */}
              <button
                type="button"
                aria-label="Rewind to previous scholar"
                onClick={handleRewind}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-600 shadow-sm transition-all hover:bg-slate-200 hover:scale-105 active:scale-90"
              >
                <RewindIcon className="h-5 w-5" />
              </button>

              {/* Pass (Dislike) */}
              <button
                type="button"
                aria-label="Pass"
                onClick={handlePass}
                className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-rose-500 shadow-md border border-slate-200 transition-all hover:bg-rose-50 hover:border-rose-200 hover:scale-110 active:scale-95"
              >
                <CloseIcon className="h-7 w-7 stroke-[2.5]" />
              </button>

              {/* Super Like (Star Spark) */}
              <button
                type="button"
                aria-label="Super Like"
                onClick={() => handleLike(true)}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 text-white shadow-md shadow-amber-400/30 transition-all hover:scale-110 active:scale-90"
              >
                <StarSparkIcon className="h-5 w-5" />
              </button>

              {/* Like (Heart) */}
              <button
                type="button"
                aria-label="Like"
                onClick={() => handleLike(false)}
                className={`flex h-14 w-14 items-center justify-center rounded-full shadow-lg shadow-rose-500/25 transition-all hover:scale-110 active:scale-95 ${
                  isLiked
                    ? 'bg-gradient-to-tr from-brand-600 to-rose-600 text-white ring-4 ring-rose-200'
                    : 'bg-gradient-to-tr from-brand-500 to-rose-400 text-white'
                }`}
              >
                <HeartIcon className="h-7 w-7 fill-white" />
              </button>

              {/* Direct Chat / First Move */}
              <button
                type="button"
                aria-label="Chat with scholar"
                onClick={() => navigate({ name: 'chat', userId: profile.id })}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-rose-50 text-brand-600 shadow-sm border border-rose-200 transition-all hover:bg-rose-100 hover:scale-105 active:scale-90"
              >
                <span className="text-sm font-black">💬</span>
              </button>
            </div>
          </div>
        ) : (
          /* Empty State when stack ends */
          <div className="flex flex-1 flex-col items-center justify-center p-8 text-center bg-white rounded-3xl border border-slate-100 shadow-sm">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-rose-50 text-brand-500 text-3xl shadow-inner">
              🎓
            </div>
            <h2 className="mt-4 text-xl font-bold text-slate-900">You&apos;ve seen everyone!</h2>
            <p className="mt-2 text-xs leading-relaxed text-slate-500 max-w-[260px]">
              More scholars from SUCs across Luzon, Visayas, and Mindanao are signing up daily.
            </p>
            <div className="mt-6 flex flex-col gap-2.5 w-full max-w-[240px]">
              <button
                type="button"
                onClick={() => setIndex(0)}
                className="w-full rounded-2xl bg-brand-500 py-3 text-xs font-bold text-white shadow-md shadow-rose-500/25 hover:bg-brand-600 active:scale-95 transition-all"
              >
                ↺ Explore Stack Again
              </button>
              <button
                type="button"
                onClick={() => navigate({ name: 'search' })}
                className="w-full rounded-2xl bg-slate-100 py-3 text-xs font-bold text-slate-700 hover:bg-slate-200 transition-all"
              >
                🔍 Search Campus Hub
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Match Celebration Modal */}
      {matchModalOpen && matchedProfile ? (
        <MatchCelebrationModal
          profile={matchedProfile}
          user={user}
          onClose={() => {
            setMatchModalOpen(false)
            setIndex((curr) => (curr + 1) % profiles.length)
            setCurrentPhotoIndex(0)
            setShowFullBio(false)
          }}
          onChat={(initialText) => {
            setMatchModalOpen(false)
            if (initialText) {
              void api.sendMessage(matchedProfile.id, initialText)
            }
            navigate({ name: 'chat', userId: matchedProfile.id })
          }}
        />
      ) : null}

      <MenuDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
    </div>
  )
}

function MatchCelebrationModal({
  profile,
  user,
  onClose,
  onChat,
}: {
  profile: Profile
  user: any
  onClose: () => void
  onChat: (text?: string) => void
}) {
  const [selectedIcebreaker, setSelectedIcebreaker] = useState('')

  const icebreakers = [
    `Hi ${profile.name.split(' ')[0]}! What's your go-to study drink around ${profile.suc.split(' ')[0]}? ☕`,
    `Hello! Relate so much on the midterms grind! Surviving ka pa ba? 📚`,
    `Hey ${profile.name.split(' ')[0]}! Loved your profile prompts, great taste in OPM! 🎸`,
  ]

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md animate-fadeIn"
    >
      <div className="relative flex w-full max-w-[360px] flex-col items-center overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900 to-rose-950 p-6 text-center text-white shadow-2xl border border-rose-500/20">
        {/* Floating Confetti / Sparkle visual */}
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-brand-500 to-amber-400 text-2xl shadow-lg shadow-rose-500/40 animate-bounce-subtle">
          🎉
        </div>

        <p className="mt-3 text-xs font-extrabold uppercase tracking-widest text-amber-300">
          SPARK IGNITED!
        </p>
        <h2 className="text-3xl font-black tracking-tight text-white">It&apos;s a Match!</h2>
        <p className="mt-1 text-xs text-slate-300">
          You and <span className="font-bold text-rose-300">{profile.name}</span> liked each other.
        </p>

        {/* Side-by-side Avatar Match Circle */}
        <div className="my-6 flex items-center justify-center">
          <div className="relative -mr-3 h-20 w-20 overflow-hidden rounded-full border-4 border-white shadow-xl">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=800&q=80'}
              alt="You"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="z-10 flex h-9 w-9 items-center justify-center rounded-full bg-brand-500 text-white font-bold shadow-lg ring-4 ring-slate-900">
            ❤️
          </div>
          <div className="relative -ml-3 h-20 w-20 overflow-hidden rounded-full border-4 border-white shadow-xl">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Quick Icebreaker Picker */}
        <div className="w-full text-left">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Send an Iskolar Icebreaker:
          </p>
          <div className="mt-2 flex flex-col gap-1.5">
            {icebreakers.map((text, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedIcebreaker(text)}
                className={`rounded-xl p-2.5 text-left text-xs font-medium transition-all ${
                  selectedIcebreaker === text
                    ? 'border border-rose-400 bg-rose-500/30 text-white font-semibold'
                    : 'border border-slate-700/60 bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {text}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex w-full flex-col gap-2.5">
          <button
            type="button"
            onClick={() => onChat(selectedIcebreaker)}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-brand-500 to-rose-500 py-3.5 text-sm font-bold text-white shadow-lg shadow-rose-500/30 hover:opacity-95 active:scale-95 transition-all"
          >
            <span>💬 Send Message Now</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 text-xs font-bold text-slate-400 hover:text-white transition-colors"
          >
            Keep Exploring
          </button>
        </div>
      </div>
    </div>
  )
}
