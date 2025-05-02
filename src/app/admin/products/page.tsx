'use client';

import { useState } from 'react';
import { FaPlus, FaEdit, FaSearch } from 'react-icons/fa';
import AdminLayout from '@/app/admin/components/AdminLayout';
import { 
  AdminContainer, 
  AdminHeader, 
  AdminTitle, 
  AdminButton, 
  AdminTable,
  AdminTableHead,
  AdminTableBody,
  AdminTableHeader,
  AdminTableCell,
  AdminBadge,
  AdminCard
} from '@/app/admin/adminComponent';
import ProductCreationModal from '@/entities/admin/x/product-creation.modal'; // ProductCreationModal 컴포넌트 임포트

// 샘플 데이터
const sampleProducts = [
  { id: 1, name: '아메리카노', category: '음료 커피(HOT)', price: 4500, status: 'active', image: 'https://via.placeholder.com/50' },
  { id: 2, name: '카페라떼', category: '음료 커피(HOT)', price: 5000, status: 'active', image: 'https://via.placeholder.com/50' },
  { id: 3, name: '바닐라라떼', category: '음료 커피(HOT)', price: 5500, status: 'active', image: 'https://via.placeholder.com/50' },
  { id: 4, name: '초코케이크', category: '디저트 케이크', price: 6500, status: 'active', image: 'https://via.placeholder.com/50' },
  { id: 5, name: '치즈케이크', category: '디저트 케이크', price: 6500, status: 'active', image: 'https://via.placeholder.com/50' },
  { id: 6, name: '구움과자 세트', category: '디저트 베이커리', price: 8000, status: 'inactive', image: 'https://via.placeholder.com/50' },
  { id: 7, name: '에티오피아 예가체프', category: '원두 싱글오리진', price: 12000, status: 'active', image: 'https://via.placeholder.com/50' },
  { id: 8, name: '과테말라 안티구아', category: '원두 싱글오리진', price: 15000, status: 'active', image: 'https://via.placeholder.com/50' },
];

const ITEMS_PER_PAGE = 10;

export default function ProductsPage() {
  const [products, setProducts] = useState(sampleProducts);
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const handleAddProduct = () => {
    setCurrentProduct(null);
    setShowModal(true);
  };

  const handleEditProduct = (product: any) => {
    setCurrentProduct(product);
    setShowModal(true);
  };

  const handleSaveProduct = (formData: any) => {
    if (currentProduct) {
      // 기존 제품 수정
      setProducts(prev => 
        prev.map(p => p.id === currentProduct.id ? {
          ...p,
          name: formData.name,
          category: `${formData.mainCategory} ${formData.subCategory}`,
          price: parseInt(formData.price),
          status: formData.status,
          origin: formData.origin,
          caution: formData.caution,
          description: formData.description,
          // 이미지가 있는 경우에만 업데이트
          ...(formData.images.length > 0 && { image: URL.createObjectURL(formData.images[0]) })
        } : p)
      );
    } else {
      // 새 제품 추가
      const newProduct = {
        id: Math.max(...products.map(p => p.id)) + 1,
        name: formData.name,
        category: `${formData.mainCategory} ${formData.subCategory}`,
        price: parseInt(formData.price),
        status: formData.status,
        origin: formData.origin,
        caution: formData.caution,
        description: formData.description,
        image: formData.images.length > 0 
          ? URL.createObjectURL(formData.images[0]) 
          : 'https://via.placeholder.com/50'
      };
      setProducts(prev => [...prev, newProduct]);
    }
    setShowModal(false);
    setCurrentProduct(null);
  };

  const handleDeleteProduct = (id: number) => {
    if (window.confirm('정말로 이 상품을 삭제하시겠습니까?')) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 페이지네이션 계산
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <AdminLayout>
      <AdminContainer>
        <AdminHeader>
          <AdminTitle>상품 목록</AdminTitle>
          <AdminButton onClick={handleAddProduct} className="flex items-center gap-2">
            <FaPlus size={14} />
            상품 추가
          </AdminButton>
        </AdminHeader>
        
        <AdminCard className="mb-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="상품명 또는 카테고리로 검색"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500">
              <option value="">모든 카테고리</option>
              <option value="음료">음료</option>
              <option value="디저트">디저트</option>
              <option value="원두">원두</option>
            </select>
          </div>
        </AdminCard>
        
        <AdminTable>
          <AdminTableHead>
            <AdminTableHeader>이미지</AdminTableHeader>
            <AdminTableHeader>상품명</AdminTableHeader>
            <AdminTableHeader>대분류</AdminTableHeader>
            <AdminTableHeader>소분류</AdminTableHeader>
            <AdminTableHeader>가격</AdminTableHeader>
            <AdminTableHeader>상태</AdminTableHeader>
            <AdminTableHeader>관리</AdminTableHeader>
          </AdminTableHead>
          <AdminTableBody>
            {currentProducts.map((product) => (
              <tr key={product.id}>
                <AdminTableCell>
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-10 h-10 rounded-md object-cover"
                  />
                </AdminTableCell>
                <AdminTableCell className="font-medium text-gray-900">{product.name}</AdminTableCell>
                <AdminTableCell>{product.category.split(' ')[0]}</AdminTableCell>
                <AdminTableCell>{product.category.split(' ')[1]}</AdminTableCell>
                <AdminTableCell>{product.price.toLocaleString()}원</AdminTableCell>
                <AdminTableCell>
                  <AdminBadge variant={product.status === 'active' ? 'success' : 'danger'}>
                    {product.status === 'active' ? '판매중' : '판매중지'}
                  </AdminBadge>
                </AdminTableCell>
                <AdminTableCell>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleEditProduct(product)}
                      className="px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                    >
                      편집
                    </button>
                    <button 
                      onClick={() => handleDeleteProduct(product.id)}
                      className="px-3 py-1.5 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                    >
                      삭제
                    </button>
                  </div>
                </AdminTableCell>
              </tr>
            ))}
          </AdminTableBody>
        </AdminTable>

        {/* 페이지네이션 */}
        <div className="mt-4 flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {/* 상품 추가/편집 모달 */}
        {showModal && (
          <ProductCreationModal
            isOpen={showModal}
            onClose={() => {
              setShowModal(false);
              setCurrentProduct(null);
            }}
            onSave={handleSaveProduct}
            product={currentProduct}
          />
        )}
      </AdminContainer>
    </AdminLayout>
  );
}