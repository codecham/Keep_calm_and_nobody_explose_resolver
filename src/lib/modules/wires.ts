import { WireColor } from '@/types/modules'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface WiresConditions {
  serialLastDigitOdd: boolean
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function countColor(wires: WireColor[], color: WireColor): number {
  return wires.filter((w) => w === color).length
}

function lastWireIs(wires: WireColor[], color: WireColor): boolean {
  return wires[wires.length - 1] === color
}

function wireLabel(index: number): string {
  return `le fil n°${index + 1}`
}

// ─── Règles par nombre de fils ───────────────────────────────────────────────

function solveThreeWires(wires: WireColor[]): string {
  if (countColor(wires, 'red') === 0) return `Couper ${wireLabel(1)}`
  if (lastWireIs(wires, 'white')) return `Couper ${wireLabel(2)}`
  if (countColor(wires, 'blue') > 1) return `Couper le dernier fil bleu`
  return `Couper ${wireLabel(2)}`
}

function solveFourWires(wires: WireColor[], isOdd: boolean): string {
  if (countColor(wires, 'red') > 1 && isOdd) return `Couper le dernier fil rouge`
  if (lastWireIs(wires, 'yellow') && countColor(wires, 'red') === 0) return `Couper ${wireLabel(0)}`
  if (countColor(wires, 'blue') === 1) return `Couper ${wireLabel(0)}`
  if (countColor(wires, 'yellow') > 1) return `Couper ${wireLabel(3)}`
  return `Couper ${wireLabel(1)}`
}

function solveFiveWires(wires: WireColor[], isOdd: boolean): string {
  if (lastWireIs(wires, 'black') && isOdd) return `Couper ${wireLabel(3)}`
  if (countColor(wires, 'red') === 1 && countColor(wires, 'yellow') > 1) return `Couper ${wireLabel(0)}`
  if (countColor(wires, 'black') === 0) return `Couper ${wireLabel(1)}`
  return `Couper ${wireLabel(0)}`
}

function solveSixWires(wires: WireColor[], isOdd: boolean): string {
  if (countColor(wires, 'yellow') === 0 && isOdd) return `Couper ${wireLabel(2)}`
  if (countColor(wires, 'yellow') === 1 && countColor(wires, 'white') > 1) return `Couper ${wireLabel(3)}`
  if (countColor(wires, 'red') === 0) return `Couper ${wireLabel(5)}`
  return `Couper ${wireLabel(3)}`
}

// ─── Dispatch ────────────────────────────────────────────────────────────────

type WiresSolver = (wires: WireColor[], isOdd: boolean) => string

const SOLVERS: Record<number, WiresSolver> = {
  3: solveThreeWires,
  4: solveFourWires,
  5: solveFiveWires,
  6: solveSixWires,
}

export function solveWires(wires: WireColor[], conditions: WiresConditions): string {
  const solver = SOLVERS[wires.length]
  if (!solver) return 'Nombre de fils invalide (3 à 6 fils requis)'
  return solver(wires, conditions.serialLastDigitOdd)
}

export function requiresSerialCheck(wires: WireColor[]): boolean {
  switch (wires.length) {
    case 4: return countColor(wires, 'red') > 1
    case 5: return lastWireIs(wires, 'black')
          || (countColor(wires, 'red') === 1 && countColor(wires, 'yellow') > 1)
    case 6: return countColor(wires, 'yellow') === 0
          || (countColor(wires, 'yellow') === 1 && countColor(wires, 'white') > 1)
    default: return false
  }
}