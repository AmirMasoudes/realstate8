/**
 * 404 Not Found Page
 * Beautiful error page for when a page is not found
 */

import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "صفحه یافت نشد - 404",
  description: "صفحه مورد نظر شما یافت نشد",
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e3a5f] via-[#4a7ba8] to-[#7ba8d4] flex items-center justify-center px-4 py-20">
      <div className="max-w-4xl w-full text-center">
        {/* Animated 404 */}
        <div className="mb-8">
          <h1 className="text-9xl md:text-[12rem] font-bold text-white/20 select-none">
            404
          </h1>
          <div className="relative -mt-24 md:-mt-32">
            <div className="text-8xl md:text-9xl mb-4 animate-bounce">
              🏠
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-12 mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mb-4">
            صفحه مورد نظر یافت نشد
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-6 leading-relaxed">
            متأسفانه صفحه‌ای که به دنبال آن هستید وجود ندارد یا حذف شده است.
            <br />
            لطفاً آدرس را بررسی کنید یا به صفحه اصلی بازگردید.
          </p>

          {/* Decorative Elements */}
          <div className="flex justify-center gap-4 mb-8">
            <div className="w-3 h-3 bg-[#1e3a5f] rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-[#4a7ba8] rounded-full animate-pulse delay-75"></div>
            <div className="w-3 h-3 bg-[#7ba8d4] rounded-full animate-pulse delay-150"></div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-8 py-4 bg-[#1e3a5f] text-white rounded-xl font-semibold hover:bg-[#0f2a47] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              بازگشت به صفحه اصلی
            </Link>
            <Link
              href="/properties"
              className="inline-flex items-center justify-center px-8 py-4 bg-white border-2 border-[#1e3a5f] text-[#1e3a5f] rounded-xl font-semibold hover:bg-[#1e3a5f] hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              مشاهده املاک
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6">
          <p className="text-gray-700 font-semibold mb-4">لینک‌های مفید:</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/"
              className="text-[#1e3a5f] hover:text-[#0f2a47] hover:underline transition-colors"
            >
              صفحه اصلی
            </Link>
            <Link
              href="/properties"
              className="text-[#1e3a5f] hover:text-[#0f2a47] hover:underline transition-colors"
            >
              فهرست املاک
            </Link>
            <Link
              href="/Map"
              className="text-[#1e3a5f] hover:text-[#0f2a47] hover:underline transition-colors"
            >
              نقشه
            </Link>
            <Link
              href="/AboutUs"
              className="text-[#1e3a5f] hover:text-[#0f2a47] hover:underline transition-colors"
            >
              درباره ما
            </Link>
            <Link
              href="/CommunicationUs"
              className="text-[#1e3a5f] hover:text-[#0f2a47] hover:underline transition-colors"
            >
              تماس با ما
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

