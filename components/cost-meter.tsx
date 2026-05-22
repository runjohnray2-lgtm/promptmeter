"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { CostTier } from "@/types"

interface CostMeterProps {
  credits: number
  meterPercent: number
  costTier: CostTier
  dollarEquiv: string
}

const TIER_CONFIG = {
  cheap: {
    label: 'BUDGET FRIENDLY',
    barColor: 'from-green-500 to-emerald-400',
    glowColor: 'shadow-green-500/40',
    textColor: 'text-green-400',
    bgColor: 'bg-green-500/10 border-green-500/30',
    dotColor: 'bg-green-400',
  },
  medium: {
    label: 'MODERATE COST',
    barColor: 'from-yellow-500 to-amber-400',
    glowColor: 'shadow-yellow-500/40',
    textColor: 'text-yellow-400',
    bgColor: 'bg-yellow-500/10 border-yellow-500/30',
    dotColor: 'bg-yellow-400',
  },
  expensive: {
    label: 'HIGH COST',
    barColor: 'from-red-500 to-rose-400',
    glowColor: 'shadow-red-500/40',
    textColor: 'text-red-400',
    bgColor: 'bg-red-500/10 border-red-500/30',
    dotColor: 'bg-red-400',
  },
}

export function CostMeter({ credits, meterPercent, costTier, dollarEquiv }: CostMeterProps) {
  const config = TIER_CONFIG[costTier]

  return (
    <div className={cn(
      "rounded-2xl border p-6 space-y-4",
      config.bgColor
    )}>
      {/* Tier label */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={cn("w-2 h-2 rounded-full animate-pulse", config.dotColor)} />
          <span className={cn("text-xs font-bold tracking-widest", config.textColor)}>
            {config.label}
          </span>
        </div>
        <span className="text-xs text-gray-500 font-mono">CREDIT ESTIMATE</span>
      </div>

      {/* Big credit number */}
      <div className="text-center py-2">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <span className={cn("text-5xl font-black font-mono tracking-tight", config.textColor)}>
            {credits.toLocaleString()}
          </span>
          <span className="text-gray-500 text-lg ml-2">credits</span>
        </motion.div>
        <p className="text-gray-400 text-sm mt-1">{dollarEquiv} at standard rates</p>
      </div>

      {/* Visual bar */}
      <div className="space-y-2">
        <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            className={cn("h-full rounded-full bg-gradient-to-r shadow-lg", config.barColor, config.glowColor)}
            initial={{ width: 0 }}
            animate={{ width: `${meterPercent}%` }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          />
        </div>

        {/* Scale labels */}
        <div className="flex justify-between text-xs text-gray-600 font-mono">
          <span>FREE</span>
          <span>CHEAP</span>
          <span>MEDIUM</span>
          <span>EXPENSIVE</span>
          <span>🔥</span>
        </div>
      </div>
    </div>
  )
}
