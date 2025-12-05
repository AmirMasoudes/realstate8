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
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="text-2xl font-bold text-[#1e3a5f] hover:opacity-80 transition-opacity"
            >
              لوگو
            </Link>
            <div className="hidden md:flex items-center space-x-reverse space-x-8">
              <Link
                href="/"
                className="text-[#1e3a5f] font-medium hover:text-[#0f2a47] transition-colors"
              >
                خانه
              </Link>
              <Link
                href="/AboutUs"
                className="text-[#1e3a5f] font-medium hover:text-[#0f2a47] transition-colors"
              >
                درباره ما
              </Link>
              <Link
                href="/Prop"
                className="text-[#1e3a5f] font-medium hover:text-[#0f2a47] transition-colors"
              >
                املاک
              </Link>
              <Link
                href="/CommunicationUs"
                className="text-[#1e3a5f] font-medium hover:text-[#0f2a47] transition-colors"
              >
                تماس با ما
              </Link>
            </div>
            <button
              onClick={toggleMobileMenu}
              className="md:hidden text-[#1e3a5f] p-2 hover:bg-gray-100 rounded-lg transition-colors"
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
      </nav>
      <MobileMenu isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />
    </>
  );
}
