import { useState, useEffect, useCallback } from "react";
import { fetchProducts } from "../api";
import { MOCK_PRODUCTS } from "../constants/productConstants";

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  // 1. 순수한 데이터 요청 및 데이터 가공 로직 전용 헬퍼 함수 
  const getFilteredData = useCallback(async (keyword = "") => {
    try {
      const params = keyword ? { search: keyword } : {};
      const data = await fetchProducts(params);
      return data?.items ?? data ?? [];
    } catch {
      if (keyword) {
        return MOCK_PRODUCTS.filter((product) =>
          product.title.toLowerCase().includes(keyword.toLowerCase())
        );
      }
      return MOCK_PRODUCTS;
    }
  }, []);

  // 2. 컴포넌트 마운트 시 동작할 Effect 
  useEffect(() => {
    let isMounted = true;

    async function initLoad() {
      setLoading(true);
      setError("");
      const result = await getFilteredData();
      
      if (isMounted) {
        setProducts(result);
        setLoading(false);
      }
    }

    initLoad();

    return () => {
      isMounted = false; // 클린업 함수를 통해 안전한 상태 업데이트 보장
    };
  }, [getFilteredData]);

  // 3. 검색 폼 제출 핸들러 (검색어 변경 시마다 새로 데이터를 요청하는 방식)
  const handleSearchSubmit = useCallback(async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const result = await getFilteredData(searchKeyword);
    setProducts(result);
    setLoading(false);
  }, [searchKeyword, getFilteredData]);

  return {
    loading,
    error,
    searchKeyword,
    setSearchKeyword,
    filteredProducts: products,
    handleSearchSubmit,
  };
}