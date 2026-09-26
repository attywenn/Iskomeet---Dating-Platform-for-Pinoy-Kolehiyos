export type RouteName =
  | 'landing'
  | 'match'
  | 'chat'
  | 'about'
  | 'developer'
  | 'talk'
  | 'search'
  | 'profile'
  | 'signin'
  | 'register'

export type Route =
  | { name: Exclude<RouteName, 'chat'> }
  | { name: 'chat'; userId: string }

export type SessionUser = {
  id: string
  username: string
  firstName?: string
  lastName?: string
  email?: string
  genderId?: number
  universityId?: number
  universityName?: string
  avatar?: string
  interests?: string[]
  program?: string
  suc?: string
  bio?: string
  yearLevel?: string
}

export type Profile = {
  id: string
  name: string
  firstName?: string
  lastName?: string
  genderId?: number
  universityId?: number
  universityName?: string
  online: boolean
  lastSeen?: string
  avatar: string
  photos: string[]
  interests: string[]
  verified?: boolean
  age?: number
  suc?: string
  program?: string
  yearLevel?: string
  bio?: string
  mbti?: string
  zodiac?: string
  distance?: string
  campusBadge?: string
  prompts?: { question: string; answer: string }[]
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
