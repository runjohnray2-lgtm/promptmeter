export type GenerationType = 'image' | 'video' | 'audio' | 'text'
export type CostTier = 'cheap' | 'medium' | 'expensive'
export type ComplexityLevel = 'Low' | 'Medium' | 'High' | 'Very High'

export interface AnalysisResult {
  type: GenerationType
  complexity: ComplexityLevel
  estimatedCredits: number
  optimizedCredits: number
  budgetCredits: number
  costTier: CostTier
  optimizedPrompt: string
  budgetPrompt: string
  breakdown: string[]
  alternative: string
  meterPercent: number
}
