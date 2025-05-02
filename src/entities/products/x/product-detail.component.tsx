'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight, FaInfoCircle, FaMapMarkerAlt, FaExclamationTriangle, FaQuestionCircle, FaShoppingCart, FaStar, FaReply, FaCamera } from 'react-icons/fa';

// 로컬 이미지 import
const images = [
  '/products_images/sandwitch/sandwich-01.jpg',
  '/products_images/sandwitch/sandwich-02.jpg',
  '/products_images/sandwitch/sandwich-03.jpg',
  '/products_images/sandwitch/sandwich-04.jpg',
  '/products_images/sandwitch/sandwich-05.jpg',
];

const reviewsData = [
  {
    name: "박지민",
    date: "2024.02.15",
    rating: 5,
    content: "바닐라 시럽의 달콤함이 적절하고 에스프레소와 조화가 너무 좋아요!",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?ixlib=rb-4.0.3",
  },
  {
    name: "김태형",
    date: "2024.02.16",
    rating: 4,
    content: "맛있지만 조금 더 달았으면 좋겠어요.",
    image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-4.0.3",
  },
  {
    name: "전정국",
    date: "2024.02.17",
    rating: 5,
    content: "완벽한 맛입니다. 또 주문할게요!",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3",
  },
];

interface ProductDetailProps {
  productId: string;
}

export default function ProductDetail({ productId }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('detail');
  const [showInquiryModal, setShowInquiryModal] = useState(false);

  const product = {
    id: productId,
    name: "봉봉 시그니처 라떼",
    price: 6500,
    description: "특별한 바닐라 시럽과 에스프레소의 완벽한 조화로 만들어진 봉봉카페의 시그니처 메뉴입니다.",
  };

  const scrollThumbnails = (direction: 'left' | 'right') => {
    const slider = document.querySelector('#thumbnail-slider');
    if (slider) {
      const scrollAmount = direction === 'left' ? -100 : 100;
      slider.scrollLeft += scrollAmount;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      {/* 상품 상세 상단 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
        {/* 이미지 섹션 */}
        <div>
          <div className="relative aspect-square rounded-2xl overflow-hidden">
            <Image
              src={images[selectedImage]}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="relative mt-4 px-8">
            <button
              onClick={() => scrollThumbnails('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-md"
            >
              <FaChevronLeft />
            </button>
            <div id="thumbnail-slider" className="flex gap-2 overflow-x-auto scrollbar-hide">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? 'border-amber-500' : 'border-transparent'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`썸네일 ${index + 1}`}
                    width={80}
                    height={80}
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
            <button
              onClick={() => scrollThumbnails('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-md"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>

        {/* 상품 정보 섹션 */}
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
          <p className="text-xl text-gray-600 mb-8">{product.description}</p>
          <div className="text-3xl font-bold text-amber-600 mb-8">
            {product.price.toLocaleString()}원
          </div>
          <div className="flex gap-4 mt-auto">
            <button className="flex-1 bg-amber-500 text-white py-4 rounded-lg hover:bg-amber-600 transition-colors">
              단체 주문하기
            </button>
            <button className="flex-1 border border-gray-300 py-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
              <FaShoppingCart />
              장바구니
            </button>
          </div>
        </div>
      </div>

      {/* 탭 메뉴 */}
      <div className="border-b border-gray-200">
        <div className="flex justify-center gap-8">
          {[
            { id: 'detail', label: '상품 상세 정보', icon: FaInfoCircle },
            { id: 'origin', label: '원산지 정보', icon: FaMapMarkerAlt },
            { id: 'caution', label: '취급 주의사항', icon: FaExclamationTriangle },
            { id: 'inquiry', label: '상품 문의', icon: FaQuestionCircle },
            { id: 'review', label: '상품 리뷰', icon: FaStar },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-4 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-amber-500 border-b-2 border-amber-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <tab.icon />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 탭 컨텐츠 */}
      <div className="py-12">
        {/* 각 탭에 해당하는 컨텐츠를 조건부 렌더링 */}
        {activeTab === 'detail' && (
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">상품 상세 정보</h2>
            <p>이 제품은 봉봉카페의 시그니처 메뉴로, 특별한 바닐라 시럽과 에스프레소의 완벽한 조화로 만들어졌습니다.</p>
          </div>
        )}
        {activeTab === 'origin' && (
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">원산지 정보</h2>
            <p>이 제품에 사용된 원두는 콜롬비아에서 수입되었습니다.</p>
          </div>
        )}
        {activeTab === 'caution' && (
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">취급 주의사항</h2>
            <p>이 제품은 직사광선을 피하고 서늘한 곳에 보관하세요.</p>
          </div>
        )}
        {activeTab === 'inquiry' && (
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">상품 문의</h2>
            <button
              onClick={() => setShowInquiryModal(true)}
              className="bg-amber-500 text-white py-2 px-4 rounded-lg hover:bg-amber-600 transition-colors"
            >
              문의하기
            </button>
            {showInquiryModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h3 className="text-xl font-bold mb-4">문의하기</h3>
                  <textarea className="w-full p-2 border border-gray-300 rounded-lg mb-4" rows={4} placeholder="문의 내용을 입력하세요"></textarea>
                  <div className="flex justify-end gap-4">
                    <button
                      onClick={() => setShowInquiryModal(false)}
                      className="py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      취소
                    </button>
                    <button className="py-2 px-4 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors">
                      제출
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        {activeTab === 'review' && (
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">상품 리뷰</h2>
            {reviewsData.map((review, index) => (
              <div key={index} className="mb-8">
                <div className="flex items-center mb-2">
                  <Image
                    src={review.image}
                    alt={review.name}
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <h3 className="text-lg font-bold">{review.name}</h3>
                    <p className="text-gray-500">{review.date}</p>
                  </div>
                </div>
                <div className="flex items-center mb-2">
                  {[...Array(review.rating)].map((_, i) => (
                    <FaStar key={i} className="text-amber-500" />
                  ))}
                </div>
                <p>{review.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 