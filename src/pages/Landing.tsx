import { APP_NAME, STATS, PROFILES } from '../data/mock'
import {
  BuildingIcon,
  CapIcon,
  CoffeeIcon,
  FlameIcon,
  HeartIcon,
  ShieldCheckIcon,
  SparklesIcon,
  VerifiedBadgeIcon,
} from '../components/icons'
import { navigate } from '../lib/router'
import { useSession } from '../lib/session'
import * as api from '../lib/api'

export function LandingPage() {
  const { user, refresh } = useSession()

  async function handleInstantDemo() {
    try {
      await api.signIn('iskolar', 'iskolar')
      refresh()
      navigate({ name: 'match' })
    } catch {
      navigate({ name: 'signin' })
    }
  }

  return (
    <div className="relative flex min-h-full flex-col overflow-x-hidden bg-white selection:bg-rose-100 selection:text-rose-900">
      {/* Top Header */}
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-100 bg-white px-5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500 text-white shadow-sm">
            <FlameIcon className="h-5 w-5" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-slate-900">{APP_NAME}</span>
        </div>

        <div className="flex items-center gap-2">
          {user ? (
            <button
              type="button"
              onClick={() => navigate({ name: 'match' })}
              className="rounded-full bg-slate-900 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-slate-800 transition-colors"
            >
              Open App →
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={() => navigate({ name: 'signin' })}
                className="rounded-full px-3.5 py-1.5 text-xs font-bold text-slate-700 hover:text-slate-900 transition-colors"
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => navigate({ name: 'register' })}
                className="rounded-full bg-brand-500 px-4 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-brand-600 active:scale-95 transition-all"
              >
                Join Now
              </button>
            </>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-5 pt-8 pb-6 text-center">
        <div className="relative z-10 flex flex-col items-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1 text-xs font-semibold text-slate-700">
            <SparklesIcon className="h-3.5 w-3.5 text-brand-500" />
            <span>Dating & Campus Connections for Iskolar ng Bayan</span>
          </div>

          <h1 className="mt-5 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            Where Honor Meets <br />
            <span className="text-brand-500">Campus Chemistry</span>
          </h1>

          <p className="mt-3 text-xs leading-relaxed text-slate-600 max-w-[320px] font-normal">
            Connect with fellow Iskolar ng Bayan across 48+ Philippine state universities. Find your thesis buddy, coffee crawl partner, or the love of your life.
          </p>

          {/* Social Proof Avatar Stack */}
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
            <span className="text-xs font-semibold text-slate-700">2,500+ active scholars online</span>
          </div>

          {/* CTAs */}
          <div className="mt-6 flex flex-col gap-2.5 w-full max-w-[280px]">
            <button
              type="button"
              onClick={() => navigate({ name: user ? 'match' : 'register' })}
              className="flex items-center justify-center gap-2 rounded-2xl bg-brand-500 py-3.5 text-sm font-bold text-white shadow-sm hover:bg-brand-600 active:scale-[0.98] transition-all"
            >
              <span>Find Your Iskolar Match</span>
              <span aria-hidden="true">→</span>
            </button>

            {!user ? (
              <button
                type="button"
                onClick={handleInstantDemo}
                className="flex items-center justify-center gap-1.5 rounded-2xl border border-slate-200 bg-slate-50 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900 active:scale-[0.98] transition-all"
              >
                <span>Explore Demo Account (One Click)</span>
              </button>
            ) : null}
          </div>
        </div>
      </section>

      {/* Live Campus Stats Bar */}
      <section className="mx-4 my-2 overflow-hidden rounded-2xl bg-slate-900 p-4 text-white shadow-sm">
        <div className="grid grid-cols-3 divide-x divide-white/10 text-center">
          <StatItem value={STATS.accounts.toLocaleString()} label="Scholars" icon={<CapIcon className="mx-auto h-4 w-4 text-rose-400" />} />
          <StatItem value={`${STATS.universities}`} label="State Universities" icon={<BuildingIcon className="mx-auto h-4 w-4 text-rose-400" />} />
          <StatItem value={`${STATS.sparks.toLocaleString()}+`} label="Sparks Ignited" icon={<HeartIcon className="mx-auto h-4 w-4 text-rose-400 fill-rose-400" />} />
        </div>
      </section>

      {/* Featured Scholars Preview Stack */}
      <section className="px-5 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-extrabold text-slate-900">Featured Scholars</h2>
            <p className="text-xs text-slate-500">Active right now in your area</p>
          </div>
          <button
            type="button"
            onClick={() => navigate({ name: user ? 'search' : 'signin' })}
            className="text-xs font-bold text-brand-500 hover:underline"
          >
            Explore All →
          </button>
        </div>

        <div className="mt-4 flex gap-3 overflow-x-auto no-scrollbar pb-2">
          {PROFILES.map((profile) => (
            <div
              key={profile.id}
              onClick={() => navigate({ name: user ? 'match' : 'signin' })}
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
                  <p className="truncate text-xs font-bold">{profile.name.split(' ')[0]}, {profile.age}</p>
                  <VerifiedBadgeIcon className="h-3 w-3 text-sky-400 shrink-0" />
                </div>
                <p className="truncate text-[10px] text-slate-300 font-medium">{profile.suc.split(' ')[0]}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Iskomeet Features */}
      <section className="px-5 py-6 bg-slate-50 border-t border-b border-slate-100">
        <h2 className="text-center text-lg font-extrabold text-slate-900">Built for College Life</h2>
        <p className="text-center text-xs text-slate-500">Designed around the unique Iskolar culture</p>

        <div className="mt-5 flex flex-col gap-3">
          <FeatureCard
            icon={<CapIcon className="h-5 w-5 text-brand-500" />}
            title="Verified SUC Scholars Only"
            description="Say goodbye to fake profiles and bots. Connect exclusively with students from legitimate state colleges."
          />
          <FeatureCard
            icon={<CoffeeIcon className="h-5 w-5 text-brand-500" />}
            title="Campus-Centric Connections"
            description="Filter by university, major, and batch. Plan Sunken Garden sunset walks or study dates at your campus library."
          />
          <FeatureCard
            icon={<ShieldCheckIcon className="h-5 w-5 text-brand-500" />}
            title="Wholesome & Respectful"
            description="Student-moderated community with icebreakers, mutual matching, and zero tolerance for harassment."
          />
        </div>
      </section>

      {/* Love Stories / Testimonials */}
      <section className="px-5 py-6">
        <h2 className="text-center text-base font-extrabold text-slate-900">Campus Stories</h2>
        <div className="mt-3 rounded-2xl bg-slate-50 p-4 border border-slate-200/80">
          <p className="text-xs italic leading-relaxed text-slate-700">
            &ldquo;We both were having mental breakdowns during finals week and bonded over iced coffee and thesis memes. 8 months later, we are still going strong!&rdquo;
          </p>
          <div className="mt-2.5 flex items-center justify-between text-[11px] font-semibold text-slate-600">
            <span>— Lia (UPD) & Isagani (EARIST)</span>
            <span className="flex items-center gap-1 text-brand-500">
              <HeartIcon className="h-3.5 w-3.5 fill-brand-500" />
              <span>Matched on Iskomeet</span>
            </span>
          </div>
        </div>
      </section>

      {/* Modern Footer */}
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
          <button type="button" onClick={() => navigate({ name: 'search' })} className="hover:text-white">
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

function StatItem({ value, label, icon }: { value: string; label: string; icon: React.ReactNode }) {
  return (
    <div className="px-2">
      <div className="flex justify-center">{icon}</div>
      <p className="mt-1 text-base font-black tracking-tight text-white">{value}</p>
      <p className="text-[10px] font-medium text-slate-400 leading-tight">{label}</p>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="flex items-start gap-3 rounded-2xl bg-white p-3.5 shadow-sm border border-slate-100">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-50">
        {icon}
      </span>
      <div>
        <h3 className="text-xs font-bold text-slate-900">{title}</h3>
        <p className="mt-0.5 text-[11px] leading-relaxed text-slate-500">{description}</p>
      </div>
    </div>
  )
}
