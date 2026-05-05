'use client'

import { useState } from 'react'
import { ButtonColor, ButtonLabel } from '@/types/modules'
import { solveButton, StripColor, ButtonResult } from '@/lib/modules/button'
import { useBombContext } from '@/app/context/BombContext'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

// ─── Données de configuration ─────────────────────────────────────────────────

const BUTTON_COLORS: { value: ButtonColor; label: string; bgClass: string; ringClass: string }[] = [
  { value: 'red', label: 'Rouge', bgClass: 'bg-red-600 hover:bg-red-500', ringClass: 'ring-red-500' },
  { value: 'blue', label: 'Bleu', bgClass: 'bg-blue-600 hover:bg-blue-500', ringClass: 'ring-blue-400' },
  { value: 'yellow', label: 'Jaune', bgClass: 'bg-yellow-400 hover:bg-yellow-300', ringClass: 'ring-yellow-300' },
  { value: 'white', label: 'Blanc', bgClass: 'bg-zinc-100 hover:bg-white', ringClass: 'ring-zinc-300' },
]

const BUTTON_LABELS: { value: ButtonLabel; display: string }[] = [
  { value: 'abort', display: 'ABORT' },
  { value: 'detonate', display: 'DETONATE' },
  { value: 'hold', display: 'HOLD' },
  { value: 'press', display: 'PRESS' },
]

const STRIP_COLORS: { value: StripColor; label: string; bgClass: string; borderClass: string }[] = [
  { value: 'blue', label: 'Bleu', bgClass: 'bg-blue-600', borderClass: 'border-blue-400' },
  { value: 'white', label: 'Blanc', bgClass: 'bg-zinc-100', borderClass: 'border-zinc-300' },
  { value: 'yellow', label: 'Jaune', bgClass: 'bg-yellow-400', borderClass: 'border-yellow-300' },
  { value: 'other', label: 'Autre', bgClass: 'bg-zinc-600', borderClass: 'border-zinc-500' },
]

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
      <div className="flex gap-3">
        {BUTTON_COLORS.map(({ value, label, bgClass, ringClass }) => (
          <button
            key={value}
            title={label}
            onClick={() => onSelect(value)}
            className={cn(
              'w-12 h-12 rounded-full transition-all duration-150 border-2',
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
      <div className="flex gap-2 flex-wrap">
        {BUTTON_LABELS.map(({ value, display }) => (
          <button
            key={value}
            onClick={() => onSelect(value)}
            className={cn(
              'px-4 h-9 font-mono text-xs tracking-widest border transition-colors duration-150',
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
        Couleur de la bande DEL
      </span>
      <div className="flex gap-3 items-center">
        {STRIP_COLORS.map(({ value, label, bgClass, borderClass }) => (
          <button
            key={value}
            title={label}
            onClick={() => onSelect(value)}
            className={cn(
              'w-8 h-8 border-2 transition-all duration-150',
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
    <div className="flex flex-col gap-3">
      <div
        className={cn(
          'border p-4 flex items-center gap-3',
          isHold
            ? 'border-ktane-amber/40 bg-ktane-amber/5'
            : 'border-primary/40 bg-primary/5',
        )}
      >
        <span className={cn('text-lg', isHold ? 'text-ktane-amber' : 'text-primary')}>
          {isHold ? '⏸' : '✓'}
        </span>
        <p className="font-mono text-sm text-foreground tracking-wide">
          {isHold ? 'Maintenez le bouton enfoncé.' : 'Appuyez et relâchez immédiatement.'}
        </p>
      </div>

      {isHold && result.holdInstruction && (
        <div className="border border-border bg-secondary/30 p-4 flex items-start gap-3">
          <span className="text-muted-foreground text-lg mt-0.5">→</span>
          <p className="font-mono text-sm text-foreground/80">{result.holdInstruction}</p>
        </div>
      )}
    </div>
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

export function ButtonSolver() {
  const { bombInfo } = useBombContext()
  const [selectedColor, setSelectedColor] = useState<ButtonColor | null>(null)
  const [selectedLabel, setSelectedLabel] = useState<ButtonLabel | null>(null)
  const [selectedStrip, setSelectedStrip] = useState<StripColor | null>(null)
  const [showStripSelector, setShowStripSelector] = useState(false)

  const isBombConfigured = bombInfo.serialNumber.length > 0

  const preliminaryResult =
    selectedColor && selectedLabel && isBombConfigured
      ? solveButton(selectedColor, selectedLabel, bombInfo)
      : null

  const needsStrip = preliminaryResult?.action === 'hold'

  const finalResult =
    needsStrip && selectedStrip
      ? solveButton(selectedColor!, selectedLabel!, bombInfo, selectedStrip)
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
  }

  return (
    <div className="flex flex-col gap-6">
      <ColorSelector selected={selectedColor} onSelect={handleColorSelect} />
      <LabelSelector selected={selectedLabel} onSelect={handleLabelSelect} />

      {!isBombConfigured && (
        <BombWarning message="Configurez le numéro de série de la bombe pour obtenir le résultat." />
      )}

      {needsStrip && !showStripSelector && isBombConfigured && (
        <div className="border border-ktane-amber/40 bg-ktane-amber/5 p-4 flex flex-col gap-3">
          <p className="font-mono text-sm text-ktane-amber">
            ⏸ Maintenez le bouton enfoncé.
          </p>
          <p className="font-mono text-xs text-muted-foreground">
            Quelle est la couleur de la bande lumineuse sur le côté ?
          </p>
          <button
            onClick={() => setShowStripSelector(true)}
            className="self-start font-mono text-xs tracking-widest uppercase border border-ktane-amber/40 text-ktane-amber px-3 py-1.5 hover:bg-ktane-amber/10 transition-colors"
          >
            Indiquer la couleur →
          </button>
        </div>
      )}

      {needsStrip && showStripSelector && (
        <StripSelector selected={selectedStrip} onSelect={setSelectedStrip} />
      )}

      {finalResult && <ActionResult result={finalResult} />}

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