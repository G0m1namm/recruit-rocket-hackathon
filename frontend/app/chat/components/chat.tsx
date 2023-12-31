import React from 'react'
import { Model } from '../data/models'
import { Metadata } from 'next'
import { PresetSelector } from './preset-selector'
import { Separator } from '@radix-ui/react-separator'
import { ChatList } from './chat-list'
import { ChatScrollAnchor } from './chat-scroll-anchor'
import { EmptyScreen } from './empty-screen'
import { ChatPanel } from './chat-panel'
import { Filter, presets } from '../data/presets'
import ChatFilters from './chat-filters'

export const metadata: Metadata = {
  title: 'Playground',
  description: 'The OpenAI Playground built using the components.'
}

type Props = {
  messages: Model[]
  isLoading: boolean
  append: (val: any) => void
  filters: Filter[]
}

export default function Chat({ messages, isLoading, filters, append }: Props) {
  const id = crypto.randomUUID()

  return (
    <div className="flex h-full flex-col">
      <div className="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
        <h2 className="whitespace-nowrap text-lg font-semibold">
          Chat with your resumes
        </h2>
      </div>
      <Separator />
      <div className="container h-full py-6">
        <div className="grid h-full items-stretch gap-6">
          <div className="md:order-1">
            <div className="mt-0 border-0 p-0">
              <div className="flex h-full flex-col space-y-4">
                <div className="pb-[200px] pt-4 md:pt-10">
                  <ChatFilters filters={filters} />

                  <div className="mb-4 flex w-full justify-center">
                    <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                      Chat
                    </h2>
                  </div>
                  {messages.length ? (
                    <>
                      <ChatList messages={messages} isLoading={isLoading} />
                      <ChatScrollAnchor trackVisibility={isLoading} />
                    </>
                  ) : (
                    <EmptyScreen />
                  )}
                </div>
                <ChatPanel
                  id={id}
                  isLoading={isLoading}
                  append={append}
                  messages={messages}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
