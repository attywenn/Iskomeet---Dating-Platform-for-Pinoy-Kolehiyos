import { DEMO_USER, PERSONA_REPLIES, PROFILES } from '../data/mock'
import type { ChatMessage, Conversation, Profile, SessionUser } from './types'
import { readJson, removeKey, writeJson } from './storage'

const USERS_KEY = 'users'
const SESSION_KEY = 'session'
const CONVOS_KEY = 'conversations'
const LIKES_KEY = 'likes'

function seedUsers(): SessionUser[] {
  const users = readJson<SessionUser[]>(USERS_KEY, [])
  if (!users.some((user) => user.username === DEMO_USER.username)) {
    users.push(DEMO_USER)
    writeJson(USERS_KEY, users)
  }
  return users
}

export function getSession(): SessionUser | null {
  seedUsers()
  return readJson<SessionUser | null>(SESSION_KEY, null)
}

export async function signIn(username: string, password: string) {
  const users = seedUsers()
  const found = users.find(
    (user) => user.username.toLowerCase() === username.toLowerCase().trim() && user.password === password,
  )
  if (!found) {
    throw new Error('Invalid username or password. Try username: "iskolar", password: "iskolar"')
  }
  writeJson(SESSION_KEY, found)
  return found
}

export async function register(input: {
  username: string
  password: string
  program: string
  suc: string
  yearLevel?: string
  bio?: string
}) {
  const users = seedUsers()
  if (users.some((user) => user.username.toLowerCase() === input.username.toLowerCase().trim())) {
    throw new Error('That username is already taken. Please choose another.')
  }
  const user: SessionUser = {
    id: crypto.randomUUID(),
    username: input.username.trim(),
    password: input.password,
    program: input.program.trim(),
    suc: input.suc,
    yearLevel: input.yearLevel || 'Undergraduate',
    bio: input.bio || 'Proud Iskolar ng Bayan looking for meaningful connections & study buddies! 🎓',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=800&q=80',
    interests: ['☕ Coffee', '📚 Study Dates', '🎧 Music', '✨ Campus Life'],
  }
  users.push(user)
  writeJson(USERS_KEY, users)
  writeJson(SESSION_KEY, user)
  return user
}

export function updateCurrentUser(updates: Partial<SessionUser>): SessionUser {
  const current = getSession()
  if (!current) throw new Error('No user logged in')
  const updated: SessionUser = { ...current, ...updates }
  writeJson(SESSION_KEY, updated)
  const users = seedUsers().map((u) => (u.id === current.id ? updated : u))
  writeJson(USERS_KEY, users)
  return updated
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
  me: SessionUser,
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
        text: `Hi ${them.name.split(' ')[0]}! Great to meet a fellow scholar from ${them.suc.split(' ')[0]}! ✨`,
        timestamp: now,
      },
      {
        id: crypto.randomUUID(),
        from: 'them',
        text: `Hello ${me.username}! Always happy to meet someone from ${me.suc.split(' ')[0]}! How's your semester going so far? 😊`,
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
    'Haha agree! Campus life is wild this sem. Kamusta midterms mo? 📚',
    'Yesss! Coffee run tayo when you are free! ☕',
    'Love that! Keep in touch, let me know if you are around campus sometime! ✨',
  ]
  // Pick reply based on current count or random
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
