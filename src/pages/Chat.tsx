import { type FormEvent, useEffect, useRef, useState } from 'react'
import {
  BackArrow,
  CheckCheckIcon,
  SendIcon,
  SparklesIcon,
  VerifiedBadgeIcon,
} from '../components/icons'
import * as api from '../lib/api'
import { navigate } from '../lib/router'
import { useSession } from '../lib/session'
import type { ChatMessage, Profile } from '../lib/types'

type Props = {
  userId: string
}

export function ChatPage({ userId }: Props) {
  const { user } = useSession()
  const [profile, setProfile] = useState<Profile | undefined>()
  const [allProfiles, setAllProfiles] = useState<Profile[]>([])
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [draft, setDraft] = useState('')
  const [typing, setTyping] = useState(false)
  const [infoOpen, setInfoOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (!user) {
      navigate({ name: 'signin' })
      return
    }
    void (async () => {
      const [found, all] = await Promise.all([
        api.getProfile(userId),
        api.getProfiles(),
      ])
      setProfile(found)
      setAllProfiles(all)
      if (!found) return
      const convo = await api.openConversation(userId, user, found)
      setMessages(convo.messages)
      setTimeout(scrollToBottom, 100)
    })()
  }, [user, userId])

  useEffect(() => {
    scrollToBottom()
  }, [messages, typing])

  if (!user) return null

  async function onSend(event: FormEvent) {
    event.preventDefault()
    const text = draft.trim()
    if (!text || !profile) return
    setDraft('')

    const convo = await api.sendMessage(userId, text)
    setMessages(convo.messages)

    // Simulate smart persona reply with realistic typing indicator
    setTyping(true)
    const delay = 1200 + Math.random() * 800
    window.setTimeout(() => {
      void api
        .receiveReply(userId, text)
        .then((updated) => {
          setMessages(updated.messages)
        })
        .finally(() => setTyping(false))
    }, delay)
  }

  function handleSendIcebreaker(text: string) {
    setDraft(text)
  }

  function handleReaction(messageId: string, emoji: string) {
    const updated = api.reactToMessage(userId, messageId, emoji)
    setMessages(updated.messages)
  }

  const icebreakers = [
    '☕ Coffee run sa library?',
    '🍢 Comfort street food around campus?',
    '📚 Surviving pa ba midterms?',
    '🎧 What music are you listening to lately?',
  ]

  return (
    <div className="relative flex h-full min-h-full flex-col bg-slate-50">
      {/* Top Header */}
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-100 bg-white/95 px-3 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Back to matches"
            onClick={() => navigate({ name: 'match' })}
            className="flex h-9 w-9 items-center justify-center rounded-full text-slate-600 hover:bg-slate-100 active:scale-95 transition-all"
          >
            <BackArrow className="h-5 w-5" />
          </button>

          {/* User Profile Mini Header */}
          {profile ? (
            <button
              type="button"
              onClick={() => setInfoOpen(!infoOpen)}
              className="flex items-center gap-2.5 text-left rounded-xl p-1 hover:bg-slate-50 transition-colors"
            >
              <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-slate-200 shadow-sm">
                <img src={profile.avatar} alt={profile.name} className="h-full w-full object-cover" />
                {profile.online ? (
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
                ) : null}
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-1">
                  <span className="truncate text-sm font-bold text-slate-900">{profile.name}</span>
                  {profile.verified ? <VerifiedBadgeIcon className="h-4 w-4 text-sky-500" /> : null}
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500">
                  <span className="truncate max-w-[140px] text-brand-600 font-semibold">{profile.suc.split(' ')[0]}</span>
                  <span>•</span>
                  <span>{typing ? 'Typing...' : profile.online ? 'Active now' : profile.lastSeen || 'Offline'}</span>
                </div>
              </div>
            </button>
          ) : null}
        </div>

        {/* Profile Info Button */}
        {profile ? (
          <button
            type="button"
            aria-label="View profile info"
            onClick={() => setInfoOpen(!infoOpen)}
            className={`flex h-9 w-9 items-center justify-center rounded-full border text-xs font-bold transition-all ${
              infoOpen
                ? 'bg-brand-500 text-white border-brand-500 shadow-sm'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            ℹ
          </button>
        ) : null}
      </header>

      {/* Quick Matches switcher bar at top */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-slate-100 bg-white/70 px-4 py-2 text-xs no-scrollbar">
        <span className="shrink-0 font-bold uppercase tracking-wider text-[10px] text-slate-400">Scholars:</span>
        {allProfiles.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => navigate({ name: 'chat', userId: p.id })}
            className={`group relative flex shrink-0 items-center gap-1.5 rounded-full p-0.5 pr-2.5 transition-all ${
              p.id === userId
                ? 'bg-rose-100 text-brand-700 font-bold ring-2 ring-brand-500'
                : 'hover:bg-slate-100 text-slate-600'
            }`}
          >
            <img src={p.avatar} alt={p.name} className="h-6 w-6 rounded-full object-cover" />
            <span className="text-[11px]">{p.name.split(' ')[0]}</span>
            {p.online ? <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> : null}
          </button>
        ))}
      </div>

      {/* Slide-out Scholar Quick Bio Drawer */}
      {infoOpen && profile ? (
        <div className="border-b border-slate-200 bg-white p-4 shadow-md transition-all">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">{profile.name}, {profile.age}</h3>
              <p className="text-xs text-brand-600 font-medium">{profile.suc}</p>
              <p className="text-xs text-slate-500">{profile.program} • {profile.yearLevel}</p>
            </div>
            <button
              type="button"
              onClick={() => navigate({ name: 'match' })}
              className="rounded-xl bg-rose-50 px-2.5 py-1 text-xs font-bold text-brand-600 hover:bg-rose-100"
            >
              Full Card →
            </button>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-slate-600 italic font-normal">&ldquo;{profile.bio}&rdquo;</p>
          <div className="mt-2 flex flex-wrap gap-1">
            {profile.interests?.map((item) => (
              <span key={item} className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
                {item}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {/* Campus Connection Header Banner */}
        {profile ? (
          <div className="my-2 flex flex-col items-center justify-center text-center">
            <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border-2 border-white shadow-md">
              <img src={profile.avatar} alt={profile.name} className="h-full w-full object-cover" />
            </div>
            <p className="mt-2 text-xs font-bold text-slate-800">You matched with {profile.name}!</p>
            <p className="text-[11px] text-slate-500">
              Both of you represent Philippine State Scholars. Start with a warm greeting!
            </p>
          </div>
        ) : null}

        {/* Message bubbles */}
        {messages.map((message) => (
          <div
            key={message.id}
            className={`group relative flex flex-col ${
              message.from === 'me' ? 'items-end' : 'items-start'
            }`}
          >
            <div
              className={`relative max-w-[82%] px-4 py-2.5 shadow-sm transition-all ${
                message.from === 'me'
                  ? 'rounded-2xl rounded-tr-xs bg-gradient-to-r from-brand-500 to-rose-500 text-white'
                  : 'rounded-2xl rounded-tl-xs bg-white text-slate-900 border border-slate-100'
              }`}
            >
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>

              {/* Reaction Badge if any */}
              {message.reaction ? (
                <span className="absolute -bottom-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] shadow-sm border border-slate-100">
                  {message.reaction}
                </span>
              ) : null}
            </div>

            {/* Bubble Meta (Timestamp & status) */}
            <div className="mt-1 flex items-center gap-1.5 px-1 text-[10px] text-slate-400">
              <span>{message.timestamp || 'Just now'}</span>
              {message.from === 'me' ? (
                <CheckCheckIcon className="h-3.5 w-3.5 text-brand-500" />
              ) : null}

              {/* Quick emoji reaction on hover */}
              <div className="hidden group-hover:flex items-center gap-1 ml-2">
                {['❤️', '😂', '🔥'].map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => handleReaction(message.id, emoji)}
                    className="hover:scale-125 transition-transform text-[11px]"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {typing ? (
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-200 overflow-hidden">
              <img src={profile?.avatar} alt="Scholar avatar" className="h-full w-full object-cover" />
            </div>
            <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-xs bg-white px-3.5 py-2.5 shadow-sm border border-slate-100">
              <span className="typing-dot h-2 w-2 rounded-full bg-brand-500" />
              <span className="typing-dot h-2 w-2 rounded-full bg-brand-500" />
              <span className="typing-dot h-2 w-2 rounded-full bg-brand-500" />
            </div>
            <span className="text-[11px] font-medium text-slate-400">{profile?.name.split(' ')[0]} is typing...</span>
          </div>
        ) : null}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Icebreakers Bar */}
      <div className="border-t border-slate-100 bg-white/80 px-3 py-2">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <span className="flex items-center gap-1 shrink-0 text-[10px] font-bold uppercase tracking-wider text-brand-600">
            <SparklesIcon className="h-3.5 w-3.5" />
            Icebreakers:
          </span>
          {icebreakers.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSendIcebreaker(item)}
              className="shrink-0 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-700 hover:border-rose-300 hover:bg-rose-50 hover:text-brand-600 transition-colors"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <form onSubmit={onSend} className="sticky bottom-0 z-20 border-t border-slate-200/80 bg-white p-3">
        <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50/70 px-3 py-1.5 focus-within:border-brand-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-rose-500/20 transition-all">
          <input
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder={`Message ${profile?.name.split(' ')[0] || 'scholar'}...`}
            className="w-full bg-transparent py-2 text-sm text-slate-900 outline-none placeholder:text-slate-400"
          />

          <button
            type="submit"
            disabled={!draft.trim()}
            aria-label="Send message"
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all ${
              draft.trim()
                ? 'bg-gradient-to-tr from-brand-500 to-rose-500 text-white shadow-md shadow-rose-500/25 active:scale-95'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <SendIcon className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  )
}
