'use client'

import Image from 'next/image'
import { Model } from './data/models'
import { EmptyScreen } from './components/empty-screen'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { fetcher } from '@/lib/utils'
import Chat from './components/chat'
import { useLocalStorage } from '@/lib/hooks/use-local-storage'
import { useEffect } from 'react'
import { Filter } from './data/presets'

export default function ChatUI() {
  const queryClient = useQueryClient()
  const { isLoading: isLoadingMessages, data: messages } = useQuery({
    queryKey: ['todos'],
    queryFn: (): Promise<Model[]> => Promise.resolve([])
  })
  const { isLoading: isLoadingChat, data: filters } = useQuery({
    queryKey: ['filters'],
    queryFn: (): Filter[] => [],
    initialData: []
  })

  const [storedMessaged, setStoredMessaged] = useLocalStorage<Model[] | null>(
    'chat-messages',
    messages ?? []
  )

  const mutation = useMutation({
    mutationFn: (variables: { filters?: Array<string> } & Model) =>
      fetcher('/api/dummie', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          mainPrompt: variables.content,
          filters: variables.filters
        })
      }),
    onSuccess: (data, variables: { filters?: Array<string> } & Model) => {
      if (messages) {
        const updatedClientMessage = [
          ...messages,
          {
            role: variables.role,
            content: variables.content,
            filters: variables.filters
          }
        ]
        const updatedMessages = [...updatedClientMessage, ...data]
        queryClient.setQueryData(['todos'], updatedMessages)
        setStoredMessaged(updatedMessages)
      }
    }
  })

  const syncFromLocalStorage = ({ key, newValue }: StorageEvent) => {
    if (key === 'chat-messages' && newValue)
      queryClient.setQueryData(['todos'], JSON.parse(newValue))
  }

  useEffect(() => {
    window.addEventListener('storage', syncFromLocalStorage)

    return () => {
      window.removeEventListener('storage', syncFromLocalStorage)
    }
  }, [])

  useEffect(() => {
    if (storedMessaged) setStoredMessaged(storedMessaged)
  }, [storedMessaged?.length])

  if (!storedMessaged) return <EmptyScreen />

  return (
    <>
      <div className="hidden">
        <Image
          src="/assets/logo.webp"
          width={1280}
          height={916}
          alt="Playground"
          className="block dark:hidden"
        />
      </div>
      <Chat
        messages={storedMessaged}
        isLoading={isLoadingMessages}
        append={mutation.mutate}
        filters={filters}
      />
    </>
  )
}
