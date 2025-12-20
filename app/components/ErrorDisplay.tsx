/**
 * Error Display Component
 * Beautiful reusable error component for displaying errors in pages
 */

"use client";

import React from "react";
import Link from "next/link";

interface ErrorDisplayProps {
  title?: string;
  message?: string;
  status?: number;
  showHomeButton?: boolean;
  showRetryButton?: boolean;
  onRetry?: () => void;
  className?: string;
}

const statusMessages: Record<number, { title: string; message: string; icon: string }> = {
  400: {
    title: "درخواست نامعتبر",
    message: "درخواست شما نامعتبر است. لطفاً دوباره تلاش کنید.",
    icon: "⚠️",
  },
  401: {
    title: "نیاز به ورود",
    message: "لطفاً وارد حساب کاربری خود شوید.",
    icon: "🔐",
  },
  403: {
    title: "دسترسی محدود",
    message: "شما دسترسی به این بخش ندارید.",
    icon: "🚫",
  },
  404: {
    title: "یافت نشد",
    message: "منبع مورد نظر یافت نشد.",
    icon: "🔍",
  },
  422: {
    title: "اطلاعات نامعتبر",
    message: "اطلاعات ارسالی نامعتبر است.",
    icon: "❌",
  },
  500: {
    title: "خطای سرور",
    message: "خطایی در سرور رخ داد. لطفاً بعداً تلاش کنید.",
    icon: "🔧",
  },
  502: {
    title: "خطا در ارتباط",
    message: "خطا در ارتباط با سرور.",
    icon: "📡",
  },
  503: {
    title: "سرویس در دسترس نیست",
    message: "سرویس در حال حاضر در دسترس نیست.",
    icon: "⏳",
  },
  504: {
    title: "زمان اتصال به پایان رسید",
    message: "زمان اتصال به سرور به پایان رسید.",
    icon: "⏱️",
  },
};

export default function ErrorDisplay({
  title,
  message,
  status,
  showHomeButton = true,
  showRetryButton = false,
  onRetry,
  className = "",
}: ErrorDisplayProps) {
  const statusInfo = status ? statusMessages[status] : null;
  const displayTitle = title || statusInfo?.title || "خطا";
  const displayMessage = message || statusInfo?.message || "متأسفانه خطایی رخ داده است.";
  const displayIcon = statusInfo?.icon || "⚠️";

  return (
    <div className={`min-h-[400px] flex items-center justify-center px-4 py-12 ${className}`}>
      <div className="max-w-2xl w-full text-center">
        {/* Error Icon */}
        <div className="mb-6">
          <div className="text-7xl md:text-8xl mb-4 animate-bounce">
            {displayIcon}
          </div>
        </div>

        {/* Error Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-red-600 mb-4">
            {displayTitle}
          </h2>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            {displayMessage}
          </p>

          {/* Status Code */}
          {status && (
            <div className="inline-block px-4 py-2 bg-red-50 border border-red-200 rounded-lg mb-6">
              <span className="text-sm font-semibold text-red-700">
                کد خطا: {status}
              </span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {showRetryButton && onRetry && (
              <button
                onClick={onRetry}
                className="inline-flex items-center justify-center px-6 py-3 bg-[#1e3a5f] text-white rounded-xl font-semibold hover:bg-[#0f2a47] transition-all duration-300 transform hover:scale-105 shadow-lg"
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
            )}
            {showHomeButton && (
              <Link
                href="/"
                className="inline-flex items-center justify-center px-6 py-3 bg-white border-2 border-[#1e3a5f] text-[#1e3a5f] rounded-xl font-semibold hover:bg-[#1e3a5f] hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg"
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

