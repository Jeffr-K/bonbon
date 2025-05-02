'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/app/admin/components/AdminLayout';
import { 
  AdminContainer, 
  AdminHeader, 
  AdminTitle, 
  AdminButton,
  AdminCard,
  AdminTable,
  AdminTableHead,
  AdminTableBody,
  AdminTableHeader,
  AdminTableCell,
} from '@/app/admin/adminComponent';

// 샘플 데이터
const sampleCategories = [
  { id: 1, name: '음료', subCategories: ['커피(HOT)', '커피(ICE)', '스무디', '에이드', '차(TEA)'] },
  { id: 2, name: '디저트', subCategories: ['케이크', '쿠키', '베이커리', '샌드위치'] },
  { id: 3, name: '원두', subCategories: ['싱글오리진', '블렌드', '디카페인'] },
];

export default function CategoryPage() {
  const [categories, setCategories] = useState(sampleCategories);
  const [mode, setMode] = useState<'main' | 'sub'>('main');
  const [newMainCategory, setNewMainCategory] = useState('');
  const [selectedMainCategory, setSelectedMainCategory] = useState('');
  const [newSubCategory, setNewSubCategory] = useState('');

  const handleAddMainCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMainCategory.trim()) {
      setCategories(prev => [...prev, {
        id: Math.max(...prev.map(c => c.id)) + 1,
        name: newMainCategory.trim(),
        subCategories: []
      }]);
      setNewMainCategory('');
    }
  };

  const handleAddSubCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedMainCategory && newSubCategory.trim()) {
      setCategories(prev => prev.map(cat => 
        cat.name === selectedMainCategory
          ? { ...cat, subCategories: [...cat.subCategories, newSubCategory.trim()] }
          : cat
      ));
      setNewSubCategory('');
    }
  };

  return (
    <AdminLayout>
      <AdminContainer>
        <AdminHeader>
          <AdminTitle>카테고리 관리</AdminTitle>
          <div className="flex gap-2">
            <AdminButton 
              onClick={() => setMode('main')}
              variant={mode === 'main' ? 'primary' : 'outline'}
            >
              상위 카테고리 관리
            </AdminButton>
            <AdminButton 
              onClick={() => setMode('sub')}
              variant={mode === 'sub' ? 'primary' : 'outline'}
            >
              하위 카테고리 관리
            </AdminButton>
          </div>
        </AdminHeader>
        
        <AdminCard>
          <div className="p-6">
            {mode === 'main' ? (
              // 상위 카테고리 추가 폼
              <form onSubmit={handleAddMainCategory} className="mb-6">
                <h3 className="text-lg font-medium mb-4">상위 카테고리 추가</h3>
                <div className="flex gap-2">
                  <input
                    value={newMainCategory}
                    onChange={e => setNewMainCategory(e.target.value)}
                    placeholder="상위 카테고리명을 입력하세요"
                    className="w-64 p-2 border border-gray-300 rounded-md text-base focus:border-orange-400 focus:outline-none"
                  />
                  <button 
                    type="submit"
                    className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
                  >
                    추가
                  </button>
                </div>
              </form>
            ) : (
              // 하위 카테고리 추가 폼
              <form onSubmit={handleAddSubCategory} className="mb-6">
                <h3 className="text-lg font-medium mb-4">하위 카테고리 추가</h3>
                <div className="flex flex-col gap-4">
                  <select
                    value={selectedMainCategory}
                    onChange={e => setSelectedMainCategory(e.target.value)}
                    className="w-64 p-2 border border-gray-300 rounded-md text-base focus:border-orange-400 focus:outline-none"
                    required
                  >
                    <option value="">상위 카테고리 선택</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                  <div className="flex gap-2">
                    <input
                      value={newSubCategory}
                      onChange={e => setNewSubCategory(e.target.value)}
                      placeholder="하위 카테고리명을 입력하세요"
                      className="w-64 p-2 border border-gray-300 rounded-md text-base focus:border-orange-400 focus:outline-none"
                      required
                    />
                    <button 
                      type="submit"
                      className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
                    >
                      추가
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* 카테고리 목록 */}
            <AdminTable>
              <AdminTableHead>
                <AdminTableHeader>상위 카테고리</AdminTableHeader>
                <AdminTableHeader>하위 카테고리</AdminTableHeader>
                <AdminTableHeader>관리</AdminTableHeader>
              </AdminTableHead>
              <AdminTableBody>
                {categories.map(category => (
                  <tr key={category.id}>
                    <AdminTableCell>{category.name}</AdminTableCell>
                    <AdminTableCell>
                      <div className="flex flex-wrap gap-2">
                        {category.subCategories.map((subCat, idx) => (
                          <span key={idx} className="px-2 py-1 bg-gray-100 rounded-md text-sm">
                            {subCat}
                          </span>
                        ))}
                      </div>
                    </AdminTableCell>
                    <AdminTableCell>
                      <button className="text-red-500 hover:text-red-600">
                        삭제
                      </button>
                    </AdminTableCell>
                  </tr>
                ))}
              </AdminTableBody>
            </AdminTable>
          </div>
        </AdminCard>
      </AdminContainer>
    </AdminLayout>
  );
}