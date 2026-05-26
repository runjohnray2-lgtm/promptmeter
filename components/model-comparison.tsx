"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { getModelsForType, calcModelCost, getDuration, ModelCostResult } from "@/lib/models"
import { GenerationType } from "@/types"
import { CheckCircle, ChevronDown, ChevronUp, ExternalLink, Copy, Check } from "lucide-react"

interface ModelComparisonProps {
  prompt: string
  type: GenerationType
}

const SPEED_LABEL = { fast: '⚡ Fast', medium: '⏱ Medium', slow: '🐢 Slow' }
const QUALITY_COLOR = {
  budget: 'text-gray-400',
  standard: 'text-blue-400',
  premium: 'text-violet-400',
}

function buildUrl(baseUrl: string, prompt: string, canPrefill: boolean): string {
  if (!canPrefill) return baseUrl
  const encoded = encodeURIComponent(prompt)
  if (baseUrl.includes('chatgpt.com')) return `https://chatgpt.com/?q=${encoded}`
  if (baseUrl.includes('claude.ai')) return `https://claude.ai/new?q=${encoded}`
  if (baseUrl.includes('gemini.google.com')) return `https://gemini.google.com/app?q=${encoded}`
  return baseUrl
}

export function ModelComparison({ prompt, type }: ModelComparisonProps) {
  const allModels = getModelsForType(type)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(
    new Set(allModels.map(m => m.id))
  )
  const [open, setOpen] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const duration = useMemo(() => getDuration(prompt), [prompt])

  const results: ModelCostResult[] = useMemo(() => {
    return allModels
      .filter(m => selectedIds.has(m.id))
      .map(m => calcModelCost(m, type, prompt, duration))
      .sort((a, b) => a.totalUSD - b.totalUSD)
  }, [allModels, selectedIds, type, prompt, duration])

  const maxCost = results.length > 0 ? Math.max(...results.map(r => r.totalUSD)) : 1

  const toggle = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) {
        if (next.size > 1) next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const handleUseThis = async (result: ModelCostResult) => {
    // Always copy prompt to clipboard
    try {
      await navigator.clipboard.writeText(prompt)
      setCopiedId(result.model.id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch {}

    // Open in new tab
    const url = buildUrl(result.model.url, prompt, result.model.canPrefill)
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const formatUSD = (usd: number) => {
    if (usd < 0.001) return '<$0.001'
    if (usd < 0.01) return `$${usd.toFixed(4)}`
    if (usd < 1) return `$${usd.toFixed(3)}`
    return `$${usd.toFixed(2)}`
  }

  return (
    <div className="rounded-2xl border border-gray-800 bg-gray-900/50 overflow-hidden">
      {/* Header toggle */}
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-800/40 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-lg">💸</span>
          <div className="text-left">
            <p className="text-sm font-bold text-white">Compare Providers</p>
            <p className="text-xs text-gray-500">
              See which LLM is cheapest — then use it in one click
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {!open && results.length > 0 && (
            <span className="text-xs text-green-400 font-mono font-bold">
              Cheapest: {formatUSD(results[0]?.totalUSD)}
            </span>
          )}
          {open
            ? <ChevronUp className="w-4 h-4 text-gray-500" />
            : <ChevronDown className="w-4 h-4 text-gray-500" />
          }
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-4">

              {/* Model toggles */}
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-2">
                  Select models to compare
                </p>
                <div className="flex flex-wrap gap-2">
                  {allModels.map(m => {
                    const isOn = selectedIds.has(m.id)
                    return (
                      <button
                        key={m.id}
                        onClick={() => toggle(m.id)}
                        className={cn(
                          "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all",
                          isOn
                            ? "bg-violet-600/20 border-violet-500/50 text-violet-300"
                            : "bg-gray-800 border-gray-700 text-gray-500 hover:border-gray-500"
                        )}
                      >
                        <span>{m.logo}</span>
                        <span>{m.name}</span>
                        {isOn && <CheckCircle className="w-3 h-3" />}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Results */}
              <div className="space-y-2">
                <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">
                  Sorted cheapest → most expensive
                </p>

                {results.map((r, i) => {
                  const pct = maxCost > 0 ? (r.totalUSD / maxCost) * 100 : 0
                  const isCheapest = i === 0
                  const isMostExpensive = i === results.length - 1 && results.length > 1
                  const isCopied = copiedId === r.model.id

                  return (
                    <motion.div
                      key={r.model.id}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className={cn(
                        "rounded-xl border p-3 transition-colors",
                        isCheapest
                          ? "border-green-500/40 bg-green-500/5"
                          : "border-gray-800 bg-gray-900"
                      )}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-base">{r.model.logo}</span>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold text-white">
                                {r.model.name}
                              </span>
                              {isCheapest && (
                                <span className="text-xs px-1.5 py-0.5 rounded-full bg-green-600 text-white font-bold">
                                  CHEAPEST
                                </span>
                              )}
                              {isMostExpensive && (
                                <span className="text-xs px-1.5 py-0.5 rounded-full bg-red-900/60 text-red-400 font-bold">
                                  PRICIEST
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <span>{r.model.provider}</span>
                              <span>·</span>
                              <span>{SPEED_LABEL[r.model.speed]}</span>
                              <span>·</span>
                              <span className={QUALITY_COLOR[r.model.quality]}>
                                {r.model.quality}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="text-right mr-1">
                            <p className={cn(
                              "text-base font-black font-mono",
                              isCheapest ? "text-green-400" : "text-white"
                            )}>
                              {formatUSD(r.totalUSD)}
                            </p>
                            <p className="text-xs text-gray-600">{r.breakdown}</p>
                          </div>

                          {/* USE THIS BUTTON */}
                          <button
                            onClick={() => handleUseThis(r)}
                            className={cn(
                              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap",
                              isCheapest
                                ? "bg-green-500 hover:bg-green-400 text-black"
                                : "bg-gray-700 hover:bg-gray-600 text-white border border-gray-600"
                            )}
                          >
                            {isCopied ? (
                              <><Check className="w-3 h-3" />Copied!</>
                            ) : (
                              <>Use This <ExternalLink className="w-3 h-3" /></>
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Bar */}
                      <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                          className={cn(
                            "h-full rounded-full",
                            isCheapest ? "bg-green-500" :
                            pct > 66 ? "bg-red-500" :
                            pct > 33 ? "bg-yellow-500" : "bg-blue-500"
                          )}
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.max(pct, 4)}%` }}
                          transition={{ delay: i * 0.04 + 0.1, duration: 0.5, ease: "easeOut" }}
                        />
                      </div>

                      {/* Pre-fill note */}
                      {r.model.canPrefill && (
                        <p className="text-xs text-blue-400/70 mt-1.5">
                          ✨ Your prompt will be pre-filled automatically
                        </p>
                      )}
                      {!r.model.canPrefill && (
                        <p className="text-xs text-gray-600 mt-1.5">
                          📋 Prompt copied to clipboard — paste it when you arrive
                        </p>
                      )}

                      {r.model.notes && (
                        <p className="text-xs text-gray-600 mt-1 italic">{r.model.notes}</p>
                      )}
                    </motion.div>
                  )
                })}
              </div>

              {/* Disclaimer */}
              <p className="text-xs text-gray-600 leading-relaxed border-t border-gray-800 pt-3">
                ⚠️ These are direct <strong className="text-gray-500">API list prices</strong> in USD.
                Platform credits include infrastructure, uptime, and markup — actual cost may differ.
                Use this as a relative comparison to find the best value.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
