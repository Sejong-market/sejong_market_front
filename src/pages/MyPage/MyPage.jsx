import { useState, useEffect } from 'react';
import { fetchMyProfile, fetchMyProducts } from './api';
import ProfileSection from './components/ProfileSection';
import TabMenu from './components/TabMenu';
import ProductCard from '../ProductList/components/ProductCard';
import { MOCK_PROFILE, MOCK_PRODUCTS } from './mockData'; // 분리한 더미 데이터 임포트
import './MyPage.css';

export default function MyPage() {
  const [profile, setProfile] = useState(null);
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [profileRes, productsRes] = await Promise.all([
          fetchMyProfile(),
          fetchMyProducts({ page: 0, size: 10 }),
        ]);
        
        setProfile(profileRes?.data ?? profileRes);
        setProducts(productsRes?.data?.content ?? productsRes?.content ?? []);
      } catch {
        console.warn('API 연동 실패로 더미 데이터를 불러옵니다.');
        setProfile(MOCK_PROFILE);
        setProducts(MOCK_PRODUCTS);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  // API의 영문 상태값을 ProductCard용 한글 상태값으로 변환 (더미데이터의 한글은 그대로 통과)
  const getKoreanStatus = (status) => {
    if (status === 'FOR_SALE') return '판매중';
    if (status === 'RESERVED') return '예약중';
    if (status === 'SOLD_OUT') return '판매완료';
    return status;
  };

  // 탭 상태에 따른 상품 필터링 (영문, 한글 상태값 모두 호환되도록 처리)
  const filteredProducts = products.filter((p) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'selling') {
      return p.status === 'FOR_SALE' || p.status === 'RESERVED' || p.status === '판매중' || p.status === '예약중';
    }
    if (activeTab === 'sold') {
      return p.status === 'SOLD_OUT' || p.status === '판매완료';
    }
    return false;
  });

  return (
    <section className="mypage">
      <h1 className="mypage__title">마이페이지</h1>
      
      <ProfileSection profile={profile} loading={loading} />
      <TabMenu activeTab={activeTab} onChange={setActiveTab} />

      <div className="mypage__list">
        {loading ? (
          <div className="mypage__list-empty">로딩 중...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="mypage__list-empty">해당하는 상품이 없습니다.</div>
        ) : (
          <div className="my-page__product-grid">
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product.productId || product.id} 
                product={{
                  ...product,
                  id: product.productId || product.id,
                  image: product.imageUrl || product.image, // 실제 API의 imageUrl과 더미데이터의 image 호환
                  status: getKoreanStatus(product.status) 
                }} 
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}