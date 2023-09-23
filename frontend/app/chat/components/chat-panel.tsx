'use client'

import { useState } from 'react'
import { ButtonScrollToBottom } from './button-scroll-to-bottom'
import { PromptForm } from '@/components/ui/prompt-form'
import { Model } from '../data/models'

export interface ChatPanelProps {
    isLoading: boolean,
    append: (val: any) => void,
    messages: Model[]
  id?: string
}

export function ChatPanel({
  id,
  isLoading,
  append
}: ChatPanelProps) {
    
  const [input, setInput] = useState<string>('')

  return (
    <div className="fixed inset-x-0 bottom-0 bg-gradient-to-b from-muted/10 from-10% to-muted/30 to-50%">
      <ButtonScrollToBottom />
      <div className="mx-auto sm:max-w-2xl sm:px-4">
        <div className="space-y-4 border-t bg-background px-4 py-2 shadow-lg sm:rounded-t-xl sm:border md:py-4">
          <PromptForm
            onSubmit={async value => {
              append({
                id,
                content: value,
                role: 'user'
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