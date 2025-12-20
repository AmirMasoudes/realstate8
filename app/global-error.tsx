/**
 * Global Error Page
 * Catches errors in the root layout
 */

"use client";

import { useEffect } from "react";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    // Log error to console
    console.error("Global Error:", error);
  }, [error]);

  return (
    <html lang="fa" dir="rtl">
      <body>
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center px-4 py-20">
          <div className="max-w-4xl w-full text-center">
            {/* Error Icon */}
            <div className="mb-8">
              <div className="text-9xl md:text-[12rem] font-bold text-red-200/50 select-none mb-4">
                ⚠️
              </div>
            </div>

            {/* Error Message */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-12 mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-red-600 mb-4">
                خطای سیستم
              </h2>
              <p className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed">
                متأسفانه خطای جدی در سیستم رخ داده است.
                <br />
                لطفاً صفحه را رفرش کنید یا بعداً دوباره تلاش کنید.
              </p>

              {/* Error Details */}
              {process.env.NODE_ENV === "development" && error.message && (
                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-right">
                  <p className="text-sm font-semibold text-red-800 mb-2">
                    جزئیات خطا:
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

              {/* Action Button */}
              <div className="mt-8">
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
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}

