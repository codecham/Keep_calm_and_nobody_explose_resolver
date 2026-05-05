export type WireColor = 'red' | 'blue' | 'yellow' | 'white' | 'black'

export type ButtonColor = 'red' | 'blue' | 'yellow' | 'white'

export type ButtonLabel = 'abort' | 'detonate' | 'hold' | 'press'

export type IndicatorCode = 'SND' | 'CLR' | 'CAR' | 'IND' | 'FRQ' | 'SIG' | 'NSA' | 'MSA' | 'TRN' | 'BOB' | 'FRK'

export type PortType = 'DVI' | 'Parallel' | 'PS2' | 'RJ45' | 'Serial' | 'StereoRCA'

export interface BombInfo {
  serialNumber: string
  batteryCount: number
  indicators: { code: IndicatorCode; isLit: boolean }[]
  ports: PortType[]
}