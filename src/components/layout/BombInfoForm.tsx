'use client'

import { useBombContext } from '@/app/context/BombContext'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { BombInfo, IndicatorCode, PortType } from '@/types/modules'

const INDICATOR_CODES: IndicatorCode[] = [
  'SND', 'CLR', 'CAR', 'IND', 'FRQ', 'SIG', 'NSA', 'MSA', 'TRN', 'BOB', 'FRK',
]

const PORT_TYPES: PortType[] = ['DVI', 'Parallel', 'PS2', 'RJ45', 'Serial', 'StereoRCA']

interface BombInfoFormProps {
  onClose: () => void
}

export function BombInfoForm({ onClose }: BombInfoFormProps) {
  const { bombInfo, updateBombInfo } = useBombContext()

  function handleSerialChange(event: React.ChangeEvent<HTMLInputElement>) {
    updateBombInfo({ serialNumber: event.target.value.toUpperCase() })
  }

  function handleBatteryChange(event: React.ChangeEvent<HTMLInputElement>) {
    updateBombInfo({ batteryCount: Math.max(0, parseInt(event.target.value) || 0) })
  }

  function toggleIndicator(code: IndicatorCode, isLit: boolean) {
    const exists = bombInfo.indicators.find((i) => i.code === code && i.isLit === isLit)
    if (exists) {
      updateBombInfo({ indicators: bombInfo.indicators.filter((i) => !(i.code === code && i.isLit === isLit)) })
    } else {
      const withoutCode = bombInfo.indicators.filter((i) => i.code !== code)
      updateBombInfo({ indicators: [...withoutCode, { code, isLit }] })
    }
  }

  function togglePort(port: PortType) {
    const exists = bombInfo.ports.includes(port)
    updateBombInfo({
      ports: exists ? bombInfo.ports.filter((p) => p !== port) : [...bombInfo.ports, port],
    })
  }

  return (
    <div className="flex flex-col gap-6">
      <SerialBatterySection
        serialNumber={bombInfo.serialNumber}
        batteryCount={bombInfo.batteryCount}
        onSerialChange={handleSerialChange}
        onBatteryChange={handleBatteryChange}
      />
      <IndicatorsSection
        indicators={bombInfo.indicators}
        onToggle={toggleIndicator}
      />
      <PortsSection ports={bombInfo.ports} onToggle={togglePort} />
      <Button onClick={onClose} className="w-full font-mono tracking-widest uppercase">
        Confirmer
      </Button>
    </div>
  )
}

interface SerialBatterySectionProps {
  serialNumber: string
  batteryCount: number
  onSerialChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBatteryChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function SerialBatterySection({
  serialNumber,
  batteryCount,
  onSerialChange,
  onBatteryChange,
}: SerialBatterySectionProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="flex flex-col gap-1.5">
        <Label className="font-mono text-xs tracking-widest uppercase text-muted-foreground">
          Numéro de série
        </Label>
        <Input
          value={serialNumber}
          onChange={onSerialChange}
          placeholder="AB3DE6"
          className="font-mono uppercase tracking-widest"
          maxLength={8}
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label className="font-mono text-xs tracking-widest uppercase text-muted-foreground">
          Piles
        </Label>
        <Input
          type="number"
          value={batteryCount}
          onChange={onBatteryChange}
          min={0}
          max={12}
          className="font-mono"
        />
      </div>
    </div>
  )
}

interface IndicatorsSectionProps {
  indicators: BombInfo['indicators']
  onToggle: (code: IndicatorCode, isLit: boolean) => void
}

function IndicatorsSection({ indicators, onToggle }: IndicatorsSectionProps) {
  return (
    <div className="flex flex-col gap-2">
      <Label className="font-mono text-xs tracking-widest uppercase text-muted-foreground">
        Indicateurs
      </Label>
      <div className="flex flex-wrap gap-1.5">
        {INDICATOR_CODES.map((code) => {
          const litEntry = indicators.find((i) => i.code === code && i.isLit)
          const unlitEntry = indicators.find((i) => i.code === code && !i.isLit)
          return (
            <IndicatorButton
              key={code}
              code={code}
              isLit={!!litEntry}
              isUnlit={!!unlitEntry}
              onToggleLit={() => onToggle(code, true)}
              onToggleUnlit={() => onToggle(code, false)}
            />
          )
        })}
      </div>
    </div>
  )
}

interface IndicatorButtonProps {
  code: IndicatorCode
  isLit: boolean
  isUnlit: boolean
  onToggleLit: () => void
  onToggleUnlit: () => void
}

function IndicatorButton({ code, isLit, isUnlit, onToggleLit, onToggleUnlit }: IndicatorButtonProps) {
  return (
    <div className="flex border border-border overflow-hidden">
      <button
        onClick={onToggleLit}
        className={`px-2 py-1 font-mono text-[10px] tracking-wider transition-colors ${
          isLit ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        {code}★
      </button>
      <button
        onClick={onToggleUnlit}
        className={`px-2 py-1 font-mono text-[10px] tracking-wider border-l border-border transition-colors ${
          isUnlit ? 'bg-secondary text-secondary-foreground' : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        {code}
      </button>
    </div>
  )
}

interface PortsSectionProps {
  ports: PortType[]
  onToggle: (port: PortType) => void
}

function PortsSection({ ports, onToggle }: PortsSectionProps) {
  return (
    <div className="flex flex-col gap-2">
      <Label className="font-mono text-xs tracking-widest uppercase text-muted-foreground">
        Ports
      </Label>
      <div className="flex flex-wrap gap-1.5">
        {PORT_TYPES.map((port) => (
          <button
            key={port}
            onClick={() => onToggle(port)}
            className={`px-2.5 py-1 border font-mono text-[10px] tracking-wider transition-colors ${
              ports.includes(port)
                ? 'border-primary text-primary bg-primary/10'
                : 'border-border text-muted-foreground hover:text-foreground'
            }`}
          >
            {port}
          </button>
        ))}
      </div>
    </div>
  )
}
