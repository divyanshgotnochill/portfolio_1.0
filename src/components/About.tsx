import { motion, useReducedMotion } from 'motion/react'
import { revealVariants } from '../motion'

function About() {
  const prefersReducedMotion = useReducedMotion()
  const shouldReduceMotion =
    prefersReducedMotion ?? window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return (
    <motion.section
      aria-labelledby="about-title"
      className="border-t border-rule py-16 sm:py-20"
      id="about"
      initial={shouldReduceMotion ? false : 'hidden'}
      whileInView={shouldReduceMotion ? undefined : 'visible'}
      viewport={{ once: true, amount: 0.2 }}
      variants={revealVariants}
    >
      <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.16em] text-muted">
        A little about me
      </p>
      <h2
        className="font-editorial text-3xl tracking-[-0.04em] text-ink sm:text-4xl"
        id="about-title"
      >
        About
      </h2>
      <p className="mt-5 max-w-140 text-[14px] leading-7 text-secondary sm:text-base">
        I&apos;m Divyansh, a full-stack developer based in India, building practical products with clean interfaces and reliable backends. I enjoy turning ideas into useful, working software and am currently open to freelance projects.
      </p>
    </motion.section>
  )
}

export default About
