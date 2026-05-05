// ─── Types ────────────────────────────────────────────────────────────────────

export type SimonColor = 'red' | 'blue' | 'yellow' | 'green'

export type StrikeCount = 0 | 1 | 2

export interface SimonConditions {
  serialHasVowel: boolean
  strikes: StrikeCount
}

// ─── Tables de correspondance ─────────────────────────────────────────────────
// Colonnes du manuel (dans l'ordre) : Red Flash | Blue Flash | Green Flash | Yellow Flash
// → Bouton à presser selon la couleur qui clignote

type ColorMap = Record<SimonColor, SimonColor>

const TABLE_VOWEL: Record<StrikeCount, ColorMap> = {
  0: { red: 'blue',   blue: 'red',   green: 'yellow', yellow: 'green' },
  1: { red: 'yellow', blue: 'green', green: 'blue',   yellow: 'red'   },
  2: { red: 'green',  blue: 'red',   green: 'yellow', yellow: 'blue'  },
}

const TABLE_NO_VOWEL: Record<StrikeCount, ColorMap> = {
  0: { red: 'blue',   blue: 'yellow', green: 'green',  yellow: 'red'   },
  1: { red: 'red',    blue: 'blue',   green: 'yellow', yellow: 'green' },
  2: { red: 'yellow', blue: 'green',  green: 'blue',   yellow: 'red'   },
}

// ─── Export principal ─────────────────────────────────────────────────────────

export function getSimonMapping(conditions: SimonConditions): ColorMap {
  const table = conditions.serialHasVowel ? TABLE_VOWEL : TABLE_NO_VOWEL
  return table[conditions.strikes]
}

export function solveSimon(flashedColor: SimonColor, conditions: SimonConditions): SimonColor {
  return getSimonMapping(conditions)[flashedColor]
}