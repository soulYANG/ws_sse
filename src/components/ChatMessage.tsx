import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'

interface ChatMessageProps {
  message: {
    id: string
    content: string
    role: 'user' | 'assistant'
    timestamp: Date
  }
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[70%] rounded-lg p-4 ${
          isUser
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-900'
        }`}
      >
        <div className="text-sm mb-1">{message.content}</div>
        <div className="text-xs opacity-70">
          {format(message.timestamp, 'HH:mm', { locale: zhCN })}
        </div>
      </div>
    </div>
  )
} 