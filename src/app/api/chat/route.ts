import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: '未授权' },
        { status: 401 }
      )
    }

    const { message } = await req.json()

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json(
        { error: '消息不能为空' },
        { status: 400 }
      )
    }

    // 保存用户消息
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json(
        { error: '用户不存在' },
        { status: 404 }
      )
    }

    const userMessage = await prisma.message.create({
      data: {
        content: message.trim(),
        role: 'user',
        userId: user.id
      }
    })

    // TODO: 调用 AI API 获取响应
    const aiResponse = "这是一个模拟的 AI 响应"

    // 保存 AI 响应
    const assistantMessage = await prisma.message.create({
      data: {
        content: aiResponse,
        role: 'assistant',
        userId: user.id
      }
    })

    return NextResponse.json({
      response: aiResponse,
      userMessage: userMessage,
      assistantMessage: assistantMessage
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    )
  }
} 