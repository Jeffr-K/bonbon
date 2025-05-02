'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useMediaQuery } from 'react-responsive';
import { FaHeart, FaComments, FaChevronDown } from 'react-icons/fa';

// 샘플 데이터
const products = [
  { 
    id: 1, 
    name: '아메리카노', 
    category: '음료', 
    subCategory: '커피(HOT)',
    price: 4500,
    originalPrice: 4500,
    image: '/products_images/product1.jpg',
    likes: 12,
    reviews: 5
  },
  // ... 더 많은 상품 데이터
];

const categories = [
  {
    name: '음료',
    subCategories: ['커피(HOT)', '커피(ICE)', '스무디', '에이드', '차(TEA)']
  },
  {
    name: '디저트',
    subCategories: ['케이크', '쿠키', '베이커리', '샌드위치']
  },
  {
    name: '원두',
    subCategories: ['싱글오리진', '블렌드', '디카페인']
  }
];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [likedProducts, setLikedProducts] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const observer = useRef<IntersectionObserver | null>(null);

  const handleCategoryClick = (category: string) => {
    if (expandedCategory === category) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(category);
    }
    setSelectedCategory(category);
  };

  const handleSubCategoryClick = (subCategory: string) => {
    setSelectedSubCategory(subCategory);
  };

  const handleProductSelect = (productId: number) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const toggleLike = (e: React.MouseEvent, productId: number) => {
    e.preventDefault();
    setLikedProducts(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <div>
      {/* 메인 배너 */}
      <div className="relative h-[400px] bg-gradient-to-r from-amber-500 to-amber-600 text-white">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold mb-4">카페 봉봉에 오신 것을 환영합니다</h1>
            <p className="text-xl mb-8">
              달콤한 <span className="text-amber-200">바닐라 시나몬 라떼</span>와 함께
              특별한 가을의 순간을 만나보세요
            </p>
            <button className="px-6 py-3 bg-white text-amber-600 rounded-md hover:bg-amber-50 transition-colors">
              자세히 보기
            </button>
          </div>
        </div>
      </div>

      {/* 상품 목록 */}
      <div className="max-w-7xl mx-auto px-4 py-8 flex gap-8">
        {/* 사이드바 - 데스크톱 */}
        <aside className="hidden md:block w-64 flex-shrink-0">
          <div className="sticky top-24">
            {categories.map(category => (
              <div key={category.name}>
                <button
                  onClick={() => handleCategoryClick(category.name)}
                  className={`w-full flex items-center justify-between p-4 text-left ${
                    selectedCategory === category.name ? 'text-amber-600' : 'text-gray-700'
                  } hover:bg-amber-50 rounded-md transition-colors`}
                >
                  <span>{category.name}</span>
                  {category.subCategories && (
                    <FaChevronDown
                      className={`transform transition-transform ${
                        expandedCategory === category.name ? 'rotate-180' : ''
                      }`}
                    />
                  )}
                </button>
                {expandedCategory === category.name && (
                  <div className="ml-4 border-l-2 border-amber-200">
                    {category.subCategories.map(subCat => (
                      <button
                        key={subCat}
                        onClick={() => handleSubCategoryClick(subCat)}
                        className={`w-full p-3 text-left ${
                          selectedSubCategory === subCat ? 'text-amber-600' : 'text-gray-600'
                        } hover:bg-amber-50 transition-colors`}
                      >
                        {subCat}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </aside>

        {/* 상품 그리드 */}
        <div className="flex-1">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product) => (
              <Link 
                href={`/products/${product.id}`}
                key={product.id} 
                className="group relative bg-white rounded-lg overflow-hidden shadow-md hover:-translate-y-1 transition-transform"
              >
                <div className="relative aspect-square">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                  <button
                    onClick={(e) => toggleLike(e, product.id)}
                    className="absolute bottom-3 left-3 z-10"
                  >
                    <FaHeart 
                      className={`text-2xl ${
                        likedProducts.includes(product.id) 
                          ? 'text-red-500' 
                          : 'text-white opacity-70 hover:opacity-100'
                      } drop-shadow-lg transition-colors`}
                    />
                  </button>
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product.id)}
                    onChange={() => handleProductSelect(product.id)}
                    className="absolute top-3 right-3 w-5 h-5 z-10"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-lg font-bold text-gray-900 mb-2">
                    {product.price.toLocaleString()}원
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <FaHeart className="text-red-400" /> {product.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaComments className="text-gray-400" /> {product.reviews}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* 단체 주문 바 */}
      {selectedProducts.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 z-50">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="font-medium">
                선택된 상품 <span className="text-amber-600">{selectedProducts.length}</span>개
              </span>
              <div className="flex gap-2">
                {selectedProducts.map(id => {
                  const product = products.find(p => p.id === id);
                  return product ? (
                    <span key={id} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                      {product.name}
                      <button
                        onClick={() => handleProductSelect(id)}
                        className="ml-2 text-gray-500 hover:text-gray-700"
                      >
                        ×
                      </button>
                    </span>
                  ) : null;
                })}
              </div>
            </div>
            <button className="px-6 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors">
              단체 주문하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 