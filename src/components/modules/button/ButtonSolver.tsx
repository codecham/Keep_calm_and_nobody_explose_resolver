'use client'

import { useState } from 'react'
import { ButtonColor, ButtonLabel } from '@/types/modules'
import { solveButton, StripColor, ButtonResult, ButtonConditions } from '@/lib/modules/button'
import { BombConditions } from '@/components/modules/shared/BombConditions'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

// ─── Constantes ───────────────────────────────────────────────────────────────

const BUTTON_COLORS: { value: ButtonColor; label: string; bgClass: string; ringClass: string }[] = [
  { value: 'red',    label: 'Rouge', bgClass: 'bg-red-600 hover:bg-red-500',       ringClass: 'ring-red-500' },
  { value: 'blue',   label: 'Bleu',  bgClass: 'bg-blue-600 hover:bg-blue-500',     ringClass: 'ring-blue-400' },
  { value: 'yellow', label: 'Jaune', bgClass: 'bg-yellow-400 hover:bg-yellow-300', ringClass: 'ring-yellow-300' },
  { value: 'white',  label: 'Blanc', bgClass: 'bg-zinc-100 hover:bg-white',        ringClass: 'ring-zinc-300' },
]

const BUTTON_LABELS: { value: ButtonLabel; display: string }[] = [
  { value: 'abort',    display: 'ABORT' },
  { value: 'detonate', display: 'DETONATE' },
  { value: 'hold',     display: 'HOLD' },
  { value: 'press',    display: 'PRESS' },
]

const STRIP_COLORS: { value: StripColor; label: string; bgClass: string; borderClass: string }[] = [
  { value: 'blue',   label: 'Bleu',  bgClass: 'bg-blue-600',   borderClass: 'border-blue-400' },
  { value: 'white',  label: 'Blanc', bgClass: 'bg-zinc-100',   borderClass: 'border-zinc-300' },
  { value: 'yellow', label: 'Jaune', bgClass: 'bg-yellow-400', borderClass: 'border-yellow-300' },
  { value: 'other',  label: 'Autre', bgClass: 'bg-zinc-600',   borderClass: 'border-zinc-500' },
]

const DEFAULT_CONDITIONS: ButtonConditions = {
  hasMoreThanOneBattery:   false,
  hasMoreThanTwoBatteries: false,
  hasFrkLit:               false,
}

// ─── Sous-composants ─────────────────────────────────────────────────────────

interface ColorSelectorProps {
  selected: ButtonColor | null
  onSelect: (color: ButtonColor) => void
}

function ColorSelector({ selected, onSelect }: ColorSelectorProps) {
  return (
    <div className="flex flex-col gap-2">
      <span className="font-mono text-xs tracking-widest uppercase text-muted-foreground">
        Couleur du bouton
      </span>
      <div className="flex gap-4 sm:gap-3">
        {BUTTON_COLORS.map(({ value, label, bgClass, ringClass }) => (
          <button
            key={value}
            title={label}
            onClick={() => onSelect(value)}
            className={cn(
              'w-14 h-14 sm:w-12 sm:h-12 rounded-full transition-all duration-150 border-2',
              bgClass,
              selected === value
                ? cn('border-white ring-2 ring-offset-2 ring-offset-background scale-110', ringClass)
                : 'border-transparent opacity-60 hover:opacity-100',
            )}
          />
        ))}
      </div>
      {selected && (
        <span className="font-mono text-xs text-foreground/60">
          {BUTTON_COLORS.find((c) => c.value === selected)?.label}
        </span>
      )}
    </div>
  )
}

interface LabelSelectorProps {
  selected: ButtonLabel | null
  onSelect: (label: ButtonLabel) => void
}

function LabelSelector({ selected, onSelect }: LabelSelectorProps) {
  return (
    <div className="flex flex-col gap-2">
      <span className="font-mono text-xs tracking-widest uppercase text-muted-foreground">
        Texte du bouton
      </span>
      <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
        {BUTTON_LABELS.map(({ value, display }) => (
          <button
            key={value}
            onClick={() => onSelect(value)}
            className={cn(
              'px-4 h-11 sm:h-9 font-mono text-xs tracking-widest border transition-colors duration-150',
              selected === value
                ? 'border-primary text-primary bg-primary/10'
                : 'border-border text-muted-foreground hover:text-foreground hover:border-foreground/40',
            )}
          >
            {display}
          </button>
        ))}
      </div>
    </div>
  )
}

interface StripSelectorProps {
  selected: StripColor | null
  onSelect: (color: StripColor) => void
}

function StripSelector({ selected, onSelect }: StripSelectorProps) {
  return (
    <div className="flex flex-col gap-2">
      <span className="font-mono text-xs tracking-widest uppercase text-muted-foreground">
        Couleur de la bande LED
      </span>
      <div className="flex gap-4 sm:gap-3 items-center">
        {STRIP_COLORS.map(({ value, label, bgClass, borderClass }) => (
          <button
            key={value}
            title={label}
            onClick={() => onSelect(value)}
            className={cn(
              'w-10 h-10 sm:w-8 sm:h-8 border-2 transition-all duration-150',
              bgClass,
              selected === value
                ? cn('scale-125 shadow-lg', borderClass)
                : 'border-transparent opacity-60 hover:opacity-100 hover:scale-110',
            )}
          />
        ))}
      </div>
      {selected && (
        <span className="font-mono text-xs text-foreground/60">
          {STRIP_COLORS.find((c) => c.value === selected)?.label}
        </span>
      )}
    </div>
  )
}

