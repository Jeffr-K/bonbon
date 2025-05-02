'use client';

import { useState, useEffect } from 'react';
import { FaUpload } from 'react-icons/fa';

type FormData = {
  name: string;
  category: string;
  price: string;
  stock: string;
  status: string;
  image: File | null;
  imagePreview: string | null;
}

export default function ProductModal({ product, onClose, onSave }: { product: any, onClose: () => void, onSave: (formData: any) => void }) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    category: '',
    price: '',
    stock: '',
    status: 'active',
    image: null,
    imagePreview: null
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        category: product.category || '',
        price: product.price || '',
        stock: product.stock || '',
        status: product.status || 'active',
        image: null,
        imagePreview: product.image || null
      });
    }
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file)
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg w-[90%] max-w-xl p-8 shadow-md"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="mb-5 text-slate-800 text-xl font-semibold">
          {product ? '상품 수정' : '상품 추가'}
        </h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="font-medium text-slate-800">상품 이미지</label>
            <div 
              className="border-2 border-dashed border-gray-300 p-5 rounded-md text-center cursor-pointer hover:border-orange-400"
              onClick={() => document.getElementById('imageInput')?.click()}
            >
              {formData.imagePreview ? (
                <img 
                  src={formData.imagePreview} 
                  alt="상품 이미지" 
                  className="max-w-[200px] max-h-[200px] mx-auto mt-2"
                />
              ) : (
                <>
                  <FaUpload size={24} className="mx-auto" />
                  <p className="mt-2">이미지를 업로드하세요</p>
                </>
              )}
              <input
                id="imageInput"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-medium text-slate-800">상품명</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="상품명을 입력하세요"
              required
              className="p-2.5 border border-gray-300 rounded-md text-base focus:border-orange-400 focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-medium text-slate-800">카테고리</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange as unknown as (e: React.ChangeEvent<HTMLSelectElement>) => void}
              required
              className="p-2.5 border border-gray-300 rounded-md text-base focus:border-orange-400 focus:outline-none"
            >
              <option value="">카테고리 선택</option>
              <option value="음료">음료</option>
              <option value="디저트">디저트</option>
              <option value="원두">원두</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-medium text-slate-800">가격</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="가격을 입력하세요"
              required
              className="p-2.5 border border-gray-300 rounded-md text-base focus:border-orange-400 focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-medium text-slate-800">재고</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              placeholder="재고 수량을 입력하세요"
              required
              className="p-2.5 border border-gray-300 rounded-md text-base focus:border-orange-400 focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-medium text-slate-800">상태</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange as unknown as (e: React.ChangeEvent<HTMLSelectElement>) => void}
              className="p-2.5 border border-gray-300 rounded-md text-base focus:border-orange-400 focus:outline-none"
            >
              <option value="active">판매중</option>
              <option value="inactive">판매중지</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 mt-5">
            <button 
              type="button" 
              onClick={onClose}
              className="px-5 py-2.5 bg-gray-400 text-white rounded-md text-base hover:bg-gray-500"
            >
              취소
            </button>
            <button 
              type="submit" 
              className="px-5 py-2.5 bg-orange-500 text-white rounded-md text-base hover:bg-orange-600"
            >
              {product ? '수정하기' : '추가하기'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}