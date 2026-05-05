import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export type ModuleStatus = 'disponible' | 'en-developpement'

export interface ModuleCardProps {
  title: string
  description: string
  href: string
  icon: string
  status: ModuleStatus
}

export function ModuleCard({ title, description, href, icon, status }: ModuleCardProps) {
  const isAvailable = status === 'disponible'

  return (
    <ModuleCardWrapper href={href} isAvailable={isAvailable}>
      <ModuleCardHeader icon={icon} status={status} />
      <ModuleCardBody title={title} description={description} />
    </ModuleCardWrapper>
  )
}

interface ModuleCardWrapperProps {
  href: string
  isAvailable: boolean
  children: React.ReactNode
}

function ModuleCardWrapper({ href, isAvailable, children }: ModuleCardWrapperProps) {
  const className = cn(
    'flex flex-col gap-4 p-5 border transition-colors duration-150',
    'bg-card text-card-foreground',
    isAvailable
      ? 'border-border hover:border-primary/50 cursor-pointer'
      : 'border-border opacity-50 cursor-not-allowed pointer-events-none',
  )

  if (!isAvailable) {
    return <div className={className}>{children}</div>
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  )
}

interface ModuleCardHeaderProps {
  icon: string
  status: ModuleStatus
}

function ModuleCardHeader({ icon, status }: ModuleCardHeaderProps) {
  return (
    <div className="flex items-start justify-between">
      <span className="text-2xl">{icon}</span>
      <ModuleStatusBadge status={status} />
    </div>
  )
}

interface ModuleCardBodyProps {
  title: string
  description: string
}

function ModuleCardBody({ title, description }: ModuleCardBodyProps) {
  return (
    <div className="flex flex-col gap-1">
      <h2 className="font-mono text-sm font-semibold tracking-wide uppercase text-foreground">
        {title}
      </h2>
      <p className="font-mono text-xs text-muted-foreground leading-relaxed">{description}</p>
    </div>
  )
}

interface ModuleStatusBadgeProps {
  status: ModuleStatus
}

function ModuleStatusBadge({ status }: ModuleStatusBadgeProps) {
  const isAvailable = status === 'disponible'

  return (
    <Badge
      variant="outline"
      className={cn(
        'font-mono text-[10px] tracking-widest uppercase rounded-none',
        isAvailable
          ? 'border-primary text-primary'
          : 'border-muted-foreground text-muted-foreground',
      )}
    >
      {isAvailable ? 'Disponible' : 'En dev'}
    </Badge>
  )
}
