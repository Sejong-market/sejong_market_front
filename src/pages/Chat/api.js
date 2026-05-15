import { api } from '../../shared/api/instance'

export function fetchChatRooms() {
  return api.get('/chats')
}

export function fetchChatMessages(roomId) {
  return api.get(`/chats/${roomId}/messages`)
}

export function sendMessage(roomId, content) {
  return api.post(`/chats/${roomId}/messages`, { content })
}
