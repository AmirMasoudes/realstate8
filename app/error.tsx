/**
 * Error Page
 * Beautiful error page for application errors
 */

"use client";

import { useEffect } from "react";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log error to console in development
    if (process.env.NODE_ENV === "development") {
      console.error("Error:", error);
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center px-4 py-20">
      <div className="max-w-4xl w-full text-center">
        {/* Animated Error Icon */}
        <div className="mb-8">
          <div className="text-9xl md:text-[12rem] font-bold text-red-200/50 select-none mb-4">
            ⚠️
          </div>
          <div className="relative -mt-24 md:-mt-32">
            <div className="text-8xl md:text-9xl mb-4 animate-pulse">
              🔧
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-12 mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-red-600 mb-4">
            خطایی رخ داد!
          </h2>
          <p className="text-lg md:text-xl text-gray-700 mb-4 leading-relaxed">
            متأسفانه خطایی در سیستم رخ داده است.
            <br />
            لطفاً دوباره تلاش کنید یا با پشتیبانی تماس بگیرید.
          </p>

          {/* Error Details (only in development) */}
          {process.env.NODE_ENV === "development" && error.message && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-right">
              <p className="text-sm font-semibold text-red-800 mb-2">
                جزئیات خطا (فقط در حالت توسعه):
              </p>
              <p className="text-sm text-red-700 font-mono break-all">
                {error.message}
              </p>
              {error.digest && (
                <p className="text-xs text-red-600 mt-2">
                  Digest: {error.digest}
                </p>
              )}
            </div>
          )}

          {/* Decorative Elements */}
          <div className="flex justify-center gap-4 my-8">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse delay-75"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse delay-150"></div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={reset}
              className="inline-flex items-center justify-center px-8 py-4 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
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
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              تلاش مجدد
            </button>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-8 py-4 bg-white border-2 border-red-600 text-red-600 rounded-xl font-semibold hover:bg-red-600 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
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
          </div>
        </div>

        {/* Help Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6">
          <p className="text-gray-700 font-semibold mb-4">نیاز به کمک دارید؟</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/CommunicationUs"
              className="text-red-600 hover:text-red-700 hover:underline transition-colors font-semibold"
            >
              تماس با پشتیبانی
            </Link>
            <Link
              href="/AboutUs"
              className="text-red-600 hover:text-red-700 hover:underline transition-colors font-semibold"
            >
              درباره ما
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

