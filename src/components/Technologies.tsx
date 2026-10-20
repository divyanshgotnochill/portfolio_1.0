import { motion, useReducedMotion } from 'motion/react'
import { useRef } from 'react'
import { technologies } from '../data/technologies'
import { revealVariants } from '../motion'

function Technologies() {
  const constraintsRef = useRef<HTMLUListElement>(null)
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.section
      aria-labelledby="technologies-title"
      className="border-t border-rule py-12 sm:py-14"
      id="technologies"
      initial={prefersReducedMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
      variants={revealVariants}
    >
      <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.16em] text-muted">
        The toolkit
      </p>
      <h2
        className="font-editorial text-3xl tracking-[-0.04em] text-ink sm:text-4xl"
        id="technologies-title"
      >
        Technologies
      </h2>

      <motion.ul
        className="mt-6 grid grid-cols-2 gap-x-3 gap-y-3 sm:grid-cols-3 sm:gap-4"
        ref={constraintsRef}
      >
        {technologies.map((technology) => (
          <motion.li
            className="flex min-w-0 cursor-grab select-none items-center gap-2.5 rounded-md border border-rule bg-surface px-3 py-2.5 text-secondary active:cursor-grabbing"
            drag={!prefersReducedMotion}
            dragConstraints={constraintsRef}
            dragElastic={0.16}
            dragMomentum={false}
            dragSnapToOrigin
            dragTransition={{ bounceStiffness: 380, bounceDamping: 14 }}
            key={technology.name}
            whileHover={prefersReducedMotion ? undefined : { y: -1 }}
            whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
            whileDrag={{ scale: 1.025, rotate: 0.5 }}
          >
            <img
              alt=""
              aria-hidden="true"
              className="size-4 shrink-0 object-contain"
              height="16"
              loading="lazy"
              src={technology.logo}
              width="16"
            />
            <span className="truncate text-[12px] sm:text-[13px]">
              {technology.name}
            </span>
          </motion.li>
        ))}
      </motion.ul>
    </motion.section>
  )
}

export default Technologies