interface ActionResultProps {
  result: ButtonResult
}

function ActionResult({ result }: ActionResultProps) {
  const isHold = result.action === 'hold'

  return (
    <div className="animate-result-in flex flex-col gap-3">
      <div
        className={cn(
          'border p-4 flex items-center gap-3',
          isHold ? 'border-ktane-amber/40 bg-ktane-amber/5' : 'border-primary/40 bg-primary/5',
        )}
      >
        <span className={cn('text-lg shrink-0', isHold ? 'text-ktane-amber' : 'text-primary')}>
          {isHold ? '⏸' : '✓'}
        </span>
        <p className="font-mono text-sm text-foreground tracking-wide">
          {isHold ? 'Maintenez le bouton enfoncé.' : 'Appuyez et relâchez immédiatement.'}
        </p>
      </div>

      {isHold && result.holdInstruction && (
        <div className="border border-border bg-secondary/30 p-4 flex items-start gap-3">
          <span className="text-muted-foreground text-lg mt-0.5 shrink-0">→</span>
          <p className="font-mono text-sm text-foreground/80">{result.holdInstruction}</p>
        </div>
      )}
    </div>
  )
}

// ─── Composant principal ──────────────────────────────────────────────────────

export function ButtonSolver() {
  const [selectedColor, setSelectedColor]   = useState<ButtonColor | null>(null)
  const [selectedLabel, setSelectedLabel]   = useState<ButtonLabel | null>(null)
  const [selectedStrip, setSelectedStrip]   = useState<StripColor | null>(null)
  const [showStripSelector, setShowStripSelector] = useState(false)
  const [conditions, setConditions]         = useState<ButtonConditions>(DEFAULT_CONDITIONS)

  const preliminaryResult =
    selectedColor && selectedLabel
      ? solveButton(selectedColor, selectedLabel, conditions)
      : null

  const needsStrip = preliminaryResult?.action === 'hold'

  const finalResult =
    needsStrip && selectedStrip
      ? solveButton(selectedColor!, selectedLabel!, conditions, selectedStrip)
      : needsStrip
        ? null
        : preliminaryResult

  function handleColorSelect(color: ButtonColor) {
    setSelectedColor(color)
    setShowStripSelector(false)
    setSelectedStrip(null)
  }

  function handleLabelSelect(label: ButtonLabel) {
    setSelectedLabel(label)
    setShowStripSelector(false)
    setSelectedStrip(null)
  }

  function handleReset() {
    setSelectedColor(null)
    setSelectedLabel(null)
    setSelectedStrip(null)
    setShowStripSelector(false)
    setConditions(DEFAULT_CONDITIONS)
  }

  return (
    <div className="flex flex-col gap-6">
      <BombConditions
        conditions={{
          hasMoreThanOneBattery:   conditions.hasMoreThanOneBattery,
          hasMoreThanTwoBatteries: conditions.hasMoreThanTwoBatteries,
          hasFrkLit:               conditions.hasFrkLit,
        }}
        visibleKeys={['hasMoreThanOneBattery', 'hasMoreThanTwoBatteries', 'hasFrkLit']}
        onChange={(c) =>
          setConditions({
            hasMoreThanOneBattery:   !!c.hasMoreThanOneBattery,
            hasMoreThanTwoBatteries: !!c.hasMoreThanTwoBatteries,
            hasFrkLit:               !!c.hasFrkLit,
          })
        }
      />

      <ColorSelector selected={selectedColor} onSelect={handleColorSelect} />

      <LabelSelector selected={selectedLabel} onSelect={handleLabelSelect} />

      {needsStrip && !showStripSelector && (
        <div className="animate-result-in border border-ktane-amber/40 bg-ktane-amber/5 p-4 flex flex-col gap-3">
          <p className="font-mono text-sm text-ktane-amber">⏸ Maintenez le bouton enfoncé.</p>
          <p className="font-mono text-xs text-muted-foreground">
            Quelle est la couleur de la bande lumineuse sur le côté ?
          </p>
          <button
            onClick={() => setShowStripSelector(true)}
            className="self-start font-mono text-xs tracking-widest uppercase border border-ktane-amber/40 text-ktane-amber px-3 py-2 sm:py-1.5 hover:bg-ktane-amber/10 transition-colors"
          >
            Indiquer la couleur →
          </button>
        </div>
      )}

      {needsStrip && showStripSelector && (
        <div className="animate-fade-in">
          <StripSelector selected={selectedStrip} onSelect={setSelectedStrip} />
        </div>
      )}


      {finalResult && <ActionResult result={finalResult} />}

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