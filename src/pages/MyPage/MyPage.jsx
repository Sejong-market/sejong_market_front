import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileSection from './components/ProfileSection';
import TabMenu from './components/TabMenu';
import SortToolbar from './components/SortToolbar';
import ProductPagination from './components/ProductPagination';
import ProductCard from '../ProductList/components/ProductCard';
import ProfileEditModal from './components/ProfileEditModal';
import { fetchMyProfile, fetchMyProducts, deleteMyAccount } from './api';
import { MY_PRODUCT_PAGE_SIZE, MY_PRODUCT_SORT } from './constants/mypageConstants';
import './MyPage.css';

function isAuthError(err) {
  return err?.status === 401 || err?.status === 403;
}

export default function MyPage() {
  const navigate = useNavigate();
  const sortOptionRef = useRef('latest');
  const pageRef = useRef(0);
  const skipSortReload = useRef(true);
  const [profile, setProfile] = useState(null);
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [sortOption, setSortOption] = useState('latest');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleAuthFailure = useCallback(() => {
    localStorage.removeItem('accessToken');
    alert('인증이 만료되었습니다. 다시 로그인해주세요.');
    navigate('/login');
  }, [navigate]);

  const handleLoadError = useCallback((err) => {
    if (isAuthError(err)) {
      handleAuthFailure();
      return;
    }

    if (err?.message === 'Failed to fetch') {
      setError('서버에 연결할 수 없습니다. 백엔드 실행 여부를 확인해주세요.');
    } else {
      setError('마이페이지 데이터를 불러오지 못했습니다.');
    }
  }, [handleAuthFailure]);

  const loadProfile = useCallback(async () => {
    const profileRes = await fetchMyProfile();
    const profileData = profileRes?.data ?? profileRes;
    setProfile(profileData);
  }, []);

  const loadProducts = useCallback(async ({ sort, pageNumber }) => {
    const productsRes = await fetchMyProducts({
      page: pageNumber,
      size: MY_PRODUCT_PAGE_SIZE,
      sort: MY_PRODUCT_SORT[sort] ?? MY_PRODUCT_SORT.latest,
    });
    const productsData = productsRes?.data ?? productsRes;

    setProducts(productsData?.content ?? []);
    setTotalPages(productsData?.totalPages ?? 0);
    setTotalElements(productsData?.totalElements ?? 0);
    setPage(productsData?.number ?? pageNumber);
    pageRef.current = productsData?.number ?? pageNumber;
  }, []);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      await Promise.all([
        loadProfile(),
        loadProducts({ sort: sortOptionRef.current, pageNumber: pageRef.current }),
      ]);
    } catch (err) {
      handleLoadError(err);
    } finally {
      setLoading(false);
    }
  }, [loadProfile, loadProducts, handleLoadError]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    sortOptionRef.current = sortOption;
  }, [sortOption]);

  useEffect(() => {
    if (skipSortReload.current) {
      skipSortReload.current = false;
      return;
    }

    async function reloadProducts() {
      setProductsLoading(true);
      setError('');

      try {
        await loadProducts({ sort: sortOption, pageNumber: 0 });
      } catch (err) {
        handleLoadError(err);
      } finally {
        setProductsLoading(false);
      }
    }

    reloadProducts();
  }, [sortOption, loadProducts, handleLoadError]);

  const handlePageChange = async (nextPage) => {
    setProductsLoading(true);
    setError('');

    try {
      await loadProducts({ sort: sortOptionRef.current, pageNumber: nextPage });
    } catch (err) {
      handleLoadError(err);
    } finally {
      setProductsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    const isConfirmed = window.confirm(
      '정말 탈퇴하시겠습니까? 현재 계정의 모든 정보가 영구 삭제됩니다.'
    );
    if (!isConfirmed) return;

    try {
      await deleteMyAccount();
      localStorage.removeItem('accessToken');
      alert('회원 탈퇴가 완료되었습니다. 이용해 주셔서 감사합니다.');
      navigate('/login');
    } catch (err) {
      console.error('회원 탈퇴 요청 실패:', err);
      if (isAuthError(err)) {
        handleAuthFailure();
      } else {
        alert('오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
      }
    }
  };

  const filteredProducts = products.filter((p) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'selling') return p.status === 'FOR_SALE' || p.status === '판매중';
    if (activeTab === 'sold') return p.status === 'SOLD_OUT' || p.status === '판매완료';
    if (activeTab === 'reserved') return p.status === 'RESERVED' || p.status === '예약중';
    return false;
  });

  const isListLoading = loading || productsLoading;

  return (
    <section className="mypage">
      <h1 className="mypage__title">마이페이지</h1>

      {error && (
        <div className="mypage__error" role="alert">
          {error}
        </div>
      )}

      <ProfileSection
        profile={profile}
        loading={loading}
        onEditClick={() => setIsEditModalOpen(true)}
        onDeleteAccount={handleDeleteAccount}
      />

      <TabMenu activeTab={activeTab} onChange={setActiveTab} />

      <SortToolbar
        totalCount={totalElements}
        sortOption={sortOption}
        onSortChange={setSortOption}
      />

      <div className="mypage__list">
        {isListLoading ? (
          <div className="mypage__list-empty">로딩 중...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="mypage__list-empty">상품이 없습니다.</div>
        ) : (
          <div className="mypage__product-grid">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.productId || product.id}
                product={product}
              />
            ))}
          </div>
        )}
      </div>

      <ProductPagination
        page={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        disabled={isListLoading}
      />

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

      <ProfileEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        currentNickname={profile?.nickname || ''}
        onRefresh={loadData}
      />
    </section>
  );
}
