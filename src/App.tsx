import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { useReducedMotion } from 'motion/react'
import Hero from './components/Hero'
import About from './components/About'
import Technologies from './components/Technologies'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Navigation from './components/Navigation'
import CustomCursorFollower from './components/CustomCursorFollower'
import Work from './components/Work'
import { runPageFadeIn } from './motion'

function normalizePath(pathname: string) {
  return pathname.replace(/\/+$/, '') || '/'
}

function scrollToHash(hash: string) {
  if (!hash) return

  try {
    document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView()
  } catch {
    // Ignore malformed hashes rather than interrupting route navigation.
  }
}

function App() {
  const [pagePath, setPagePath] = useState(() => normalizePath(window.location.pathname))
  const previousPath = useRef(pagePath)
  const navigationType = useRef<'push' | 'pop' | null>(null)
  const prefersReducedMotion = useReducedMotion()
  const shouldReduceMotion =
    prefersReducedMotion ?? window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    function handlePopState() {
      navigationType.current = 'pop'
      setPagePath(normalizePath(window.location.pathname))
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    if (previousPath.current === pagePath) return
    previousPath.current = pagePath
    const currentNavigation = navigationType.current
    navigationType.current = null

    const scrollToPageTarget = () => {
      if (window.location.hash) {
        scrollToHash(window.location.hash)
      } else if (currentNavigation === 'push') {
        window.scrollTo(0, 0)
      }
    }

    if (shouldReduceMotion) {
      requestAnimationFrame(scrollToPageTarget)
      return
    }

    const page = document.getElementById('root')
    if (page) {
      requestAnimationFrame(scrollToPageTarget)
      void runPageFadeIn(page)
    }
  }, [pagePath, shouldReduceMotion])

  function handleNavigation(event: MouseEvent<HTMLDivElement>) {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) return

    const target = event.target
    if (!(target instanceof Element)) return
    const link = target.closest<HTMLAnchorElement>('a[href]')
    if (!link || link.target || link.hasAttribute('download')) return

    const destination = new URL(link.href, window.location.href)
    if (destination.origin !== window.location.origin) return

    const nextPath = normalizePath(destination.pathname)
    const currentPath = normalizePath(window.location.pathname)

    if (nextPath === currentPath) {
      if (
        destination.pathname !== window.location.pathname ||
        destination.search !== window.location.search
      ) {
        event.preventDefault()
        window.history.pushState(
          null,
          '',
          `${destination.pathname}${destination.search}${destination.hash}`,
        )
        if (destination.hash !== window.location.hash) {
          requestAnimationFrame(() => scrollToHash(destination.hash))
        }
      }
      return
    }

    event.preventDefault()
    navigationType.current = 'push'
    window.history.pushState(null, '', `${destination.pathname}${destination.search}${destination.hash}`)
    setPagePath(nextPath)
  }

  const isWorkPage = pagePath === '/work'

  return (
    <div
      className="mx-auto min-h-screen w-[calc(100%-40px)] max-w-portfolio bg-paper sm:w-[calc(100%-48px)]"
      onClick={handleNavigation}
    >
      <Navigation />
      <div aria-hidden="true" className="h-17 sm:h-19" />
      <main id="top" className="min-h-[calc(100vh-68px)] sm:min-h-[calc(100vh-76px)]">
        {isWorkPage ? (
          <Work />
        ) : (
          <>
            <Hero />
            <Technologies />
            <About />
            <Contact />
          </>
        )}
      </main>
      <Footer />
      <CustomCursorFollower />
    </div>
  )
}

export default App
