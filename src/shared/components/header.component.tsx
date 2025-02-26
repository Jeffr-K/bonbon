"use client"

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaShoppingCart, FaUser, FaBars, FaSearch, FaFacebook, FaGoogle } from 'react-icons/fa';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [user, setUser] = useState(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleLogin = (userData: any) => {
    setUser(userData);
    setShowLoginModal(false);
  };

  // 모달 외부 클릭 감지 핸들러
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setShowLoginModal(false);
      }
    }

    // 모달이 열려있을 때만 이벤트 리스너 추가
    if (showLoginModal) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showLoginModal]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-100 py-4 px-8 md:px-4 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* 모바일 메뉴 아이콘 - 왼쪽 */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="text-gray-700 hover:text-amber-600"
            >
              <FaBars className="text-2xl" />
            </button>
          </div>

          {/* 로고 - 중앙(모바일)/왼쪽(데스크톱) */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image 
                src="/logo.jpeg" 
                alt="카페 봉봉 로고" 
                width={30} 
                height={30} 
                className="rounded-full" 
              />
              <span className="font-bold text-lg text-amber-800">카페 봉봉</span>
            </Link>
          </div>

          {/* 메인 메뉴 - 데스크톱 */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-amber-600 font-medium">
              홈
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-amber-600 font-medium">
              상품
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-amber-600 font-medium">
              소개
            </Link>
            <Link href="/locations" className="text-gray-700 hover:text-amber-600 font-medium">
              매장
            </Link>
          </nav>

          {/* 유저 섹션 - 오른쪽 */}
          <div className="flex items-center space-x-4">
            {/* 데스크톱 유저 섹션 */}
            {user ? (
              <div className="hidden md:flex items-center space-x-2 text-gray-700">
                <FaUser />
                <span className="font-medium">{'로그인'}님</span>
              </div>
            ) : (
              <button 
                onClick={() => setShowLoginModal(true)}
                className="hidden md:flex items-center space-x-1 px-4 py-2 border border-amber-600 rounded-full text-amber-800 hover:bg-amber-600 hover:text-white transition-colors"
              >
                <FaUser />
                <span>로그인</span>
              </button>
            )}
            
            {/* 공통 장바구니 아이콘 */}
            <Link href="/cart" className="text-gray-700 hover:text-amber-600 relative">
              <FaShoppingCart className="text-xl" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                0
              </span>
            </Link>
            
            {/* 모바일 검색 아이콘 */}
            <button className="md:hidden text-gray-700 hover:text-amber-600">
              <FaSearch className="text-xl" />
            </button>
          </div>
        </div>
      </header>

      {/* 모바일 사이드 메뉴 */}
      <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMobileMenuOpen(false)}
      />
      
      <div className={`fixed top-0 left-0 h-full w-4/5 max-w-xs bg-white z-50 transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-5">
          <div className="flex flex-col">
            {/* 모바일 메뉴 유저 섹션 */}
            {user ? (
              <div className="flex items-center space-x-2 py-4 border-b border-gray-200">
                <FaUser className="text-gray-700" />
                <span className="font-medium text-gray-800">{'로그인'}님</span>
              </div>
            ) : (
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setShowLoginModal(true);
                }}
                className="flex items-center space-x-2 py-4 border-b border-gray-200 text-gray-700"
              >
                <FaUser />
                <span>로그인</span>
              </button>
            )}
            
            {/* 모바일 메뉴 항목들 */}
            <nav className="mt-4 flex flex-col space-y-4">
              <Link 
                href="/" 
                className="py-3 border-b border-gray-200 text-gray-700 hover:text-amber-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                홈
              </Link>
              <Link 
                href="/products" 
                className="py-3 border-b border-gray-200 text-gray-700 hover:text-amber-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                상품
              </Link>
              <Link 
                href="/about" 
                className="py-3 border-b border-gray-200 text-gray-700 hover:text-amber-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                소개
              </Link>
              <Link 
                href="/locations" 
                className="py-3 border-b border-gray-200 text-gray-700 hover:text-amber-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                매장
              </Link>
            </nav>
          </div>
        </div>
      </div>

      {/* 로그인 모달 */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          {/* 모달 내용 - ref 추가하여 외부 클릭 감지 */}
          <div ref={modalRef} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-4">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-10">카페 봉봉</h2>
            <form>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">이메일</label>
                <input type="email" id="email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-amber-500" placeholder="cafe.bonbon@gmail.com" />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700 font-medium mb-2">비밀번호</label>
                <input type="password" id="password" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-amber-500" />
              </div>
            </form>

            <div className="mt-4 flex items-center justify-between px-2">
              {/* 자동 로그인 체크박스 */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="autoLogin"
                  className="w-4 h-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                />
                <label htmlFor="autoLogin" className="ml-2 text-sm text-gray-600 cursor-pointer">
                  자동 로그인
                </label>
              </div>
              
              {/* 아이디/비밀번호 찾기 링크 */}
              <div>
                <a href="/find-account" className="text-sm text-gray-600 hover:text-amber-600 hover:underline">
                  <u>이메일 혹은 비밀번호를 잊어버리셨나요?</u>
                </a>
              </div>
            </div>
            
            {/* 로그인 버튼만 남김 */}
            <div className="mt-6 flex justify-center">
              <button 
                onClick={() => handleLogin({ nickname: '테스트' })}
                className="w-full py-3 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
              >
                로그인
              </button>
            </div>

            {/* 가로 구분자 */}
            <div className="mt-6 relative flex items-center">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="flex-shrink mx-4 text-gray-600 text-sm">SNS 로 로그인하기</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
            
            {/* 소셜 로그인 섹션 */}
            <div className="mt-6 flex flex-col space-y-3">
              {/* 카카오 로그인 버튼 */}
              <button className="flex items-center justify-center w-full py-2 px-4 bg-yellow-300 rounded-md hover:bg-yellow-400 transition-colors">
                <span className="font-medium text-gray-800">카카오로 로그인하기</span>
              </button>
              
              {/* 네이버 로그인 버튼 */}
              <button className="flex items-center justify-center w-full py-2 px-4 bg-green-500 rounded-md hover:bg-green-600 transition-colors">
                <span className="font-medium text-white">네이버로 로그인하기</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 헤더 높이만큼 여백 추가 */}
      <div className="h-16"></div>
    </>
  );
}