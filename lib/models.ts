import { GenerationType } from '@/types'

export interface ModelInfo {
  id: string
  name: string
  provider: string
  logo: string
  // Pricing
  inputPer1MTokens?: number   // text: per 1M input tokens
  outputPer1MTokens?: number  // text: per 1M output tokens
  costPerImage?: number        // image: per image (USD)
  costPerSecond?: number       // video: per second (USD)
  costPerKChars?: number       // audio: per 1000 characters (USD)
  speed: 'fast' | 'medium' | 'slow'
  quality: 'budget' | 'standard' | 'premium'
  notes?: string
  types: GenerationType[]
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
  },
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    provider: 'OpenAI',
    logo: '🟢',
    inputPer1MTokens: 2.50,
    outputPer1MTokens: 10.00,
    speed: 'fast',
    quality: 'premium',
    types: ['text'],
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
    notes: 'Fastest, cheapest',
    types: ['image'],
  },
  {
    id: 'sd-35',
    name: 'Stable Diffusion 3.5',
    provider: 'Stability AI',
    logo: '🟣',
    costPerImage: 0.035,
    speed: 'medium',
    quality: 'standard',
    types: ['image'],
  },
  {
    id: 'dalle-3',
    name: 'DALL-E 3',
    provider: 'OpenAI',
    logo: '🟢',
    costPerImage: 0.040,
    speed: 'medium',
    quality: 'premium',
    types: ['image'],
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
  },
  {
    id: 'dalle-3-hd',
    name: 'DALL-E 3 HD',
    provider: 'OpenAI',
    logo: '🟢',
    costPerImage: 0.080,
    speed: 'slow',
    quality: 'premium',
    notes: 'Highest OpenAI quality',
    types: ['image'],
  },
  {
    id: 'ideogram-2',
    name: 'Ideogram 2.0',
    provider: 'Ideogram',
    logo: '🎨',
    costPerImage: 0.080,
    speed: 'medium',
    quality: 'premium',
    notes: 'Best for text in images',
    types: ['image'],
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
    quality: 'premium',
    types: ['video'],
  },
  {
    id: 'pika-2',
    name: 'Pika 2.0',
    provider: 'Pika Labs',
    logo: '🎯',
    costPerSecond: 0.08,
    speed: 'fast',
    quality: 'standard',
    types: ['video'],
  },
  {
    id: 'seedance-20',
    name: 'Seedance 2.0',
    provider: 'ByteDance',
    logo: '🌱',
    costPerSecond: 0.09,
    speed: 'medium',
    quality: 'premium',
    notes: 'Used on Magica platform',
    types: ['video'],
  },
  {
    id: 'kling-16',
    name: 'Kling 1.6',
    provider: 'Kuaishou',
    logo: '🎭',
    costPerSecond: 0.10,
    speed: 'medium',
    quality: 'premium',
    types: ['video'],
  },
  {
    id: 'sora',
    name: 'Sora',
    provider: 'OpenAI',
    logo: '🟢',
    costPerSecond: 0.15,
    speed: 'slow',
    quality: 'premium',
    notes: 'OpenAI flagship video',
    types: ['video'],
  },
]

// ── AUDIO MODELS ─────────────────────────────────────────
export const AUDIO_MODELS: ModelInfo[] = [
  {
    id: 'openai-tts',
    name: 'OpenAI TTS',
    provider: 'OpenAI',
    logo: '🟢',
    costPerKChars: 0.015,
    speed: 'fast',
    quality: 'standard',
    notes: 'Cheapest option',
    types: ['audio'],
  },
  {
    id: 'elevenlabs',
    name: 'ElevenLabs',
    provider: 'ElevenLabs',
    logo: '🎙️',
    costPerKChars: 0.30,
    speed: 'fast',
    quality: 'premium',
    notes: 'Best voice quality',
    types: ['audio'],
  },
  {
    id: 'playht',
    name: 'PlayHT 2.0',
    provider: 'PlayHT',
    logo: '🎵',
    costPerKChars: 0.30,
    speed: 'medium',
    quality: 'premium',
    types: ['audio'],
  },
]

export function getModelsForType(type: GenerationType): ModelInfo[] {
  switch (type) {
    case 'text': return TEXT_MODELS
    case 'image': return IMAGE_MODELS
    case 'video': return VIDEO_MODELS
    case 'audio': return AUDIO_MODELS
    default: return TEXT_MODELS
  }
}

export function calcModelCost(
  model: ModelInfo,
  type: GenerationType,
  promptText: string,
  durationSeconds = 8
): ModelCostResult {
  const wordCount = promptText.trim().split(/\s+/).length
  let totalUSD = 0
  let breakdown = ''

  if (type === 'text' && model.inputPer1MTokens && model.outputPer1MTokens) {
    const inputTokens = wordCount * 1.3
    const outputTokens = wordCount * 2.6  // estimated output
    const inputCost = (inputTokens / 1_000_000) * model.inputPer1MTokens
    const outputCost = (outputTokens / 1_000_000) * model.outputPer1MTokens
    totalUSD = inputCost + outputCost
    breakdown = `~${Math.round(inputTokens)} input + ~${Math.round(outputTokens)} output tokens`
  } else if (type === 'image' && model.costPerImage) {
    totalUSD = model.costPerImage
    breakdown = `flat rate per image`
  } else if (type === 'video' && model.costPerSecond) {
    totalUSD = model.costPerSecond * durationSeconds
    breakdown = `${model.costPerSecond}/sec × ${durationSeconds}s`
  } else if (type === 'audio' && model.costPerKChars) {
    const chars = wordCount * 5
    totalUSD = (chars / 1000) * model.costPerKChars
    breakdown = `~${chars} chars @ $${model.costPerKChars}/1K`
  }

  return { model, totalUSD, breakdown }
}

export function getDuration(prompt: string): number {
  const match = prompt.match(/(\d+)\s*(second|sec|minute|min)/i)
  if (!match) return 8
  const val = parseInt(match[1])
  return match[2].toLowerCase().startsWith('min') ? Math.min(val * 60, 60) : Math.min(val, 60)
}
