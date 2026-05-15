const TABS = [
  { id: 'selling', label: '판매 중' },
  { id: 'sold', label: '판매 완료' },
  { id: 'purchased', label: '구매 내역' },
]

export default function TabMenu({ activeTab, onChange }) {
  return (
    <div className="tab-menu">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onChange(tab.id)}
          className={[
            'tab-menu__button',
            activeTab === tab.id ? 'tab-menu__button--active' : '',
          ].join(' ')}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
