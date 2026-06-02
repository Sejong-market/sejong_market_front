import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileSection from './components/ProfileSection';
import TabMenu from './components/TabMenu';
import ProductCard from '../ProductList/components/ProductCard';
import ProfileEditModal from './components/ProfileEditModal';
import { MOCK_PROFILE, MOCK_PRODUCTS } from './MockData.js';
import './MyPage.css';

export default function MyPage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    // try {
    //   const [profileRes, productsRes] = await Promise.all([
    //     fetchMyProfile(),
    //     fetchMyProducts({ page: 0, size: 10 }),
    //   ]);
    //   
    //   setProfile(profileRes?.data ?? profileRes);
    //   setProducts(productsRes?.data?.content ?? productsRes?.content ?? []);
    // } catch {
     // console.warn('API 연동 실패로 더미 데이터를 불러옵니다.');
      setProfile(MOCK_PROFILE);
      setProducts(MOCK_PRODUCTS);
    //} 
    setLoading(false);
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(loadData, 0);
    return () => clearTimeout(timeoutId);
  }, [loadData]);

  const handleDeleteAccount = async () => {
    const isConfirmed = window.confirm("정말 탈퇴하시겠습니까? 현재 계정의 모든 정보가 영구 삭제됩니다.");
    if (!isConfirmed) return;

    try {
      const response = await fetch('/api/users/mypage', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // 만약 프로젝트 공통 인증 헤더(예: Bearer Token)를 사용 중이라면 여기에 추가해 주세요.
        }
      });

      if (response.ok) { // 200 OK
        alert("회원 탈퇴가 완료되었습니다. 이용해 주셔서 감사합니다.");
        
        // 로컬 스토리지에 저장된 인증 토큰 등이 있다면 여기서 제거합니다.
        // localStorage.removeItem('accessToken'); 

        navigate('/login'); // 로그인 화면으로 이동
      } else if (response.status === 401) { // 401 Unauthorized
        alert("인증 자격이 유효하지 않습니다. 다시 로그인 후 시도해 주세요.");
        navigate('/login');
      } else {
        alert("회원 탈퇴 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
      }
    } catch (error) {
      console.error("회원 탈퇴 요청 실패:", error);
      alert("네트워크 오류가 발생했습니다.");
    }
  };

  // 탭 상태에 따른 상품 필터링 (전체 탭 조건 추가)
  const filteredProducts = products.filter((p) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'selling') {
      return p.status === 'FOR_SALE' || p.status === '판매중';
    }
    if (activeTab === 'sold') {
      return p.status === 'SOLD_OUT' || p.status === '판매완료';
    }
    if (activeTab === 'reserved') {
      return p.status === 'RESERVED' || p.status === '예약중';
    }
    return false;
  });

  return (
    <section className="mypage">
      <h1 className="mypage__title">마이페이지</h1>
      
{/* 닉네임 수정 모달 오픈과 함께 회원 탈퇴 함수를 prop으로 전달합니다 */}
      <ProfileSection 
        profile={profile} 
        loading={loading} 
        onEditClick={() => setIsEditModalOpen(true)} 
        onDeleteAccount={handleDeleteAccount} 
      />
      
      <TabMenu activeTab={activeTab} onChange={setActiveTab} />

      <div className="mypage__list">
        {loading ? (
          <div className="mypage__list-empty">로딩 중...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="mypage__list-empty"> 상품이 없습니다.</div>
        ) : (
          <div className="mypage__product-grid">
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product.productId || product.id} 
                product={{
                  ...product,
                  id: product.productId || product.id,
                  image: product.imageUrl || product.image,
                  status: product.status === 'FOR_SALE' || product.status === '판매중' ? '판매중' : 
                          product.status === 'RESERVED' || product.status === '예약중' ? '예약중' : '판매완료'
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

      {/* 정보 수정 모달 */}
      <ProfileEditModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        currentNickname={profile?.nickname || ''}
        onRefresh={loadData}
      />
    </section>
  );
}