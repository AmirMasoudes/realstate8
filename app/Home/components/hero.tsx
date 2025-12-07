"use client";

import React from "react";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e3a5f] via-[#2d5a8f] to-[#1e3a5f] relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-72 h-72 bg-[#2d5a8f] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-[#4a7ba8] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-700"></div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-24 md:pt-32 pb-20 relative z-10">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/20">
          <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12 lg:p-16">
            {/* Right Content (RTL) */}
            <div className="flex flex-col justify-center space-y-6 order-2 md:order-1">
              <div className="inline-block text-[#1e3a5f] text-sm font-semibold uppercase tracking-wider bg-[#e8f0f8] px-4 py-2 rounded-full w-fit">
                املاک
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1e3a5f] leading-tight">
                خانه ایده‌آل شما
                <br />
                <span className="text-[#2d5a8f] bg-gradient-to-r from-[#2d5a8f] to-[#4a7ba8] bg-clip-text text-transparent">
                  منتظر است!
                </span>
              </h1>

              <p className="text-[#1e3a5f] text-base md:text-lg leading-relaxed opacity-90 max-w-xl">
                با خدمات املاک ما، خانه رویایی خود را پیدا کنید. ما در زمینه
                املاک لوکس و خدمات استثنایی تخصص داریم. مجموعه‌ای از بهترین
                املاک را برای شما گردآوری کرده‌ایم.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link
                  href="/Prop"
                  className="bg-[#1e3a5f] text-white px-8 py-4 rounded-xl font-semibold 
                                  hover:bg-[#0f2a47] transition-all duration-300 transform hover:scale-105 
                                  shadow-lg hover:shadow-xl text-center flex items-center justify-center gap-2"
                >
                  <span>مشاهده املاک</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </Link>
                <Link
                  href="/AboutUs"
                  className="bg-white border-2 border-[#1e3a5f] text-[#1e3a5f] px-8 py-4 rounded-xl font-semibold 
                                  hover:bg-[#f0f5fa] transition-all duration-300 transform hover:scale-105 
                                  shadow-md hover:shadow-lg text-center"
                >
                  درباره ما
                </Link>
              </div>

              {/* Pagination Dots */}
              <div className="flex items-center space-x-reverse space-x-2 pt-4">
                {[1, 2, 3, 4].map((dot) => (
                  <button
                    key={dot}
                    className={`rounded-full transition-all duration-300 cursor-pointer ${
                      dot === 1
                        ? "bg-[#2d5a8f] w-8 h-3"
                        : "bg-[#a0c4e8] hover:bg-[#7ba8d4] w-3 h-3"
                    }`}
                    aria-label={`اسلاید ${dot}`}
                  />
                ))}
              </div>
            </div>

            {/* Left Illustration (RTL) */}
            <div className="relative flex items-center justify-center min-h-[400px] md:min-h-[500px] order-1 md:order-2">
              {/* Location Pin */}
              <div className="absolute top-8 left-16 z-10 animate-bounce">
                <svg
                  width="60"
                  height="80"
                  viewBox="0 0 24 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-[#7ba8d4] drop-shadow-lg"
                >
                  <path
                    d="M12 0C5.373 0 0 5.373 0 12C0 19.5 12 32 12 32S24 19.5 24 12C24 5.373 18.627 0 12 0ZM12 16C9.791 16 8 14.209 8 12C8 9.791 9.791 8 12 8C14.209 8 16 9.791 16 12C16 14.209 14.209 16 12 16Z"
                    fill="currentColor"
                  />
                </svg>
              </div>

              {/* Trees */}
              <div className="absolute bottom-20 right-8 z-0 opacity-60">
                <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[40px] border-b-[#7ba8d4] drop-shadow-md"></div>
              </div>
              <div className="absolute bottom-20 left-8 z-0 opacity-60">
                <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[40px] border-b-[#7ba8d4] drop-shadow-md"></div>
              </div>

              {/* House Illustration */}
              <div className="relative z-20 transform hover:scale-105 transition-transform duration-500">
                {/* Main House Structure */}
                <div className="relative">
                  {/* Roof */}
                  <div className="w-64 h-32 bg-[#1e3a5f] transform skew-x-12 relative shadow-2xl">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#0f2a47] to-[#1e3a5f]"></div>
                    <div className="absolute top-2 left-2 right-2 h-1 bg-[#2d5a8f] opacity-50"></div>
                  </div>

                  {/* House Body */}
                  <div className="w-64 h-48 bg-[#4a7ba8] relative -mt-2 shadow-xl">
                    {/* Ground Floor Windows */}
                    <div className="absolute bottom-16 right-8 w-20 h-24 bg-[#7ba8d4] border-4 border-[#1e3a5f] shadow-inner">
                      <div className="absolute inset-2 bg-[#a0c4e8] opacity-30"></div>
                    </div>
                    <div className="absolute bottom-16 left-8 w-20 h-24 bg-[#7ba8d4] border-4 border-[#1e3a5f] shadow-inner">
                      <div className="absolute inset-2 bg-[#a0c4e8] opacity-30"></div>
                    </div>

                    {/* Upper Floor Circular Window */}
                    <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-[#7ba8d4] border-4 border-[#1e3a5f] rounded-full shadow-inner">
                      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-[#1e3a5f]"></div>
                      <div className="absolute top-0 left-1/2 w-0.5 h-full bg-[#1e3a5f]"></div>
                      <div className="absolute inset-2 bg-[#a0c4e8] rounded-full opacity-20"></div>
                    </div>

                    {/* Balcony */}
                    <div className="absolute top-0 left-4 right-4 h-8 bg-[#1e3a5f] shadow-lg">
                      <div className="absolute -bottom-2 left-0 right-0 h-2 bg-[#0f2a47]"></div>
                      {/* Balcony Railing */}
                      <div className="absolute -bottom-4 right-2 w-1 h-4 bg-[#1e3a5f]"></div>
                      <div className="absolute -bottom-4 left-2 w-1 h-4 bg-[#1e3a5f]"></div>
                      <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-1 h-4 bg-[#1e3a5f]"></div>

                      {/* Potted Plants */}
                      <div className="absolute -bottom-6 right-6 w-6 h-6 bg-[#5a9bd4] rounded-full shadow-md"></div>
                      <div className="absolute -bottom-6 left-6 w-6 h-6 bg-[#5a9bd4] rounded-full shadow-md"></div>
                    </div>
                  </div>

                  {/* FOR SALE Sign */}
                  <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 animate-pulse">
                    <div className="w-32 h-20 bg-gradient-to-br from-[#1e3a5f] to-[#0f2a47] border-2 border-[#0f2a47] flex items-center justify-center relative shadow-xl rounded-sm">
                      <div className="text-white font-bold text-sm">فروش</div>
                      <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-1 h-4 bg-[#1e3a5f]"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
