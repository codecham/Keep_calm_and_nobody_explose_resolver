'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  MemoryDisplay,
  MemoryLabel,
  ButtonPosition,
  PressedButton,
  getMemoryInstruction,
} from '@/lib/modules/memory'

// ─── Constantes ───────────────────────────────────────────────────────────────

const DISPLAY_VALUES: MemoryDisplay[] = [1, 2, 3, 4]
const LABEL_VALUES: MemoryLabel[] = [1, 2, 3, 4]
const POSITION_VALUES: ButtonPosition[] = [1, 2, 3, 4]
const TOTAL_STAGES = 5

// ─── Sous-composants ─────────────────────────────────────────────────────────

interface DisplaySelectorProps {
  selected: MemoryDisplay | null
  onSelect: (display: MemoryDisplay) => void
  stage: number
}

function DisplaySelector({ selected, onSelect, stage }: DisplaySelectorProps) {
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-1">
        Affichage étape {stage}
      </legend>
      <div role="group" className="flex gap-2">
        {DISPLAY_VALUES.map((value) => (
          <button
            key={value}
            onClick={() => onSelect(value)}
            aria-pressed={selected === value}
            aria-label={`Affichage ${value}`}
            className={cn(
              'w-12 h-12 sm:w-11 sm:h-11 font-mono text-lg font-bold border transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background',
              selected === value
                ? 'border-primary text-primary bg-primary/10'
                : 'border-border text-muted-foreground hover:text-foreground hover:border-foreground/40',
            )}
          >
            {value}
          </button>
        ))}
      </div>
    </fieldset>
  )
}

interface InstructionCardProps {
  text: string
}

function InstructionCard({ text }: InstructionCardProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="animate-result-in border border-primary/40 bg-primary/5 p-4 flex items-start gap-3"
    >
      <span className="text-primary text-lg shrink-0" aria-hidden="true">→</span>
      <p className="font-mono text-sm text-foreground tracking-wide">{text}</p>
    </div>
  )
}

interface ButtonPressSelectorProps {
  stage: number
  onPress: (button: PressedButton) => void
}

