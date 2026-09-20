export type RouteName =
  | 'landing'
  | 'signin'
  | 'register'
  | 'match'
  | 'chat'
  | 'about'
  | 'developer'
  | 'talk'
  | 'search'
  | 'profile'

export type Route =
  | { name: Exclude<RouteName, 'chat'> }
  | { name: 'chat'; userId: string }

export type SessionUser = {
  id: string
  username: string
  password: string
  program: string
  suc: string
  avatar?: string
  bio?: string
  yearLevel?: string
  interests?: string[]
}

export type ProfilePrompt = {
  question: string
  answer: string
}

export type Profile = {
  id: string
  name: string
  age: number
  suc: string
  program: string
  yearLevel: string
  online: boolean
  lastSeen?: string
  avatar: string
  photos: string[]
  bio: string
  interests: string[]
  mbti?: string
  zodiac?: string
  prompts?: ProfilePrompt[]
  distance?: string
  verified?: boolean
  campusBadge?: string
}

export type ChatMessage = {
  id: string
  from: 'me' | 'them'
  text: string
  timestamp?: string
  reaction?: string
}

export type Conversation = {
  userId: string
  messages: ChatMessage[]
}
