import { contactLinks } from '../data/contact'
import { MdArrowOutward } from "react-icons/md";
import { motion, useReducedMotion } from 'motion/react'
import { revealVariants } from '../motion'

function Contact() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.section
      aria-labelledby="contact-title"
      className="border-t border-rule py-16 sm:py-20"
      id="contact"
      initial={prefersReducedMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
      variants={revealVariants}
    >
      <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.16em] text-muted">
        Contact
      </p>
      <h2
        className="font-editorial text-3xl tracking-[-0.04em] text-ink sm:text-4xl"
        id="contact-title"
      >
        Let&apos;s make something useful.
      </h2>

      <ul aria-label="Contact links" className="mt-7 flex flex-wrap gap-x-6 gap-y-3">
        {Object.values(contactLinks).map((link) => (
          <li key={link.label}>
            <motion.a
              aria-label={`${link.label} placeholder, update contact data before use`}
              className="arrow-hover inline-flex min-h-11 items-center text-[13px] font-medium text-ink underline decoration-underline underline-offset-4 hover:decoration-ink focus-visible:outline-2 focus-visible:outline-offset-4 sm:min-h-0 motion-reduce:transition-none"
              href={link.href}
              rel={link.external ? 'noreferrer' : undefined}
              target={link.external ? '_blank' : undefined}
              whileHover={prefersReducedMotion ? undefined : { y: -1 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
            >
              {link.label}
              <span className="ml-1 text-[10px] font-normal text-muted">({link.placeholder})</span>
              {link.external && (
                <MdArrowOutward
                  className="arrow-hover-icon ml-0.5 inline-block size-3 align-[-2px]"
                  direction="up-right"
                />
              )}
            </motion.a>
          </li>
        ))}
      </ul>
    </motion.section>
  )
}

export default Contact
