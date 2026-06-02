import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchMyProfile, fetchMyProducts } from './api';
import ProfileSection from './components/ProfileSection';
import TabMenu from './components/TabMenu';
import ProductCard from '../ProductList/components/ProductCard';
import { MOCK_PROFILE, MOCK_PRODUCTS } from './mockData'; // 분리한 더미 데이터 임포트
import './MyPage.css';

export default function MyPage() {
  const navigate = useNavigate();
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
                  image: product.imageUrl || product.image,
                  status: product.status === 'FOR_SALE' || product.status === '판매중' ? '판매중' : '판매완료'
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* 우측 하단 플로팅 상품 등록 버튼 */}
      <button 
        type="button" 
        className="mypage__fab" 
        onClick={() => navigate('/products/new')}
        aria-label="상품 등록"
      >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
        <line x1="12" y1="3" x2="12" y2="21"></line>
        <line x1="3" y1="12" x2="21" y2="12"></line>
      </svg>
      </button>
    </section>
  );
}