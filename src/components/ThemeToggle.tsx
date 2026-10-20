import { AnimatePresence, motion, useAnimate, useReducedMotion } from 'motion/react'
import { useRef, useState } from 'react'

type Theme = 'light' | 'dark'

const themeStorageKey = 'divyansh-portfolio-theme'

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme
  document.documentElement.style.colorScheme = theme
  document
    .querySelector<HTMLMetaElement>('meta[name="theme-color"]')
    ?.setAttribute('content', theme === 'dark' ? '#191816' : '#F7F5F0')

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
  const isTransitioning = useRef(false)
  const [, animate] = useAnimate()

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
      await animate(
        page,
        { filter: ['blur(0px)', 'blur(3.5px)'] },
        { duration: 0.12, ease: 'easeOut' },
      )
      applyTheme(nextTheme)
      setTheme(nextTheme)
      await animate(
        page,
        { filter: ['blur(3.5px)', 'blur(0px)'] },
        { duration: 0.3, ease: 'easeInOut' },
      )
    } finally {
      page.style.removeProperty('filter')
      isTransitioning.current = false
    }
  }

  return (
    <>
      <motion.button
        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        className="inline-flex size-11 shrink-0 items-center justify-center rounded-sm text-muted transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 motion-reduce:transition-none"
        onClick={toggleTheme}
        type="button"
        whileHover={shouldReduceMotion ? undefined : { y: -1 }}
        whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
      >
        <AnimatePresence initial={false} mode="wait">
          <motion.svg
            aria-hidden="true"
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            className="size-[18px]"
            exit={{ opacity: 0, rotate: 35, scale: 0.8 }}
            fill="none"
            initial={shouldReduceMotion ? false : { opacity: 0, rotate: -35, scale: 0.8 }}
            key={theme}
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.6"
            transition={{ duration: shouldReduceMotion ? 0 : 0.18, ease: 'easeOut' }}
            viewBox="0 0 24 24"
          >
            {theme === 'dark' ? (
              <>
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
              </>
            ) : (
              <path d="M20.4 15.2A8.5 8.5 0 0 1 8.8 3.6 8.5 8.5 0 1 0 20.4 15.2Z" />
            )}
          </motion.svg>
        </AnimatePresence>
      </motion.button>

    </>
  )
}

export default ThemeToggle
