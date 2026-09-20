import { useState, type FormEvent, type InputHTMLAttributes, type ReactNode } from 'react'
import { APP_NAME } from '../data/mock'
import { FlameIcon } from './icons'

type Props = {
  title: string
  subtitle?: string
  footer: ReactNode
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  children: ReactNode
  error?: string
  demoHelper?: ReactNode
}

export function AuthCard({ title, subtitle, footer, onSubmit, children, error, demoHelper }: Props) {
  return (
    <div className="flex min-h-full flex-col justify-center bg-gradient-to-b from-rose-50/40 via-white to-slate-50/60 px-6 py-8">
      {/* Brand Header */}
      <div className="flex flex-col items-center text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-brand-500 to-rose-400 text-white shadow-lg shadow-rose-500/25">
          <FlameIcon className="h-8 w-8" />
        </div>
        <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900">
          {APP_NAME}
        </h1>
        <p className="text-xs font-medium text-slate-500">
          Dating for People&apos;s Scholars
        </p>
      </div>

      {/* Auth Card Container */}
      <div className="mt-6 w-full rounded-3xl border border-slate-100 bg-white p-6 shadow-xl shadow-slate-900/5">
        <div className="text-center">
          <h2 className="text-xl font-bold text-slate-900">{title}</h2>
          {subtitle ? <p className="mt-1 text-xs text-slate-500">{subtitle}</p> : null}
        </div>

        {error ? (
          <div
            role="alert"
            className="mt-4 flex items-center gap-2.5 rounded-xl border border-red-200 bg-red-50/90 px-3.5 py-2.5 text-xs font-medium text-red-800"
          >
            <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-red-200 text-red-800 font-bold text-[10px]">
              !
            </span>
            <span>{error}</span>
          </div>
        ) : null}

        <form onSubmit={onSubmit} className="mt-5 flex flex-col gap-4">
          {children}

          <button
            type="submit"
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-brand-500 via-rose-500 to-pink-500 py-3.5 text-sm font-bold text-white shadow-lg shadow-rose-500/25 transition-all hover:shadow-xl hover:shadow-rose-500/35 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2"
          >
            <span>Continue</span>
            <span aria-hidden="true">→</span>
          </button>
        </form>

        {demoHelper ? <div className="mt-4">{demoHelper}</div> : null}
      </div>

      <div className="mt-6 text-center text-xs text-slate-500">{footer}</div>
    </div>
  )
}

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  icon?: ReactNode
}

export function Field({ label, icon, type, ...props }: FieldProps) {
  const [showPassword, setShowPassword] = useState(false)
  const isPassword = type === 'password'
  const computedType = isPassword ? (showPassword ? 'text' : 'password') : type

  return (
    <div className="flex flex-col gap-1.5 text-left">
      {label ? (
        <label className="text-xs font-semibold text-slate-700">
          {label} {props.required ? <span className="text-rose-500">*</span> : null}
        </label>
      ) : null}
      <div className="relative flex items-center">
        {icon ? (
          <span className="pointer-events-none absolute left-3.5 text-slate-400">
            {icon}
          </span>
        ) : null}
        <input
          {...props}
          type={computedType}
          className={`w-full rounded-2xl border border-slate-200 bg-slate-50/50 py-3 text-sm text-slate-900 transition-all placeholder:text-slate-400 hover:bg-slate-50 focus:border-rose-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 ${
            icon ? 'pl-11 pr-4' : 'px-4'
          } ${isPassword ? 'pr-11' : ''}`}
        />
        {isPassword ? (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            className="absolute right-3 text-xs font-semibold text-slate-400 hover:text-slate-700"
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        ) : null}
      </div>
    </div>
  )
}
