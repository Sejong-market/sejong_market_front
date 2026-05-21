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
      </div>
    </div>
  );
}