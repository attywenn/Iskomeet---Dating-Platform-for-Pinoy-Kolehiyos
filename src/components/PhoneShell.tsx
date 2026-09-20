import type { ReactNode } from 'react'
import { BottomNav } from './BottomNav'
import { FlameIcon } from './icons'

export function PhoneShell({ children }: { children: ReactNode }) {

  return (
    <div className="relative flex min-h-screen items-center justify-center p-0 sm:p-4 md:p-8 selection:bg-rose-100 selection:text-rose-900">
      {/* Decorative desktop background elements */}
      <div className="pointer-events-none fixed inset-0 hidden overflow-hidden sm:block">
        <div className="absolute top-1/2 left-12 -translate-y-1/2 hidden xl:flex flex-col gap-4 text-slate-400/80">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-rose-500/10 text-brand-500">
              <FlameIcon className="h-5 w-5" />
            </span>
            <span className="text-sm font-semibold text-slate-700">Iskomeet</span>
          </div>
          <p className="max-w-[200px] text-xs leading-relaxed text-slate-500">
            Dating & campus connection platform for People&apos;s Scholars across Philippine SUCs.
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5 max-w-[220px]">
            <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-medium text-slate-600">UP Diliman</span>
            <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-medium text-slate-600">PUP Sta. Mesa</span>
            <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-medium text-slate-600">PNU Manila</span>
            <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-medium text-slate-600">EARIST</span>
            <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-medium text-slate-600">BatStateU</span>
          </div>
        </div>
      </div>

      {/* Modern Smartphone shell container */}
      <div className="relative flex min-h-screen w-full max-w-[440px] flex-col overflow-hidden bg-white shadow-none sm:min-h-[890px] sm:max-h-[920px] sm:rounded-[42px] sm:border-[9px] sm:border-slate-900 sm:shadow-phone">

        {/* Inner Scrollable Screen Content */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {children}
        </div>

        {/* Global Bottom Navigation */}
        <BottomNav />

        {/* Home Indicator Bar (Mobile & Desktop) */}
        <div className="hidden sm:flex h-4 w-full shrink-0 items-center justify-center bg-white">
          <div className="h-1 w-32 rounded-full bg-slate-300" />
        </div>
      </div>
    </div>
  )
}
