import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">欢迎使用 AI 聊天应用</h1>
      <div className="space-y-4">
        <Link 
          href="/chat" 
          className="block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          开始聊天
        </Link>
        <Link 
          href="/login" 
          className="block px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          登录
        </Link>
        <Link 
          href="/register" 
          className="block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          注册账户
        </Link>
      </div>
    </div>
  )
}
