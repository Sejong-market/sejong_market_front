import ProductCard from './ProductCard';

export default function ProductGrid({ products, loading, error }) {
  if (loading) {
    return (
      <div className="product-grid__loading">
        <span>상품을 불러오는 중입니다...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-grid__error">
        <span>상품을 불러오는 중에 오류가 발생했습니다.</span>
      </div>
    );
  }

  // 상품이 없을 때
  if (!products || products.length === 0) {
    return (
      <div className="product-grid__empty">
        <span>등록된 중고 상품이 없습니다.</span>
      </div>
    );
  }

  return (
    // 미디어 쿼리 적용
    <div className="product-grid">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}