import { useCallback, useEffect, useMemo, useState } from "react";
import { fetchProducts } from "./api";
import ProductGrid from "./components/ProductGrid";
import "./ProductList.css";

/* prettier-ignore */
const MOCK_PRODUCTS = [
  { id: 1, title: '맥북 프로 14인치', price: 1200000, status: '판매중', thumbnailUrl: '' , likeCount: 26, chatCount: 5, createdAt: '2026-05-18'},
  { id: 2, title: '아이패드 에어 5세대', price: 450000, status: '판매중', thumbnailUrl: '' , likeCount: 150, chatCount: 20, createdAt: '2026-05-15'},
  { id: 3, title: '오픈소스 sw', price: 25000, status: '예약중', thumbnailUrl: '' , likeCount: 80, chatCount: 5, createdAt: '2026-05-12'},
  { id: 4, title: '자전거', price: 80000, status: '판매중', thumbnailUrl: '' , likeCount: 30, chatCount: 4, createdAt: '2026-05-10'},
  { id: 5, title: 'LG 전자레인지', price: 60000, status: '판매중', thumbnailUrl: '' , likeCount: 120, chatCount: 18, createdAt: '2026-05-09'},
  { id: 6, title: '시디즈 t50', price: 150000, status: '판매완료', thumbnailUrl: '' , likeCount: 90, chatCount: 8, createdAt: '2026-05-08'},
];

const SORT_OPTIONS = [
  { value: "latest", label: "최신순" },
  { value: "price-high", label: "가격 높은순" },
  { value: "price-low", label: "가격 낮은순" },
  { value: "popular", label: "인기상품 순" },
];

const getSortedProducts = (items, sortOption) => {
  if (!items || items.length === 0) {
    return [];
  }

  const sorted = [...items];
  const parseTime = (value) => new Date(value).getTime() || 0;

  switch (sortOption) {
    case "price-high":
      sorted.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
      break;
    case "price-low":
      sorted.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
      break;
    case "popular":
      sorted.sort((a, b) => (b.likeCount ?? 0) - (a.likeCount ?? 0));
      break;
    case "latest":
    default:
      sorted.sort((a, b) => parseTime(b.createdAt) - parseTime(a.createdAt));
      break;
  }

  return sorted;
};

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortOption, setSortOption] = useState("latest");

  const loadProducts = useCallback(async (keyword = "") => {
    setLoading(true);
    setError("");

    try {
      const params = keyword ? { search: keyword } : {};
      const data = await fetchProducts(params);
      const rawProducts = data?.items ?? data ?? [];
      setProducts(rawProducts);
    } catch {
      const filtered = keyword
        ? MOCK_PRODUCTS.filter((product) =>
            product.title.toLowerCase().includes(keyword.toLowerCase())
          )
        : MOCK_PRODUCTS;
      setProducts(filtered);
    } finally {
      setLoading(false);
    }
  }, []);

  const displayedProducts = useMemo(
    () => getSortedProducts(products, sortOption),
    [products, sortOption]
  );

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
  }, [loadProducts]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    loadProducts(searchKeyword);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  return (
    <section>
      <div className="product-list__header">
        <h1 className="product-list__title">상품 목록</h1>

        <div className="product-list__controls">
          <form onSubmit={handleSearchSubmit} className="product-list__search-form">

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

          <select
            value={sortOption}
            onChange={handleSortChange}
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

        <button type="button" className="product-list__register-btn">
          상품 등록
        </button>
      </div>
      <ProductGrid products={displayedProducts} loading={loading} error={error} />
    </section>
  );
}