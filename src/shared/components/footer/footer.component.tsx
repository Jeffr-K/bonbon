import React from 'react';
import Link from 'next/link';
import { FaFacebook, FaInstagram, FaYoutube, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-[#2c3e50] text-white py-10 px-5 hidden md:block">
      <div className="max-w-7xl mx-auto px-5 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <h3 className="text-[#e67e22] mb-5 text-lg">봉봉카페</h3>
          <p className="mb-2.5 text-sm text-[#bdc3c7] leading-relaxed">상호명: (주)봉봉에프앤비</p>
          <p className="mb-2.5 text-sm text-[#bdc3c7] leading-relaxed">대표자: 김봉봉</p>
          <p className="mb-2.5 text-sm text-[#bdc3c7] leading-relaxed">사업자등록번호: 123-45-67890</p>
          <p className="mb-2.5 text-sm text-[#bdc3c7] leading-relaxed">본사: 인천광역시 중구 송학동3가 7-30번지 1층</p>
          <p className="mb-2.5 text-sm text-[#bdc3c7] leading-relaxed">대표전화: 1588-0000</p>
          <div className="flex gap-4 mt-5 md:justify-start">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[#bdc3c7] text-2xl hover:text-[#e67e22]">
              <FaInstagram />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-[#bdc3c7] text-2xl hover:text-[#e67e22]">
              <FaFacebook />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-[#bdc3c7] text-2xl hover:text-[#e67e22]">
              <FaYoutube />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-[#bdc3c7] text-2xl hover:text-[#e67e22]">
              <FaTwitter />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-[#e67e22] mb-5 text-lg">메뉴</h3>
          <ul>
            <li className="mb-2.5">
              <Link href="/products" className="text-sm text-[#bdc3c7] hover:text-[#e67e22]">
                전체 메뉴
              </Link>
            </li>
            <li className="mb-2.5">
              <Link href="/products" className="text-sm text-[#bdc3c7] hover:text-[#e67e22]">
                시즌 메뉴
              </Link>
            </li>
            <li className="mb-2.5">
              <Link href="/products" className="text-sm text-[#bdc3c7] hover:text-[#e67e22]">
                MD 상품
              </Link>
            </li>
            <li className="mb-2.5">
              <Link href="/products" className="text-sm text-[#bdc3c7] hover:text-[#e67e22]">
                단체 주문
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-[#e67e22] mb-5 text-lg">고객지원</h3>
          <ul>
            <li className="mb-2.5">
              <Link href="/faq" className="text-sm text-[#bdc3c7] hover:text-[#e67e22]">
                자주 묻는 질문
              </Link>
            </li>
            <li className="mb-2.5">
              <Link href="/contact" className="text-sm text-[#bdc3c7] hover:text-[#e67e22]">
                1:1 문의
              </Link>
            </li>
            <li className="mb-2.5">
              <Link href="/locations" className="text-sm text-[#bdc3c7] hover:text-[#e67e22]">
                매장 찾기
              </Link>
            </li>
            <li className="mb-2.5">
              <Link href="/franchise" className="text-sm text-[#bdc3c7] hover:text-[#e67e22]">
                창업 문의
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-[#e67e22] mb-5 text-lg">회사정보</h3>
          <ul>
            <li className="mb-2.5">
              <Link href="/about" className="text-sm text-[#bdc3c7] hover:text-[#e67e22]">
                회사 소개
              </Link>
            </li>
            <li className="mb-2.5">
              <Link href="/terms" className="text-sm text-[#bdc3c7] hover:text-[#e67e22]">
                이용약관
              </Link>
            </li>
            <li className="mb-2.5">
              <Link href="/privacy" className="text-sm text-[#bdc3c7] hover:text-[#e67e22]">
                개인정보처리방침
              </Link>
            </li>
            <li className="mb-2.5">
              <Link href="/careers" className="text-sm text-[#bdc3c7] hover:text-[#e67e22]">
                채용정보
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center mt-10 pt-5 border-t border-[#34495e] text-[#bdc3c7] text-sm">
        © 2024 봉봉카페 All rights reserved.
      </div>
    </footer>
  );
}