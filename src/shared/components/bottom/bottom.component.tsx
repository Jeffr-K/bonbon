// components/bottom-navigator.tsx
"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome, FaList, FaCoffee, FaLeaf, FaIceCream, FaShoppingBag, FaShoppingCart, FaUser, FaChevronLeft } from 'react-icons/fa';

export default function BottomNavigator() {
  const [showCategories, setShowCategories] = useState(false);
  const [selectedMainCategory, setSelectedMainCategory] = useState(null);
  const pathname = usePathname();

  const categories = [
    {
      name: "커피",
      subCategories: ["에스프레소", "라떼", "콜드브루", "디카페인"]
    },
    {
      name: "논커피",
      subCategories: ["차", "스무디", "에이드"]
    },
    {
      name: "디저트",
      subCategories: ["케이크", "쿠키", "샌드위치"]
    },
    {
      name: "상품",
      subCategories: ["머그컵", "텀블러", "원두", "선물세트"]
    }
  ];

  const categoryIcons = {
    "커피": FaCoffee,
    "논커피": FaLeaf,
    "디저트": FaIceCream,
    "상품": FaShoppingBag
  };

  const subCategoryIcons = {
    "에스프레소": FaCoffee,
    "라떼": FaCoffee,
    "콜드브루": FaCoffee,
    "디카페인": FaCoffee,
    "차": FaLeaf,
    "스무디": FaLeaf,
    "에이드": FaLeaf,
    "케이크": FaIceCream,
    "쿠키": FaIceCream,
    "샌드위치": FaIceCream,
    "머그컵": FaShoppingBag,
    "텀블러": FaShoppingBag,
    "원두": FaShoppingBag,
    "선물세트": FaShoppingBag
  };

  // 카테고리 선택 핸들러
  const onCategorySelect = (mainCategory: any, subCategory = null) => {
    console.log(`Selected category: ${mainCategory}, sub: ${subCategory}`);
    // 여기서 카테고리 선택에 대한 로직을 구현
    // 필요한 경우 URL을 변경하거나 다른 상태를 업데이트
  };

  const handleMainCategoryClick = (category: any) => {
    setSelectedMainCategory(category === selectedMainCategory ? null : category);
    onCategorySelect(category);
  };

  // 뒤로가기 이벤트 핸들러 추가
  useEffect(() => {
    const handleBackButton = (e: any) => {
      if (showCategories) {
        e.preventDefault();
        setShowCategories(false);
      }
    };

    window.addEventListener('popstate', handleBackButton);
    
    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, [showCategories]);

  // 카테고리 메뉴 열 때 history에 state 추가
  const handleShowCategories = () => {
    window.history.pushState({ type: 'category' }, '');
    setShowCategories(true);
  };

  const selectedCategory = categories.find((cat: any) => cat.name === selectedMainCategory);

  return (
    <>
      <div className="block md:hidden fixed bottom-0 left-0 right-0 bg-white pt-2.5 pb-1.5 shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-[1000]" style={{ zIndex: showCategories ? 1002 : 1000 }}>
        <div className="flex justify-around w-full">
          <button
            className={`flex flex-col items-center gap-1 bg-transparent border-none p-0 cursor-pointer text-[0.7rem] min-w-[50px] ${pathname === '/' ? 'text-amber-600' : 'text-gray-600'}`}
            onClick={() => showCategories ? setShowCategories(false) : null}
          >
            <Link href="/" className="flex flex-col items-center">
              <FaHome className="text-xl mb-0.5" />
              <span>홈</span>
            </Link>
          </button>
          <button
            className={`flex flex-col items-center gap-1 bg-transparent border-none p-0 cursor-pointer text-[0.7rem] min-w-[50px] ${showCategories ? 'text-amber-600' : 'text-gray-600'}`}
            onClick={handleShowCategories}
          >
            <FaList className="text-xl mb-0.5" />
            <span>카테고리</span>
          </button>
          <button
            className={`flex flex-col items-center gap-1 bg-transparent border-none p-0 cursor-pointer text-[0.7rem] min-w-[50px] ${pathname === '/products' ? 'text-amber-600' : 'text-gray-600'}`}
            onClick={() => showCategories ? setShowCategories(false) : null}
          >
            <Link href="/products" className="flex flex-col items-center">
              <FaCoffee className="text-xl mb-0.5" />
              <span>상품</span>
            </Link>
          </button>
          <button
            className={`flex flex-col items-center gap-1 bg-transparent border-none p-0 cursor-pointer text-[0.7rem] min-w-[50px] ${pathname === '/cart' ? 'text-amber-600' : 'text-gray-600'}`}
            onClick={() => showCategories ? setShowCategories(false) : null}
          >
            <Link href="/cart" className="flex flex-col items-center">
              <FaShoppingCart className="text-xl mb-0.5" />
              <span>장바구니</span>
            </Link>
          </button>
          <button
            className={`flex flex-col items-center gap-1 bg-transparent border-none p-0 cursor-pointer text-[0.7rem] min-w-[50px] ${pathname === '/mypage' ? 'text-amber-600' : 'text-gray-600'}`}
            onClick={() => showCategories ? setShowCategories(false) : null}
          >
            <Link href="/mypage" className="flex flex-col items-center">
              <FaUser className="text-xl mb-0.5" />
              <span>마이</span>
            </Link>
          </button>
        </div>
      </div>

      {categories && categories.length > 0 && (
        <div className={`fixed top-0 left-0 w-full h-full bg-white transform ${showCategories ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-[1001] flex flex-col`}>
          <div className="p-5 border-b border-gray-200 flex items-center gap-4">
            <button
              onClick={() => setShowCategories(false)}
              className="bg-transparent border-none text-xl text-gray-600 p-1 flex items-center"
            >
              <FaChevronLeft />
            </button>
            <h2 className="text-lg font-semibold text-gray-800">카테고리</h2>
          </div>
          <div className="flex-1 overflow-y-auto p-5">
            <div className="grid grid-cols-4 gap-4 mb-8">
              {categories.map((category: any) => {
                const Icon = categoryIcons[category.name as keyof typeof categoryIcons];
                return (
                  <button
                    key={category.name}
                    className={`flex flex-col items-center gap-2 p-4 border rounded-xl text-sm transition-all duration-200 ${category.name === selectedMainCategory ? 'bg-amber-50 border-amber-600 text-amber-600' : 'bg-white border-gray-200 text-gray-800'}`}
                    onClick={() => handleMainCategoryClick(category.name)}
                  >
                    {Icon && <Icon className="text-2xl" />}
                    {category.name}
                  </button>
                );
              })}
            </div>
            {selectedCategory && selectedCategory.subCategories && selectedCategory.subCategories.length > 0 && (
      <div className="grid grid-cols-2 gap-2.5 p-4 bg-gray-50 rounded-xl">
        {selectedCategory.subCategories.map((subCategory: any) => {
        const SubIcon = subCategoryIcons[subCategory as keyof typeof subCategoryIcons];
        return (
          <button
            key={subCategory}
            className="flex items-center gap-2 p-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 transition-all duration-200"
            onClick={() => {
              onCategorySelect(selectedMainCategory, subCategory);
              setShowCategories(false);
            }}
          >
            {SubIcon && <SubIcon className="text-base" />}
            {subCategory}
          </button>
          );
      })}
    </div>
)}
          </div>
        </div>
      )}
    </>
  );
}