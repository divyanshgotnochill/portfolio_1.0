import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { FiMoon, FiSun } from 'react-icons/fi'
import { useRef, useState } from 'react'
import { runPageBlurTransition } from '../motion'

type Theme = 'light' | 'dark'

const themeStorageKey = 'divyansh-portfolio-theme'

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme
  document.documentElement.style.colorScheme = theme
  document
    .querySelector<HTMLMetaElement>('meta[name="theme-color"]')
    ?.setAttribute('content', theme === 'dark' ? '#11100f' : '#F7F5F0')

  try {
    window.localStorage.setItem(themeStorageKey, theme)
  } catch {
    // The theme still works for this visit when storage is unavailable.
  }
}

function ThemeToggle() {
  const prefersReducedMotion = useReducedMotion()
  const shouldReduceMotion =
    prefersReducedMotion ?? window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const [theme, setTheme] = useState<Theme>(() =>
    document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light',
  )
  const ThemeIcon = theme === 'dark' ? FiSun : FiMoon
  const isTransitioning = useRef(false)

  async function toggleTheme() {
    if (isTransitioning.current) return

    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    if (shouldReduceMotion) {
      applyTheme(nextTheme)
      setTheme(nextTheme)
      return
    }

    const page = document.getElementById('root')
    if (!page) {
      applyTheme(nextTheme)
      setTheme(nextTheme)
      return
    }

    isTransitioning.current = true
    try {
      await runPageBlurTransition(page, () => {
        applyTheme(nextTheme)
        setTheme(nextTheme)
      })
    } finally {
      page.style.removeProperty('filter')
      isTransitioning.current = false
    }
  }

  return (
    <button
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className="inline-flex size-11 shrink-0 items-center justify-center rounded-sm text-muted transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 motion-reduce:transition-none"
      onClick={toggleTheme}
      type="button"
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.span
          aria-hidden="true"
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          className="inline-flex size-4.5 items-center justify-center"
          exit={{ opacity: 0, rotate: 35, scale: 0.8 }}
          initial={shouldReduceMotion ? false : { opacity: 0, rotate: -35, scale: 0.8 }}
          key={theme}
          transition={{ duration: shouldReduceMotion ? 0 : 0.18, ease: 'easeOut' }}
        >
          <ThemeIcon aria-hidden="true" className="size-full" />
        </motion.span>
      </AnimatePresence>
    </button>
  )
}

export default ThemeToggle
