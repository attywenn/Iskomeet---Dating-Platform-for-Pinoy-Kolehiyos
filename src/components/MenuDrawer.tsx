import { navigate } from '../lib/router'
import { useSession } from '../lib/session'
import { FlameIcon, SearchIcon, UserIcon, CapIcon, CloseIcon, CoffeeIcon } from './icons'
import { APP_NAME } from '../data/mock'

type Props = {
  open: boolean
  onClose: () => void
}

export function MenuDrawer({ open, onClose }: Props) {
  const { user, signOut } = useSession()

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <button
        type="button"
        className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm transition-opacity"
        aria-label="Close menu"
        onClick={onClose}
      />

      {/* Drawer */}
      <aside className="absolute right-0 top-0 flex h-full w-[82%] max-w-[320px] flex-col bg-white shadow-2xl transition-transform">
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-slate-100 p-5">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-brand-500 to-rose-400 text-white shadow-sm">
              <FlameIcon className="h-5 w-5" />
            </span>
            <span className="text-lg font-extrabold tracking-tight text-slate-900">{APP_NAME}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-9 w-9 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        {/* User Card if logged in */}
        {user ? (
          <div className="mx-4 mt-4 rounded-2xl bg-gradient-to-br from-rose-50 to-pink-50/50 p-4 border border-rose-100/60">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-500 text-base font-bold text-white shadow-sm">
                {user.username.slice(0, 1).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-slate-900">@{user.username}</p>
                <p className="truncate text-xs font-medium text-brand-600">{user.suc.split(' ')[0]}</p>
              </div>
            </div>
          </div>
        ) : null}

        {/* Nav Links */}
        <nav className="flex-1 overflow-y-auto px-4 py-6">
          <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">Navigation</p>
          <div className="mt-2 flex flex-col gap-1">
            <DrawerItem
              icon={<FlameIcon className="h-5 w-5 text-brand-500" />}
              label="Find Match"
              onClick={() => {
                navigate({ name: user ? 'match' : 'signin' })
                onClose()
              }}
            />
            <DrawerItem
              icon={<SearchIcon className="h-5 w-5 text-slate-500" />}
              label="Campus Hub & Search"
              onClick={() => {
                navigate({ name: 'search' })
                onClose()
              }}
            />
            {user ? (
              <DrawerItem
                icon={<UserIcon className="h-5 w-5 text-slate-500" />}
                label="My Profile"
                onClick={() => {
                  navigate({ name: 'profile' })
                  onClose()
                }}
              />
            ) : null}
            <DrawerItem
              icon={<CapIcon className="h-5 w-5 text-slate-500" />}
              label="About Iskomeet"
              onClick={() => {
                navigate({ name: 'about' })
                onClose()
              }}
            />
            <DrawerItem
              icon={<CoffeeIcon className="h-5 w-5 text-amber-500" />}
              label="Support the Developer"
              onClick={() => {
                navigate({ name: 'developer' })
                onClose()
              }}
            />
          </div>
        </nav>

        {/* Footer */}
        <div className="border-t border-slate-100 p-4">
          {user ? (
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-100 py-3 text-sm font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
              onClick={() => {
                signOut()
                navigate({ name: 'landing' })
                onClose()
              }}
            >
              Sign out (@{user.username})
            </button>
          ) : (
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-500 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-600 transition-colors"
              onClick={() => {
                navigate({ name: 'signin' })
                onClose()
              }}
            >
              Sign In
            </button>
          )}
        </div>
      </aside>
    </div>
  )
}

function DrawerItem({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode
  label: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-all"
    >
      <span className="shrink-0">{icon}</span>
      <span>{label}</span>
    </button>
  )
}
