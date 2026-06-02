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
        <li
          key={comment.id}
          className={`comment-list__item ${
            comment.isMine ? 'comment-list__item--mine' : ''
          }`}
        >
          <div className="comment-list__top">
            <div className="comment-list__writer">
              <strong>{comment.writer}</strong>
              {comment.isMine && <span>내 댓글</span>}
            </div>
            <time>{comment.createdAt}</time>
          </div>
          <p>{comment.content}</p>
        </li>
      ))}
    </ul>
  )
}