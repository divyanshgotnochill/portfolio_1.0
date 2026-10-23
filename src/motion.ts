import { animate, type Variants } from 'motion/react'

export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 45 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
}

export async function runPageBlurTransition(
  page: HTMLElement,
  updatePage?: () => void,
) {
  await animate(
    page,
    { filter: ['blur(0px)', 'blur(3.5px)'] },
    { duration: 0.12, ease: 'easeOut' },
  )
  updatePage?.()
  await animate(
    page,
    { filter: ['blur(3.5px)', 'blur(0px)'] },
    { duration: 0.3, ease: 'easeInOut' },
  )
  page.style.removeProperty('filter')
}

export async function runPageFadeIn(page: HTMLElement) {
  await animate(page, { opacity: [0, 1] }, { duration: 0.8, ease: 'easeOut' })
  page.style.removeProperty('opacity')
}
