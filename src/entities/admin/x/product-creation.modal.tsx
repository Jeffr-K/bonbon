import React, { useState } from 'react';
import Modal from 'react-modal';
import { FaUpload, FaTrash } from 'react-icons/fa';

// Modal의 루트 요소 설정
if (typeof window !== 'undefined') {
  Modal.setAppElement('html');
}

const categories = {
  음료: ['커피(HOT)', '커피(ICE)', '스무디', '에이드', '차(TEA)'],
  디저트: ['케이크', '쿠키', '베이커리', '샌드위치'],
  원두: ['싱글오리진', '블렌드', '디카페인']
};

const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '0',
    border: 'none',
    borderRadius: '0.5rem',
    maxWidth: '500px',
    width: '90%',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    zIndex: 1000,
  }
};

interface ProductForm {
  name: string;
  mainCategory: string;
  subCategory: string;
  price: string;
  status: 'active' | 'inactive';
  origin: string;
  caution: string;
  description: string;
  images: File[];
}

interface ProductCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: ProductForm) => void;
  product?: {
    id: number;
    name: string;
    category: string;
    price: number;
    status: 'active' | 'inactive';
    image: string;
    origin?: string;
    caution?: string;
    description?: string;
  };
}

export default function ProductCreationModal({ isOpen, onClose, onSave, product }: ProductCreationModalProps) {
  const [formData, setFormData] = useState<ProductForm>(() => {
    if (product) {
      const [mainCategory, subCategory] = product.category.split(' ');
      return {
        name: product.name,
        mainCategory,
        subCategory,
        price: product.price.toString(),
        status: product.status,
        origin: product.origin || '',
        caution: product.caution || '',
        description: product.description || '',
        images: []
      };
    }
    return {
      name: '',
      mainCategory: '',
      subCategory: '',
      price: '',
      status: 'active',
      origin: '',
      caution: '',
      description: '',
      images: []
    };
  });

  const [imageUrls, setImageUrls] = useState<string[]>(() => 
    product?.image ? [product.image] : []
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + formData.images.length > 5) {
      alert('이미지는 최대 5개까지 업로드할 수 있습니다.');
      return;
    }

    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...files]
    }));

    // 이미지 미리보기 URL 생성
    const newImageUrls = files.map(file => URL.createObjectURL(file));
    setImageUrls(prev => [...prev, ...newImageUrls]);
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
    setImageUrls(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={modalStyles} ariaHideApp={false}>
      <div className="flex flex-col gap-4 p-6 bg-white rounded-lg max-h-[90vh] overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4">
          {product ? '상품 수정' : '상품 추가'}
        </h1>
        
        {/* 이미지 업로드 섹션 */}
        <div className="space-y-2">
          <label className="font-semibold">상품 이미지 (최대 5개)</label>
          <div className="grid grid-cols-5 gap-2">
            {imageUrls.map((url, index) => (
              <div key={index} className="relative group">
                <img src={url} alt={`상품 이미지 ${index + 1}`} className="w-full h-24 object-cover rounded" />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <FaTrash size={12} />
                </button>
              </div>
            ))}
            {formData.images.length < 5 && (
              <label className="border-2 border-dashed border-gray-300 rounded flex items-center justify-center cursor-pointer h-24 hover:border-orange-500">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  multiple
                />
                <FaUpload className="text-gray-400" />
              </label>
            )}
          </div>
        </div>

        {/* 기본 정보 */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="font-semibold">상품명</label>
            <input
              type="text"
              value={formData.name}
              onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full p-2 border rounded focus:border-orange-500 focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="font-semibold">가격</label>
            <input
              type="number"
              value={formData.price}
              onChange={e => setFormData(prev => ({ ...prev, price: e.target.value }))}
              className="w-full p-2 border rounded focus:border-orange-500 focus:outline-none"
              placeholder="숫자만 입력"
            />
          </div>
        </div>

        {/* 카테고리 선택 */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="font-semibold">대분류</label>
            <select
              value={formData.mainCategory}
              onChange={e => setFormData(prev => ({ ...prev, mainCategory: e.target.value, subCategory: '' }))}
              className="w-full p-2 border rounded focus:border-orange-500 focus:outline-none"
            >
              <option value="">선택하세요</option>
              {Object.keys(categories).map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="font-semibold">소분류</label>
            <select
              value={formData.subCategory}
              onChange={e => setFormData(prev => ({ ...prev, subCategory: e.target.value }))}
              className="w-full p-2 border rounded focus:border-orange-500 focus:outline-none"
              disabled={!formData.mainCategory}
            >
              <option value="">선택하세요</option>
              {formData.mainCategory && categories[formData.mainCategory as keyof typeof categories].map(subCat => (
                <option key={subCat} value={subCat}>{subCat}</option>
              ))}
            </select>
          </div>
        </div>

        {/* 상태 */}
        <div className="space-y-2">
          <label className="font-semibold">판매 상태</label>
          <select
            value={formData.status}
            onChange={e => setFormData(prev => ({ ...prev, status: e.target.value as 'active' | 'inactive' }))}
            className="w-full p-2 border rounded focus:border-orange-500 focus:outline-none"
          >
            <option value="active">판매중</option>
            <option value="inactive">판매중지</option>
          </select>
        </div>

        {/* 원산지 정보 */}
        <div className="space-y-2">
          <label className="font-semibold">원산지 정보</label>
          <input
            type="text"
            value={formData.origin}
            onChange={e => setFormData(prev => ({ ...prev, origin: e.target.value }))}
            className="w-full p-2 border rounded focus:border-orange-500 focus:outline-none"
          />
        </div>

        {/* 취급시 주의사항 */}
        <div className="space-y-2">
          <label className="font-semibold">취급시 주의사항</label>
          <textarea
            value={formData.caution}
            onChange={e => setFormData(prev => ({ ...prev, caution: e.target.value }))}
            className="w-full p-2 border rounded focus:border-orange-500 focus:outline-none h-24 resize-none"
          />
        </div>

        {/* 상품 상세 설명 */}
        <div className="space-y-2">
          <label className="font-semibold">상품 상세 설명</label>
          <textarea
            value={formData.description}
            onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
            className="w-full p-2 border rounded focus:border-orange-500 focus:outline-none h-32 resize-none"
          />
        </div>

        {/* 버튼 */}
        <div className="flex justify-end gap-2 mt-4">
          <button 
            onClick={onClose} 
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition-colors"
          >
            취소
          </button>
          <button 
            onClick={() => onSave(formData)} 
            className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
          >
            {product ? '수정하기' : '추가하기'}
          </button>
        </div>
      </div>
    </Modal>
  );
}