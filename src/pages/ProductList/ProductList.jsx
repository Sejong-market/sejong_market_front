import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ProductGrid from "./components/ProductGrid";
import { useProducts } from "./hooks/useProducts";
import { SORT_OPTIONS } from "./constants/productConstants";
import "./ProductList.css";

function getStoredCommentCount(productId) {
  const savedComments = localStorage.getItem(`product_comments_${productId}`);

  if (!savedComments) {
    return null;
  }

  try {
    const parsedComments = JSON.parse(savedComments);

    if (!Array.isArray(parsedComments)) {
      return null;
    }

    return parsedComments.length;
  } catch {
    return null;
  }
}

function getStoredLikeCount(productId) {
  const savedLike = localStorage.getItem(`product_like_${productId}`)

  if (!savedLike) {
    return null
  }

  try {
    const parsedLike = JSON.parse(savedLike)

    if (typeof parsedLike.likeCount !== 'number') {
      return null
    }

    return parsedLike.likeCount
  } catch {
    return null
  }
}

export default function ProductList() {
  const navigate = useNavigate();
  const {
    loading,
    error,
    searchKeyword,
    setSearchKeyword,
    sortOption,
    setSortOption,
    sortedProducts,
    handleSearchSubmit,
  } = useProducts();

  const productsWithCommentCounts = useMemo(() => {
  return sortedProducts.map((product) => {
    const storedCommentCount = getStoredCommentCount(product.id)
    const storedLikeCount = getStoredLikeCount(product.id)

    return {
      ...product,
      commentCount: storedCommentCount ?? product.commentCount,
      likeCount: storedLikeCount ?? product.likeCount,
    }
  })
}, [sortedProducts])

  return (
    <section>
      {/* 1. 상단 검색 및 타이틀 헤더 */}
      <div className="product-list__header">
        <h1 className="product-list__title">상품 목록</h1>

        <form onSubmit={handleSearchSubmit} className="product-list__search-form">
          <input
            type="text"
            placeholder="검색어를 입력해주세요"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="product-list__search-input"
          />
          <button type="submit" className="product-list__search-btn" aria-label="검색">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </form>

        <button
          type="button"
          className="product-list__register-btn"
          onClick={() => navigate("/products/new")}
        >
          상품 등록
        </button>
      </div>

      {/* 2. 정렬 옵션 드롭다운 */}
      <div className="product-list__toolbar">
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="product-list__sort-select"
          aria-label="정렬 옵션 선택"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* 3. 데이터 그리드 피드 */}
      <ProductGrid products={productsWithCommentCounts} loading={loading} error={error} />
    </section>
  );
}