import { FlameIcon, SearchIcon, ChatBubbleIcon, UserIcon } from './icons'
import { navigate, useRoute } from '../lib/router'
import * as api from '../lib/api'
import { useSession } from '../lib/session'

export function BottomNav() {
  const { user, signOut } = useSession()
  const { route } = useRoute()

  if (!user) return null

  // Check how many conversations we have
  const convos = api.getConversations()

  const currentTab =
    route.name === 'match'
      ? 'match'
      : route.name === 'search'
      ? 'search'
      : route.name === 'chat'
      ? 'chat'
      : route.name === 'profile' || route.name === 'settings'
      ? 'profile'
      : ''

  // Only show bottom nav on main app screens
  if (!['match', 'search', 'chat', 'profile', 'settings'].includes(route.name)) {
    return null
  }

  function handleLogout() {
    signOut()
    navigate({ name: 'landing' })
  }

  return (
    <nav
      aria-label="Main Navigation"
      className="sticky bottom-0 z-30 flex h-[68px] w-full items-center justify-around border-t border-slate-100 bg-white/95 px-3 backdrop-blur-md"
    >
      <button
        type="button"
        aria-label="Discover Scholars"
        aria-current={currentTab === 'match' ? 'page' : undefined}
        onClick={() => navigate({ name: 'match' })}
        className={`group flex flex-1 flex-col items-center justify-center py-1 transition-all ${
          currentTab === 'match' ? 'text-brand-500 font-semibold' : 'text-slate-400 hover:text-slate-700'
        }`}
      >
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-2xl transition-all ${
            currentTab === 'match'
              ? 'bg-rose-50 text-brand-500 shadow-sm shadow-rose-100 scale-105'
              : 'group-hover:bg-slate-50'
          }`}
        >
          <FlameIcon className="h-6 w-6" />
        </div>
        <span className="text-[11px] font-medium tracking-tight">Discover</span>
      </button>

      <button
        type="button"
        aria-label="Campus Hub and Search"
        aria-current={currentTab === 'search' ? 'page' : undefined}
        onClick={() => navigate({ name: 'search' })}
        className={`group flex flex-1 flex-col items-center justify-center py-1 transition-all ${
          currentTab === 'search' ? 'text-brand-500 font-semibold' : 'text-slate-400 hover:text-slate-700'
        }`}
      >
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-2xl transition-all ${
            currentTab === 'search'
              ? 'bg-rose-50 text-brand-500 shadow-sm shadow-rose-100 scale-105'
              : 'group-hover:bg-slate-50'
          }`}
        >
          <SearchIcon className="h-5 w-5" />
        </div>
        <span className="text-[11px] font-medium tracking-tight">Campus Hub</span>
      </button>

      <button
        type="button"
        aria-label="Messages"
        aria-current={currentTab === 'chat' ? 'page' : undefined}
        onClick={() => {
          if (convos.length > 0) {
            navigate({ name: 'chat', userId: convos[0].userId })
          } else {
            navigate({ name: 'match' })
          }
        }}
        className={`group relative flex flex-1 flex-col items-center justify-center py-1 transition-all ${
          currentTab === 'chat' ? 'text-brand-500 font-semibold' : 'text-slate-400 hover:text-slate-700'
        }`}
      >
        <div
          className={`relative flex h-10 w-10 items-center justify-center rounded-2xl transition-all ${
            currentTab === 'chat'
              ? 'bg-rose-50 text-brand-500 shadow-sm shadow-rose-100 scale-105'
              : 'group-hover:bg-slate-50'
          }`}
        >
          <ChatBubbleIcon className="h-5 w-5" />
        </div>
        <span className="text-[11px] font-medium tracking-tight">Messages</span>
      </button>

      <button
        type="button"
        aria-label="My Scholar Profile"
        aria-current={currentTab === 'profile' ? 'page' : undefined}
        onClick={() => navigate({ name: 'profile' })}
        className={`group flex flex-1 flex-col items-center justify-center py-1 transition-all ${
          currentTab === 'profile' ? 'text-brand-500 font-semibold' : 'text-slate-400 hover:text-slate-700'
        }`}
      >
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-2xl transition-all ${
            currentTab === 'profile'
              ? 'bg-rose-50 text-brand-500 shadow-sm shadow-rose-100 scale-105'
              : 'group-hover:bg-slate-50'
          }`}
        >
          <UserIcon className="h-5 w-5" />
        </div>
        <span className="text-[11px] font-medium tracking-tight">Profile</span>
      </button>

      <button
        type="button"
        aria-label="Log out"
        onClick={handleLogout}
        className="group flex flex-1 flex-col items-center justify-center py-1 transition-all text-slate-400 hover:text-rose-500"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl transition-all group-hover:bg-rose-50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
        </div>
        <span className="text-[11px] font-medium tracking-tight">Log out</span>
      </button>
    </nav>
  )
}
