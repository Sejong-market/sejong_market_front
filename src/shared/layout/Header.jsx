import { NavLink } from "react-router-dom";
import sejongLogo from "../../assets/sejong_logo.png";

const navItems = [
  { to: "/products", label: "상품" },
  { to: "/chat", label: "채팅" },
  { to: "/mypage", label: "마이페이지" },
];

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <NavLink
          to="/products"
          className="flex items-center gap-2 text-lg font-bold text-gray-900 no-underline"
        >
          <img
            src={sejongLogo}
            alt="세종대 로고"
            className="h-6 w-auto object-contain"
          />
          <span>세종마켓</span>
        </NavLink>

        <nav className="flex items-center gap-1">
          {navItems.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                [
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-emerald-50 text-emerald-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                ].join(" ")
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
