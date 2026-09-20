import { PhoneShell } from './components/PhoneShell'
import { SessionProvider, useSession } from './lib/session'
import { useRoute } from './lib/router'
import { LandingPage } from './pages/Landing'
import { SignInPage } from './pages/SignIn'
import { RegisterPage } from './pages/Register'
import { MatchPage } from './pages/Match'
import { ChatPage } from './pages/Chat'
import { ProfilePage } from './pages/Profile'
import {
  AboutPage,
  DeveloperPage,
  SearchPage,
  TalkToDevPage,
} from './pages/InfoPages'
import type { Route } from './lib/types'

function Screen() {
  const { route } = useRoute()
  const { user } = useSession()

  const guarded: Route =
    (route.name === 'match' || route.name === 'chat' || route.name === 'profile') && !user
      ? { name: 'signin' }
      : route

  switch (guarded.name) {
    case 'landing':
      return <LandingPage />
    case 'signin':
      return <SignInPage />
    case 'register':
      return <RegisterPage />
    case 'match':
      return <MatchPage />
    case 'chat':
      return <ChatPage userId={guarded.userId} />
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
  return (
    <SessionProvider>
      <PhoneShell>
        <Screen />
      </PhoneShell>
    </SessionProvider>
  )
}
