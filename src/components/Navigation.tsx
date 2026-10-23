import ThemeToggle from './ThemeToggle'

const navigation = [
  { label: 'Home', href: '/'},
  { label: 'About', href: '/#about' },
  { label: 'Work', href: '/work' },
  { label: 'Contact', href: '/#contact' },
]

function Navigation() {
  return (
    <header className="fixed left-1/2 top-0 z-50 flex min-h-17 w-[calc(100%-40px)] max-w-portfolio -translate-x-1/2 items-center justify-between border-b border-rule bg-paper/85 px-2 backdrop-blur-md sm:min-h-19 sm:w-[calc(100%-48px)]">
      <a
        aria-label="Divyansh, home"
        className="text-[20px] font-semibold tracking-[-0.045em] no-underline focus-visible:outline-2 focus-visible:outline-offset-4"
        href="/"
      >
        divyansh<span className="text-muted">.</span>
      </a>
      <nav aria-label="Main navigation" className="flex items-center gap-2 sm:gap-[clamp(16px,4vw,30px)]">
        {navigation.map((item) => (
          <a
            className="inline-flex min-h-11 min-w-6 items-center justify-center text-[11px] text-muted no-underline transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 sm:min-h-0 sm:min-w-0 sm:text-xs motion-reduce:transition-none"
            href={item.href}
            key={item.href}
          >
            {item.label}
          </a>
        ))}
        <ThemeToggle />
      </nav>
    </header>
  )
}

export default Navigation
