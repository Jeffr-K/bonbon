'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FaBox, 
  FaUsers, 
  FaStore,
  FaHome
} from 'react-icons/fa';

const menuItems = [
  {
    section: '상품 관리',
    items: [
      { href: '/admin/products', icon: FaBox, label: '상품 관리' },
      { href: '/admin/categories', icon: FaStore, label: '카테고리 관리' },
    ]
  },
  {
    section: '회원 관리',
    items: [
      { href: '/admin/users', icon: FaUsers, label: '회원 관리' },
    ]
  }
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  return (
    <>
      {/* GNB */}
      <nav className="bg-slate-800 px-5 h-16 flex items-center justify-between fixed top-0 left-0 right-0 z-20">
        <div className="flex items-center gap-8">
          <div className="text-white text-lg font-semibold">봉봉 카페 관리자</div>
          <Link href="/" className="flex items-center gap-2 text-white no-underline text-sm px-3 py-2 rounded-md transition duration-300 hover:bg-white/10">
            <FaHome className="text-base" />
            앱으로 돌아가기
          </Link>
        </div>
      </nav>

      <div className="flex min-h-screen pt-16">
        {/* 사이드바 */}
        <aside className="w-64 bg-slate-800 text-white p-0 pt-5 fixed h-[calc(100vh-4rem)] top-16 overflow-y-auto">
          {menuItems.map((section, index) => (
            <div key={index} className="mb-8 last:mb-10">
              <h3 className="px-5 text-gray-400 text-xs uppercase tracking-wider mb-4">{section.section}</h3>
              {section.items.map((item, idx) => {
                const isActive = pathname === item.href;
                return (
                  <Link 
                    key={idx} 
                    href={item.href}
                    className={`flex items-center px-5 py-3 text-gray-100 no-underline transition duration-300 hover:bg-slate-700 ${
                      isActive ? 'bg-orange-500 text-white' : ''
                    }`}
                  >
                    <item.icon className="mr-3 text-lg" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          ))}
        </aside>

        {/* 메인 콘텐츠 */}
        <main className="flex-1 ml-64 p-5 bg-gray-100 min-h-screen">
          {children}
        </main>
      </div>
    </>
  );
} 