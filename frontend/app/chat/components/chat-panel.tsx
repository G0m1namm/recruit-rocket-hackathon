'use client'

import { useState } from 'react'
import { ButtonScrollToBottom } from './button-scroll-to-bottom'
import { PromptForm } from '@/components/ui/prompt-form'
import { Model } from '../data/models'
import { useQueryClient } from '@tanstack/react-query'
import { Filter } from '../data/presets'
import { Badge } from '@/components/ui/badge'

export interface ChatPanelProps {
  isLoading: boolean
  append: (val: any) => void
  messages: Model[]
  id?: string
}

export function ChatPanel({ id, isLoading, append }: ChatPanelProps) {
  const [input, setInput] = useState<string>('')
  const queryClient = useQueryClient()
  const filters: Filter[] = queryClient.getQueryData(['filters']) || []

  const filterNames = filters.map(filter => filter.name)

  return (
    <div className="from-muted/10 to-muted/30 fixed inset-x-0 bottom-0 bg-gradient-to-b from-10% to-50%">
      <ButtonScrollToBottom />
      <div className="mx-auto sm:max-w-2xl sm:px-4">
        <div className="bg-background space-y-4 border-t px-4 py-2 shadow-lg sm:rounded-t-xl sm:border md:py-4">
          <PromptForm
            onSubmit={async value => {
              append({
                id,
                content: value,
                role: 'user',
                filters: filterNames
              })
            }}
            input={input}
            setInput={setInput}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  )
}
