export type ContactLink = {
  label: string
  href: string
  placeholder: string
  external?: boolean
}

export const contactLinks: Record<'github' | 'x' | 'linkedin' | 'email', ContactLink> = {
  github: {
    label: 'GitHub',
    href: 'https://github.com/divyanshgotnochill',
    placeholder: 'divyanshgotnochill',
    external: true,
  },
  x: {
    label: 'X',
    href: 'https://x.com/divyanshophile',
    placeholder: 'divyanshophile',
    external: true,
  },
  linkedin: {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/divyanshsahu188',
    placeholder: 'divyanshsahu188',
    external: true,
  },
  email: {
    label: 'Email',
    href: 'mailto:divyanshgotnochill@gmail.com',
    placeholder: 'divyanshgotnochill@gmail.com',
  },
}
