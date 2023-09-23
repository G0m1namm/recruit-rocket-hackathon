import { Separator } from '@/components/ui/separator'
import { ChatMessage } from './chat-message'
import { Model } from '../data/models'

export interface ChatList {
  messages: Model[]
}

export function ChatList({ messages }: ChatList) {
  if (!messages.length) {
    return null
  }

  return (
    <div className="relative mx-auto max-w-2xl px-4">
      {messages.map((message, index) => (
        <div key={index}>
          {index % 2 === 0 && index !== 0 && (
            <Separator className="my-4 md:my-8" />
          )}
          <ChatMessage message={message} />
        </div>
      ))}
    </div>
  )
}
