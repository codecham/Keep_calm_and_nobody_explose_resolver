'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { StatusIndicator } from './StatusIndicator'
import { MenuIcon, XIcon } from 'lucide-react'

const MODULE_LINKS = [
  { href: '/modules/wires', label: 'Fils' },
  { href: '/modules/button', label: 'Bouton' },
  { href: '/modules/complicated-wires', label: 'Fils complexes' },
] as const

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        <HeaderLogo />

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-1.5 flex-1 justify-center">
          {MODULE_LINKS.map((link) => (
            <DesktopNavLink key={link.href} href={link.href} label={link.label} />
          ))}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <StatusIndicator />
          <MobileMenuButton open={mobileMenuOpen} onToggle={() => setMobileMenuOpen((v) => !v)} />
        </div>
      </div>

      {/* Mobile nav dropdown */}
      {mobileMenuOpen && (
        <MobileNav links={MODULE_LINKS} onClose={() => setMobileMenuOpen(false)} />
      )}
    </header>
  )
}

function HeaderLogo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
      <div className="w-7 h-7 border border-primary flex items-center justify-center text-primary text-xs font-mono font-bold group-hover:bg-primary/10 transition-colors duration-150">
        KT
      </div>
      <span className="font-mono text-sm tracking-[0.15em] uppercase text-foreground">
        KTANE Solver
      </span>
    </Link>
  )
}

interface DesktopNavLinkProps {
  href: string
  label: string
}

function DesktopNavLink({ href, label }: DesktopNavLinkProps) {
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

interface MobileMenuButtonProps {
  open: boolean
  onToggle: () => void
}

function MobileMenuButton({ open, onToggle }: MobileMenuButtonProps) {
  return (
    <button
      onClick={onToggle}
      className="sm:hidden flex items-center justify-center w-9 h-9 border border-border text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors"
      aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
    >
      {open ? <XIcon className="size-4" /> : <MenuIcon className="size-4" />}
    </button>
  )
}

interface MobileNavProps {
  links: readonly { href: string; label: string }[]
  onClose: () => void
}

function MobileNav({ links, onClose }: MobileNavProps) {
  const pathname = usePathname()

  return (
    <nav className="sm:hidden border-t border-border bg-card">
      {links.map(({ href, label }) => {
        const isActive = pathname === href || pathname.startsWith(href + '/')
        return (
          <Link
            key={href}
            href={href}
            onClick={onClose}
            className={cn(
              'flex items-center px-4 py-3.5 font-mono text-xs tracking-widest uppercase border-b border-border transition-colors',
              isActive
                ? 'text-primary bg-primary/10'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/30',
            )}
          >
            {label}
          </Link>
        )
      })}
    </nav>
  )
}