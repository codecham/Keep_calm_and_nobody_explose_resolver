import { Header } from '@/components/layout/Header'
import { WiresSolver } from '@/components/modules/wires/WiresSolver'
import Link from 'next/link'

export default function WiresPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 sm:px-6 py-10">
        <ModulePageHeader />
        <WiresSolver />
      </main>
    </div>
  )
}

function ModulePageHeader() {
  return (
    <div className="flex flex-col gap-2 mb-8 pb-6 border-b border-border">
      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="font-mono text-xs text-muted-foreground hover:text-foreground tracking-widest uppercase transition-colors"
        >
          ← Retour
        </Link>
      </div>
      <div className="flex items-center gap-3 mt-2">
        <span className="text-2xl">🔌</span>
        <h1 className="font-mono text-lg tracking-[0.2em] uppercase text-foreground">
          Fils simples
        </h1>
      </div>
      <p className="font-mono text-xs text-muted-foreground tracking-wider">
        Sélectionnez le nombre de fils puis leur couleur dans l'ordre (de haut en bas).
      </p>
    </div>
  )
}