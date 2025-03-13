/**
 * 登录表单组件
 * 
 * 特点：
 * 1. 使用 'use client' 指令（Next.js 13+ 特性）
 *    - 相当于 Vue 的 client-only 组件
 *    - 表示这个组件在客户端渲染
 * 
 * 2. React Hooks vs Vue Composition API 对比：
 *    - useState => ref/reactive
 *    - useEffect => onMounted/watch
 *    - useRouter => Vue Router
 *    - useSearchParams => Vue Router 的 route.query
 * 
 * 3. 事件处理：
 *    - React 使用 onXxx 属性（驼峰）
 *    - Vue 使用 @xxx 指令（短横线）
 */
'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'

/**
 * 登录表单组件
 * 
 * 状态管理对比：
 * React:                     Vue:
 * const [state, setState] = useState('') | const state = ref('')
 * setState(newValue)        | state.value = newValue
 */
export default function LoginForm() {
  // 状态管理（对比 Vue 的 ref）
  const [email, setEmail] = useState('')         // 相当于 const email = ref('')
  const [password, setPassword] = useState('')   // 相当于 const password = ref('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  
  // 路由和查询参数（对比 Vue Router）
  const router = useRouter()                     // 相当于 const router = useRouter()
  const searchParams = useSearchParams()         // 相当于 route.query
  const callbackUrl = searchParams.get('callbackUrl') || '/'
  const showSuccessMessage = searchParams.get('success') === 'true'
  
  /**
   * 处理表单提交
   * React 的事件处理：
   * 1. 使用 async/await 处理异步
   * 2. 事件对象类型为 React.FormEvent
   * 3. 需要手动调用 e.preventDefault()
   * 
   * 对比 Vue：
   * @submit.prevent="handleSubmit"
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()  // 阻止表单默认提交行为
    setIsLoading(true)
    setError(null)
    
    try {
      // NextAuth 登录方法
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false  // 禁用自动重定向
      })
      
      if (!result?.error) {
        // 登录成功，路由跳转（相当于 Vue 的 router.push）
        router.push(callbackUrl)
      } else {
        setError('邮箱或密码错误')
      }
    } catch (error) {
      setError('登录过程中发生错误')
    } finally {
      setIsLoading(false)
    }
  }
  
  /**
   * 处理注册按钮点击
   * 使用 router 进行导航（相当于 Vue 的 router.push）
   */
  const handleRegister = () => {
    router.push('/register')
  }
  
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          登录您的账号
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {/* 
          条件渲染（对比 Vue 的 v-if）
          React 使用 && 运算符或三元表达式
          Vue 使用 v-if 指令
        */}
        {showSuccessMessage && (
          <div className="mb-4 p-4 text-sm text-green-700 bg-green-100 rounded-lg">
            注册成功！请登录。
          </div>
        )}
        
        {error && (
          <div className="mb-4 p-4 text-sm text-red-700 bg-red-100 rounded-lg">
            {error}
          </div>
        )}

        {/* 
          表单处理
          React: onSubmit={handleSubmit}
          Vue: @submit.prevent="handleSubmit"
        */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              邮箱地址
            </label>
            <div className="mt-2">
              {/* 
                受控输入框（对比 Vue 的 v-model）
                React: value + onChange
                Vue: v-model="email"
              */}
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              密码
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            {/* 
              按钮状态和类名绑定
              React: className={条件 ? 'class1' : 'class2'}
              Vue: :class="{ 'class1': 条件 }"
            */}
            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {isLoading ? '登录中...' : '登录'}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          还没有账号？{' '}
          <button
            onClick={handleRegister}
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            立即注册
          </button>
        </p>
      </div>
    </div>
  )
} 