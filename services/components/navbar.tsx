"use client";

import React from "react";
import Link from "next/link";
import { useAtom } from "jotai";
import { mobileMenuOpenAtom } from "../base/atoms";
import MobileMenu from "./mobilem";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useAtom(mobileMenuOpenAtom);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
          <div className="flex items-center justify-between relative">
            {/* Logo */}
            <Link
              href="/"
              className="text-2xl font-bold text-[#1e3a5f] hover:opacity-80 transition-opacity z-10 flex-shrink-0"
            >
              لوگو
            </Link>
            
            {/* Centered Menu */}
            <div className="hidden md:flex items-center justify-center absolute inset-x-0 mx-auto space-x-reverse space-x-8">
              <Link
                href="/"
                className="text-[#1e3a5f] font-medium hover:text-[#0f2a47] transition-colors px-3 py-2 rounded-lg hover:bg-gray-50 relative"
              >
                خانه
              </Link>
              <Link
                href="/AboutUs"
                className="text-[#1e3a5f] font-medium hover:text-[#0f2a47] transition-colors px-3 py-2 rounded-lg hover:bg-gray-50 relative"
              >
                درباره ما
              </Link>
              <Link
                href="/Prop"
                className="text-[#1e3a5f] font-medium hover:text-[#0f2a47] transition-colors px-3 py-2 rounded-lg hover:bg-gray-50 relative"
              >
                املاک
              </Link>
              <Link
                href="/CommunicationUs"
                className="text-[#1e3a5f] font-medium hover:text-[#0f2a47] transition-colors px-3 py-2 rounded-lg hover:bg-gray-50 relative"
              >
                تماس با ما
              </Link>
            </div>
            
            {/* Right Side - User Account Button & Mobile Menu */}
            <div className="flex items-center gap-3 z-10">
              {/* User Account Button */}
              <Link
                href="/account"
                className="flex items-center gap-2 bg-[#1e3a5f] text-white px-4 py-2 rounded-lg font-medium 
                           hover:bg-[#0f2a47] transition-all duration-300 shadow-md hover:shadow-lg
                           transform hover:scale-105"
                aria-label="حساب کاربری"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span className="hidden sm:inline">حساب کاربری</span>
              </Link>
              
              {/* Mobile Menu Button */}
              <button
                onClick={toggleMobileMenu}
                className="md:hidden text-[#1e3a5f] p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
                aria-label="باز کردن منو"
              >
                {isMobileMenuOpen ? (
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
              ) : (
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
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>
      <MobileMenu isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />
    </>
  );
}
