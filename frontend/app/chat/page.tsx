
'use client'

import Image from "next/image"
import { Model } from "./data/models"
import { EmptyScreen } from "./components/empty-screen"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { fetcher } from "@/lib/utils"
import Chat from "./components/chat"

export default function ChatUI() {
  const queryClient = useQueryClient()
  const {isLoading, data: messages } = useQuery({ queryKey: ['todos'], queryFn: ():Promise<Model[]> => Promise.resolve([]) })
  const mutation = useMutation({
    mutationFn: () => fetcher('/api/dummie', {method: 'POST'}),
    onSuccess: data => {
      queryClient.setQueryData(['todos'], data)
    }
  })

  if(!messages) return <EmptyScreen/>

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
      <Chat messages={messages} isLoading={isLoading} append={mutation.mutate}/>
    </>
  )
}