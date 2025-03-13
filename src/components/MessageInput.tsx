/**
 * 消息输入组件
 * 
 * 特点：
 * 1. React 组件是函数式的，不同于 Vue 的 <template> + <script>
 * 2. Props 通过函数参数传入，而不是 Vue 的 defineProps
 * 3. 使用 TypeScript 接口定义 Props 类型
 * 
 * 对比 Vue：
 * ```vue
 * <script setup lang="ts">
 * const props = defineProps<{
 *   onSendMessage: (message: string) => void
 *   disabled?: boolean
 * }>()
 * const message = ref('')
 * </script>
 * ```
 */
'use client'

import { useState } from 'react'

/**
 * Props 类型定义
 * 
 * React 中使用 TypeScript interface
 * Vue 中使用 defineProps 泛型
 * 
 * @property {Function} onSendMessage - 发送消息的回调函数（相当于 Vue 的 emit）
 * @property {boolean} [disabled] - 是否禁用输入（可选属性）
 */
interface MessageInputProps {
  onSendMessage: (message: string) => void  // 类似于 Vue 的 emit('send-message')
  disabled?: boolean                        // 可选属性，默认为 false
}

/**
 * 消息输入组件
 * 
 * 组件实现对比：
 * 1. React 使用函数组件，返回 JSX
 * 2. Vue 使用 <template> 和 <script setup>
 * 3. React 的 props 通过参数解构，Vue 使用 defineProps
 * 4. React 的状态使用 useState，Vue 使用 ref/reactive
 * 
 * @param {MessageInputProps} props - 组件属性
 */
export default function MessageInput({ onSendMessage, disabled = false }: MessageInputProps) {
  // 状态管理（相当于 Vue 的 ref）
  const [message, setMessage] = useState('')
  
  /**
   * 处理表单提交
   * React 的事件处理方式：
   * 1. 使用 onSubmit 属性（Vue 使用 @submit）
   * 2. 需要手动调用 preventDefault（Vue 使用 .prevent 修饰符）
   * 3. 事件处理函数接收 React.FormEvent 类型
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && !disabled) {
      onSendMessage(message)  // 调用父组件传入的回调（相当于 Vue 的 emit）
      setMessage('')          // 清空输入框（相当于 Vue 的 message.value = ''）
    }
  }
  
  return (
    <form onSubmit={handleSubmit} className="flex gap-2 p-4 border-t">
      {/* 
        输入框
        React:                          Vue:
        value={message}                 v-model="message"
        onChange={e => setMessage()}    @input="message = $event.target.value"
        className="..."                 :class="..."
      */}
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        disabled={disabled}
        placeholder="输入消息..."
        className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      
      {/* 
        发送按钮
        React 的条件属性：              Vue 的条件属性：
        disabled={condition}            :disabled="condition"
        className={条件 ? 'a' : 'b'}    :class="{ 'a': condition }"
      */}
      <button
        type="submit"
        disabled={!message.trim() || disabled}
        className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:opacity-50"
      >
        发送
      </button>
    </form>
  )
} 