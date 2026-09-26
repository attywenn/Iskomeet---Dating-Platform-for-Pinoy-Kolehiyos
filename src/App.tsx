import { useEffect } from 'react'
import { PhoneShell } from './components/PhoneShell'
import { useRoute } from './lib/router'
import { SessionProvider } from './lib/session'
import { LandingPage } from './pages/Landing'
import { MatchPage } from './pages/Match'
import { ChatPage } from './pages/Chat'
import { ProfilePage } from './pages/Profile'
import { RegisterPage } from './pages/Register'
import { SignInPage } from './pages/SignIn'
import {
  AboutPage,
  DeveloperPage,
  SearchPage,
  TalkToDevPage,
} from './pages/InfoPages'

function Screen() {
  const { route } = useRoute()

  switch (route.name) {
    case 'landing':
      return <LandingPage />
    case 'signin':
      return <SignInPage />
    case 'register':
      return <RegisterPage />
    case 'match':
      return <MatchPage />
    case 'chat':
      return <ChatPage userId={route.userId} />
    case 'profile':
      return <ProfilePage />
    case 'about':
      return <AboutPage />
    case 'developer':
      return <DeveloperPage />
    case 'talk':
      return <TalkToDevPage />
    case 'search':
      return <SearchPage />
  }
}

export default function App() {
  useEffect(() => {
    const root = document.documentElement
    const stored = localStorage.getItem('iskomeet-theme')
    const preferredDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const isDark = stored ? stored === 'dark' : preferredDark

    root.classList.toggle('dark', isDark)
    root.style.colorScheme = isDark ? 'dark' : 'light'
  }, [])

  return (
    <SessionProvider>
      <PhoneShell>
        <Screen />
      </PhoneShell>
    </SessionProvider>
  )
}
