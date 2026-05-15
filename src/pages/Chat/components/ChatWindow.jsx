import { useState } from 'react'
import { sendMessage } from '../api'

export default function ChatWindow({ room, messages, onMessageSent }) {
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)

  if (!room) {
    return <div className="chat-window__empty">채팅방을 선택해 주세요.</div>
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (!input.trim() || sending) return

    setSending(true)
    try {
      const newMessage = await sendMessage(room.id, input.trim())
      onMessageSent?.(newMessage ?? { id: Date.now(), content: input.trim(), senderId: 'me' })
      setInput('')
    } catch {
      onMessageSent?.({ id: Date.now(), content: input.trim(), senderId: 'me' })
      setInput('')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="chat-window">
      <div className="chat-window__header">
        <h2 className="chat-window__partner">{room.partnerName}</h2>
        <p className="chat-window__product">{room.productTitle}</p>
      </div>

      <div className="chat-window__messages">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={[
              'chat-window__bubble',
              msg.senderId === 'me' ? 'chat-window__bubble--me' : 'chat-window__bubble--other',
            ].join(' ')}
          >
            {msg.content}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="chat-window__form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="메시지를 입력하세요"
          className="chat-window__input"
        />
        <button
          type="submit"
          disabled={sending || !input.trim()}
          className="chat-window__submit"
        >
          전송
        </button>
      </form>
    </div>
  )
}
