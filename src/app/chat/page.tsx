'use client'

import { useState, useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import ChatMessage from '@/components/ChatMessage'
import MessageInput from '@/components/MessageInput'

export default function ChatPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [messages, setMessages] = useState<Array<{
    id: string
    content: string
    role: 'user' | 'assistant'
    timestamp: Date
  }>>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = async (content: string) => {
    const newMessage = {
      id: Date.now().toString(),
      content,
      role: 'user' as const,
      timestamp: new Date(),
    }
    setMessages(prev => [...prev, newMessage])

    try {
      // TODO: 实现与 AI API 的通信
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: content }),
      })

      const data = await response.json()
      
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        role: 'assistant' as const,
        timestamp: new Date(),
      }
      
      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  if (status === 'loading') {
    return <div className="flex items-center justify-center min-h-screen">加载中...</div>
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(message => (
          <ChatMessage key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="border-t p-4">
        <MessageInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  )
} 