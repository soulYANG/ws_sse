/**
 * 聊天消息组件
 * 
 * 特点：
 * 1. 纯展示组件，不包含状态管理（相当于 Vue 的无状态组件）
 * 2. 使用 TypeScript 接口定义 Props 类型
 * 3. 使用条件类名实现样式切换
 * 
 * 对比 Vue：
 * ```vue
 * <script setup lang="ts">
 * interface Message {
 *   id: string
 *   content: string
 *   role: 'user' | 'assistant'
 *   timestamp: Date
 * }
 * 
 * const props = defineProps<{
 *   message: Message
 * }>()
 * 
 * const isUser = computed(() => props.message.role === 'user')
 * </script>
 * ```
 */

import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'

/**
 * 消息类型定义
 * 
 * React 中的类型定义：
 * - 使用 TypeScript interface
 * - 直接在组件文件中定义
 * 
 * Vue 中的类型定义：
 * - 可以使用 interface 或 type
 * - 通常在 types.ts 中定义或直接在组件中定义
 */
interface ChatMessageProps {
  message: {
    id: string
    content: string
    role: 'user' | 'assistant'  // 联合类型，限制角色只能是这两个值
    timestamp: Date
  }
}

/**
 * 聊天消息组件
 * 
 * 组件实现对比：
 * 1. React 的 Props 解构：
 *    function ChatMessage({ message }: ChatMessageProps)
 *    
 * 2. Vue 的 Props 定义：
 *    const props = defineProps<{ message: Message }>()
 * 
 * 3. 样式处理：
 *    React: className={`base ${condition ? 'a' : 'b'}`}
 *    Vue: :class="['base', condition ? 'a' : 'b']"
 * 
 * @param {ChatMessageProps} props - 组件属性
 */
export default function ChatMessage({ message }: ChatMessageProps) {
  // 计算消息样式（相当于 Vue 的计算属性）
  const isUser = message.role === 'user'
  const containerClasses = `flex ${isUser ? 'justify-end' : 'justify-start'}`
  const messageClasses = `max-w-[70%] rounded-lg p-4 ${
    isUser
      ? 'bg-blue-600 text-white'     // 用户消息样式
      : 'bg-gray-100 text-gray-900'  // 助手消息样式
  }`
  
  return (
    <div className={containerClasses}>
      <div className={messageClasses}>
        {/* 
          消息内容和时间戳
          React 的属性访问：message.content
          Vue 的属性访问：props.message.content
        */}
        <div className="text-sm mb-1">{message.content}</div>
        {/* 
          日期格式化
          使用 date-fns 库（类似于 Vue 中的 dayjs/moment）
          设置中文语言环境
        */}
        <div className="text-xs opacity-70">
          {format(message.timestamp, 'HH:mm', { locale: zhCN })}
        </div>
      </div>
    </div>
  )
} 