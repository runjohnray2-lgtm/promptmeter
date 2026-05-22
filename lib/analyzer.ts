import { AnalysisResult, GenerationType, CostTier, ComplexityLevel } from '@/types'

const VIDEO_KEYWORDS = [
  'video', 'animate', 'animation', 'movie', 'clip', 'film', 'cinematic',
  'motion', 'footage', 'scene', 'reel', 'timelapse', 'slow motion', 'loop',
  'pan', 'zoom', 'fly through', 'walkthrough', 'explainer video'
]

const IMAGE_KEYWORDS = [
  'image', 'photo', 'photograph', 'picture', 'render', 'draw', 'design',
  'illustration', 'portrait', 'painting', 'logo', 'icon', 'thumbnail',
  'poster', 'artwork', 'sketch', 'watercolor', 'sticker', 'banner',
  'generate a', 'create a', 'make a', 'show me a', 'visualize'
]

const AUDIO_KEYWORDS = [
  'voice', 'speak', 'audio', 'sound', 'music', 'song', 'narrate',
  'speech', 'sing', 'tts', 'say', 'read aloud', 'voiceover', 'podcast',
  'jingle', 'soundtrack', 'sound effect', 'sfx'
]

const HIGH_QUALITY_WORDS = [
  '4k', '8k', 'hd', 'ultra hd', 'ultra', 'photorealistic', 'hyperrealistic',
  'cinematic', 'professional', 'high quality', 'high-quality', 'detailed',
  'intricate', 'sharp', 'crisp', 'stunning', 'epic', 'masterpiece',
  'award winning', 'studio quality', 'octane render', 'unreal engine'
]

const DURATION_REGEX = /(\d+)\s*(second|sec|minute|min)/gi

function detectType(prompt: string): GenerationType {
  const lower = prompt.toLowerCase()
  const videoScore = VIDEO_KEYWORDS.filter(k => lower.includes(k)).length * 2
  const imageScore = IMAGE_KEYWORDS.filter(k => lower.includes(k)).length * 2
  const audioScore = AUDIO_KEYWORDS.filter(k => lower.includes(k)).length * 2

  const max = Math.max(videoScore, imageScore, audioScore)
  if (max === 0) return prompt.length > 80 ? 'image' : 'text'
  if (videoScore >= max) return 'video'
  if (audioScore >= max && audioScore > imageScore) return 'audio'
  return 'image'
}

function getDurationSeconds(prompt: string): number {
  const matches = [...prompt.matchAll(DURATION_REGEX)]
  if (!matches.length) return 8
  const match = matches[0]
  const value = parseInt(match[1])
  const unit = match[2].toLowerCase()
  if (unit.startsWith('min')) return Math.min(value * 60, 60)
  return Math.min(value, 60)
}

function hasHighQuality(prompt: string): boolean {
  const lower = prompt.toLowerCase()
  return HIGH_QUALITY_WORDS.some(w => lower.includes(w))
}

function getMeterPercent(credits: number): number {
  // Scale: 0 = 0 credits, 100 = 500k+ credits
  if (credits <= 0) return 0
  if (credits >= 500000) return 98
  // Logarithmic scale so small differences at low end are visible
  const pct = Math.log10(credits + 1) / Math.log10(500001) * 100
  return Math.round(Math.min(98, Math.max(5, pct)))
}

