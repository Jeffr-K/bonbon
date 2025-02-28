import React from 'react';

export default function PromotionSection() {
  return (
    <div className="py-20 px-5 bg-[#f8f9fa] text-center">
      <h2 className="text-4xl text-[#2c3e50] mb-10 animate-fadeIn">이달의 추천 메뉴</h2>
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          className="bg-white rounded-2xl overflow-hidden shadow-md transition-transform duration-300 hover:-translate-y-1 animate-fadeIn"
          style={{animationDelay: '0.2s'}}
        >
          <img 
            src="https://images.unsplash.com/photo-1541167760496-1628856ab772?ixlib=rb-4.0.3" 
            alt="시그니처 라떼" 
            className="w-full h-[200px] object-cover"
          />
          <div className="p-5">
            <h3 className="text-xl text-[#2c3e50] mb-2.5">봉봉 시그니처 라떼</h3>
            <p className="text-gray-600 mb-4">특별한 바닐라 시럽과 에스프레소의 완벽한 조화</p>
            <span className="text-xl text-[#e67e22] font-semibold">6,500원</span>
          </div>
        </div>
        
        <div 
          className="bg-white rounded-2xl overflow-hidden shadow-md transition-transform duration-300 hover:-translate-y-1 animate-fadeIn"
          style={{animationDelay: '0.4s'}}
        >
          <img 
            src="https://images.unsplash.com/photo-1534778101976-62847782c213?ixlib=rb-4.0.3" 
            alt="아이스 아메리카노" 
            className="w-full h-[200px] object-cover"
          />
          <div className="p-5">
            <h3 className="text-xl text-[#2c3e50] mb-2.5">콜드브루 아메리카노</h3>
            <p className="text-gray-600 mb-4">24시간 저온 추출한 깊은 풍미의 콜드브루</p>
            <span className="text-xl text-[#e67e22] font-semibold">4,500원</span>
          </div>
        </div>
        
        <div 
          className="bg-white rounded-2xl overflow-hidden shadow-md transition-transform duration-300 hover:-translate-y-1 animate-fadeIn"
          style={{animationDelay: '0.6s'}}
        >
          <img 
            src="https://images.unsplash.com/photo-1572490122747-3968b75cc699?ixlib=rb-4.0.3" 
            alt="카페모카" 
            className="w-full h-[200px] object-cover"
          />
          <div className="p-5">
            <h3 className="text-xl text-[#2c3e50] mb-2.5">더블 초코 모카</h3>
            <p className="text-gray-600 mb-4">진한 초콜릿과 에스프레소의 달콤한 만남</p>
            <span className="text-xl text-[#e67e22] font-semibold">5,500원</span>
          </div>
        </div>
      </div>
    </div>
  );
}