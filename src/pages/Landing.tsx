import { APP_NAME, PROFILES } from '../data/mock'
import {
  CoffeeIcon,
  FlameIcon,
  SparklesIcon,
  VerifiedBadgeIcon,
} from '../components/icons'
import { navigate } from '../lib/router'

export function LandingPage() {
  return (
    <div className="relative flex min-h-full flex-col overflow-x-hidden bg-white selection:bg-rose-100 selection:text-rose-900">
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-100 bg-white px-5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500 text-white shadow-sm">
            <FlameIcon className="h-5 w-5" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-slate-900">{APP_NAME}</span>
        </div>

        <button
          type="button"
          onClick={() => navigate({ name: 'signin' })}
          className="rounded-full bg-slate-900 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-slate-800 transition-colors"
        >
          Open App →
        </button>
      </header>

      <section className="relative px-5 pt-8 pb-6 text-center">
        <div className="relative z-10 flex flex-col items-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1 text-xs font-semibold text-slate-700">
            <SparklesIcon className="h-3.5 w-3.5 text-brand-500" />
            <span>Dating Site for Filipino Kolehiyos</span>
          </div>

          <h1 className="mt-5 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            Where Honor Meets <br />
            <span className="text-brand-500">Campus Chemistry</span>
          </h1>

          <p className="mt-3 text-xs leading-relaxed text-slate-600 max-w-[320px] font-normal">
            Connect with fellow students across Philippine universities. Find your thesis buddy, coffee crawl partner, or the love of your life.
          </p>

          <div className="mt-5 flex items-center gap-2">
            <div className="flex -space-x-2">
              {PROFILES.slice(0, 4).map((p) => (
                <img
                  key={p.id}
                  src={p.avatar}
                  alt={p.name}
                  className="h-8 w-8 rounded-full border-2 border-white object-cover shadow-sm"
                />
              ))}
            </div>
            <span className="text-xs font-semibold text-slate-700">Over 250+ fellas are trusting Iskomeet</span>
          </div>

          <div className="mt-6 flex w-full max-w-[280px] flex-col gap-2.5">
            <button
              type="button"
              onClick={() => navigate({ name: 'signin' })}
              className="flex items-center justify-center gap-2 rounded-2xl bg-brand-500 py-3.5 text-sm font-bold text-white shadow-sm hover:bg-brand-600 active:scale-[0.98] transition-all"
            >
              <span>Find Your Match</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </section>

      <section className="px-5 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-extrabold text-slate-900">Meet them around campus</h2>
            <p className="text-xs text-slate-500">People in your area</p>
          </div>
          <button
            type="button"
            onClick={() => navigate({ name: 'signin' })}
            className="text-xs font-bold text-brand-500 hover:underline"
          >
            Explore All →
          </button>
        </div>

        <div className="mt-4 flex gap-3 overflow-x-auto no-scrollbar pb-2">
          {PROFILES.map((profile) => (
            <div
              key={profile.id}
              onClick={() => navigate({ name: 'match' })}
              className="group relative h-48 w-36 shrink-0 cursor-pointer overflow-hidden rounded-2xl bg-slate-900 shadow-md transition-all hover:scale-[1.02]"
            >
              <img
                src={profile.avatar}
                alt={profile.name}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
              <div className="absolute top-2 right-2">
                {profile.online ? (
                  <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-white" />
                ) : null}
              </div>
              <div className="absolute bottom-2.5 inset-x-2.5 text-white">
                <div className="flex items-center gap-1">
                  <p className="truncate text-xs font-bold">{profile.name.split(' ')[0]}, {profile.age ?? 22}</p>
                  <VerifiedBadgeIcon className="h-3 w-3 text-sky-400 shrink-0" />
                </div>
                <p className="truncate text-[10px] text-slate-300 font-medium">{(profile.universityName ?? profile.suc ?? 'University').split(' ')[0]}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="mt-auto border-t border-slate-100 bg-slate-900 px-5 py-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-500 text-white">
              <FlameIcon className="h-4 w-4" />
            </span>
            <span className="text-sm font-black">{APP_NAME}</span>
          </div>

          <a
            href="https://www.buymeacoffee.com/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-slate-200 hover:bg-white/20 transition-colors"
          >
            <CoffeeIcon className="h-4 w-4" />
            <span>Support Dev</span>
          </a>
        </div>

        <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-400">
          <button type="button" onClick={() => navigate({ name: 'about' })} className="hover:text-white">
            About
          </button>
          <button type="button" onClick={() => navigate({ name: 'developer' })} className="hover:text-white">
            Developer
          </button>
          <button type="button" onClick={() => navigate({ name: 'talk' })} className="hover:text-white">
            Talk to Dev
          </button>
          <button type="button" onClick={() => navigate({ name: 'signin' })} className="hover:text-white">
            Campus Hub
          </button>
        </div>

        <p className="mt-5 text-[10px] text-slate-500">
          © {new Date().getFullYear()} Iskomeet. Built for Iskolar ng Bayan.
        </p>
      </footer>
    </div>
  )
}
