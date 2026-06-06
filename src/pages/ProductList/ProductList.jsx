import { useNavigate } from "react-router-dom";
import ProductGrid from "./components/ProductGrid";
import { useProducts } from "./hooks/useProducts";
import "./ProductList.css";

export default function ProductList() {
  const navigate = useNavigate();
  const {
    loading,
    error,
    searchKeyword,
    setSearchKeyword,
    filteredProducts,
    handleSearchSubmit,
  } = useProducts();

  return (
    <section>
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

      <ProductGrid
        products={filteredProducts}
        loading={loading}
        error={error}
      />
    </section>
  );
}