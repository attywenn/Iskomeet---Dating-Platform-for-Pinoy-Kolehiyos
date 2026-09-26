import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import * as api from './api'
import type { SessionUser } from './types'

type SessionContextValue = {
  user: SessionUser | null
  refresh: () => void
  signOut: () => void
}

const SessionContext = createContext<SessionContextValue | null>(null)

export function SessionProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(() => api.getSession())

  const refresh = useCallback(() => {
    setUser(api.getSession())
  }, [])

  const signOut = useCallback(() => {
    api.signOut()
    setUser(null)
  }, [])

  const value = useMemo(() => ({ user, refresh, signOut }), [user, refresh, signOut])

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
}

export function useSession() {
  const ctx = useContext(SessionContext)
  if (!ctx) throw new Error('useSession must be used inside SessionProvider')
  return ctx
}
