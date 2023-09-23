export const types = ['GPT-3', 'Codex'] as const

export type ModelType = (typeof types)[number]

export interface Model<Type = string> {
  content: string
  role: string
}

export const models: Model<ModelType>[] = [
  { role: 'user', content: 'kjsks' },
  {
    role: 'assistant',
    content:
      'I\'m sorry, but I\'m not sure what you are trying to say with "kjsks". Can you please provide more context or clarify your question?'
  },
  { role: 'user', content: 'jjbjbxz' }
]
