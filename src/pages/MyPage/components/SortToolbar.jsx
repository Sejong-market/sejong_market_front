const SORT_OPTIONS = [
  { id: 'latest', label: '최신순' },
  { id: 'price_asc', label: '낮은 가격 순' },
  { id: 'price_desc', label: '높은 가격 순' },
];

export default function SortToolbar({ totalCount, sortOption, onSortChange }) {
  return (
    <div className="mypage__toolbar">
      <span className="mypage__product-count">총 {totalCount}개</span>
      <div className="product-list__sort-group">
        {SORT_OPTIONS.map((option) => (
          <button
            key={option.id}
            type="button"
            className={`product-list__sort-btn ${sortOption === option.id ? 'product-list__sort-btn--active' : ''}`}
            onClick={() => onSortChange(option.id)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}