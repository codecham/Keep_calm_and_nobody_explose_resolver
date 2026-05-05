import { Header } from '@/components/layout/Header'
import { ModuleCard, ModuleCardProps } from '@/components/layout/ModuleCard'

const MODULES: ModuleCardProps[] = [
  {
    title: 'Fils simples',
    description: '3 à 6 fils colorés. Suivez les règles selon les couleurs et le numéro de série.',
    href: '/modules/wires',
    icon: '🔌',
    status: 'disponible',
  },
  {
    title: 'Bouton',
    description: 'Un bouton coloré avec un label. Les règles varient selon la couleur, le texte et les DEL.',
    href: '/modules/button',
    icon: '🔴',
    status: 'disponible',
  },
  {
    title: 'Fils complexes',
    description: 'Fils avec combinaisons de propriétés : couleur, LED et étoile. Table de décision.',
    href: '/modules/complicated-wires',
    icon: '⚡',
    status: 'disponible',
  },
  {
    title: 'Simon Says',
    description: 'Séquence de couleurs clignotantes. Table de correspondance selon voyelle et strikes.',
    href: '/modules/simon',
    icon: '🎮',
    status: 'disponible',
  },
  {
    title: 'Mémoire',
    description: '5 étapes. Appuyez sur le bon bouton selon l\'affichage et l\'historique des étapes précédentes.',
    href: '/modules/memory',
    icon: '🧠',
    status: 'disponible',
  },
]

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-10">
        <DashboardHeader />
        <ModulesGrid />
      </main>
    </div>
  )
}

function DashboardHeader() {
  return (
    <div className="flex flex-col gap-2 mb-8 pb-6 border-b border-border">
      <h1 className="font-mono text-xl tracking-[0.2em] uppercase text-foreground">
        Manuel de désamorçage
      </h1>
      <p className="font-mono text-xs text-muted-foreground tracking-wider">
        Sélectionnez un module pour commencer la procédure de désamorçage.
      </p>
    </div>
  )
}

function ModulesGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {MODULES.map((module) => (
        <ModuleCard key={module.href} {...module} />
      ))}
    </div>
  )
}