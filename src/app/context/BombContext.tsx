'use client'

import { createContext, useContext, useState } from 'react'
import { BombInfo } from '../../../types/modules'

const defaultBombInfo: BombInfo = {
  serialNumber: '',
  batteryCount: 0,
  indicators: [],
  ports: [],
}

interface BombContextValue {
  bombInfo: BombInfo
  updateBombInfo: (info: Partial<BombInfo>) => void
}

const BombContext = createContext<BombContextValue | null>(null)

interface BombProviderProps {
  children: React.ReactNode
}

export function BombProvider({ children }: BombProviderProps) {
  const [bombInfo, setBombInfo] = useState<BombInfo>(defaultBombInfo)

  function updateBombInfo(info: Partial<BombInfo>) {
    setBombInfo((previous) => ({ ...previous, ...info }))
  }

  return (
    <BombContext.Provider value={{ bombInfo, updateBombInfo }}>
      {children}
    </BombContext.Provider>
  )
}

export function useBombContext(): BombContextValue {
  const context = useContext(BombContext)
  if (!context) throw new Error('useBombContext doit être utilisé dans un BombProvider')
  return context
}