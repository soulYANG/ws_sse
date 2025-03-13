import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { PrismaClient } from '@prisma/client'
import { authOptions } from '../auth/[...nextauth]/route'

const prisma = new PrismaClient()

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

    await prisma.message.create({
      data: {
        content: message,
        role: 'user',
        userId: user.id
      }
    })

    // TODO: 调用 AI API 获取响应
    const aiResponse = "这是一个模拟的 AI 响应"

    // 保存 AI 响应
    await prisma.message.create({
      data: {
        content: aiResponse,
        role: 'assistant',
        userId: user.id
      }
    })

    return NextResponse.json({ response: aiResponse })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    )
  }
} 