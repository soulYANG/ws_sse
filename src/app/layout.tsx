/**
 * Next.js 根布局组件 (类似于 Vue 的 App.vue)
 * 
 * 特点：
 * 1. 相当于 Vue 中的根组件，所有页面都会被包裹在这个布局中
 * 2. 使用 app 目录结构（新版 Next.js 13+ 特性）
 * 3. layout.tsx 是特殊文件名，会被自动识别为布局文件
 * 4. 类似于 Vue 的 <template>，这里返回 JSX 结构
 */
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

/**
 * 字体配置
 * Next.js 内置的字体优化功能，类似于 Nuxt 的字体模块
 * 会自动处理字体加载和优化
 */
const inter = Inter({ subsets: ["latin"] });

/**
 * 页面元数据配置
 * 类似于 Vue 的 vue-meta 或 Nuxt 的 useHead
 * 用于设置页面的 title、description 等 meta 信息
 */
export const metadata: Metadata = {
  title: "AI 聊天应用",
  description: "基于 Next.js 的 AI 聊天应用",
};

/**
 * 根布局组件
 * @param {object} props - 组件属性
 * @param {React.ReactNode} props.children - 子组件，类似于 Vue 的 <slot>
 * 
 * 注意：
 * 1. 这里的 children 相当于 Vue 默认插槽
 * 2. TypeScript 类型定义方式与 Vue 的 defineProps 不同
 * 3. 返回的 JSX 结构类似于 Vue 的 template
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <body className={inter.className}>
        {/* Providers 包装器，类似于 Vue 的 Vuex Provider */}
        <Providers>
          {/* 
            主内容区域
            使用 Tailwind CSS 类名（类似于 Vue 中的 class 绑定）
            min-h-screen: 最小高度为屏幕高度
            bg-gray-50: 背景色
          */}
          <main className="min-h-screen bg-gray-50">
            {/* 
              children 相当于 Vue 的 <slot></slot>
              用于渲染页面主体内容
            */}
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
