import { useEffect, useState } from "react";
import { fetchProducts } from "./api";
import ProductGrid from "./components/ProductGrid";
import "./ProductList.css";

/* prettier-ignore */
const MOCK_PRODUCTS = [
  { id: 1, title: '맥북 프로 14인치', price: 1200000, status: '판매중', thumbnailUrl: '' },
  { id: 2, title: '아이패드 에어 5세대', price: 450000, status: '판매중', thumbnailUrl: '' },
  { id: 3, title: '오픈소스 sw', price: 25000, status: '예약중', thumbnailUrl: '' },
  { id: 4, title: '자전거', price: 80000, status: '판매중', thumbnailUrl: '' },
  { id: 5, title: 'LG 전자레인지', price: 60000, status: '판매중', thumbnailUrl: '' },
  { id: 6, title: '시디즈 t50', price: 150000, status: '판매완료', thumbnailUrl: '' },
]

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  async function loadProducts(keyword = "") {
    setLoading(true);
    setError("");

    try {
      const params = keyword ? { search: keyword } : {};
      const data = await fetchProducts(params);
      setProducts(data?.items ?? data ?? []);
    } catch {
      if (keyword) {
        const filtered = MOCK_PRODUCTS.filter((product) =>
          product.title.toLowerCase().includes(keyword.toLowerCase())
        );
        setProducts(filtered);
      } else {
        setProducts(MOCK_PRODUCTS);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let isMounted = true;

    const initLoad = async () => {
      if (isMounted) {
        await loadProducts();
      }
    };

    initLoad();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    loadProducts(searchKeyword);
  };

  return (
    <section>
      <div className="product-list__header">
        <h1 className="product-list__title">상품 목록</h1>
        
        <form onSubmit={handleSearchSubmit} className="product-list__search-form">

          <span className="product-list__search-category">
            중고거래 <span>▼</span>
          </span>
          
          <div className="product-list__search-divider"></div>
          
          <input
            type="text"
            placeholder="검색어를 입력해주세요"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="product-list__search-input"
          />
          
          <button type="submit" className="product-list__search-btn" aria-label="검색">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </form>

        <button type="button" className="product-list__register-btn">
          상품 등록
        </button>
      </div>
      <ProductGrid products={products} loading={loading} error={error} />
    </section>
  );
}