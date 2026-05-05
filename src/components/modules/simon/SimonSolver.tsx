'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { BombConditions } from '@/components/modules/shared/BombConditions'
import {
  SimonColor,
  StrikeCount,
  SimonConditions,
  getSimonMapping,
  solveSimon,
} from '@/lib/modules/simon'

// ─── Constantes ───────────────────────────────────────────────────────────────

const SIMON_COLORS: { value: SimonColor; label: string; bgClass: string; ringClass: string }[] = [
  { value: 'red',    label: 'Rouge', bgClass: 'bg-red-600',    ringClass: 'ring-red-500' },
  { value: 'blue',   label: 'Bleu',  bgClass: 'bg-blue-500',   ringClass: 'ring-blue-400' },
  { value: 'green',  label: 'Vert',  bgClass: 'bg-green-500',  ringClass: 'ring-green-400' },
  { value: 'yellow', label: 'Jaune', bgClass: 'bg-yellow-400', ringClass: 'ring-yellow-300' },
]

const STRIKE_OPTIONS: { value: StrikeCount; label: string }[] = [
  { value: 0, label: '0' },
  { value: 1, label: '1' },
  { value: 2, label: '2' },
]

const DEFAULT_CONDITIONS: SimonConditions = {
  serialHasVowel: false,
  strikes: 0,
}

// ─── Sous-composants ─────────────────────────────────────────────────────────

interface StrikeSelectorProps {
  strikes: StrikeCount
  onChange: (strikes: StrikeCount) => void
}

function StrikeSelector({ strikes, onChange }: StrikeSelectorProps) {
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-1">
        Nombre de strikes
      </legend>
      <div role="group" className="flex gap-2">
        {STRIKE_OPTIONS.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => onChange(value)}
            aria-pressed={strikes === value}
            aria-label={`${label} strike${value !== 1 ? 's' : ''}`}
            className={cn(
              'w-11 h-11 sm:w-10 sm:h-10 font-mono text-sm border transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background',
              strikes === value
                ? 'border-primary text-primary bg-primary/10'
                : 'border-border text-muted-foreground hover:text-foreground hover:border-foreground/40',
            )}
          >
            {label}
          </button>
        ))}
      </div>
    </fieldset>
  )
}

interface SequenceEntryProps {
  sequence: SimonColor[]
  onAdd: (color: SimonColor) => void
  onRemoveLast: () => void
  onClear: () => void
}

function SequenceEntry({ sequence, onAdd, onRemoveLast, onClear }: SequenceEntryProps) {
  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-1">
        Séquence observée (dans l&apos;ordre)
      </legend>

      {/* Boutons de couleur */}
      <div role="group" aria-label="Ajouter une couleur à la séquence" className="flex gap-4 sm:gap-3">
        {SIMON_COLORS.map(({ value, label, bgClass, ringClass }) => (
          <button
            key={value}
            aria-label={`Ajouter ${label}`}
            onClick={() => onAdd(value)}
            className={cn(
              'w-14 h-14 sm:w-12 sm:h-12 rounded-full border-2 border-transparent transition-all duration-150',
              'opacity-80 hover:opacity-100 hover:scale-110 active:scale-95',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
              bgClass,
              `hover:ring-2 hover:${ringClass}`,
            )}
          />
        ))}
      </div>

      {/* Affichage de la séquence */}
      {sequence.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          {sequence.map((color, i) => {
            const colorConfig = SIMON_COLORS.find((c) => c.value === color)!
            return (
              <div key={i} className="flex items-center gap-1">
                <span className="font-mono text-[10px] text-muted-foreground">{i + 1}.</span>
                <div className={cn('w-5 h-5 rounded-full', colorConfig.bgClass)} aria-label={colorConfig.label} />
              </div>
            )
          })}
          <div className="flex gap-1 ml-1">
            <button
              onClick={onRemoveLast}
              aria-label="Supprimer la dernière couleur"
              className="font-mono text-[10px] text-muted-foreground hover:text-foreground border border-border px-1.5 py-0.5 transition-colors"
            >
              ← Annuler
            </button>
            <button
              onClick={onClear}
              aria-label="Vider la séquence"
              className="font-mono text-[10px] text-muted-foreground hover:text-destructive border border-border px-1.5 py-0.5 transition-colors"
            >
              Vider
            </button>
          </div>
        </div>
      )}
    </fieldset>
  )
}

