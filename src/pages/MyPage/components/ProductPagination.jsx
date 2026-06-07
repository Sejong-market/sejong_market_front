export default function ProductPagination({ page, totalPages, onPageChange, disabled = false }) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="mypage__pagination">
      <button
        type="button"
        className="mypage__pagination-btn"
        onClick={() => onPageChange(page - 1)}
        disabled={disabled || page <= 0}
      >
        이전
      </button>
      <span className="mypage__pagination-info">
        {page + 1} / {totalPages}
      </span>
      <button
        type="button"
        className="mypage__pagination-btn"
        onClick={() => onPageChange(page + 1)}
        disabled={disabled || page >= totalPages - 1}
      >
        다음
      </button>
    </div>
  );
}