function ButtonPressSelector({ stage, onPress }: ButtonPressSelectorProps) {
  const [selectedPosition, setSelectedPosition] = useState<ButtonPosition | null>(null)
  const [selectedLabel, setSelectedLabel] = useState<MemoryLabel | null>(null)

  function handleConfirm() {
    if (selectedPosition === null || selectedLabel === null) return
    onPress({ position: selectedPosition, label: selectedLabel })
    setSelectedPosition(null)
    setSelectedLabel(null)
  }

  return (
    <div className="flex flex-col gap-4 border border-border bg-secondary/10 p-4">
      <span className="font-mono text-xs tracking-widest uppercase text-muted-foreground">
        Bouton pressé à l&apos;étape {stage}
      </span>

      <div className="flex flex-col gap-3">
        <fieldset className="flex flex-col gap-2">
          <legend className="font-mono text-[11px] text-muted-foreground mb-1">Position (1 = gauche)</legend>
          <div role="group" className="flex gap-2">
            {POSITION_VALUES.map((pos) => (
              <button
                key={pos}
                onClick={() => setSelectedPosition(pos)}
                aria-pressed={selectedPosition === pos}
                aria-label={`Position ${pos}`}
                className={cn(
                  'w-10 h-10 sm:w-9 sm:h-9 font-mono text-sm border transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background',
                  selectedPosition === pos
                    ? 'border-ktane-amber text-ktane-amber bg-ktane-amber/10'
                    : 'border-border text-muted-foreground hover:text-foreground hover:border-foreground/40',
                )}
              >
                {pos}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="flex flex-col gap-2">
          <legend className="font-mono text-[11px] text-muted-foreground mb-1">Chiffre sur le bouton</legend>
          <div role="group" className="flex gap-2">
            {LABEL_VALUES.map((lbl) => (
              <button
                key={lbl}
                onClick={() => setSelectedLabel(lbl)}
                aria-pressed={selectedLabel === lbl}
                aria-label={`Chiffre ${lbl}`}
                className={cn(
                  'w-10 h-10 sm:w-9 sm:h-9 font-mono text-sm border transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background',
                  selectedLabel === lbl
                    ? 'border-ktane-amber text-ktane-amber bg-ktane-amber/10'
                    : 'border-border text-muted-foreground hover:text-foreground hover:border-foreground/40',
                )}
              >
                {lbl}
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      <Button
        variant="outline"
        onClick={handleConfirm}
        disabled={selectedPosition === null || selectedLabel === null}
        className="self-start font-mono text-xs tracking-widest uppercase h-10 sm:h-8 px-4"
      >
        Confirmer →
      </Button>
    </div>
  )
}

interface HistoryRowProps {
  stage: number
  pressed: PressedButton
  onUndo: () => void
}

function HistoryRow({ stage, pressed, onUndo }: HistoryRowProps) {
  return (
    <div className="flex items-center gap-3 py-1.5 border-b border-border/50 last:border-0">
      <span className="font-mono text-xs text-muted-foreground w-14 shrink-0">Étape {stage}</span>
      <span className="font-mono text-xs text-foreground">
        Position <span className="text-primary">{pressed.position}</span>
        {' · '}
        Chiffre <span className="text-primary">{pressed.label}</span>
      </span>
      {stage === 5 && (
        <button
          onClick={onUndo}
          className="ml-auto font-mono text-[10px] text-muted-foreground hover:text-foreground border border-border px-1.5 py-0.5 transition-colors"
          aria-label="Annuler cette étape"
        >
          ← Annuler
        </button>
      )}
    </div>
  )
}

// ─── Composant principal ──────────────────────────────────────────────────────

export function MemorySolver() {
  const [currentStage, setCurrentStage] = useState(1)
  const [selectedDisplay, setSelectedDisplay] = useState<MemoryDisplay | null>(null)
  const [history, setHistory] = useState<PressedButton[]>([])

  const isModuleComplete = history.length === TOTAL_STAGES

  const instruction =
    selectedDisplay !== null
      ? getMemoryInstruction(currentStage, selectedDisplay, history)
      : null

  function handlePress(button: PressedButton) {
    const newHistory = [...history, button]
    setHistory(newHistory)
    if (currentStage < TOTAL_STAGES) {
      setCurrentStage(currentStage + 1)
      setSelectedDisplay(null)
    }
  }

  function handleUndo() {
    if (history.length === 0) return
    setHistory((prev) => prev.slice(0, -1))
    setCurrentStage((prev) => Math.max(1, prev - 1))
    setSelectedDisplay(null)
  }

  function handleReset() {
    setCurrentStage(1)
    setSelectedDisplay(null)
    setHistory([])
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Progression */}
      <div className="flex items-center gap-2" aria-label={`Étape ${currentStage} sur ${TOTAL_STAGES}`}>
        {Array.from({ length: TOTAL_STAGES }, (_, i) => i + 1).map((stage) => (
          <div
            key={stage}
            className={cn(
              'h-1.5 flex-1 transition-colors duration-300',
              stage < currentStage  ? 'bg-primary' :
              stage === currentStage ? 'bg-primary/50' :
              'bg-border',
            )}
            aria-hidden="true"
          />
        ))}
      </div>

      {isModuleComplete ? (
        <CompletionMessage onReset={handleReset} />
      ) : (
        <>
          <DisplaySelector
            selected={selectedDisplay}
            onSelect={setSelectedDisplay}
            stage={currentStage}
          />

          {instruction && (
            <>
              <InstructionCard text={instruction.text} />
              <ButtonPressSelector stage={currentStage} onPress={handlePress} />
            </>
          )}
        </>
      )}

      {/* Historique */}
      {history.length > 0 && !isModuleComplete && (
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs tracking-widest uppercase text-muted-foreground">
              Historique
            </span>
            <button
              onClick={handleUndo}
              className="font-mono text-[10px] text-muted-foreground hover:text-foreground border border-border px-1.5 py-0.5 transition-colors"
              aria-label="Annuler la dernière étape"
            >
              ← Annuler
            </button>
          </div>
          <div className="border border-border bg-secondary/10 px-3 py-1">
            {history.map((pressed, i) => (
              <HistoryRow
                key={i}
                stage={i + 1}
                pressed={pressed}
                onUndo={handleUndo}
              />
            ))}
          </div>
        </div>
      )}

      {!isModuleComplete && (
        <Button
          variant="outline"
          onClick={handleReset}
          className="w-full font-mono text-xs tracking-widest uppercase h-11 sm:h-8"
        >
          Réinitialiser
        </Button>
      )}
    </div>
  )
}

interface CompletionMessageProps {
  onReset: () => void
}

function CompletionMessage({ onReset }: CompletionMessageProps) {
  return (
    <div className="animate-result-in flex flex-col gap-4">
      <div className="border border-primary/40 bg-primary/5 p-4 flex items-center gap-3">
        <span className="text-primary text-xl shrink-0" aria-hidden="true">✓</span>
        <p className="font-mono text-sm text-foreground">Module désamorcé !</p>
      </div>
      <Button
        variant="outline"
        onClick={onReset}
        className="w-full font-mono text-xs tracking-widest uppercase h-11 sm:h-8"
      >
        Nouveau module
      </Button>
    </div>
  )
}