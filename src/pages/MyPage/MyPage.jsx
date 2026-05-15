import { useEffect, useState } from 'react'
import { fetchMyProfile, fetchMyProducts } from './api'
import ProfileSection from './components/ProfileSection'
import TabMenu from './components/TabMenu'
import './MyPage.css'

const MOCK_PROFILE = {
  nickname: '세종학생',
  email: 'student@sejong.ac.kr',
  department: '컴퓨터공학과',
}

const MOCK_PRODUCTS = [
  { id: 1, title: '맥북 프로 14인치', price: 1200000, status: '판매중' },
  { id: 2, title: '전공 서적 세트', price: 25000, status: '판매완료' },
]

export default function MyPage() {
  const [profile, setProfile] = useState(null)
  const [products, setProducts] = useState([])
  const [activeTab, setActiveTab] = useState('selling')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      setLoading(true)

      try {
        const [profileData, productsData] = await Promise.all([
          fetchMyProfile(),
          fetchMyProducts(),
        ])
        setProfile(profileData)
        setProducts(productsData?.items ?? productsData ?? [])
      } catch {
        setProfile(MOCK_PROFILE)
        setProducts(MOCK_PRODUCTS)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const filteredProducts = products.filter((product) => {
    if (activeTab === 'selling') return product.status === '판매중'
    if (activeTab === 'sold') return product.status === '판매완료'
    return false
  })

  return (
    <section className="mypage">
      <h1 className="mypage__title">마이페이지</h1>
      <ProfileSection profile={profile} loading={loading} />
      <TabMenu activeTab={activeTab} onChange={setActiveTab} />

      <ul className="mypage__list">
        {filteredProducts.length === 0 ? (
          <li className="mypage__list-empty">내역이 없습니다.</li>
        ) : (
          filteredProducts.map((product) => (
            <li key={product.id} className="mypage__list-item">
              <span className="mypage__list-item-title">{product.title}</span>
              <span className="mypage__list-item-price">
                {product.price?.toLocaleString()}원
              </span>
            </li>
          ))
        )}
      </ul>
    </section>
  )
}
