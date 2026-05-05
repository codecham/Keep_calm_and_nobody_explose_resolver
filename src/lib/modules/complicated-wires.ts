import { BombInfo } from '@/types/modules'

// ─── Types ────────────────────────────────────────────────────────────────────

export type ComplexWireColor = 'red' | 'blue' | 'red-blue' | 'white'

export interface ComplexWire {
  color: ComplexWireColor
  hasLed: boolean
  hasStar: boolean
}

export type WireDecision = 'couper' | 'ne-pas-couper'

// ─── Helpers ─────────────────────────────────────────────────────────────────

function serialHasEvenLastDigit(serial: string): boolean {
  const lastChar = serial.slice(-1)
  const digit = parseInt(lastChar, 10)
  return !isNaN(digit) && digit % 2 === 0
}

function hasParallelPort(bombInfo: BombInfo): boolean {
  return bombInfo.ports.includes('Parallel')
}

function hasTwoOrMoreBatteries(bombInfo: BombInfo): boolean {
  return bombInfo.batteryCount >= 2
}

// ─── Table de décision ───────────────────────────────────────────────────────
// Clé : `${color}-${hasLed ? 'L' : ''}-${hasStar ? 'S' : ''}`
// Valeur : 'C' = toujours couper, 'N' = ne jamais couper,
//          'P' = couper si port parallèle, 'S' = couper si N° série pair, 'B' = couper si ≥2 piles

type DecisionRule = 'C' | 'N' | 'P' | 'S' | 'B'

const DECISION_TABLE: Record<string, DecisionRule> = {
  'white--':     'C',
  'white-L-':    'S',
  'white--S':    'C',
  'white-L-S':   'S',
  'red--':       'C',
  'red-L-':      'B',
  'red--S':      'P',
  'red-L-S':     'N',
  'blue--':      'B',
  'blue-L-':     'C',
  'blue--S':     'B',
  'blue-L-S':    'P',
  'red-blue--':  'N',
  'red-blue-L-': 'C',
  'red-blue--S': 'B',
  'red-blue-L-S':'C',
}

function buildKey(wire: ComplexWire): string {
  const led = wire.hasLed ? 'L' : ''
  const star = wire.hasStar ? 'S' : ''
  return `${wire.color}-${led}-${star}`
}

function applyRule(rule: DecisionRule, bombInfo: BombInfo): WireDecision {
  switch (rule) {
    case 'C': return 'couper'
    case 'N': return 'ne-pas-couper'
    case 'P': return hasParallelPort(bombInfo) ? 'couper' : 'ne-pas-couper'
    case 'S': return serialHasEvenLastDigit(bombInfo.serialNumber) ? 'couper' : 'ne-pas-couper'
    case 'B': return hasTwoOrMoreBatteries(bombInfo) ? 'couper' : 'ne-pas-couper'
  }
}

// ─── Export principal ─────────────────────────────────────────────────────────

export function solveComplexWire(wire: ComplexWire, bombInfo: BombInfo): WireDecision {
  const key = buildKey(wire)
  const rule = DECISION_TABLE[key]
  if (!rule) return 'ne-pas-couper'
  return applyRule(rule, bombInfo)
}