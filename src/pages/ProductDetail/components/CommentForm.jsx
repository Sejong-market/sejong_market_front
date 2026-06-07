import { useState } from 'react'

export default function CommentForm({ onSubmit }) {
  const [content, setContent] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()

    const trimmedContent = content.trim()

    if (!trimmedContent) {
      setError('댓글 내용을 입력해주세요.')
      return
    }

    if (trimmedContent.length > 1000) {
      setError('댓글은 1,000자 이내로 입력해주세요.')
      return
    }

    setError('')
    setIsSubmitting(true)

    try {
      await onSubmit(trimmedContent)
      setContent('')
    } catch (err) {
      setError(err.message || '댓글 등록에 실패했습니다.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <div className="comment-form__field">
        <input
          value={content}
          onChange={(event) => {
            setContent(event.target.value)
            setError('')
          }}
          placeholder="구매 문의 댓글을 입력하세요"
          className="comment-form__input"
          maxLength={1000}
        />

        {error && <p className="comment-form__error">{error}</p>}
      </div>

      <button
        type="submit"
        className="comment-form__submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? '등록 중...' : '등록'}
      </button>
    </form>
  )
}