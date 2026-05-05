'use client'

import { useState } from 'react'
import { WireColor } from '@/types/modules'
import { solveWires, WiresConditions } from '@/lib/modules/wires'
import { BombConditions } from '@/components/modules/shared/BombConditions'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

// ─── Constantes ───────────────────────────────────────────────────────────────

const WIRE_COLORS: { value: WireColor; label: string; bgClass: string; borderClass: string }[] = [
  { value: 'red',    label: 'Rouge', bgClass: 'bg-red-600',   borderClass: 'border-red-500' },
  { value: 'blue',   label: 'Bleu',  bgClass: 'bg-blue-500',  borderClass: 'border-blue-400' },
  { value: 'yellow', label: 'Jaune', bgClass: 'bg-yellow-400', borderClass: 'border-yellow-300' },
  { value: 'white',  label: 'Blanc', bgClass: 'bg-zinc-100',  borderClass: 'border-zinc-300' },
  { value: 'black',  label: 'Noir',  bgClass: 'bg-zinc-900',  borderClass: 'border-zinc-600' },
]

const DEFAULT_CONDITIONS: WiresConditions = { serialLastDigitOdd: false }

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
        {[3, 4, 5, 6].map((n) => (
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

interface WireColorPickerProps {
  index: number
  selectedColor: WireColor | null
  onSelect: (color: WireColor) => void
}

function WireColorPicker({ index, selectedColor, onSelect }: WireColorPickerProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-mono text-xs text-muted-foreground w-8 text-right shrink-0">
        #{index + 1}
      </span>
      <div className="flex gap-2">
        {WIRE_COLORS.map(({ value, label, bgClass, borderClass }) => (
          <button
            key={value}
            title={label}
            onClick={() => onSelect(value)}
            className={cn(
              'w-7 h-7 rounded-full border-2 transition-all duration-150',
              bgClass,
              selectedColor === value
                ? cn(borderClass, 'scale-125 shadow-lg')
                : 'border-transparent opacity-60 hover:opacity-100 hover:scale-110',
            )}
          />
        ))}
      </div>
      {selectedColor && (
        <span className="font-mono text-xs text-foreground/60">
          {WIRE_COLORS.find((c) => c.value === selectedColor)?.label}
        </span>
      )}
    </div>
  )
}

interface WireResultProps {
  instruction: string
}

function WireResult({ instruction }: WireResultProps) {
  return (
    <div className="border border-primary/40 bg-primary/5 p-4 flex items-center gap-3">
      <span className="text-primary text-lg">✓</span>
      <p className="font-mono text-sm text-foreground tracking-wide">{instruction}</p>
    </div>
  )
}

// ─── Composant principal ──────────────────────────────────────────────────────

export function WiresSolver() {
  const [wireCount, setWireCount]       = useState(3)
  const [selectedColors, setSelectedColors] = useState<(WireColor | null)[]>(Array(3).fill(null))
  const [conditions, setConditions]     = useState<WiresConditions>(DEFAULT_CONDITIONS)

  function handleWireCountChange(count: number) {
    setWireCount(count)
    setSelectedColors(Array(count).fill(null))
  }

  function handleColorSelect(index: number, color: WireColor) {
    setSelectedColors((prev) => {
      const updated = [...prev]
      updated[index] = color
      return updated
    })
  }

  function handleReset() {
    setSelectedColors(Array(wireCount).fill(null))
    setConditions(DEFAULT_CONDITIONS)
  }

  const allSelected = selectedColors.every((c) => c !== null)
  const result = allSelected ? solveWires(selectedColors as WireColor[], conditions) : null

  return (
    <div className="flex flex-col gap-6">
      <BombConditions
        conditions={{ serialLastDigitOdd: conditions.serialLastDigitOdd }}
        visibleKeys={['serialLastDigitOdd']}
        onChange={(c) => setConditions({ serialLastDigitOdd: !!c.serialLastDigitOdd })}
      />
      
      <WireCountControl count={wireCount} onChange={handleWireCountChange} />

      <div className="flex flex-col gap-3">
        <span className="font-mono text-xs tracking-widest uppercase text-muted-foreground">
          Couleurs des fils
        </span>
        {selectedColors.map((color, index) => (
          <WireColorPicker
            key={index}
            index={index}
            selectedColor={color}
            onSelect={(c) => handleColorSelect(index, c)}
          />
        ))}
      </div>


      {result && <WireResult instruction={result} />}

      <Button
        variant="outline"
        onClick={handleReset}
        className="w-full font-mono text-xs tracking-widest uppercase"
      >
        Réinitialiser
      </Button>
    </div>
  )
}