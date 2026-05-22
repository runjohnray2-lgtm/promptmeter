"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CostMeter } from "@/components/cost-meter"
import { OptionCard } from "@/components/option-card"
import { ModelComparison } from "@/components/model-comparison"
import { analyzePrompt, creditsToUSD, TYPE_LABELS } from "@/lib/analyzer"
import { AnalysisResult } from "@/types"
import { cn } from "@/lib/utils"
import {
  Zap, RefreshCw, Copy, CheckCircle, ChevronDown, ChevronUp, Info
} from "lucide-react"

type Phase = 'input' | 'analyzing' | 'results'

const ANALYSIS_STEPS = [
  'Reading your prompt...',
  'Detecting generation type...',
  'Calculating credit cost...',
]

const COMPLEXITY_CONFIG = {
  Low:        { color: 'text-green-400',  bg: 'bg-green-500/10 border-green-500/30' },
  Medium:     { color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/30' },
  High:       { color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/30' },
  'Very High':{ color: 'text-red-400',    bg: 'bg-red-500/10 border-red-500/30' },
}

export function PromptAnalyzer() {
  const [prompt, setPrompt]               = useState('')
  const [phase, setPhase]                 = useState<Phase>('input')
  const [analysisStep, setAnalysisStep]   = useState(0)
  const [result, setResult]               = useState<AnalysisResult | null>(null)
  const [selectedOption, setSelectedOption] = useState<'original' | 'optimized' | 'budget' | null>(null)
  const [showBreakdown, setShowBreakdown] = useState(false)
  const [copied, setCopied]               = useState(false)

  const runAnalysis = useCallback(async () => {
    if (!prompt.trim() || prompt.trim().split(/\s+/).length < 3) return
    setPhase('analyzing')
    setAnalysisStep(0)
    setSelectedOption(null)
    setShowBreakdown(false)

    await new Promise(r => setTimeout(r, 600))
    setAnalysisStep(1)
    await new Promise(r => setTimeout(r, 600))
    setAnalysisStep(2)
    await new Promise(r => setTimeout(r, 700))

    setResult(analyzePrompt(prompt))
    setPhase('results')
  }, [prompt])

  const reset = useCallback(() => {
    setPhase('input')
    setResult(null)
    setSelectedOption(null)
    setPrompt('')
    setShowBreakdown(false)
  }, [])

  const copyPrompt = useCallback((text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }, [])

  const displayedPrompt =
    !result || !selectedOption ? null :
    selectedOption === 'optimized' ? result.optimizedPrompt :
    selectedOption === 'budget'    ? result.budgetPrompt    : null

  const wordCount = prompt.trim().split(/\s+/).filter(Boolean).length

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      {/* Header */}
      <header className="border-b border-gray-800/50 bg-gray-950/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-black text-lg tracking-tight">PromptMeter</span>
            <span className="text-xs px-1.5 py-0.5 rounded bg-violet-600/20 text-violet-400 border border-violet-600/30 font-mono">BETA</span>
          </div>
          <p className="text-xs text-gray-500 hidden sm:block">Know the cost. Make the call.</p>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-10 space-y-8">

        {/* Hero */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            Stop burning credits on{' '}
            <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
              bad prompts.
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Paste your prompt. See the real cost before you generate.
            Then decide — run it, optimize it, or shop the cheapest provider.
          </p>
        </div>

        <AnimatePresence mode="wait">

          {/* ── INPUT ─────────────────────────────── */}
          {phase === 'input' && (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="space-y-4"
            >
              <div className="relative">
                <Textarea
                  value={prompt}
                  onChange={e => setPrompt(e.target.value)}
                  placeholder="Paste your AI prompt here..."
                  className="min-h-[160px] bg-gray-900 border-gray-700 text-white placeholder:text-gray-600 text-base resize-none focus:border-violet-500 transition-colors rounded-xl"
                  onKeyDown={e => {
                    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) runAnalysis()
                  }}
                />
                {wordCount > 0 && (
                  <div className="absolute bottom-3 right-3 text-xs text-gray-600 font-mono">
                    {wordCount} words
                  </div>
                )}
              </div>

              <Button
                onClick={runAnalysis}
                disabled={wordCount < 3}
                className="w-full h-12 text-base font-bold bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 border-0 rounded-xl disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <Zap className="w-4 h-4 mr-2" />
                Analyze My Prompt
              </Button>
            </motion.div>
          )}

          {/* ── ANALYZING ─────────────────────────── */}
          {phase === 'analyzing' && (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-16 flex flex-col items-center gap-6"
            >
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-600 to-blue-600 opacity-40"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ repeat: Infinity, duration: 1.2 }}
                />
              </div>
              <div className="space-y-3 w-full max-w-xs">
                {ANALYSIS_STEPS.map((step, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={cn(
                      "w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300",
                      i < analysisStep  ? 'bg-violet-600' :
                      i === analysisStep ? 'bg-violet-600 animate-pulse' : 'bg-gray-800'
                    )}>
                      {i < analysisStep && <CheckCircle className="w-3 h-3 text-white" />}
                    </div>
                    <span className={cn("text-sm transition-colors",
                      i <= analysisStep ? 'text-white' : 'text-gray-600'
                    )}>
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── RESULTS ───────────────────────────── */}
          {phase === 'results' && result && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >

              {/* Type + Complexity badges */}
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-2 bg-gray-900 border border-gray-800 rounded-xl px-4 py-2">
                  <span className="text-xl">{TYPE_LABELS[result.type].emoji}</span>
                  <span className={cn("font-semibold text-sm", TYPE_LABELS[result.type].color)}>
                    {TYPE_LABELS[result.type].label}
                  </span>
                </div>
                <div className={cn(
                  "flex items-center gap-2 rounded-xl px-4 py-2 border",
                  COMPLEXITY_CONFIG[result.complexity].bg
                )}>
                  <span className={cn("text-sm font-semibold", COMPLEXITY_CONFIG[result.complexity].color)}>
                    {result.complexity} Complexity
                  </span>
                </div>
              </div>

              {/* Cost Meter */}
              <CostMeter
                credits={result.estimatedCredits}
                meterPercent={result.meterPercent}
                costTier={result.costTier}
                dollarEquiv={creditsToUSD(result.estimatedCredits)}
              />

              {/* Alternative tip */}
              <div className="flex items-start gap-2 text-sm text-gray-500">
                <Info className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-600" />
                <span>{result.alternative}</span>
              </div>

              {/* Breakdown toggle */}
              <button
                onClick={() => setShowBreakdown(v => !v)}
                className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-300 transition-colors"
              >
                {showBreakdown ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                {showBreakdown ? 'Hide' : 'Show'} cost breakdown
              </button>

              <AnimatePresence>
                {showBreakdown && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 space-y-2">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">How we calculated this</p>
                      {result.breakdown.map((line, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm">
                          <span className="text-gray-600 font-mono text-xs mt-0.5">{i + 1}.</span>
                          <span className="text-gray-300">{line}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <Separator className="bg-gray-800" />

              {/* ── PROVIDER COMPARISON (new!) ── */}
              <ModelComparison prompt={prompt} type={result.type} />

              <Separator className="bg-gray-800" />

              {/* Three options */}
              <div className="space-y-3">
                <p className="text-sm font-semibold text-gray-400">What do you want to do?</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <OptionCard
                    variant="original"
                    credits={result.estimatedCredits}
                    dollarEquiv={creditsToUSD(result.estimatedCredits)}
                    isSelected={selectedOption === 'original'}
                    onClick={() => setSelectedOption('original')}
                    delay={0}
                  />
                  <OptionCard
                    variant="optimized"
                    credits={result.optimizedCredits}
                    dollarEquiv={creditsToUSD(result.optimizedCredits)}
                    isSelected={selectedOption === 'optimized'}
                    onClick={() => setSelectedOption('optimized')}
                    delay={0.05}
                  />
                  <OptionCard
                    variant="budget"
                    credits={result.budgetCredits}
                    dollarEquiv={creditsToUSD(result.budgetCredits)}
                    isSelected={selectedOption === 'budget'}
                    onClick={() => setSelectedOption('budget')}
                    delay={0.1}
                  />
                </div>
              </div>

              {/* Rewritten prompt */}
              <AnimatePresence>
                {displayedPrompt && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="bg-gray-900 border border-gray-800 rounded-xl p-4 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                        {selectedOption === 'optimized' ? '✏️ Optimized Prompt' : '💡 Budget Prompt'}
                      </p>
                      <button
                        onClick={() => copyPrompt(displayedPrompt)}
                        className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-white transition-colors px-2 py-1 rounded-lg hover:bg-gray-800"
                      >
                        {copied
                          ? <><CheckCircle className="w-3 h-3 text-green-400" /><span className="text-green-400">Copied!</span></>
                          : <><Copy className="w-3 h-3" />Copy</>
                        }
                      </button>
                    </div>
                    <p className="text-sm text-gray-200 leading-relaxed">{displayedPrompt}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <span>Savings vs original:</span>
                      <span className="text-green-400 font-mono font-bold">
                        {Math.round((1 - (selectedOption === 'optimized'
                          ? result.optimizedCredits
                          : result.budgetCredits) / result.estimatedCredits) * 100)}% fewer credits
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {selectedOption === 'original' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-4"
                >
                  <p className="text-xs text-blue-400 font-bold uppercase tracking-wider mb-2">Your Original Prompt</p>
                  <p className="text-sm text-gray-300 leading-relaxed">{prompt}</p>
                </motion.div>
              )}

              {/* Reset */}
              <Button
                onClick={reset}
                variant="outline"
                className="w-full border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 bg-transparent rounded-xl"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Analyze Another Prompt
              </Button>

            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer strip */}
        <div className="border-t border-gray-800/50 pt-6 grid grid-cols-3 gap-4 text-center">
          {[
            { value: '15+ LLMs', label: 'Compared' },
            { value: 'Real Prices', label: 'API Data' },
            { value: 'Free', label: 'To Use' },
          ].map((stat, i) => (
            <div key={i} className="space-y-1">
              <p className="text-lg font-black text-white">{stat.value}</p>
              <p className="text-xs text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

      </main>
    </div>
  )
}
