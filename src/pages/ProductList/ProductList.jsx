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
  { id: 6, title: '시디즈 t50', price: 150000, status: '판매중', thumbnailUrl: '' },
]

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      setError("");

      try {
        const data = await fetchProducts();
        setProducts(data?.items ?? data ?? []);
      } catch {
        setProducts(MOCK_PRODUCTS);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  return (
    <section>
      <div className="product-list__header">
        <h1 className="product-list__title">상품 목록</h1>
        <button type="button" className="product-list__register-btn">
          상품 등록
        </button>
      </div>
      <ProductGrid products={products} loading={loading} error={error} />
    </section>
  );
}
