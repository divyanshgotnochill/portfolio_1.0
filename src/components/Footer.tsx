function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="pt-16 pb-8 sm:pt-24 sm:pb-10">
      <p className="mx-auto max-w-135 text-center font-editorial text-[clamp(2rem,7vw,3.25rem)] font-bold leading-[1.1] tracking-[-0.045em] text-ink">
        “I&apos;m always <span>leveling up</span>.”
      </p>

      <div aria-hidden="true" className="mt-12 border-t border-rule sm:mt-16" />

      <p className="mt-5 text-center text-xs text-muted">
        © {currentYear} Divyansh Sahu. All rights reserved.
      </p>
    </footer>
  )
}

export default Footer
