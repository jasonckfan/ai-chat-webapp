import { useState, useRef, useEffect } from 'react'
import { Send, Moon, Sun, Bot, User } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: '你好！我係你嘅 AI 助手。有咩可以幫到你？',
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isDark, setIsDark] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    // 模擬 AI 回應
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `我收到你嘅訊息："${input}"\n\n呢個係一個示範回應。喺實際應用中，你可以連接到 OpenAI API 或其他 AI 服務。`,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1000)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className={`sticky top-0 z-10 border-b transition-colors duration-300 ${
        isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
      }`}>
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${isDark ? 'bg-blue-600' : 'bg-blue-500'}`}>
              <Bot className="w-6 h-6 text-white" />
            </div>
            <h1 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              AI Chat
            </h1>
          </div>
          <button
            onClick={() => setIsDark(!isDark)}
            className={`p-2 rounded-lg transition-colors ${
              isDark 
                ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Messages */}
      <main className="max-w-4xl mx-auto px-4 py-6 pb-32">
        <div className="space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-4 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                message.role === 'assistant'
                  ? isDark ? 'bg-blue-600' : 'bg-blue-500'
                  : isDark ? 'bg-gray-700' : 'bg-gray-300'
              }`}>
                {message.role === 'assistant' ? (
                  <Bot className="w-5 h-5 text-white" />
                ) : (
                  <User className="w-5 h-5 text-white" />
                )}
              </div>
              <div className={`flex-1 max-w-3xl ${message.role === 'user' ? 'text-right' : ''}`}>
                <div className={`inline-block text-left rounded-2xl px-5 py-3 ${
                  message.role === 'assistant'
                    ? isDark ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900 border border-gray-200'
                    : isDark ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'
                }`}>
                  <ReactMarkdown
                    components={{
                      code({ node, inline, className, children, ...props }: any) {
                        const match = /language-(\w+)/.exec(className || '')
                        return !inline && match ? (
                          <SyntaxHighlighter
                            style={isDark ? oneDark : oneLight}
                            language={match[1]}
                            PreTag="div"
                            {...props}
                          >
                            {String(children).replace(/\n$/, '')}
                          </SyntaxHighlighter>
                        ) : (
                          <code className={`${className} px-1.5 py-0.5 rounded text-sm ${
                            isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800'
                          }`} {...props}>
                            {children}
                          </code>
                        )
                      }
                    }}
                  >
                    {message.content}
                  </ReactMarkdown>
                </div>
                <div className={`mt-1 text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-4">
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                isDark ? 'bg-blue-600' : 'bg-blue-500'
              }`}>
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className={`rounded-2xl px-5 py-3 ${
                isDark ? 'bg-gray-800' : 'bg-white border border-gray-200'
              }`}>
                <div className="flex gap-1">
                  <div className={`w-2 h-2 rounded-full animate-bounce ${isDark ? 'bg-gray-400' : 'bg-gray-400'}`} style={{ animationDelay: '0ms' }} />
                  <div className={`w-2 h-2 rounded-full animate-bounce ${isDark ? 'bg-gray-400' : 'bg-gray-400'}`} style={{ animationDelay: '150ms' }} />
                  <div className={`w-2 h-2 rounded-full animate-bounce ${isDark ? 'bg-gray-400' : 'bg-gray-400'}`} style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input */}
      <div className={`fixed bottom-0 left-0 right-0 border-t transition-colors duration-300 ${
        isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
      }`}>
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className={`flex items-end gap-3 rounded-2xl border p-3 transition-colors ${
            isDark 
              ? 'bg-gray-800 border-gray-700 focus-within:border-blue-500' 
              : 'bg-gray-50 border-gray-300 focus-within:border-blue-500'
          }`}>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="輸入訊息..."
              rows={1}
              className={`flex-1 resize-none bg-transparent outline-none max-h-32 ${
                isDark ? 'text-white placeholder-gray-500' : 'text-gray-900 placeholder-gray-400'
              }`}
              style={{ minHeight: '24px' }}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className={`p-2 rounded-xl transition-all ${
                input.trim() && !isLoading
                  ? isDark 
                    ? 'bg-blue-600 text-white hover:bg-blue-500' 
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                  : isDark
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className={`mt-2 text-center text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            AI 可能會產生不準確的資訊，請查證重要資訊。
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
