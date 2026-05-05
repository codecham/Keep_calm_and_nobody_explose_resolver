'use client'

import { useState } from 'react'
import { useBombContext } from '@/app/context/BombContext'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  ComplexWire,
  ComplexWireColor,
  WireDecision,
  solveComplexWire,
} from '@/lib/modules/complicated-wires'

// ─── Constantes ───────────────────────────────────────────────────────────────

const WIRE_COLORS: { value: ComplexWireColor; label: string; bgClass: string }[] = [
  { value: 'white',    label: 'Blanc',         bgClass: 'bg-zinc-100' },
  { value: 'red',      label: 'Rouge',         bgClass: 'bg-red-600' },
  { value: 'blue',     label: 'Bleu',          bgClass: 'bg-blue-500' },
  { value: 'red-blue', label: 'Rouge + Bleu',  bgClass: 'bg-gradient-to-r from-red-600 to-blue-500' },
]

const EMPTY_WIRE: ComplexWire = { color: 'white', hasLed: false, hasStar: false }

// ─── Sous-composants ─────────────────────────────────────────────────────────

interface WireCountControlProps {
  count: number
  onChange: (count: number) => void
}

function WireCountControl({ count, onChange }: WireCountControlProps) {
  return (
    <div className="flex flex-col gap-2">
      <span className="font-mono text-xs tracking-widest uppercase text-muted-foreground">
        Nombre de fils
      </span>
      <div className="flex gap-2">
        {[2, 3, 4, 5, 6].map((n) => (
          <button
            key={n}
            onClick={() => onChange(n)}
            className={cn(
              'w-10 h-10 font-mono text-sm border transition-colors duration-150',
              count === n
                ? 'border-primary text-primary bg-primary/10'
                : 'border-border text-muted-foreground hover:text-foreground hover:border-foreground/40',
            )}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  )
}

interface ColorSelectorProps {
  selected: ComplexWireColor
  onSelect: (color: ComplexWireColor) => void
}

function ColorSelector({ selected, onSelect }: ColorSelectorProps) {
  return (
    <div className="flex gap-2">
      {WIRE_COLORS.map(({ value, label, bgClass }) => (
        <button
          key={value}
          title={label}
          onClick={() => onSelect(value)}
          className={cn(
            'w-7 h-7 rounded-full border-2 transition-all duration-150',
            bgClass,
            selected === value
              ? 'border-white scale-125 shadow-lg'
              : 'border-transparent opacity-60 hover:opacity-100 hover:scale-110',
          )}
        />
      ))}
    </div>
  )
}

interface TogglePillProps {
  label: string
  active: boolean
  onToggle: () => void
}

function TogglePill({ label, active, onToggle }: TogglePillProps) {
  return (
    <button
      onClick={onToggle}
      className={cn(
        'px-3 py-1 font-mono text-xs border transition-colors duration-150',
        active
          ? 'border-primary text-primary bg-primary/10'
          : 'border-border text-muted-foreground hover:border-foreground/40',
      )}
    >
      {label}
    </button>
  )
}

interface WireRowProps {
  index: number
  wire: ComplexWire
  decision: WireDecision | null
  onChange: (wire: ComplexWire) => void
}

function WireRow({ index, wire, decision, onChange }: WireRowProps) {
  return (
    <div className={cn(
      'flex items-center gap-4 p-3 border transition-colors duration-150',
      decision === 'couper'      ? 'border-primary/40 bg-primary/5'    :
      decision === 'ne-pas-couper' ? 'border-red-500/30 bg-red-500/5' :
      'border-border',
    )}>
      <span className="font-mono text-xs text-muted-foreground w-5 shrink-0">#{index + 1}</span>

      <ColorSelector
        selected={wire.color}
        onSelect={(color) => onChange({ ...wire, color })}
      />

      <div className="flex gap-2 ml-auto">
        <TogglePill
          label="LED"
          active={wire.hasLed}
          onToggle={() => onChange({ ...wire, hasLed: !wire.hasLed })}
        />
        <TogglePill
          label="★"
          active={wire.hasStar}
          onToggle={() => onChange({ ...wire, hasStar: !wire.hasStar })}
        />
      </div>

      <WireDecisionBadge decision={decision} />
    </div>
  )
}

interface WireDecisionBadgeProps {
  decision: WireDecision | null
}

function WireDecisionBadge({ decision }: WireDecisionBadgeProps) {
  if (!decision) {
    return <span className="font-mono text-xs text-muted-foreground w-24 text-right shrink-0">—</span>
  }

  return (
    <span className={cn(
      'font-mono text-xs w-24 text-right shrink-0',
      decision === 'couper' ? 'text-primary' : 'text-red-400',
    )}>
      {decision === 'couper' ? '✓ Couper' : '✗ Garder'}
    </span>
  )
}

interface BombWarningProps {
  message: string
}

function BombWarning({ message }: BombWarningProps) {
  return (
    <div className="border border-ktane-amber/40 bg-ktane-amber/5 p-4 flex items-center gap-3">
      <span className="text-ktane-amber text-lg">⚠</span>
      <p className="font-mono text-xs text-muted-foreground">{message}</p>
    </div>
  )
}

// ─── Composant principal ──────────────────────────────────────────────────────

export function ComplicatedWiresSolver() {
  const { bombInfo } = useBombContext()
  const [wireCount, setWireCount] = useState(2)
  const [wires, setWires] = useState<ComplexWire[]>(Array(2).fill(EMPTY_WIRE).map(() => ({ ...EMPTY_WIRE })))

  const isBombConfigured = bombInfo.serialNumber.length > 0

  function handleWireCountChange(count: number) {
    setWireCount(count)
    setWires(Array(count).fill(null).map(() => ({ ...EMPTY_WIRE })))
  }

  function handleWireChange(index: number, wire: ComplexWire) {
    setWires((prev) => {
      const updated = [...prev]
      updated[index] = wire
      return updated
    })
  }

  function handleReset() {
    setWires(Array(wireCount).fill(null).map(() => ({ ...EMPTY_WIRE })))
  }

  return (
    <div className="flex flex-col gap-6">
      <WireCountControl count={wireCount} onChange={handleWireCountChange} />

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs tracking-widest uppercase text-muted-foreground">
            Configuration des fils
          </span>
          <span className="font-mono text-xs text-muted-foreground">
            LED · ★
          </span>
        </div>

        {wires.map((wire, index) => (
          <WireRow
            key={index}
            index={index}
            wire={wire}
            decision={isBombConfigured ? solveComplexWire(wire, bombInfo) : null}
            onChange={(w) => handleWireChange(index, w)}
          />
        ))}
      </div>

      {!isBombConfigured && (
        <BombWarning message="Configurez la bombe (numéro de série, piles, ports) pour obtenir les décisions." />
      )}

      <Button
        variant="outline"
        onClick={handleReset}
        className="font-mono text-xs tracking-widest uppercase"
      >
        Réinitialiser
      </Button>
    </div>
  )
}