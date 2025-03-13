/**
 * Prisma 客户端配置文件
 * 实现了单例模式的 Prisma 客户端实例
 * 包含了数据库连接、日志配置等核心功能
 */
import { PrismaClient } from '@prisma/client'

// 声明全局变量类型，用于存储 Prisma 实例
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// 创建或复用 Prisma 实例
export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  // 数据库连接配置
  datasources: {
    db: {
      url: process.env.POSTGRES_PRISMA_URL
    }
  },
  // 日志配置
  log: [
    {
      emit: 'event',  // 事件形式发出查询日志
      level: 'query',
    },
    {
      emit: 'stdout', // 标准输出错误日志
      level: 'error',
    },
    {
      emit: 'stdout', // 标准输出信息日志
      level: 'info',
    },
    {
      emit: 'stdout', // 标准输出警告日志
      level: 'warn',
    },
  ],
})

// 添加查询日志监听器，用于调试和性能分析
prisma.$on('query' as any, (e: any) => {
  console.log('Query: ' + e.query)      // 输出 SQL 查询语句
  console.log('Params: ' + e.params)    // 输出查询参数
  console.log('Duration: ' + e.duration + 'ms')  // 输出查询执行时间
})

// 在开发环境中保存 Prisma 实例到全局变量
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma 