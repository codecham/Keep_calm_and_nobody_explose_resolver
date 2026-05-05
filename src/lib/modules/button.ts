import { ButtonColor, ButtonLabel } from '@/types/modules'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ButtonConditions {
  hasMoreThanOneBattery: boolean
  hasMoreThanTwoBatteries: boolean
  hasFrkLit: boolean
}

export type ButtonAction = 'press' | 'hold'

export type StripColor = 'blue' | 'white' | 'yellow' | 'other'

export interface ButtonResult {
  action: ButtonAction
  holdInstruction?: string
}

// ─── Règles de relâchement ────────────────────────────────────────────────────

function getReleaseDigit(stripColor: StripColor): string {
  switch (stripColor) {
    case 'blue':   return '4'
    case 'white':  return '1'
    case 'yellow': return '5'
    default:       return '1'
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
  conditions: ButtonConditions,
): boolean {
  if (color === 'blue' && label === 'abort') return false
  if (conditions.hasMoreThanOneBattery && label === 'detonate') return true
  if (color === 'white') return false
  if (conditions.hasMoreThanTwoBatteries && conditions.hasFrkLit) return true
  if (color === 'yellow') return false
  if (color === 'red' && label === 'hold') return true
  return false
}

// ─── Export principal ─────────────────────────────────────────────────────────

export function solveButton(
  color: ButtonColor,
  label: ButtonLabel,
  conditions: ButtonConditions,
  stripColor?: StripColor,
): ButtonResult {
  const pressImmediately = shouldPressImmediately(color, label, conditions)

  if (pressImmediately) return { action: 'press' }

  const resolvedStrip = stripColor ?? 'other'
  return {
    action: 'hold',
    holdInstruction: buildHoldInstruction(resolvedStrip),
  }
}