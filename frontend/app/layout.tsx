import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ReactQueryProvider from './chat/components/react-query-provider'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Toaster } from 'sonner'
import Navbar from '@/components/ui/navbar'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'RecruitRocket',
  description: 'AI Chatbot that handles resumes and generate personalized chats'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <ReactQueryProvider>
      <TooltipProvider>
        <html lang="en" className="dark">
          <body className={inter.className}>
            <Navbar />
            {children}
            <Toaster />
          </body>
        </html>
      </TooltipProvider>
    </ReactQueryProvider>
  )
}
