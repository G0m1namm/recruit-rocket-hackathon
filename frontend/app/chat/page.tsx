'use client'

import { Model } from './data/models'
import { EmptyScreen } from './components/empty-screen'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { fetcher } from '@/lib/utils'
import Chat from './components/chat'
import { useLocalStorage } from '@/lib/hooks/use-local-storage'
import { useEffect } from 'react'
import { Filter } from './data/presets'
import { toast } from 'sonner'

export default function ChatUI() {
  const queryClient = useQueryClient()
  const {
    isLoading: isLoadingMessages,
    isFetching,
    data: messages
  } = useQuery({
    queryKey: ['todos'],
    queryFn: (): Promise<Model[]> => Promise.resolve([])
  })
  const { isLoading: isLoadingChat, data: filters } = useQuery({
    queryKey: ['filters'],
    queryFn: (): Filter[] => [],
    initialData: []
  })

  const [storedMessaged, setStoredMessaged] = useLocalStorage<Model[]>(
    'chat-messages',
    messages ?? []
  )

  const mutation = useMutation({
    mutationFn: (variables: { filters?: Array<string> } & Model) => {
      const updatedClientMessage = [
        ...storedMessaged,
        {
          role: 'user',
          content: variables.content,
          filters: variables.filters
        }
      ]
      queryClient.setQueryData(['todos'], updatedClientMessage)
      setStoredMessaged(updatedClientMessage)
      return fetcher('/api/ask/prompt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          mainPrompt: variables.content,
          filters: variables.filters
        })
      })
    },
    onSuccess: data => {
      if (messages) {
        const updatedMessages = [...storedMessaged, ...data]
        queryClient.setQueryData(['todos'], updatedMessages)
        setStoredMessaged(updatedMessages)
      }
    },
    onError: error => {
      toast.error(`${error}`)
    }
  })

  useEffect(() => {
    if (storedMessaged) setStoredMessaged(storedMessaged)
  }, [storedMessaged?.length])

  if (!storedMessaged) return <EmptyScreen />

  return (
    <>
      <Chat
        messages={storedMessaged}
        isLoading={isFetching || mutation.isLoading}
        append={mutation.mutate}
        filters={filters}
      />
    </>
  )
}
