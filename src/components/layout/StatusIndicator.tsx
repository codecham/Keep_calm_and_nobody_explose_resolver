export function StatusIndicator() {
  return (
    <div className="hidden sm:flex items-center gap-2 shrink-0">
      <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_6px_currentColor] text-primary" />
      <span className="font-mono text-xs text-muted-foreground tracking-widest uppercase">
        En ligne
      </span>
    </div>
  )
}
