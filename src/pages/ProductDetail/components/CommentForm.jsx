import { useState } from 'react'

export default function CommentForm({ onSubmit }) {
  const [content, setContent] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    if (!content.trim()) {
      return
    }

    onSubmit(content.trim())
    setContent('')
  }

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <input
        value={content}
        onChange={(event) => setContent(event.target.value)}
        placeholder="구매 문의 댓글을 입력하세요"
        className="comment-form__input"
      />
      <button type="submit" className="comment-form__submit">
        등록
      </button>
    </form>
  )
}