interface MappingTableProps {
  conditions: SimonConditions
}

function MappingTable({ conditions }: MappingTableProps) {
  const mapping = getSimonMapping(conditions)

  return (
    <div className="flex flex-col gap-2">
      <span className="font-mono text-xs tracking-widest uppercase text-muted-foreground">
        Table active
      </span>
      <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4">
        {SIMON_COLORS.map(({ value: flashColor, label: flashLabel, bgClass: flashBg }) => {
          const pressColor = mapping[flashColor]
          const pressConfig = SIMON_COLORS.find((c) => c.value === pressColor)!
          return (
            <div
              key={flashColor}
              className="flex items-center gap-2 border border-border bg-secondary/20 px-2 py-1.5"
            >
              <div className={cn('w-3 h-3 rounded-full shrink-0', flashBg)} aria-hidden="true" />
              <span className="font-mono text-[10px] text-muted-foreground">→</span>
              <div className={cn('w-3 h-3 rounded-full shrink-0', pressConfig.bgClass)} aria-hidden="true" />
              <span className="font-mono text-[10px] text-foreground/60">
                {pressConfig.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

interface SequenceResultProps {
  sequence: SimonColor[]
  conditions: SimonConditions
}

function SequenceResult({ sequence, conditions }: SequenceResultProps) {
  return (
    <div role="status" aria-live="polite" className="animate-result-in flex flex-col gap-2">
      <span className="font-mono text-xs tracking-widest uppercase text-muted-foreground">
        Séquence à appuyer
      </span>
      <div className="border border-primary/40 bg-primary/5 p-3 flex flex-wrap items-center gap-3">
        {sequence.map((flashColor, i) => {
          const pressColor = solveSimon(flashColor, conditions)
          const pressConfig = SIMON_COLORS.find((c) => c.value === pressColor)!
          return (
            <div key={i} className="flex items-center gap-1.5">
              <span className="font-mono text-xs text-muted-foreground">{i + 1}.</span>
              <div className={cn('w-5 h-5 rounded-full', pressConfig.bgClass)} aria-hidden="true" />
              <span className="font-mono text-xs text-foreground">{pressConfig.label}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Composant principal ──────────────────────────────────────────────────────

export function SimonSolver() {
  const [sequence, setSequence] = useState<SimonColor[]>([])
  const [conditions, setConditions] = useState<SimonConditions>(DEFAULT_CONDITIONS)

  function handleAddColor(color: SimonColor) {
    setSequence((prev) => [...prev, color])
  }

  function handleRemoveLast() {
    setSequence((prev) => prev.slice(0, -1))
  }

  function handleClear() {
    setSequence([])
  }

  function handleReset() {
    setSequence([])
    setConditions(DEFAULT_CONDITIONS)
  }

  return (
    <div className="flex flex-col gap-6">
      <BombConditions
        conditions={{ serialHasVowel: conditions.serialHasVowel }}
        visibleKeys={['serialHasVowel']}
        onChange={(c) =>
          setConditions((prev) => ({ ...prev, serialHasVowel: !!c.serialHasVowel }))
        }
      />

      <StrikeSelector
        strikes={conditions.strikes}
        onChange={(strikes) => setConditions((prev) => ({ ...prev, strikes }))}
      />

      <MappingTable conditions={conditions} />

      <SequenceEntry
        sequence={sequence}
        onAdd={handleAddColor}
        onRemoveLast={handleRemoveLast}
        onClear={handleClear}
      />

      {sequence.length > 0 && (
        <SequenceResult sequence={sequence} conditions={conditions} />
      )}

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