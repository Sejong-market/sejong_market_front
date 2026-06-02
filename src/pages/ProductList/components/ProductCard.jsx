// src/pages/ProductList/components/ProductCard.jsx
import { useNavigate } from 'react-router-dom'

export default function ProductCard({ product }) {
  const navigate = useNavigate()

  const getStatusClass = (status) => {
    if (status === '판매중') return 'status--selling'
    if (status === '예약중') return 'status--reserved'
    if (status === '판매완료') return 'status--completed'
    return ''
  }

  const handleCardClick = () => {
    navigate(`/products/${product.id}`)
  }

  const handleCardKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      navigate(`/products/${product.id}`)
    }
  }

  const formatRelativeDate = (createdAt) => {
    if (!createdAt) {
      return '-'
    }

    const createdDate = new Date(createdAt)

    if (Number.isNaN(createdDate.getTime())) {
      return createdAt
    }

    const now = new Date()
    const diffMs = now.getTime() - createdDate.getTime()
    const diffMinutes = Math.floor(diffMs / 60000)

    if (diffMinutes < 1) {
      return '방금 전'
    }

    if (diffMinutes < 60) {
      return `${diffMinutes}분 전`
    }

    const diffHours = Math.floor(diffMinutes / 60)

    if (diffHours < 24) {
      return `${diffHours}시간 전`
    }

    const diffDays = Math.floor(diffHours / 24)
    return `${diffDays}일 전`
  }

  return (
    <div
      className="product-card"
      role="button"
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
    >
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

        {/* 관심수 및 댓글수 영역 째로 삭제 */}

        <span className="product-card__id">
          {formatRelativeDate(product.createdAt)}
        </span>
      </div>
    </div>
  )
}