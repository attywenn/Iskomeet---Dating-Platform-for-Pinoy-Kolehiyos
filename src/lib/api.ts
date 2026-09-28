import type { ChatMessage, Conversation, Profile, SessionUser } from './types'
import { readJson, writeJson, removeKey } from './storage'

const CONVOS_KEY = 'conversations'
const LIKES_KEY = 'likes'
const SESSION_KEY = 'session'
const USERS_KEY = 'users'

export type UserRead = {
  user_id: number
  user_username: string
  account_created: string
}

export type UserCreate = {
  user_username: string
  user_password: string
}

export type AuthTokenResponse = {
  access_token: string
  token_type: string
  user: UserRead
}

type StoredAccount = {
  username: string
  password: string
  profile: SessionUser
}

export type RegistrationPayload = {
  username: string
  password: string
  livingFirstName: string
  livingLastName: string
  gender: string
  school: string
  city: string
  lookingFor: string
  interests: string
  dateOfBirth: string
}

export function getSession(): SessionUser | null {
  return readJson<SessionUser | null>(SESSION_KEY, null)
}

export function getStoredAccounts(): StoredAccount[] {
  return readJson<StoredAccount[]>(USERS_KEY, [])
}

export function updateStoredAccount(username: string, updatedProfile: SessionUser) {
  const accounts = getStoredAccounts()
  const next = accounts.map((entry) =>
    entry.username.toLowerCase() === username.toLowerCase()
      ? { ...entry, profile: updatedProfile }
      : entry,
  )
  writeJson(USERS_KEY, next)
}

export async function signIn(username: string, password: string): Promise<SessionUser | null> {
  // Local-only authentication against stored accounts
  const users = readJson<StoredAccount[]>(USERS_KEY, [])
  const match = users.find(
    (entry) =>
      entry.username.toLowerCase() === username.trim().toLowerCase() &&
      entry.password === password,
  )

  if (!match) return null

  const sessionUser = { ...match.profile }
  writeJson(SESSION_KEY, sessionUser)
  return sessionUser
}

export async function register(data: RegistrationPayload): Promise<SessionUser> {
  const accounts = readJson<StoredAccount[]>(USERS_KEY, [])

  // Check if username already taken
  const exists = accounts.some(
    (entry) => entry.username.toLowerCase() === data.username.toLowerCase(),
  )
  if (exists) {
    throw new Error('Username is already taken.')
  }

  const sessionUser: SessionUser = {
    id: crypto.randomUUID(),
    username: data.username.trim(),
    firstName: data.livingFirstName.trim(),
    lastName: data.livingLastName.trim(),
    universityName: data.school.trim(),
    suc: data.school.trim(),
    location: data.city.trim(),
    bio: `${data.lookingFor} in ${data.city.trim()}`,
    interests: data.interests
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)
      .slice(0, 5),
    dateOfBirth: data.dateOfBirth.trim(),
    changelog: {},
  }

  writeJson(USERS_KEY, [
    ...accounts,
    {
      username: data.username.trim(),
      password: data.password,
      profile: sessionUser,
    },
  ])

  // NOTE: do NOT write SESSION_KEY here — user must log in separately
  return sessionUser
}

export function updateSession(updatedUser: SessionUser) {
  writeJson(SESSION_KEY, updatedUser)
  // Also persist into stored accounts
  updateStoredAccount(updatedUser.username, updatedUser)
}

export function signOut() {
  removeKey(SESSION_KEY)
}

export async function getProfiles(): Promise<Profile[]> {
  return []
}

export async function getProfile(_id: string): Promise<Profile | undefined> {
  return undefined
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
): Promise<Conversation> {
  const existing = getConversation(userId)
  return existing
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
