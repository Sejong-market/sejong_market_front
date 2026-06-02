export default function CommentList({ comments }) {
  if (comments.length === 0) {
    return (
      <div className="comment-list__empty">
        아직 등록된 댓글이 없습니다.
      </div>
    )
  }

  return (
    <ul className="comment-list">
      {comments.map((comment) => (
        <li key={comment.id} className="comment-list__item">
          <div className="comment-list__top">
            <strong>{comment.writer}</strong>
            <span>{comment.createdAt}</span>
          </div>
          <p>{comment.content}</p>
        </li>
      ))}
    </ul>
  )
}