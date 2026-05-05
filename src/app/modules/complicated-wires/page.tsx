import { Header } from '@/components/layout/Header'
import { ComplicatedWiresSolver } from '@/components/modules/complicated-wires/ComplicatedWiresSolver'

export default function ComplicatedWiresPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 sm:px-6 py-10">
        <PageHeader />
        <ComplicatedWiresSolver />
      </main>
    </div>
  )
}

function PageHeader() {
  return (
    <div className="flex flex-col gap-2 mb-8 pb-6 border-b border-border">
      <h1 className="font-mono text-xl tracking-[0.2em] uppercase text-foreground">
        Fils complexes
      </h1>
      <p className="font-mono text-xs text-muted-foreground tracking-wider">
        Pour chaque fil, sélectionnez la couleur et activez les indicateurs présents (LED et/ou étoile).
        La décision s'affiche immédiatement à droite.
      </p>
    </div>
  )
}