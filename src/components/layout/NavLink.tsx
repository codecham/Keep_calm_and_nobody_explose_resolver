'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

interface NavLinkProps {
  href: string
  label: string
}

export function NavLink({ href, label }: NavLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === href || pathname.startsWith(href + '/')

  return (
    <Link
      href={href}
      className={cn(
        'font-mono text-xs tracking-widest uppercase px-3 py-1.5 border transition-colors duration-150',
        isActive
          ? 'border-primary text-primary bg-primary/10'
          : 'border-border text-muted-foreground hover:border-border hover:text-foreground',
      )}
    >
      {label}
    </Link>
  )
}
