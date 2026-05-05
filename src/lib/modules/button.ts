import { ButtonColor, ButtonLabel, BombInfo } from '@/types/modules'

export type ButtonAction = 'press' | 'hold'

export type StripColor = 'blue' | 'white' | 'yellow' | 'other'

export interface ButtonResult {
  action: ButtonAction
  holdInstruction?: string
}

// ─── Règles de relâchement (si on tient le bouton) ───────────────────────────

function getReleaseDigit(stripColor: StripColor): string {
  switch (stripColor) {
    case 'blue':
      return '4'
    case 'white':
      return '1'
    case 'yellow':
      return '5'
    default:
      return '1'
  }
}

function buildHoldInstruction(stripColor: StripColor): string {
  const digit = getReleaseDigit(stripColor)
  return `Relâchez quand le compte à rebours contient un ${digit}.`
}

// ─── Règles d'action principale ───────────────────────────────────────────────

function shouldPressImmediately(
  color: ButtonColor,
  label: ButtonLabel,
  bombInfo: BombInfo,
): boolean {
  if (color === 'blue' && label === 'abort') return false
  if (bombInfo.batteryCount > 1 && label === 'detonate') return true
  if (color === 'white') return false
  const hasFrkLit = bombInfo.indicators.some((i) => i.code === 'FRK' && i.isLit)
  if (bombInfo.batteryCount > 2 && hasFrkLit) return true
  if (color === 'yellow') return false
  if (color === 'red' && label === 'hold') return true
  return false
}

// ─── Export principal ─────────────────────────────────────────────────────────

export function solveButton(
  color: ButtonColor,
  label: ButtonLabel,
  bombInfo: BombInfo,
  stripColor?: StripColor,
): ButtonResult {
  const pressImmediately = shouldPressImmediately(color, label, bombInfo)

  if (pressImmediately) {
    return { action: 'press' }
  }

  const resolvedStrip = stripColor ?? 'other'
  return {
    action: 'hold',
    holdInstruction: buildHoldInstruction(resolvedStrip),
  }
}