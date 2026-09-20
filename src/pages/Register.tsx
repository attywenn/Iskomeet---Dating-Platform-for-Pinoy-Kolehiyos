import { type FormEvent, useState } from 'react'
import { AuthCard, Field } from '../components/AuthCard'
import { CapIcon, UserIcon } from '../components/icons'
import { SUCS } from '../data/mock'
import * as api from '../lib/api'
import { navigate } from '../lib/router'
import { useSession } from '../lib/session'

export function RegisterPage() {
  const { refresh } = useSession()
  const [error, setError] = useState('')

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const username = String(data.get('username') ?? '')
    const password = String(data.get('password') ?? '')
    const program = String(data.get('program') ?? '')
    const suc = String(data.get('suc') ?? '')
    const yearLevel = String(data.get('yearLevel') ?? 'Undergraduate')

    if (!suc) {
      setError('Please select your State University or College (SUC).')
      return
    }

    try {
      await api.register({ username, password, program, suc, yearLevel })
      refresh()
      navigate({ name: 'match' })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not complete registration.')
    }
  }

  return (
    <AuthCard
      title="Create Iskolar Account"
      subtitle="Join verified scholars looking for dates & study buddies"
      error={error}
      onSubmit={onSubmit}
      footer={
        <div className="flex flex-col items-center gap-2">
          <p>
            Already have an account?{' '}
            <button
              type="button"
              className="font-bold text-brand-500 hover:text-brand-600 hover:underline"
              onClick={() => navigate({ name: 'signin' })}
            >
              Sign In
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
        placeholder="Choose a scholar handle"
        autoComplete="username"
        required
        icon={<UserIcon className="h-4 w-4" />}
      />

      <Field
        name="password"
        type="password"
        label="Password"
        placeholder="Create a secure password"
        autoComplete="new-password"
        required
      />

      {/* SUC Select */}
      <div className="flex flex-col gap-1.5 text-left">
        <label className="text-xs font-semibold text-slate-700">
          State University / College (SUC) <span className="text-rose-500">*</span>
        </label>
        <div className="relative">
          <select
            name="suc"
            defaultValue=""
            required
            className="w-full appearance-none rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 transition-all focus:border-rose-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20"
          >
            <option value="" disabled>
              Select your campus
            </option>
            {SUCS.map((suc) => (
              <option key={suc} value={suc}>
                {suc}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400">
            ▼
          </span>
        </div>
      </div>

      <Field
        name="program"
        label="Academic Program / Degree"
        placeholder="e.g. BS Computer Science, BA Communication"
        required
        icon={<CapIcon className="h-4 w-4" />}
      />

      {/* Year Level */}
      <div className="flex flex-col gap-1.5 text-left">
        <label className="text-xs font-semibold text-slate-700">Year Level</label>
        <div className="relative">
          <select
            name="yearLevel"
            defaultValue="3rd Year"
            className="w-full appearance-none rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 transition-all focus:border-rose-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20"
          >
            <option value="1st Year (Freshie)">1st Year (Freshie)</option>
            <option value="2nd Year (Sophomore)">2nd Year (Sophomore)</option>
            <option value="3rd Year (Junior)">3rd Year (Junior)</option>
            <option value="4th Year (Senior)">4th Year (Senior)</option>
            <option value="Graduating Batch">Graduating Batch</option>
            <option value="Graduate / Masteral">Graduate / Masteral</option>
          </select>
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400">
            ▼
          </span>
        </div>
      </div>
    </AuthCard>
  )
}
