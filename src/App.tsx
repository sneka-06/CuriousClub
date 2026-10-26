import { FormEvent, useEffect, useMemo, useState } from 'react'
import { ArrowRight, BookOpen, Check, ChevronDown, Search, X } from 'lucide-react'
import { TopicCard } from './components/TopicCard'
import { LoginPage } from './components/LoginPage'
import { ThemeToggle } from './components/ThemeToggle'
import { initialTopics, type Topic } from './data/topics'

type Filter = 'all' | 'wanted' | 'recent'

export default function App() {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('curious-club-theme')
    return saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches
  })
  const [authenticated, setAuthenticated] = useState(false)
  const [topics, setTopics] = useState<Topic[]>(initialTopics)
  const [newTopic, setNewTopic] = useState('')
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<Filter>('all')
  const [interests, setInterests] = useState<Set<number>>(new Set())
  const [toast, setToast] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  const notify = (message: string) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 2800)
  }

  const addTopic = (event: FormEvent) => {
    event.preventDefault()
    const title = newTopic.trim()
    if (!title) return
    if (topics.some((topic) => topic.title.toLowerCase() === title.toLowerCase())) {
      notify('That curiosity is already in the collection.')
      return
    }
    setTopics((current) => [
      { id: Date.now(), title, category: 'Community', count: 1, addedAt: Date.now() },
      ...current,
    ])
    setNewTopic('')
    notify('Your curiosity has been added.')
  }

  const addInterest = (id: number) => {
    if (interests.has(id)) return
    setTopics((current) =>
      current.map((topic) => (topic.id === id ? { ...topic, count: topic.count + 1 } : topic)),
    )
    setInterests((current) => new Set(current).add(id))
    notify('Noted — curiosity is better shared.')
  }

  const visibleTopics = useMemo(() => {
    const matches = topics.filter((topic) =>
      `${topic.title} ${topic.category}`.toLowerCase().includes(search.toLowerCase()),
    )
    if (filter === 'wanted') return [...matches].sort((a, b) => b.count - a.count)
    if (filter === 'recent') return [...matches].sort((a, b) => b.addedAt - a.addedAt)
    return matches
  }, [topics, search, filter])

  const totalInterest = topics.reduce((sum, topic) => sum + topic.count, 0)
  const filters: { id: Filter; label: string }[] = [
    { id: 'all', label: 'All curiosities' },
    { id: 'wanted', label: 'Most wanted' },
    { id: 'recent', label: 'Recently added' },
  ]

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('curious-club-theme', dark ? 'dark' : 'light')
  }, [dark])

  if (!authenticated) {
    return (
      <LoginPage
        onLogin={() => setAuthenticated(true)}
        dark={dark}
        onThemeToggle={() => setDark((current) => !current)}
      />
    )
  }

  return (
    <main className="min-h-screen overflow-hidden">
      <header className="border-b border-ink/15">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
          <div className="flex items-center gap-4">
            <div className="flex size-9 items-center justify-center border border-plum text-plum">
              <BookOpen size={17} strokeWidth={1.5} aria-hidden="true" />
            </div>
            <div>
              <p className="font-serif text-xl leading-none text-plum">curious club</p>
              <p className="mt-1 hidden text-[0.65rem] tracking-wide text-ink/70 sm:block">
                A little curiosity goes a long way.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle dark={dark} onToggle={() => setDark((current) => !current)} />
            <div className="relative">
              <button
                type="button"
                className="flex items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-plum"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-expanded={menuOpen}
                aria-label="Open account menu"
              >
                <span className="flex size-9 items-center justify-center rounded-full bg-plum font-serif text-sm text-card">AC</span>
                <ChevronDown size={14} className="text-plum" aria-hidden="true" />
              </button>
              {menuOpen && (
                <div className="absolute right-0 top-12 z-20 w-44 border border-ink/15 bg-card p-2 shadow-xl">
                  <button className="w-full px-3 py-2 text-left text-sm text-ink hover:bg-parchment">My journal</button>
                  <button
                    onClick={() => {
                      setMenuOpen(false)
                      setAuthenticated(false)
                    }}
                    className="w-full px-3 py-2 text-left text-sm text-ink hover:bg-parchment"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <section className="relative border-b border-ink/15 px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="absolute right-[7%] top-12 hidden font-serif text-[11rem] leading-none text-plum/[0.035] lg:block" aria-hidden="true">?</div>
        <div className="mx-auto max-w-4xl text-center">
          <p className="label mb-7">Your learning journal</p>
          <h1 className="text-balance font-serif text-5xl leading-[1.04] tracking-[-0.025em] text-plum sm:text-6xl lg:text-7xl">
            What have you been wanting to learn?
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-7 text-ink/70 sm:text-lg">
            Put your curiosity out into the world. Someone else might be wondering about the very same thing.
          </p>
          <form onSubmit={addTopic} className="mx-auto mt-10 flex max-w-3xl flex-col gap-3 sm:flex-row">
            <label htmlFor="topic" className="sr-only">A topic you want to learn</label>
            <input
              id="topic"
              value={newTopic}
              onChange={(event) => setNewTopic(event.target.value)}
              placeholder="I've always wanted to learn..."
              className="min-w-0 flex-1 border border-ink/25 bg-card px-5 py-4 text-ink shadow-inner placeholder:text-ink/65 focus:border-plum focus:outline-none focus:ring-1 focus:ring-plum"
            />
            <button
              type="submit"
              disabled={!newTopic.trim()}
              className="inline-flex items-center justify-center gap-3 bg-plum px-6 py-4 font-semibold text-card transition hover:bg-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-plum disabled:cursor-not-allowed disabled:opacity-65"
            >
              Add to the list <ArrowRight size={16} aria-hidden="true" />
            </button>
          </form>
          <p className="mt-4 font-serif text-sm italic text-ink/70">Big ambitions, tiny curiosities — everything belongs here.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div className="flex flex-col justify-between gap-8 border-b border-ink/15 pb-9 md:flex-row md:items-end">
          <div>
            <p className="label mb-4">The community index</p>
            <h2 className="font-serif text-4xl tracking-tight text-plum sm:text-5xl">A collection of curiosities.</h2>
            <p className="mt-3 text-ink/70">Things we're all hoping to learn, one idea at a time.</p>
          </div>
          <div className="flex gap-8 text-sm">
            <p><span className="block font-serif text-3xl text-plum">{topics.length}</span><span className="text-ink/70">topics</span></p>
            <p><span className="block font-serif text-3xl text-plum">{totalInterest.toLocaleString()}</span><span className="text-ink/70">expressions of interest</span></p>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-5 py-7 lg:flex-row lg:items-center">
          <div className="relative w-full lg:max-w-xs">
            <Search size={16} className="absolute left-0 top-1/2 -translate-y-1/2 text-ink/40" aria-hidden="true" />
            <label htmlFor="search" className="sr-only">Search curiosities</label>
            <input id="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search the collection" className="w-full border-b border-ink/25 bg-transparent py-3 pl-7 pr-8 text-sm outline-none placeholder:text-ink/65 focus:border-plum" />
            {search && <button onClick={() => setSearch('')} aria-label="Clear search" className="absolute right-0 top-1/2 -translate-y-1/2 text-ink/50 hover:text-plum"><X size={15} /></button>}
          </div>
          <div className="flex gap-1 overflow-x-auto" role="tablist" aria-label="Sort topics">
            {filters.map((item) => (
              <button key={item.id} role="tab" aria-selected={filter === item.id} onClick={() => setFilter(item.id)} className={`whitespace-nowrap border-b px-4 py-3 text-xs font-semibold uppercase tracking-wider transition ${filter === item.id ? 'border-plum text-plum' : 'border-transparent text-ink/65 hover:text-ink'}`}>{item.label}</button>
            ))}
          </div>
        </div>

        {visibleTopics.length ? (
          <div className="grid gap-4 md:grid-cols-2">
            {visibleTopics.map((topic, index) => <TopicCard key={topic.id} topic={topic} index={index} interested={interests.has(topic.id)} onInterest={addInterest} />)}
          </div>
        ) : (
          <div className="border border-ink/15 bg-card px-6 py-16 text-center">
            <p className="font-serif text-2xl text-plum">Nothing in the index yet.</p>
            <p className="mt-2 text-sm text-ink/70">Try another phrase, or add this curiosity yourself.</p>
          </div>
        )}
      </section>

      <footer className="mx-auto flex max-w-7xl flex-col gap-3 border-t border-ink/15 px-5 py-8 text-xs text-ink/70 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
        <p className="font-serif text-base text-plum">Stay curious.</p>
        <p>Curious Club · A shared index of things worth learning</p>
      </footer>

      {toast && (
        <div role="status" className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 border border-gold bg-plum px-5 py-3 text-sm text-card shadow-xl">
          <Check size={15} className="text-gold" aria-hidden="true" /> {toast}
        </div>
      )}
    </main>
  )
}
