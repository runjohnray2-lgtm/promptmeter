import { GenerationType } from '@/types'

export interface ModelInfo {
  id: string
  name: string
  provider: string
  logo: string
  // Pricing
  inputPer1MTokens?: number
  outputPer1MTokens?: number
  costPerImage?: number
  costPerSecond?: number
  costPerKChars?: number
  speed: 'fast' | 'medium' | 'slow'
  quality: 'budget' | 'standard' | 'premium'
  notes?: string
  types: GenerationType[]
  // "Use This" button
  url: string
  canPrefill: boolean
}

export interface ModelCostResult {
  model: ModelInfo
  totalUSD: number
  breakdown: string
}

// ── TEXT MODELS ──────────────────────────────────────────
export const TEXT_MODELS: ModelInfo[] = [
  {
    id: 'deepseek-v3',
    name: 'DeepSeek V3',
    provider: 'DeepSeek',
    logo: '🇨🇳',
    inputPer1MTokens: 0.27,
    outputPer1MTokens: 1.10,
    speed: 'fast',
    quality: 'standard',
    notes: 'Cheapest smart model',
    types: ['text'],
    url: 'https://chat.deepseek.com',
    canPrefill: false,
  },
  {
    id: 'gemini-flash',
    name: 'Gemini 2.0 Flash',
    provider: 'Google',
    logo: '🔵',
    inputPer1MTokens: 0.10,
    outputPer1MTokens: 0.40,
    speed: 'fast',
    quality: 'standard',
    notes: 'Fast and cheap',
    types: ['text'],
    url: 'https://gemini.google.com/app',
    canPrefill: true,
  },
  {
    id: 'gpt-4o-mini',
    name: 'GPT-4o mini',
    provider: 'OpenAI',
    logo: '🟢',
    inputPer1MTokens: 0.15,
    outputPer1MTokens: 0.60,
    speed: 'fast',
    quality: 'standard',
    notes: 'OpenAI budget tier',
    types: ['text'],
    url: 'https://chatgpt.com',
    canPrefill: true,
  },
  {
    id: 'claude-haiku',
    name: 'Claude 3.5 Haiku',
    provider: 'Anthropic',
    logo: '🟠',
    inputPer1MTokens: 0.80,
    outputPer1MTokens: 4.00,
    speed: 'fast',
    quality: 'standard',
    types: ['text'],
    url: 'https://claude.ai/new',
    canPrefill: true,
  },
  {
    id: 'gemini-pro',
    name: 'Gemini 1.5 Pro',
    provider: 'Google',
    logo: '🔵',
    inputPer1MTokens: 1.25,
    outputPer1MTokens: 5.00,
    speed: 'medium',
    quality: 'premium',
    types: ['text'],
    url: 'https://gemini.google.com/app',
    canPrefill: true,
  },
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    provider: 'OpenAI',
    logo: '🟢',
    inputPer1MTokens: 2.50,
    outputPer1MTokens: 10.00,
    speed: 'medium',
    quality: 'premium',
    types: ['text'],
    url: 'https://chatgpt.com',
    canPrefill: true,
  },
  {
    id: 'claude-sonnet',
    name: 'Claude 3.5 Sonnet',
    provider: 'Anthropic',
    logo: '🟠',
    inputPer1MTokens: 3.00,
    outputPer1MTokens: 15.00,
    speed: 'medium',
    quality: 'premium',
    types: ['text'],
    url: 'https://claude.ai/new',
    canPrefill: true,
  },
]

// ── IMAGE MODELS ─────────────────────────────────────────
export const IMAGE_MODELS: ModelInfo[] = [
  {
    id: 'flux-schnell',
    name: 'Flux Schnell',
    provider: 'Black Forest Labs',
    logo: '⚡',
    costPerImage: 0.003,
    speed: 'fast',
    quality: 'budget',
    notes: 'Fastest & cheapest',
    types: ['image'],
    url: 'https://fal.ai/models/fal-ai/flux/schnell',
    canPrefill: false,
  },
  {
    id: 'stable-diffusion',
    name: 'Stable Diffusion 3.5',
    provider: 'Stability AI',
    logo: '🟣',
    costPerImage: 0.035,
    speed: 'medium',
    quality: 'standard',
    types: ['image'],
    url: 'https://stability.ai/stable-image',
    canPrefill: false,
  },
  {
    id: 'dalle-3',
    name: 'DALL-E 3',
    provider: 'OpenAI',
    logo: '🟢',
    costPerImage: 0.040,
    speed: 'medium',
    quality: 'standard',
    types: ['image'],
    url: 'https://chatgpt.com',
    canPrefill: true,
  },
  {
    id: 'flux-pro',
    name: 'Flux Pro',
    provider: 'Black Forest Labs',
    logo: '⚡',
    costPerImage: 0.055,
    speed: 'medium',
    quality: 'premium',
    types: ['image'],
    url: 'https://fal.ai/models/fal-ai/flux-pro',
    canPrefill: false,
  },
  {
    id: 'dalle-3-hd',
    name: 'DALL-E 3 HD',
    provider: 'OpenAI',
    logo: '🟢',
    costPerImage: 0.080,
    speed: 'slow',
    quality: 'premium',
    types: ['image'],
    url: 'https://chatgpt.com',
    canPrefill: true,
  },
  {
    id: 'ideogram',
    name: 'Ideogram 2.0',
    provider: 'Ideogram',
    logo: '🎨',
    costPerImage: 0.080,
    speed: 'medium',
    quality: 'premium',
    notes: 'Best text-in-image',
    types: ['image'],
    url: 'https://ideogram.ai',
    canPrefill: false,
  },
  {
    id: 'midjourney',
    name: 'Midjourney v6',
    provider: 'Midjourney',
    logo: '🌀',
    costPerImage: 0.10,
    speed: 'medium',
    quality: 'premium',
    notes: 'Artistic quality leader',
    types: ['image'],
    url: 'https://www.midjourney.com',
    canPrefill: false,
  },
]

