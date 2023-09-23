'use client'

import {
    QueryClient,
    QueryClientProvider,
  } from '@tanstack/react-query'

  

// Create a client
const queryClient = new QueryClient()

type Props = {
    children: React.ReactNode
}

export default function ReactQueryProvider({children}: Props) {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}