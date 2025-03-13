/**
 * NextAuth 认证配置文件
 * 包含认证选项配置和凭据提供程序设置
 */
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { compare } from 'bcryptjs'
import { prisma } from '@/lib/prisma'

/**
 * NextAuth 配置选项
 * 包含会话配置、页面配置和认证提供程序设置
 */
export const authOptions: NextAuthOptions = {
  // 会话配置
  session: {
    strategy: 'jwt'
  },
  
  // 页面配置
  pages: {
    signIn: '/login'
  },
  
  // 认证提供程序配置
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "邮箱", type: "email" },
        password: { label: "密码", type: "password" }
      },
      
      // 用户认证处理函数
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }
        
        // 查找用户
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        })
        
        // 验证用户存在性和密码
        if (!user || !(await compare(credentials.password, user.password))) {
          return null
        }
        
        // 返回用户信息（不包含密码）
        return {
          id: user.id,
          email: user.email,
          name: user.name
        }
      }
    })
  ]
} 