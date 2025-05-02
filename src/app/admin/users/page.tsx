'use client';

import { useState } from 'react';
import { FaSearch, FaPlus, FaUserShield } from 'react-icons/fa';
import AdminLayout from '@/app/admin/components/AdminLayout';
import { 
  AdminContainer, 
  AdminHeader, 
  AdminTitle, 
  AdminCard,
  AdminTable,
  AdminTableHead,
  AdminTableBody,
  AdminTableHeader,
  AdminTableCell,
  AdminBadge,
  AdminButton
} from '@/app/admin/adminComponent';

// 샘플 데이터
const sampleUsers = [
  { 
    id: 1, 
    index: '1',
    name: '김철수', 
    email: 'user1@example.com', 
    phone: '010-1234-5678', 
    role: 'user',
    status: 'active', 
    joinDate: '2024-01-15', 
    lastLogin: '2024-03-10' 
  },
  { 
    id: 2, 
    index: '2',
    name: '이영희', 
    email: 'admin1@example.com', 
    phone: '010-2345-6789', 
    role: 'admin',
    status: 'active', 
    joinDate: '2024-02-01', 
    lastLogin: '2024-03-11' 
  },
  { 
    id: 3, 
    index: '3',
    name: '박지민', 
    email: 'user2@example.com', 
    phone: '010-3456-7890', 
    role: 'user',
    status: 'inactive', 
    joinDate: '2024-02-15', 
    lastLogin: '2024-02-20' 
  },
  // ... 더 많은 샘플 데이터
];

export default function UsersPage() {
  const [users, setUsers] = useState(sampleUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string>('all');

  // 검색 필터링
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm) ||
      user.index.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedRole === 'all') return matchesSearch;
    return matchesSearch && user.role === selectedRole;
  });

  // 페이지네이션 계산
  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const currentUsers = filteredUsers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleStatusToggle = (userId: number) => {
    setUsers(prev => prev.map(user => 
      user.id === userId
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    ));
  };

  const handleRoleToggle = (userId: number) => {
    setUsers(prev => prev.map(user => 
      user.id === userId
        ? { ...user, role: user.role === 'user' ? 'admin' : 'user' }
        : user
    ));
  };

  return (
    <AdminLayout>
      <AdminContainer>
        <AdminHeader>
          <AdminTitle>회원 관리</AdminTitle>
          <div className="flex gap-2">
            <AdminButton 
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2"
            >
              <FaPlus size={14} />
              회원 추가
            </AdminButton>
            <AdminButton 
              onClick={() => setShowAddModal(true)}
              variant="secondary"
              className="flex items-center gap-2"
            >
              <FaUserShield size={14} />
              관리자 추가
            </AdminButton>
          </div>
        </AdminHeader>

        <AdminCard className="mb-6">
          <div className="flex items-center gap-4 p-4">
            <div className="relative flex-1">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="회원번호, 이름, 이메일, 전화번호로 검색"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <select 
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              <option value="all">전체</option>
              <option value="admin">관리자</option>
              <option value="user">일반회원</option>
            </select>
          </div>
        </AdminCard>

        <AdminTable>
          <AdminTableHead>
            <AdminTableHeader className="text-center">회원번호</AdminTableHeader>
            <AdminTableHeader>이름</AdminTableHeader>
            <AdminTableHeader>이메일</AdminTableHeader>
            <AdminTableHeader>전화번호</AdminTableHeader>
            <AdminTableHeader>권한</AdminTableHeader>
            <AdminTableHeader>가입일</AdminTableHeader>
            <AdminTableHeader>최근 로그인</AdminTableHeader>
            <AdminTableHeader>상태</AdminTableHeader>
            <AdminTableHeader>관리</AdminTableHeader>
          </AdminTableHead>
          <AdminTableBody>
            {currentUsers.map((user) => (
              <tr key={user.id}>
                <AdminTableCell className="text-center">{user.index}</AdminTableCell>
                <AdminTableCell className="font-medium">
                  {user.name}
                  {user.role === 'admin' && (
                    <FaUserShield className="inline-block ml-1 text-orange-500" />
                  )}
                </AdminTableCell>
                <AdminTableCell>{user.email}</AdminTableCell>
                <AdminTableCell>{user.phone}</AdminTableCell>
                <AdminTableCell>
                  <AdminBadge variant={user.role === 'admin' ? 'warning' : 'default'}>
                    {user.role === 'admin' ? '관리자' : '일반회원'}
                  </AdminBadge>
                </AdminTableCell>
                <AdminTableCell>{user.joinDate}</AdminTableCell>
                <AdminTableCell>{user.lastLogin}</AdminTableCell>
                <AdminTableCell>
                  <AdminBadge variant={user.status === 'active' ? 'success' : 'danger'}>
                    {user.status === 'active' ? '활성' : '비활성'}
                  </AdminBadge>
                </AdminTableCell>
                <AdminTableCell>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleStatusToggle(user.id)}
                      className={`px-3 py-1.5 text-sm rounded ${
                        user.status === 'active'
                          ? 'bg-red-500 text-white hover:bg-red-600'
                          : 'bg-green-500 text-white hover:bg-green-600'
                      }`}
                    >
                      {user.status === 'active' ? '비활성화' : '활성화'}
                    </button>
                    <button 
                      onClick={() => handleRoleToggle(user.id)}
                      className="px-3 py-1.5 text-sm rounded bg-orange-500 text-white hover:bg-orange-600"
                    >
                      {user.role === 'user' ? '관리자 지정' : '권한 해제'}
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
      </AdminContainer>
    </AdminLayout>
  );
}

