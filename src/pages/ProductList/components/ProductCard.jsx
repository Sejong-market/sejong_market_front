export default function ProductCard({ product }) {
  const getStatusClass = (status) => {
    if (status === '판매중') return 'status--selling';
    if (status === '예약중') return 'status--reserved';
    if (status === '판매완료') return 'status--completed';
    return '';
  };

  return (
    <div className="product-card">
      <div className="product-card__image-wrap">
        {product.image ? (
          <img 
            src={product.image} 
            alt={product.title} 
            className="product-card__image"
          />
        ) : (
          <div className="product-card__placeholder">이미지 없음</div>
        )}
        
        <span className={`product-card__status ${getStatusClass(product.status)}`}>
          {product.status}
        </span>
      </div>

      <div className="product-card__content">
        <h3 className="product-card__title">{product.title}</h3>
        <p className="product-card__price">{product.price.toLocaleString()}원</p>

        <div className="product-card__counts">
          <span className="product-card__count-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            {product.likeCount || 0}
          </span>
          
          <span className="product-card__count-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
            {product.chatCount || 0}
          </span>
        </div>
        
        <span className="product-card__id">#{product.id}</span>
      </div>
    </div>
  );
}