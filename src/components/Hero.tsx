import { MdArrowOutward } from "react-icons/md";
import { motion, useReducedMotion } from 'motion/react'
import { fadeUpVariants, staggerVariants } from '../motion'

function Hero() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.section
      aria-labelledby="hero-title"
      className="py-20 sm:py-24"
      id="hero"
      initial={prefersReducedMotion ? false : 'hidden'}
      animate="visible"
      variants={staggerVariants}
    >
      <motion.div variants={fadeUpVariants}>
        <div className="flex items-center gap-4 sm:gap-7">
          <img
            alt="Profile photo placeholder; replace with Divyansh Sahu’s photo"
            className="size-22 shrink-0 rounded-md border border-rule object-cover sm:size-32"
            height="128"
            src="/images/pfp.jpg"
            width="128"
          />
          <div className="min-w-0">
            <h1
              className="font-editorial text-[clamp(1.5rem,5vw,2.5rem)] leading-tight tracking-[-0.045em] text-ink"
              id="hero-title"
            >
              Divyansh Sahu
            </h1>
            <p className="mt-1 text-[13px] font-medium text-ink sm:text-sm">
              Full-Stack Developer
            </p>
            <p className="mt-1 text-[11px] leading-5 text-muted sm:text-[13px]">
              India <span aria-hidden="true">·</span> Open to freelance projects
            </p>
          </div>
        </div>
      </motion.div>

      <motion.p className="mt-7 max-w-140 text-[14px] leading-7 text-secondary sm:text-base" variants={fadeUpVariants}>
        I build stuff.
      </motion.p>

      <motion.div className="mt-5 flex flex-wrap items-center gap-x-7 gap-y-4 text-[13px] font-medium" variants={fadeUpVariants}>
        <motion.a
          className="arrow-hover inline-flex min-h-11 items-center underline decoration-underline underline-offset-[5px] transition-colors hover:decoration-ink focus-visible:outline-2 focus-visible:outline-offset-4 sm:min-h-0 motion-reduce:transition-none"
          href="#work"
          whileHover={prefersReducedMotion ? undefined : { y: -1 }}
          whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
        >
          View my work <MdArrowOutward className="arrow-hover-icon inline-block size-3 align-[-2px]" direction="up-right" />
        </motion.a>
        <motion.a
          className="inline-flex min-h-11 items-center text-muted transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 sm:min-h-0 motion-reduce:transition-none"
          href="#contact"
          whileHover={prefersReducedMotion ? undefined : { y: -1 }}
          whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
        >
          Get in touch
        </motion.a>
      </motion.div>
    </motion.section>
  )
}

export default Hero
