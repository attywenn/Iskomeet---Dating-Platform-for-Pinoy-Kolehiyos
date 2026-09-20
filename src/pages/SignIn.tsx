import { type FormEvent, useState } from 'react'
import { AuthCard, Field } from '../components/AuthCard'
import { UserIcon } from '../components/icons'
import * as api from '../lib/api'
import { navigate } from '../lib/router'
import { useSession } from '../lib/session'

export function SignInPage() {
  const { refresh } = useSession()
  const [error, setError] = useState('')
  async function handleSignIn(username: string, password: string) {
    setError('')
    try {
      await api.signIn(username, password)
      refresh()
      navigate({ name: 'match' })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not sign in.')
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const username = String(data.get('username') ?? '')
    const password = String(data.get('password') ?? '')
    await handleSignIn(username, password)
  }

  return (
    <AuthCard
      title="Welcome Back"
      subtitle="Sign in to connect with scholars across the country"
      error={error}
      onSubmit={onSubmit}
      demoHelper={
        <div className="rounded-2xl border border-dashed border-rose-200 bg-rose-50/50 p-3 text-center">
          <p className="text-[11px] font-semibold text-rose-700">Quick Demo Access:</p>
          <button
            type="button"
            onClick={() => handleSignIn('iskolar', 'iskolar')}
            className="mt-2 inline-flex items-center gap-1.5 rounded-xl bg-white px-3.5 py-1.5 text-xs font-bold text-rose-600 shadow-sm border border-rose-200 hover:bg-rose-50 active:scale-95 transition-all"
          >
            <span>⚡ Instant Demo Login (Iskolar)</span>
          </button>
        </div>
      }
      footer={
        <div className="flex flex-col items-center gap-2">
          <p>
            Don&apos;t have an account yet?{' '}
            <button
              type="button"
              className="font-bold text-brand-500 hover:text-brand-600 hover:underline"
              onClick={() => navigate({ name: 'register' })}
            >
              Register as Iskolar
            </button>
          </p>
          <button
            type="button"
            onClick={() => navigate({ name: 'landing' })}
            className="text-xs text-slate-400 hover:text-slate-600"
          >
            ← Back to Home
          </button>
        </div>
      }
    >
      <Field
        name="username"
        label="Username"
        placeholder="e.g. iskolar"
        autoComplete="username"
        required
        icon={<UserIcon className="h-4 w-4" />}
      />
      <Field
        name="password"
        type="password"
        label="Password"
        placeholder="Enter your password"
        autoComplete="current-password"
        required
      />
    </AuthCard>
  )
}
