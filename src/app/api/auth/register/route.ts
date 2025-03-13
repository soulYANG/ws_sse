import { NextResponse } from 'next/server'
import { hash } from 'bcryptjs'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()

    // 验证输入
    if (!email || !password) {
      return NextResponse.json(
        { error: '请填写所有必填字段' },
        { status: 400 }
      )
    }

    // 检查邮箱是否已被注册
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: '该邮箱已被注册' },
        { status: 400 }
      )
    }

    // 密码加密
    const hashedPassword = await hash(password, 12)

    // 创建用户
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      }
    })

    // 返回成功响应（不包含密码）
    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      }
    })
  } catch (error: any) {
    // 添加详细的错误日志
    console.error('Registration error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    })
    
    return NextResponse.json(
      { error: `注册失败: ${error.message}` },
      { status: 500 }
    )
  }
} 