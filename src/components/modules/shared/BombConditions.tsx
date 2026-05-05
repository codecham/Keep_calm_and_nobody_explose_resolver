'use client'

import { cn } from '@/lib/utils'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface BombConditions {
  serialLastDigitOdd?: boolean
  serialLastDigitEven?: boolean
  hasParallelPort?: boolean
  hasTwoOrMoreBatteries?: boolean
  hasMoreThanOneBattery?: boolean
  hasMoreThanTwoBatteries?: boolean
  hasFrkLit?: boolean
}

type ConditionKey = keyof BombConditions

interface ConditionConfig {
  key: ConditionKey
  label: string
}

const ALL_CONDITIONS: ConditionConfig[] = [
  { key: 'serialLastDigitOdd',      label: 'Dernier chiffre du n° de série impair' },
  { key: 'serialLastDigitEven',     label: 'Dernier chiffre du n° de série pair' },
  { key: 'hasParallelPort',         label: 'Port Parallel présent' },
  { key: 'hasTwoOrMoreBatteries',   label: '≥ 2 piles' },
  { key: 'hasMoreThanOneBattery',   label: '> 1 pile' },
  { key: 'hasMoreThanTwoBatteries', label: '> 2 piles' },
  { key: 'hasFrkLit',               label: 'Indicateur FRK allumé' },
]

// ─── Sous-composants ─────────────────────────────────────────────────────────

interface ConditionToggleProps {
  label: string
  active: boolean
  onToggle: () => void
}

function ConditionToggle({ label, active, onToggle }: ConditionToggleProps) {
  return (
    <button
      onClick={onToggle}
      className={cn(
        'flex items-center gap-2.5 px-3 py-2 border font-mono text-xs tracking-wide transition-colors duration-150 text-left',
        active
          ? 'border-primary text-primary bg-primary/10'
          : 'border-border text-muted-foreground hover:text-foreground hover:border-foreground/30',
      )}
    >
      <span
        className={cn(
          'w-3.5 h-3.5 border flex items-center justify-center shrink-0 transition-colors',
          active ? 'border-primary bg-primary/20' : 'border-muted-foreground/50',
        )}
      >
        {active && <span className="text-primary text-[10px] leading-none animate-fade-in">✓</span>}
      </span>
      {label}
    </button>
  )
}

// ─── Composant principal ──────────────────────────────────────────────────────

interface BombConditionsProps {
  conditions: BombConditions
  visibleKeys: ConditionKey[]
  onChange: (conditions: BombConditions) => void
}

export function BombConditions({ conditions, visibleKeys, onChange }: BombConditionsProps) {
  const visibleConditions = ALL_CONDITIONS.filter((c) => visibleKeys.includes(c.key))
 
  function handleToggle(key: ConditionKey) {
    onChange({ ...conditions, [key]: !conditions[key] })
  }
 
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-2">
        Conditions de la bombe
      </legend>
      <div className="flex flex-col gap-1.5" role="group">
        {visibleConditions.map(({ key, label }) => (
          <ConditionToggle
            key={key}
            label={label}
            active={!!conditions[key]}
            onToggle={() => handleToggle(key)}
          />
        ))}
      </div>
    </fieldset>
  )
}