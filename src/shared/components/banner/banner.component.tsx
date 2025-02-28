import React from 'react';
import Link from 'next/link';

export default function Banner() {
  return (
    <div className="w-full h-[60vh] mt-0">
      <div 
        className="w-full h-full flex items-center justify-center bg-[linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url('https://images.unsplash.com/photo-1511920170033-f8396924c348?ixlib=rb-4.0.3')] bg-center bg-cover bg-no-repeat"
      >
        <div className="animate-fadeIn text-white text-center">
          <h1 className="text-4xl md:text-5xl mb-5 font-bold text-shadow">
            카페 봉봉에 오신 것을 환영합니다
          </h1>
          <p className="text-base md:text-xl mb-8 max-w-[600px] mx-auto leading-relaxed">
            특별한 순간을 위한 특별한 카페,<br />
            카페 봉봉과 함께하세요
          </p>
          <Link 
            href="/products" 
            className="inline-block py-4 px-10 bg-[#e67e22] text-white no-underline rounded-full text-lg font-semibold transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg hover:shadow-[rgba(230,126,34,0.4)]"
          >
            메뉴 보기
          </Link>
        </div>
      </div>
    </div>
  );
}