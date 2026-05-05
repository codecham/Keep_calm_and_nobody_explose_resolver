// ─── Types ────────────────────────────────────────────────────────────────────

export type MemoryDisplay = 1 | 2 | 3 | 4
export type MemoryLabel = 1 | 2 | 3 | 4
export type ButtonPosition = 1 | 2 | 3 | 4

export interface PressedButton {
  position: ButtonPosition
  label: MemoryLabel
}

export type MemoryInstruction =
  | { type: 'position'; position: ButtonPosition }
  | { type: 'label'; label: MemoryLabel }
  | { type: 'same-position-as'; referenceStage: number }
  | { type: 'same-label-as'; referenceStage: number }

// ─── Règles par étape ─────────────────────────────────────────────────────────

type StageRule = (display: MemoryDisplay) => MemoryInstruction

const STAGE_RULES: StageRule[] = [
  // Stage 1
  (d) => {
    const positionMap: Record<MemoryDisplay, ButtonPosition> = { 1: 2, 2: 2, 3: 3, 4: 4 }
    return { type: 'position', position: positionMap[d] }
  },
  // Stage 2
  (d) => {
    if (d === 1) return { type: 'label', label: 4 }
    if (d === 2) return { type: 'same-position-as', referenceStage: 1 }
    if (d === 3) return { type: 'position', position: 1 }
    return { type: 'same-position-as', referenceStage: 1 }
  },
  // Stage 3
  (d) => {
    if (d === 1) return { type: 'same-label-as', referenceStage: 2 }
    if (d === 2) return { type: 'same-label-as', referenceStage: 1 }
    if (d === 3) return { type: 'position', position: 3 }
    return { type: 'label', label: 4 }
  },
  // Stage 4
  (d) => {
    if (d === 1) return { type: 'same-position-as', referenceStage: 1 }
    if (d === 2) return { type: 'position', position: 1 }
    if (d === 3) return { type: 'same-position-as', referenceStage: 2 }
    return { type: 'same-position-as', referenceStage: 2 }
  },
  // Stage 5
  (d) => {
    if (d === 1) return { type: 'same-label-as', referenceStage: 1 }
    if (d === 2) return { type: 'same-label-as', referenceStage: 2 }
    if (d === 3) return { type: 'same-label-as', referenceStage: 4 }
    return { type: 'same-label-as', referenceStage: 3 }
  },
]

// ─── Résolution d'instruction en texte français ──────────────────────────────

function resolveInstruction(instruction: MemoryInstruction, history: PressedButton[]): string {
  switch (instruction.type) {
    case 'position':
      return `Appuyez sur le bouton en position ${instruction.position}`
    case 'label':
      return `Appuyez sur le bouton portant le chiffre ${instruction.label}`
    case 'same-position-as': {
      const past = history[instruction.referenceStage - 1]
      if (!past) return `Appuyez sur le bouton à la même position qu'à l'étape ${instruction.referenceStage}`
      return `Appuyez sur le bouton en position ${past.position} (même position qu'étape ${instruction.referenceStage})`
    }
    case 'same-label-as': {
      const past = history[instruction.referenceStage - 1]
      if (!past) return `Appuyez sur le bouton avec le même chiffre qu'à l'étape ${instruction.referenceStage}`
      return `Appuyez sur le bouton portant le chiffre ${past.label} (même chiffre qu'étape ${instruction.referenceStage})`
    }
  }
}

// ─── Export principal ─────────────────────────────────────────────────────────

export function getMemoryInstruction(
  stage: number,
  display: MemoryDisplay,
  history: PressedButton[],
): { instruction: MemoryInstruction; text: string } {
  const rule = STAGE_RULES[stage - 1]
  if (!rule) throw new Error(`Étape invalide : ${stage}`)
  const instruction = rule(display)
  return { instruction, text: resolveInstruction(instruction, history) }
}