export function analyzePrompt(prompt: string): AnalysisResult {
  const type = detectType(prompt)
  const isHighQuality = hasHighQuality(prompt)
  const wordCount = prompt.trim().split(/\s+/).length
  const lower = prompt.toLowerCase()

  let estimatedCredits: number
  let breakdown: string[]

  if (type === 'video') {
    const duration = getDurationSeconds(prompt)
    const baseRate = isHighQuality ? 30000 : 16000
    estimatedCredits = Math.round(baseRate * duration)
    breakdown = [
      `Video generation detected (${duration}s duration)`,
      `Model rate: ${baseRate.toLocaleString()} credits/second`,
      isHighQuality
        ? 'Premium quality keywords found — using top-tier model'
        : 'Standard quality tier selected',
      `${duration}s × ${baseRate.toLocaleString()} = ${estimatedCredits.toLocaleString()} credits`,
    ]
  } else if (type === 'image') {
    const base = isHighQuality ? 65000 : 18000
    const complexityBonus = Math.floor(wordCount / 12) * 5000
    estimatedCredits = base + complexityBonus
    breakdown = [
      `Image generation detected`,
      `Base cost: ${base.toLocaleString()} credits (${isHighQuality ? 'premium' : 'standard'} tier)`,
      wordCount > 20
        ? `+${complexityBonus.toLocaleString()} credits — ${wordCount}-word prompt adds complexity`
        : `Simple prompt — minimal complexity overhead`,
      `Total: ${estimatedCredits.toLocaleString()} credits`,
    ]
  } else if (type === 'audio') {
    const estChars = wordCount * 5
    const rate = isHighQuality ? 25 : 15
    estimatedCredits = Math.max(6000, estChars * rate)
    breakdown = [
      `Audio/speech generation detected`,
      `Estimated ~${estChars} characters of output`,
      `Rate: ${rate} credits/character (${isHighQuality ? 'premium voice' : 'standard voice'})`,
      `Total: ${estimatedCredits.toLocaleString()} credits`,
    ]
  } else {
    estimatedCredits = Math.min(4000, wordCount * 80 + 500)
    breakdown = [
      `Text/analysis task detected`,
      `${wordCount} words in prompt`,
      `Routing to low-cost language model`,
      `Total: ${estimatedCredits.toLocaleString()} credits`,
    ]
  }

  // Slight variance to feel real
  const variance = 0.93 + Math.random() * 0.14
  estimatedCredits = Math.round(estimatedCredits * variance)

  const optimizedCredits = Math.round(
    estimatedCredits * (type === 'video' ? 0.30 : type === 'image' ? 0.35 : 0.40)
  )
  const budgetCredits = Math.round(
    estimatedCredits * (type === 'video' ? 0.10 : 0.14)
  )

  const costTier: CostTier =
    estimatedCredits > 100000 ? 'expensive' :
    estimatedCredits > 20000 ? 'medium' : 'cheap'

  const complexity: ComplexityLevel =
    estimatedCredits > 200000 ? 'Very High' :
    estimatedCredits > 80000 ? 'High' :
    estimatedCredits > 20000 ? 'Medium' : 'Low'

  const alternative = buildAlternative(estimatedCredits, type)
  const optimizedPrompt = buildOptimizedPrompt(prompt, type)
  const budgetPrompt = buildBudgetPrompt(prompt, type)
  const meterPercent = getMeterPercent(estimatedCredits)

  return {
    type,
    complexity,
    estimatedCredits,
    optimizedCredits,
    budgetCredits,
    costTier,
    optimizedPrompt,
    budgetPrompt,
    breakdown,
    alternative,
    meterPercent,
  }
}

function buildAlternative(credits: number, type: GenerationType): string {
  if (type === 'video') {
    const images = Math.floor(credits / 18000)
    return `Or: Generate ${images} high-quality images for the same price`
  }
  if (type === 'image') {
    const ttsWords = Math.floor(credits / 15 / 5)
    return `Or: Generate ~${ttsWords.toLocaleString()} words of premium voiceover`
  }
  if (type === 'audio') {
    const imgs = Math.floor(credits / 18000)
    return imgs >= 1
      ? `Or: Generate ${imgs} standard image${imgs > 1 ? 's' : ''} instead`
      : `Or: Rewrite 10 prompt variations for the same cost`
  }
  return `Tip: Batch 5 similar requests together to save up to 30%`
}

function buildOptimizedPrompt(original: string, type: GenerationType): string {
  let optimized = original
    .replace(/\b(8k|4k|ultra hd|hyperrealistic|highly detailed|intricate details|masterpiece|award winning|octane render|unreal engine)\b/gi, '')
    .replace(/\s{2,}/g, ' ')
    .trim()

  if (type === 'video') {
    optimized = optimized.replace(/\b(\d+)\s*(minute|min)\b/gi, '10 seconds')
    if (!/(second|sec|s\b)/.test(optimized.toLowerCase())) {
      optimized += ', 8 seconds'
    }
    optimized += ', standard quality, smooth motion'
  } else if (type === 'image') {
    const parts = optimized.split(',')
    optimized = parts.slice(0, 4).join(',').trim()
    optimized += ', clean composition, standard quality'
  } else if (type === 'audio') {
    const words = optimized.split(' ')
    if (words.length > 60) {
      optimized = words.slice(0, 60).join(' ') + '...'
    }
  }

  return optimized.trim()
}

function buildBudgetPrompt(original: string, type: GenerationType): string {
  const words = original.trim().split(/\s+/)
  const core = words.slice(0, Math.min(12, words.length)).join(' ')

  if (type === 'video') return `${core}, 5 seconds, simple motion, fast model`
  if (type === 'image') return `${core}, simple flat style, draft quality`
  if (type === 'audio') return words.slice(0, 20).join(' ')
  return core
}

export function creditsToUSD(credits: number): string {
  const dollars = (credits / 1_000_000) * 10
  if (dollars < 0.01) return '<$0.01'
  return `~$${dollars.toFixed(2)}`
}

export const TYPE_LABELS: Record<GenerationType, { label: string; emoji: string; color: string }> = {
  image: { label: 'Image Generation', emoji: '🖼️', color: 'text-blue-400' },
  video: { label: 'Video Generation', emoji: '🎬', color: 'text-purple-400' },
  audio: { label: 'Audio / Speech', emoji: '🎙️', color: 'text-green-400' },
  text: { label: 'Text / Analysis', emoji: '📝', color: 'text-gray-400' },
}
