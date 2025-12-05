"use client";

import React, { useEffect } from "react";
import Link from "next/link";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="text-2xl font-bold text-[#1e3a5f]">لوگو</div>
            <button
              onClick={onClose}
              className="text-[#1e3a5f] p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="بستن منو"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 overflow-y-auto p-6">
            <ul className="space-y-4">
              <li>
                <Link
                  href="/"
                  onClick={handleLinkClick}
                  className="block text-[#1e3a5f] font-medium text-lg py-3 px-4 rounded-lg hover:bg-[#1e3a5f] hover:text-white transition-all duration-300"
                >
                  خانه
                </Link>
              </li>
              <li>
                <Link
                  href="/AboutUs"
                  onClick={handleLinkClick}
                  className="block text-[#1e3a5f] font-medium text-lg py-3 px-4 rounded-lg hover:bg-[#1e3a5f] hover:text-white transition-all duration-300"
                >
                  درباره ما
                </Link>
              </li>
              <li>
                <Link
                  href="/Prop"
                  onClick={handleLinkClick}
                  className="block text-[#1e3a5f] font-medium text-lg py-3 px-4 rounded-lg hover:bg-[#1e3a5f] hover:text-white transition-all duration-300"
                >
                  املاک
                </Link>
              </li>
              <li>
                <Link
                  href="/CommunicationUs"
                  onClick={handleLinkClick}
                  className="block text-[#1e3a5f] font-medium text-lg py-3 px-4 rounded-lg hover:bg-[#1e3a5f] hover:text-white transition-all duration-300"
                >
                  تماس با ما
                </Link>
              </li>
            </ul>
          </nav>

          {/* Footer Section in Menu */}
          <div className="p-6 border-t border-gray-200">
            <div className="space-y-3">
              <div className="text-sm text-gray-600">
                <p className="font-semibold text-[#1e3a5f] mb-2">
                  اطلاعات تماس
                </p>
                <p>📧 info@realestate.com</p>
                <p>📞 021 1234 5678</p>
              </div>
              <div className="flex space-x-reverse space-x-4 pt-2">
                <a
                  href="#"
                  className="w-10 h-10 bg-[#1e3a5f] text-white rounded-full flex items-center justify-center hover:bg-[#0f2a47] transition-colors"
                  aria-label="فیس‌بوک"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-[#1e3a5f] text-white rounded-full flex items-center justify-center hover:bg-[#0f2a47] transition-colors"
                  aria-label="اینستاگرام"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-[#1e3a5f] text-white rounded-full flex items-center justify-center hover:bg-[#0f2a47] transition-colors"
                  aria-label="توییتر"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
