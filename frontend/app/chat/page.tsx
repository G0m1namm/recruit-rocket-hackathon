
'use client'

import Image from "next/image"
import { CounterClockwiseClockIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

import { CodeViewer } from "./components/code-viewer"
import { MaxLengthSelector } from "./components/maxlength-selector"
import { ModelSelector } from "./components/model-selector"
import { PresetActions } from "./components/preset-actions"
import { PresetSave } from "./components/preset-save"
import { PresetSelector } from "./components/preset-selector"
import { PresetShare } from "./components/preset-share"
import { TemperatureSelector } from "./components/temperature-selector"
import { TopPSelector } from "./components/top-p-selector"
import { Model, models, types } from "./data/models"
import { ChatList } from "./components/chat-list"
import { ChatScrollAnchor } from "./components/chat-scroll-anchor"
import { EmptyScreen } from "./components/empty-screen"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { ChatPanel } from "./components/chat-panel"
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