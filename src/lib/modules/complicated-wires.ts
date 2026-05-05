// ─── Types ────────────────────────────────────────────────────────────────────

export interface ComplicatedWiresConditions {
  serialLastDigitEven: boolean
  hasParallelPort: boolean
  hasTwoOrMoreBatteries: boolean
}

export type ComplexWireColor = 'red' | 'blue' | 'red-blue' | 'white'

export interface ComplexWire {
  color: ComplexWireColor
  hasLed: boolean
  hasStar: boolean
}

export type WireDecision = 'couper' | 'ne-pas-couper'

// ─── Table de décision ───────────────────────────────────────────────────────
// Valeurs : 'C' = toujours couper, 'N' = jamais couper,
//           'P' = couper si port parallèle, 'S' = couper si n° série pair, 'B' = couper si ≥2 piles

type DecisionRule = 'C' | 'N' | 'P' | 'S' | 'B'

const DECISION_TABLE: Record<string, DecisionRule> = {
  'white--':      'C',
  'white-L-':     'S',
  'white--S':     'C',
  'white-L-S':    'S',
  'red--':        'C',
  'red-L-':       'B',
  'red--S':       'P',
  'red-L-S':      'N',
  'blue--':       'B',
  'blue-L-':      'C',
  'blue--S':      'B',
  'blue-L-S':     'P',
  'red-blue--':   'N',
  'red-blue-L-':  'C',
  'red-blue--S':  'B',
  'red-blue-L-S': 'C',
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function buildKey(wire: ComplexWire): string {
  const led  = wire.hasLed  ? 'L' : ''
  const star = wire.hasStar ? 'S' : ''
  return `${wire.color}-${led}-${star}`
}

function applyRule(rule: DecisionRule, conditions: ComplicatedWiresConditions): WireDecision {
  switch (rule) {
    case 'C': return 'couper'
    case 'N': return 'ne-pas-couper'
    case 'P': return conditions.hasParallelPort        ? 'couper' : 'ne-pas-couper'
    case 'S': return conditions.serialLastDigitEven    ? 'couper' : 'ne-pas-couper'
    case 'B': return conditions.hasTwoOrMoreBatteries  ? 'couper' : 'ne-pas-couper'
  }
}

// ─── Export principal ─────────────────────────────────────────────────────────

export function solveComplexWire(wire: ComplexWire, conditions: ComplicatedWiresConditions): WireDecision {
  const key  = buildKey(wire)
  const rule = DECISION_TABLE[key]
  if (!rule) return 'ne-pas-couper'
  return applyRule(rule, conditions)
}