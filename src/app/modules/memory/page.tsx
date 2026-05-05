import { Header } from '@/components/layout/Header'
import { MemorySolver } from '@/components/modules/memory/MemorySolver'
import Link from 'next/link'

export default function MemoryPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="animate-fade-in flex-1 max-w-2xl mx-auto w-full px-4 sm:px-6 py-10">
        <PageHeader />
        <MemorySolver />
      </main>
    </div>
  )
}

function PageHeader() {
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
        <span className="text-2xl">🧠</span>
        <h1 className="font-mono text-lg tracking-[0.2em] uppercase text-foreground">
          Mémoire
        </h1>
      </div>
      <p className="font-mono text-xs text-muted-foreground tracking-wider">
        Suivez les étapes dans l&apos;ordre. Indiquez l&apos;affichage, appliquez l&apos;instruction, puis confirmez le bouton pressé.
      </p>
    </div>
  )
}