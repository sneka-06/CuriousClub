import { ArrowRight, BookOpen, KeyRound } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'

type Props = {
  onLogin: () => void
  dark: boolean
  onThemeToggle: () => void
}

export function LoginPage({ onLogin, dark, onThemeToggle }: Props) {
  return (
    <main className="grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">
      <section className="relative flex min-h-[42vh] flex-col justify-between overflow-hidden border-b border-ink/15 bg-login-bg px-6 py-8 text-login-text sm:px-10 lg:min-h-screen lg:border-b-0 lg:border-r lg:border-login-text/20 lg:px-16 lg:py-12">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex size-10 items-center justify-center border border-login-gold/70 text-login-gold">
              <BookOpen size={18} strokeWidth={1.5} aria-hidden="true" />
            </div>
            <div>
              <p className="font-serif text-2xl leading-none">curious club</p>
              <p className="mt-1 text-[0.65rem] tracking-wide text-login-text/80">
                A little curiosity goes a long way.
              </p>
            </div>
          </div>
          <ThemeToggle dark={dark} onToggle={onThemeToggle} inverted />
        </div>

        <div className="relative z-10 max-w-2xl py-16 lg:py-0">
          <p className="mb-6 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-login-gold">
            A community of lifelong learners
          </p>
          <h1 className="text-balance font-serif text-5xl leading-[1.05] tracking-[-0.025em] sm:text-6xl xl:text-7xl">
            Every good question opens a door.
          </h1>
          <p className="mt-6 max-w-lg text-base leading-7 text-login-text/85">
            Keep a record of what draws your attention, and discover the things your community hopes to learn next.
          </p>
        </div>

        <p className="font-serif text-sm italic text-login-text/80">
          “Curiosity is the beginning of wisdom.”
        </p>
        <span className="absolute -bottom-20 -right-8 font-serif text-[22rem] leading-none text-login-text/[0.035]" aria-hidden="true">
          ?
        </span>
      </section>

      <section className="flex items-center justify-center px-6 py-16 sm:px-10 lg:px-16">
        <div className="w-full max-w-md">
          <p className="label mb-5">Your learning journal awaits</p>
          <h2 className="font-serif text-4xl tracking-tight text-plum sm:text-5xl">Welcome back.</h2>
          <p className="mt-4 leading-7 text-ink/70">
            Sign in through your organization to return to the collection.
          </p>

          <div className="my-9 border-y border-ink/15 py-9">
            <button
              type="button"
              onClick={onLogin}
              className="group flex w-full items-center justify-between bg-plum px-5 py-4 font-semibold text-card transition hover:bg-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-plum"
            >
              <span className="flex items-center gap-3">
                <KeyRound size={17} strokeWidth={1.7} aria-hidden="true" />
                Continue with SSO
              </span>
              <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </button>
            <p className="mt-4 text-center text-xs leading-5 text-ink/70">
              Secure sign-in managed by your organization
            </p>
          </div>

          <div className="flex gap-4 border border-gold/50 bg-card p-5">
            <BookOpen size={18} className="mt-0.5 shrink-0 text-gold-dark" strokeWidth={1.5} aria-hidden="true" />
            <p className="text-sm leading-6 text-ink/70">
              New here? Your account is created automatically the first time you continue with SSO.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
