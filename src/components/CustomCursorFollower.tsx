import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

function CustomCursorFollower() {
  const prefersReducedMotion = useReducedMotion()
  const shouldReduceMotion =
    prefersReducedMotion ?? window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const pointerX = useMotionValue(-100)
  const pointerY = useMotionValue(-100)
  const x = useSpring(pointerX, { stiffness: 300, damping: 30, mass: 0.4 })
  const y = useSpring(pointerY, { stiffness: 300, damping: 30, mass: 0.4 })
  const [isVisible, setIsVisible] = useState(false)
  const [isIdle, setIsIdle] = useState(false)
  const visibleRef = useRef(false)
  const idleRef = useRef(false)
  const idleTimer = useRef<number | null>(null)

  useEffect(() => {
    const supportsMouse = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (shouldReduceMotion || !supportsMouse) {
      visibleRef.current = false
      idleRef.current = false
      setIsVisible(false)
      setIsIdle(false)
      return
    }

    const clearIdleTimer = () => {
      if (idleTimer.current !== null) {
        window.clearTimeout(idleTimer.current)
        idleTimer.current = null
      }
    }

    const hideFollower = () => {
      clearIdleTimer()
      visibleRef.current = false
      idleRef.current = false
      setIsVisible(false)
      setIsIdle(false)
    }

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return

      pointerX.set(event.clientX)
      pointerY.set(event.clientY)

      if (!visibleRef.current) {
        visibleRef.current = true
        setIsVisible(true)
      }
      if (idleRef.current) {
        idleRef.current = false
        setIsIdle(false)
      }

      clearIdleTimer()
      idleTimer.current = window.setTimeout(() => {
        idleRef.current = true
        setIsIdle(true)
      }, 300)
    }

    const handlePointerOut = (event: PointerEvent) => {
      if (event.relatedTarget === null) hideFollower()
    }

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerout', handlePointerOut)
    window.addEventListener('blur', hideFollower)

    return () => {
      clearIdleTimer()
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerout', handlePointerOut)
      window.removeEventListener('blur', hideFollower)
    }
  }, [pointerX, pointerY, shouldReduceMotion])

  return (
    <motion.div
      animate={{ width: isIdle ? 56 : 24, height: isIdle ? 56 : 24, opacity: isVisible ? 1 : 0 }}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-50 box-border rounded-full border border-muted/60"
      initial={false}
      style={{ x, y, translateX: '-50%', translateY: '-50%' }}
      transition={{
        width: { type: 'spring', stiffness: 190, damping: 26, mass: 0.5 },
        height: { type: 'spring', stiffness: 190, damping: 26, mass: 0.5 },
        opacity: { duration: 0.12 },
      }}
    />
  )
}

export default CustomCursorFollower
