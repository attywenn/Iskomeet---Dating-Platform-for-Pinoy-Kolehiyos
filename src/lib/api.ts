import { PERSONA_REPLIES, PROFILES } from '../data/mock'
import type { ChatMessage, Conversation, Profile, SessionUser } from './types'
import { readJson, writeJson, removeKey } from './storage'

const CONVOS_KEY = 'conversations'
const LIKES_KEY = 'likes'
const SESSION_KEY = 'session'
const USERS_KEY = 'users'

type StoredAccount = {
  username: string
  password: string
  profile: SessionUser
}

export function getSession(): SessionUser | null {
  return readJson<SessionUser | null>(SESSION_KEY, null)
}

export function signIn(username: string, password: string): SessionUser | null {
  const users = readJson<StoredAccount[]>(USERS_KEY, [])
  const match = users.find(
    (entry) => entry.username.toLowerCase() === username.trim().toLowerCase() && entry.password === password,
  )

  if (!match) return null

  const sessionUser = { ...match.profile }
  writeJson(SESSION_KEY, sessionUser)
  return sessionUser
}

export function register({
  username,
  password,
  firstName,
  lastName,
  universityName,
  suc,
  program,
}: {
  username: string
  password: string
  firstName?: string
  lastName?: string
  universityName?: string
  suc?: string
  program?: string
}): SessionUser {
  const users = readJson<StoredAccount[]>(USERS_KEY, [])
  const normalized = username.trim()
  const duplicate = users.some((entry) => entry.username.toLowerCase() === normalized.toLowerCase())

  if (!normalized || !password || duplicate) {
    throw new Error('Username already exists or missing required fields.')
  }

  const profile: SessionUser = {
    id: crypto.randomUUID(),
    username: normalized,
    firstName,
    lastName,
    universityName,
    suc,
    program,
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=800&q=80',
    bio: 'Campus explorer looking for a meaningful connection.',
    yearLevel: '1st Year',
    interests: ['Reading', 'Music', 'Coffee', 'Travel'],
  }

  users.push({ username: normalized, password, profile })
  writeJson(USERS_KEY, users)
  writeJson(SESSION_KEY, profile)
  return profile
}

export function signOut() {
  removeKey(SESSION_KEY)
}

export async function getProfiles(): Promise<Profile[]> {
  return PROFILES
}

export async function getProfile(id: string): Promise<Profile | undefined> {
  return PROFILES.find((profile) => profile.id === id)
}

export function getLikes(): string[] {
  return readJson<string[]>(LIKES_KEY, [])
}

export function toggleLike(profileId: string): string[] {
  const likes = new Set(getLikes())
  if (likes.has(profileId)) {
    likes.delete(profileId)
  } else {
    likes.add(profileId)
  }
  const next = [...likes]
  writeJson(LIKES_KEY, next)
  return next
}

export function getConversations(): Conversation[] {
  return readJson<Conversation[]>(CONVOS_KEY, [])
}

export function getConversation(userId: string): Conversation {
  return (
    getConversations().find((convo) => convo.userId === userId) ?? {
      userId,
      messages: [],
    }
  )
}

export async function openConversation(
  userId: string,
  meName: string,
  them: Profile,
): Promise<Conversation> {
  const existing = getConversation(userId)
  if (existing.messages.length > 0) return existing

  const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  const starter: Conversation = {
    userId,
    messages: [
      {
        id: crypto.randomUUID(),
        from: 'me',
        text: `Hello ${them.name.split(' ')[0]}. I am glad to meet someone from ${them.suc?.split(' ')[0] || 'campus'}.`,
        timestamp: now,
      },
      {
        id: crypto.randomUUID(),
        from: 'them',
        text: `Hello ${meName}. I am happy to meet someone from ${them.suc?.split(' ')[0] || 'campus'}. How are you today?`,
        timestamp: now,
      },
    ],
  }
  saveConversation(starter)
  return starter
}

export async function sendMessage(userId: string, text: string): Promise<Conversation> {
  const convo = getConversation(userId)
  const next: ChatMessage = {
    id: crypto.randomUUID(),
    from: 'me',
    text,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  }
  convo.messages = [...convo.messages, next]
  saveConversation(convo)
  return convo
}

export async function receiveReply(userId: string, _userMessageText?: string): Promise<Conversation> {
  const convo = getConversation(userId)
  const replies = PERSONA_REPLIES[userId] || [
    'I agree. Campus life is busy, but it is also interesting.',
    'I would enjoy a coffee run sometime when we are free.',
    'I like that idea. Keep in touch and let me know when you are around campus.',
  ]
  const replyIndex = convo.messages.filter((m) => m.from === 'them').length % replies.length
  const replyText = replies[replyIndex]

  convo.messages = [
    ...convo.messages,
    {
      id: crypto.randomUUID(),
      from: 'them',
      text: replyText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]
  saveConversation(convo)
  return convo
}

export function reactToMessage(userId: string, messageId: string, emoji: string): Conversation {
  const convo = getConversation(userId)
  convo.messages = convo.messages.map((m) => (m.id === messageId ? { ...m, reaction: emoji } : m))
  saveConversation(convo)
  return convo
}

function saveConversation(convo: Conversation) {
  const all = getConversations().filter((item) => item.userId !== convo.userId)
  writeJson(CONVOS_KEY, [...all, convo])
}
