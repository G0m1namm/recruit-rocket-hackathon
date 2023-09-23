// Inspired by Vercel AI Chatbot and modified to fit the needs of this project
// @see https://github.com/vercel-labs/ai-chatbot/blob/main/components/chat-message.tsx

import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

import { cn } from '@/lib/utils'
import { CodeBlock } from '@/components/ui/codeblock'
import { IconOpenAI, IconUser } from '@/components/ui/icons'
import { ChatMessageActions } from './chat-message-actions'
import { Model } from '../data/models'
import { MemoizedReactMarkdown } from './markdown'
import { Skeleton } from '@/components/ui/skeleton'

export interface ChatMessageProps {
  message: Model
  isLoading?: boolean
}

export function ChatMessage({
  message,
  isLoading,
  ...props
}: ChatMessageProps) {
  return (
    <div
      className={cn(
        'group relative mb-4 items-start md:-ml-12',
        message.role === 'user' ? 'flex flex-row-reverse text-end' : 'flex'
      )}
      {...props}
    >
      <div
        className={cn(
          'flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border shadow',
          message.role === 'user'
            ? 'bg-background'
            : 'bg-primary text-primary-foreground'
        )}
      >
        {message.role === 'user' && !isLoading ? (
          <IconUser width={16} height={16} />
        ) : (
          <IconOpenAI width={16} height={16} />
        )}
      </div>
      <div
        className={cn(
          'flex-1 space-y-2 overflow-hidden px-1',
          message.role === 'user' ? 'mr-4' : 'ml-4'
        )}
      >
        {isLoading && (
          <Skeleton className="bg-primary/50 h-[20px] w-full rounded-full" />
        )}
        {!isLoading && (
          <>
            <MemoizedReactMarkdown
              className="prose dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 break-words"
              remarkPlugins={[remarkGfm, remarkMath]}
              components={{
                p({ children }) {
                  return <p className="mb-2 last:mb-0">{children}</p>
                },
                code({ node, inline, className, children, ...props }) {
                  if (children.length) {
                    if (children[0] == '▍') {
                      return (
                        <span className="mt-1 animate-pulse cursor-default">
                          ▍
                        </span>
                      )
                    }

                    children[0] = (children[0] as string).replace('`▍`', '▍')
                  }

                  const match = /language-(\w+)/.exec(className || '')

                  if (inline) {
                    return (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    )
                  }

                  return (
                    <CodeBlock
                      key={Math.random()}
                      language={(match && match[1]) || ''}
                      value={String(children).replace(/\n$/, '')}
                      {...props}
                    />
                  )
                }
              }}
            >
              {message.content}
            </MemoizedReactMarkdown>
            <ChatMessageActions message={message} />
          </>
        )}
      </div>
    </div>
  )
}
