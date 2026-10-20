import Hero from './components/Hero'
import About from './components/About'
import Technologies from './components/Technologies'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ThemeToggle from './components/ThemeToggle'
import { motion, useReducedMotion } from 'motion/react'

const navigation = [
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

function App() {
  const prefersReducedMotion = useReducedMotion()
  const shouldReduceMotion =
    prefersReducedMotion ?? window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return (
    <div className="mx-auto min-h-screen w-[calc(100%-40px)] max-w-portfolio bg-paper sm:w-[calc(100%-48px)]">
      <header className="flex min-h-17 items-center justify-between border-b border-rule sm:min-h-19">
        <motion.a
          className="text-[15px] font-semibold tracking-[-0.045em] no-underline focus-visible:outline-2 focus-visible:outline-offset-4"
          href="#top"
          aria-label="Divyansh, home"
          whileHover={shouldReduceMotion ? undefined : { y: -1 }}
          whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
        >
          divyansh<span className="text-muted">.</span>
        </motion.a>
        <nav aria-label="Main navigation" className="flex items-center gap-4 sm:gap-[clamp(16px,4vw,30px)]">
          {navigation.map((item) => (
            <motion.a
              className="inline-flex min-h-11 items-center text-[11px] text-muted no-underline transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 sm:min-h-0 sm:text-xs motion-reduce:transition-none"
              key={item.href}
              href={item.href}
              whileHover={shouldReduceMotion ? undefined : { y: -1 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
            >
              {item.label}
            </motion.a>
          ))}
          <ThemeToggle />
        </nav>
      </header>
      <main id="top" className="min-h-[calc(100vh-68px)] sm:min-h-[calc(100vh-76px)]">
        <Hero />
        <Technologies />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
