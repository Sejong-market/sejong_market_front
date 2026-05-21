import { Outlet } from 'react-router-dom'
import Header from './Header'

export default function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Header />

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6">
        <Outlet />
      </main>
<footer className="border-t border-gray-250 bg-gray-100 py-8 text-xs text-gray-500">
        <div className="mx-auto max-w-5xl px-4">
          {/* 회사 이름 */}
          <h2 className="mb-4 text-sm font-bold text-gray-800">(주)세종마켓</h2>
          
          {/* 상세 사업자 정보 그리드 레이아웃 */}
          <div className="mb-6 grid grid-cols-1 gap-x-6 gap-y-1 sm:grid-cols-2 md:grid-cols-3 text-gray-600">
            <p><span className="font-semibold text-gray-500">상호명:</span> (주)세종마켓</p>
            <p><span className="font-semibold text-gray-500">대표자:</span> 조대승</p>
            <p><span className="font-semibold text-gray-500">사업자 등록번호:</span> 000-00-000000</p>
            <p><span className="font-semibold text-gray-500">통신판매신고번호:</span> 제2026-서울광진구-00000호</p>
            <p className="sm:col-span-2 md:col-span-3">
              <span className="font-semibold text-gray-500">주소:</span> 서울 광진구 능동로 209 대양AI센터 지하1층
            </p>
            <p><span className="font-semibold text-gray-500">대표번호:</span> 1234-5678</p>
            <p><span className="font-semibold text-gray-500">메일:</span> sejong@sejongmarket.co.kr</p>
            <p><span className="font-semibold text-gray-500">호스팅제공자:</span> 아마존웹서비스</p>
          </div>

          {/* 면책 조항 법적 고지 */}
          <p className="leading-relaxed text-gray-400 border-t border-gray-200 pt-4 text-[11px]">
            "세종마켓" 상점의 판매상품을 제외한 모든 상품들에 대하여 (주)세종마켓은 통신판매중개자로서 
            거래 당사자가 아니며 판매 회원과 구매회원간의 상품거래 정보 및 거래에 관여하지 않고 
            어떠한 의무와 책임도 부담하지 않습니다.
          </p>
        </div>
      </footer>
    </div>
  )
}