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
  // White
  'white--':     'C',  // aucun → toujours couper
  'white-L-':    'N',  // LED seulement → ne jamais couper
  'white--S':    'C',  // star seulement → toujours couper
  'white-L-S':   'B',  // LED + star → couper si plus de 2 piles

  // Red
  'red--':       'S',  // aucun → toujours couper
  'red-L-':      'B',  // LED seulement → couper si ≥2 piles
  'red--S':      'C',  // star seulement → toujours couper
  'red-L-S':     'B',  // LED + star → ne jamais couper

  // Blue
  'blue--':      'S',  // aucun → couper si numéro de série pair
  'blue-L-':     'P',  // LED seulement → couper si port parallèle
  'blue--S':     'N',  // star seulement → ne jamais couper
  'blue-L-S':    'P',  // LED + star → couper si port parallèle

  // Red + Blue
  'red-blue--':  'S',  // aucun → couper si numéro de série pair
  'red-blue-L-': 'S',  // LED seulement → couper si numéro de série pair
  'red-blue--S': 'P',  // star seulement → couper si port parallèle
  'red-blue-L-S':'N',  // LED + star → ne jamais couper
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