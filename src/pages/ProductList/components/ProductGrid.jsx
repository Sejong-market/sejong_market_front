import ProductCard from './ProductCard'

export default function ProductGrid({ products, loading, error }) {
  if (loading) {
    return <div className="product-grid__loading">상품을 불러오는 중...</div>
  }

  if (error) {
    return <div className="product-grid__error">{error}</div>
  }

  if (!products?.length) {
    return (
      <div className="product-grid__empty">
        <p>등록된 상품이 없습니다.</p>
      </div>
    )
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
