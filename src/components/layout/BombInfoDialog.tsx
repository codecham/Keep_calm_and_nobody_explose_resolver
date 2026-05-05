'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useBombContext } from '@/app/context/BombContext'
import { BombInfoForm } from './BombInfoForm'
import { cn } from '@/lib/utils'

export function BombInfoDialog() {
  const [open, setOpen] = useState(false)
  const { bombInfo } = useBombContext()

  const isConfigured = bombInfo.serialNumber.length > 0

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className={cn(
          'font-mono text-xs tracking-widest uppercase h-8 px-3 border transition-colors duration-150',
          isConfigured
            ? 'border-primary text-primary hover:bg-primary/10'
            : 'border-border text-muted-foreground hover:text-foreground',
        )}
      >
        {isConfigured ? `Bombe : ${bombInfo.serialNumber}` : '⚠ Configurer la bombe'}
      </DialogTrigger>
      <DialogContent className="max-w-md rounded-none border-border bg-card">
        <DialogHeader>
          <DialogTitle className="font-mono text-sm tracking-widest uppercase text-foreground">
            Informations de la bombe
          </DialogTitle>
        </DialogHeader>
        <BombInfoForm onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}