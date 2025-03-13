/**
 * 全局 Providers 组件
 * 
 * 作用：
 * - 类似于 Vue 中的全局状态管理（Vuex、Pinia）
 * - 提供认证上下文，使所有子组件都能访问用户会话状态
 * 
 * 特点：
 * 1. 使用 'use client' 指令标记为客户端组件（类似于 Vue 的 client-only）
 * 2. React 中的 Context Provider 类似于 Vue 的 provide/inject
 * 3. SessionProvider 相当于在 Vue 中注册全局状态
 * 
 * 使用场景：
 * - 需要在多个组件中访问用户登录状态
 * - 需要全局管理认证信息
 * - 需要在客户端进行路由保护
 */
'use client'

import { SessionProvider } from 'next-auth/react'

/**
 * Props 类型定义
 * 在 React 中通过 interface 定义属性类型
 * 相当于 Vue 中的 defineProps<{ children: any }>()
 */
interface ProvidersProps {
  children: React.ReactNode  // 子组件，类似于 Vue 的默认插槽
}

/**
 * Providers 组件实现
 * 
 * 注意：
 * 1. 使用函数组件语法（React 推荐），不同于 Vue 的 <script setup>
 * 2. props 解构赋值，类似于 Vue 的 props 声明
 * 3. 返回 JSX，相当于 Vue 的 template
 * 
 * @param {ProvidersProps} props - 组件属性
 * @returns {JSX.Element} 包装了认证 Provider 的组件树
 */
export default function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      {/* 
        children 渲染位置
        类似于 Vue 的 <slot></slot>
        所有子组件都可以通过 useSession() 访问会话状态
      */}
      {children}
    </SessionProvider>
  )
} 