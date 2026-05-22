"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { CheckCircle, Zap, DollarSign } from "lucide-react"

interface OptionCardProps {
  variant: 'original' | 'optimized' | 'budget'
  credits: number
  dollarEquiv: string
  isSelected: boolean
  onClick: () => void
  delay?: number
}

const VARIANT_CONFIG = {
  original: {
    icon: CheckCircle,
    label: 'Generate As-Is',
    sub: 'Your exact prompt',
    border: 'border-gray-700 hover:border-gray-500',
    selectedBorder: 'border-blue-500 bg-blue-500/10',
    iconColor: 'text-blue-400',
    badge: null,
  },
  optimized: {
    icon: Zap,
    label: 'Optimize It',
    sub: 'AI rewrites cheaper',
    border: 'border-gray-700 hover:border-violet-500',
    selectedBorder: 'border-violet-500 bg-violet-500/10',
    iconColor: 'text-violet-400',
    badge: 'POPULAR',
  },
  budget: {
    icon: DollarSign,
    label: 'Budget Version',
    sub: 'Core idea, low cost',
    border: 'border-gray-700 hover:border-green-500',
    selectedBorder: 'border-green-500 bg-green-500/10',
    iconColor: 'text-green-400',
    badge: 'CHEAPEST',
  },
}

export function OptionCard({ variant, credits, dollarEquiv, isSelected, onClick, delay = 0 }: OptionCardProps) {
  const config = VARIANT_CONFIG[variant]
  const Icon = config.icon

  return (
    <motion.button
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      onClick={onClick}
      className={cn(
        "relative w-full text-left rounded-xl border p-4 transition-all duration-200 cursor-pointer",
        isSelected ? config.selectedBorder : config.border,
        "bg-gray-900"
      )}
    >
      {config.badge && (
        <span className="absolute -top-2.5 left-3 text-xs font-bold px-2 py-0.5 rounded-full bg-violet-600 text-white">
          {config.badge}
        </span>
      )}
      <div className="flex items-start gap-3">
        <Icon className={cn("w-5 h-5 mt-0.5 flex-shrink-0", config.iconColor)} />
        <div className="space-y-1 min-w-0">
          <p className="text-sm font-semibold text-white">{config.label}</p>
          <p className="text-xs text-gray-500">{config.sub}</p>
          <div className="pt-1">
            <span className="text-lg font-black font-mono text-white">
              {credits.toLocaleString()}
            </span>
            <span className="text-gray-500 text-xs ml-1">credits</span>
            <p className="text-xs text-gray-600 font-mono">{dollarEquiv}</p>
          </div>
        </div>
      </div>
    </motion.button>
  )
}
