export default function ProductCard({ product }) {
  const { id, title, price, thumbnailUrl, status } = product

  return (
    <article className="product-card">
      <div className="product-card__image-wrap">
        {thumbnailUrl ? (
          <img src={thumbnailUrl} alt={title} className="product-card__image" />
        ) : (
          <div className="product-card__placeholder">이미지 없음</div>
        )}
      </div>
      <div className="product-card__body">
        <h3 className="product-card__title">{title}</h3>
        <p className="product-card__price">{price?.toLocaleString()}원</p>
        {status && <span className="product-card__status">{status}</span>}
        <p className="product-card__id">#{id}</p>
      </div>
    </article>
  )
}
