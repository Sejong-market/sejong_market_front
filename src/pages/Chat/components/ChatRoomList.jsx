export default function ChatRoomList({ rooms, selectedRoomId, onSelect }) {
  if (!rooms?.length) {
    return <div className="chat-room-list__empty">채팅방이 없습니다.</div>
  }

  return (
    <ul className="chat-room-list">
      {rooms.map((room) => (
        <li key={room.id} className="chat-room-list__item">
          <button
            type="button"
            onClick={() => onSelect(room.id)}
            className={[
              'chat-room-list__button',
              selectedRoomId === room.id ? 'chat-room-list__button--active' : '',
            ].join(' ')}
          >
            <span className="chat-room-list__partner">{room.partnerName}</span>
            <span className="chat-room-list__message">{room.lastMessage}</span>
            {room.unreadCount > 0 && (
              <span className="chat-room-list__badge">{room.unreadCount}</span>
            )}
          </button>
        </li>
      ))}
    </ul>
  )
}
