import React from 'react';
import { FaCoffee, FaLeaf, FaIceCream, FaShoppingBag } from 'react-icons/fa';

export default function FeaturesSection() {
  return (
    <div className="py-24 px-5 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 px-5">
        <div className="text-center p-10 bg-white rounded-xl shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2.5 animate-float" style={{animationDelay: '0s'}}>
          <FaCoffee className="text-5xl text-[#e67e22] mb-5 mx-auto" />
          <h3 className="text-2xl text-[#2c3e50] mb-4 font-medium">프리미엄 원두</h3>
          <p className="text-gray-600 leading-relaxed">엄선된 최고급 원두만을 사용하여 깊은 풍미를 선사합니다.</p>
        </div>
        
        <div className="text-center p-10 bg-white rounded-xl shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2.5 animate-float" style={{animationDelay: '0.2s'}}>
          <FaLeaf className="text-5xl text-[#e67e22] mb-5 mx-auto" />
          <h3 className="text-2xl text-[#2c3e50] mb-4 font-medium">친환경 포장</h3>
          <p className="text-gray-600 leading-relaxed">환경을 생각하는 마음으로 친환경 포장재만 사용합니다.</p>
        </div>
        
        <div className="text-center p-10 bg-white rounded-xl shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2.5 animate-float" style={{animationDelay: '0.4s'}}>
          <FaIceCream className="text-5xl text-[#e67e22] mb-5 mx-auto" />
          <h3 className="text-2xl text-[#2c3e50] mb-4 font-medium">시그니처 메뉴</h3>
          <p className="text-gray-600 leading-relaxed">봉봉카페만의 특별한 레시피로 만든 시그니처 메뉴를 만나보세요.</p>
        </div>
        
        <div className="text-center p-10 bg-white rounded-xl shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2.5 animate-float" style={{animationDelay: '0.6s'}}>
          <FaShoppingBag className="text-5xl text-[#e67e22] mb-5 mx-auto" />
          <h3 className="text-2xl text-[#2c3e50] mb-4 font-medium">단체 주문</h3>
          <p className="text-gray-600 leading-relaxed">10인 이상 단체 주문 시 특별한 혜택을 제공해드립니다.</p>
        </div>
      </div>
    </div>
  );
}