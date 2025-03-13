/**
 * 主页组件
 * 应用的首页，包含聊天界面
 */
'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import MessageInput from '@/components/MessageInput'
import ChatMessage from '@/components/ChatMessage'

// 主页组件
export default function Home() {
  // 获取会话状态
  const { data: session, status } = useSession()
  const router = useRouter()
  
  // 未认证用户重定向到登录页
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])
  
  // 加载状态显示
  if (status === 'loading') {
    return <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
    </div>
  }
  
  // 已认证用户显示聊天界面
  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="space-y-4">
        {/* 聊天消息列表 */}
        <div className="space-y-4 mb-4">
          {/* TODO: 添加消息列表 */}
        </div>
        
        {/* 消息输入框 */}
        <MessageInput onSendMessage={(message) => {
          console.log('发送消息:', message)
        }} />
      </div>
    </div>
  )
}
