import Link from 'next/link'
import { NavLink } from './NavLink'
import { StatusIndicator } from './StatusIndicator'

const MODULE_LINKS = [
  { href: '/modules/wires', label: 'Fils' },
  { href: '/modules/button', label: 'Bouton' },
  { href: '/modules/complicated-wires', label: 'Fils complexes' },
] as const

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        <HeaderLogo />
        <ModuleNav />
        <div className="flex items-center gap-3 shrink-0">
          <StatusIndicator />
        </div>
      </div>
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

function ModuleNav() {
  return (
    <nav className="flex items-center gap-1.5 flex-1 justify-center">
      {MODULE_LINKS.map((link) => (
        <NavLink key={link.href} href={link.href} label={link.label} />
      ))}
    </nav>
  )
}
