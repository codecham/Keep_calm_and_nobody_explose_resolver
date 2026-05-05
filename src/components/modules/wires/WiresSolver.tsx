'use client'

import { useState } from 'react'
import { WireColor } from '@/types/modules'
import { BombConditions } from '@/components/modules/shared/BombConditions'
import { solveWires, WiresConditions, requiresSerialCheck } from '@/lib/modules/wires'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

// ─── Constantes ───────────────────────────────────────────────────────────────

const WIRE_COLORS: { value: WireColor; label: string; bgClass: string; borderClass: string }[] = [
  { value: 'red',    label: 'Rouge', bgClass: 'bg-red-600',    borderClass: 'border-red-500' },
  { value: 'blue',   label: 'Bleu',  bgClass: 'bg-blue-500',   borderClass: 'border-blue-400' },
  { value: 'yellow', label: 'Jaune', bgClass: 'bg-yellow-400', borderClass: 'border-yellow-300' },
  { value: 'white',  label: 'Blanc', bgClass: 'bg-zinc-100',   borderClass: 'border-zinc-300' },
  { value: 'black',  label: 'Noir',  bgClass: 'bg-zinc-900',   borderClass: 'border-zinc-600' },
]

const DEFAULT_CONDITIONS: WiresConditions = { serialLastDigitOdd: false }

// ─── Sous-composants ─────────────────────────────────────────────────────────

interface WireCountControlProps {
  count: number
  onChange: (count: number) => void
}

function WireCountControl({ count, onChange }: WireCountControlProps) {
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-1">
        Nombre de fils
      </legend>
      <div role="group" aria-label="Nombre de fils" className="flex gap-2">
        {[3, 4, 5, 6].map((n) => (
          <button
            key={n}
            onClick={() => onChange(n)}
            aria-pressed={count === n}
            aria-label={`${n} fils`}
            className={cn(
              'w-11 h-11 sm:w-10 sm:h-10 font-mono text-sm border transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background',
              count === n
                ? 'border-primary text-primary bg-primary/10'
                : 'border-border text-muted-foreground hover:text-foreground hover:border-foreground/40',
            )}
          >
            {n}
          </button>
        ))}
      </div>
    </fieldset>
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
      <span className="font-mono text-xs text-muted-foreground w-8 text-right shrink-0" aria-hidden="true">
        #{index + 1}
      </span>
      <div role="group" aria-label={`Couleur du fil ${index + 1}`} className="flex gap-3 sm:gap-2">
        {WIRE_COLORS.map(({ value, label, bgClass, borderClass }) => (
          <button
            key={value}
            aria-label={label}
            aria-pressed={selectedColor === value}
            onClick={() => onSelect(value)}
            className={cn(
              'w-9 h-9 sm:w-7 sm:h-7 rounded-full border-2 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
              bgClass,
              selectedColor === value
                ? cn(borderClass, 'scale-125 shadow-lg')
                : 'border-transparent opacity-60 active:opacity-100 hover:opacity-100 hover:scale-110',
            )}
          />
        ))}
      </div>
      {selectedColor && (
        <span className="font-mono text-xs text-foreground/60" aria-live="polite">
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
    <div
      role="status"
      aria-live="polite"
      className="animate-result-in border border-primary/40 bg-primary/5 p-4 flex items-center gap-3"
    >
      <span className="text-primary text-lg shrink-0" aria-hidden="true">✓</span>
      <p className="font-mono text-sm text-foreground tracking-wide">{instruction}</p>
    </div>
  )
}

// ─── Composant principal ──────────────────────────────────────────────────────

export function WiresSolver() {
  const [wireCount, setWireCount]           = useState(3)
  const [selectedColors, setSelectedColors] = useState<(WireColor | null)[]>(Array(3).fill(null))
  const [conditions, setConditions]         = useState<WiresConditions>(DEFAULT_CONDITIONS)

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
  const filledColors = selectedColors as WireColor[]
  const needsSerial  = allSelected && requiresSerialCheck(filledColors)
  const result       = allSelected ? solveWires(filledColors, conditions) : null

  return (
    <div className="flex flex-col gap-6">

      <WireCountControl count={wireCount} onChange={handleWireCountChange} />

      <div className="flex flex-col gap-3">
        <span className="font-mono text-xs tracking-widest uppercase text-muted-foreground" id="wire-colors-label">
          Couleurs des fils
        </span>
        <div role="group" aria-labelledby="wire-colors-label" className="flex flex-col gap-3">
          {selectedColors.map((color, index) => (
            <WireColorPicker
              key={index}
              index={index}
              selectedColor={color}
              onSelect={(c) => handleColorSelect(index, c)}
            />
          ))}
        </div>
      </div>
      {needsSerial && (
        <SerialPrompt
          isOdd={conditions.serialLastDigitOdd}
          onToggle={() => setConditions((prev) => ({ serialLastDigitOdd: !prev.serialLastDigitOdd }))}
        />
      )}


      {result && <WireResult key={result} instruction={result} />}

      <Button
        variant="outline"
        onClick={handleReset}
        className="w-full font-mono text-xs tracking-widest uppercase h-11 sm:h-8"
      >
        Réinitialiser
      </Button>
    </div>
  )
}

interface SerialPromptProps {
  isOdd: boolean
  onToggle: () => void
}

function SerialPrompt({ isOdd, onToggle }: SerialPromptProps) {
  return (
    <div className="border border-yellow-500/40 bg-yellow-500/5 p-4 flex flex-col gap-3">
      <p className="font-mono text-xs text-yellow-400 tracking-wide">
        ⚠ Le dernier chiffre du numéro de série est-il impair ?
      </p>
      <button
        onClick={onToggle}
        className={cn(
          'flex items-center gap-2.5 px-3 py-2 border font-mono text-xs tracking-wide transition-colors duration-150 text-left w-fit',
          isOdd
            ? 'border-primary text-primary bg-primary/10'
            : 'border-border text-muted-foreground hover:text-foreground hover:border-foreground/30',
        )}
      >
        <span className={cn(
          'w-3.5 h-3.5 border flex items-center justify-center shrink-0',
          isOdd ? 'border-primary bg-primary/20' : 'border-muted-foreground/50',
        )}>
          {isOdd && <span className="text-primary text-[10px] leading-none">✓</span>}
        </span>
        Dernier chiffre impair
      </button>
    </div>
  )
}