// ── VIDEO MODELS ─────────────────────────────────────────
export const VIDEO_MODELS: ModelInfo[] = [
  {
    id: 'runway-gen3',
    name: 'Runway Gen-3',
    provider: 'Runway',
    logo: '🎬',
    costPerSecond: 0.05,
    speed: 'medium',
    quality: 'standard',
    types: ['video'],
    url: 'https://runwayml.com',
    canPrefill: false,
  },
  {
    id: 'pika',
    name: 'Pika 2.0',
    provider: 'Pika Labs',
    logo: '🎭',
    costPerSecond: 0.08,
    speed: 'fast',
    quality: 'standard',
    types: ['video'],
    url: 'https://pika.art',
    canPrefill: false,
  },
  {
    id: 'seedance',
    name: 'Seedance 2.0',
    provider: 'ByteDance',
    logo: '🌱',
    costPerSecond: 0.10,
    speed: 'medium',
    quality: 'premium',
    types: ['video'],
    url: 'https://seedance.ai',
    canPrefill: false,
  },
  {
    id: 'kling',
    name: 'Kling 1.6',
    provider: 'Kuaishou',
    logo: '🎯',
    costPerSecond: 0.12,
    speed: 'medium',
    quality: 'premium',
    types: ['video'],
    url: 'https://klingai.com',
    canPrefill: false,
  },
  {
    id: 'sora',
    name: 'Sora',
    provider: 'OpenAI',
    logo: '🟢',
    costPerSecond: 0.15,
    speed: 'slow',
    quality: 'premium',
    notes: 'Highest quality video',
    types: ['video'],
    url: 'https://sora.com',
    canPrefill: false,
  },
]

// ── AUDIO MODELS ─────────────────────────────────────────
export const AUDIO_MODELS: ModelInfo[] = [
  {
    id: 'openai-tts',
    name: 'OpenAI TTS',
    provider: 'OpenAI',
    logo: '🟢',
    costPerKChars: 15.00,
    speed: 'fast',
    quality: 'standard',
    types: ['audio'],
    url: 'https://platform.openai.com/playground/tts',
    canPrefill: false,
  },
  {
    id: 'elevenlabs',
    name: 'ElevenLabs',
    provider: 'ElevenLabs',
    logo: '🔊',
    costPerKChars: 300.00,
    speed: 'fast',
    quality: 'premium',
    notes: 'Most realistic voices',
    types: ['audio'],
    url: 'https://elevenlabs.io',
    canPrefill: false,
  },
]

// ── HELPERS ──────────────────────────────────────────────
export function getModelsForType(type: GenerationType): ModelInfo[] {
  const all = [...TEXT_MODELS, ...IMAGE_MODELS, ...VIDEO_MODELS, ...AUDIO_MODELS]
  return all.filter(m => m.types.includes(type))
}

const AVG_CHARS_PER_TOKEN = 4
const AVG_OUTPUT_MULTIPLIER = 3

export function getDuration(prompt: string): number {
  const lower = prompt.toLowerCase()
  const match = lower.match(/(\d+)\s*(?:second|sec|s\b)/)
  if (match) return parseInt(match[1])
  if (lower.includes('short')) return 5
  if (lower.includes('long')) return 30
  if (lower.includes('minute')) return 60
  return 10
}

export function calcModelCost(
  model: ModelInfo,
  type: GenerationType,
  prompt: string,
  duration: number
): ModelCostResult {
  let totalUSD = 0
  let breakdown = ''

  if (model.inputPer1MTokens) {
    const inputTokens = Math.ceil(prompt.length / AVG_CHARS_PER_TOKEN)
    const outputTokens = inputTokens * AVG_OUTPUT_MULTIPLIER
    const inputCost = (inputTokens / 1_000_000) * model.inputPer1MTokens
    const outputCost = (outputTokens / 1_000_000) * (model.outputPer1MTokens ?? model.inputPer1MTokens)
    totalUSD = inputCost + outputCost
    breakdown = `~${inputTokens + outputTokens} tokens`
  } else if (model.costPerImage) {
    totalUSD = model.costPerImage
    breakdown = 'per image'
  } else if (model.costPerSecond) {
    totalUSD = model.costPerSecond * duration
    breakdown = `${duration}s @ $${model.costPerSecond}/s`
  } else if (model.costPerKChars) {
    const chars = prompt.length
    totalUSD = (chars / 1000) * (model.costPerKChars / 1000)
    breakdown = `${chars} chars`
  }

  return { model, totalUSD, breakdown }
}
