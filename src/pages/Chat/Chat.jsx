import { useEffect, useState } from 'react'
import { fetchChatRooms, fetchChatMessages } from './api'
import ChatRoomList from './components/ChatRoomList'
import ChatWindow from './components/ChatWindow'
import './Chat.css'

const MOCK_ROOMS = [
  {
    id: 1,
    partnerName: '구매자A',
    productTitle: '맥북 프로 14인치',
    lastMessage: '혹시 네고 가능할까요?',
    unreadCount: 2,
  },
  {
    id: 2,
    partnerName: '판매자B',
    productTitle: '아이패드 에어 5세대',
    lastMessage: '내일 오후에 거래 가능합니다.',
    unreadCount: 0,
  },
]

const MOCK_MESSAGES = {
  1: [
    { id: 1, content: '안녕하세요, 아직 판매 중인가요?', senderId: 'other' },
    { id: 2, content: '네, 아직 판매 중입니다!', senderId: 'me' },
    { id: 3, content: '혹시 네고 가능할까요?', senderId: 'other' },
  ],
  2: [{ id: 1, content: '내일 오후에 거래 가능합니다.', senderId: 'other' }],
}

export default function Chat() {
  const [rooms, setRooms] = useState([])
  const [selectedRoomId, setSelectedRoomId] = useState(null)
  const [messages, setMessages] = useState([])

  useEffect(() => {
    async function loadRooms() {
      try {
        const data = await fetchChatRooms()
        const items = data?.items ?? data ?? []
        setRooms(items)
        if (items.length > 0) setSelectedRoomId(items[0].id)
      } catch {
        setRooms(MOCK_ROOMS)
        setSelectedRoomId(MOCK_ROOMS[0].id)
      }
    }

    loadRooms()
  }, [])

  useEffect(() => {
    if (!selectedRoomId) return

    async function loadMessages() {
      try {
        const data = await fetchChatMessages(selectedRoomId)
        setMessages(data?.items ?? data ?? [])
      } catch {
        setMessages(MOCK_MESSAGES[selectedRoomId] ?? [])
      }
    }

    loadMessages()
  }, [selectedRoomId])

  const selectedRoom = rooms.find((room) => room.id === selectedRoomId)

  function handleMessageSent(newMessage) {
    setMessages((prev) => [...prev, newMessage])
  }

  return (
    <section>
      <h1 className="chat-page__title">채팅</h1>
      <div className="chat-page__layout">
        <aside className="chat-page__sidebar">
          <ChatRoomList
            rooms={rooms}
            selectedRoomId={selectedRoomId}
            onSelect={setSelectedRoomId}
          />
        </aside>
        <div className="chat-page__main">
          <ChatWindow
            room={selectedRoom}
            messages={messages}
            onMessageSent={handleMessageSent}
          />
        </div>
      </div>
    </section>
  )
}
