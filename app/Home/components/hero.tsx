/**
 * Hero Section
 * Beautiful hero section with modern house illustration
 * Based on the design reference image
 */

"use client";

import React from "react";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="min-h-screen bg-[#1e3a5f] relative overflow-hidden">
      {/* Architectural Blueprint Lines Background */}
      <div className="absolute inset-0 opacity-20">
        <svg
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 800"
        >
          {/* Horizontal lines */}
          <line
            x1="0"
            y1="100"
            x2="1200"
            y2="100"
            stroke="#7ba8d4"
            strokeWidth="1"
            strokeDasharray="5,5"
          />
          <line
            x1="0"
            y1="200"
            x2="1200"
            y2="200"
            stroke="#7ba8d4"
            strokeWidth="1"
            strokeDasharray="5,5"
          />
          <line
            x1="0"
            y1="300"
            x2="1200"
            y2="300"
            stroke="#7ba8d4"
            strokeWidth="1"
            strokeDasharray="5,5"
          />
          <line
            x1="0"
            y1="400"
            x2="1200"
            y2="400"
            stroke="#7ba8d4"
            strokeWidth="1"
            strokeDasharray="5,5"
          />
          <line
            x1="0"
            y1="500"
            x2="1200"
            y2="500"
            stroke="#7ba8d4"
            strokeWidth="1"
            strokeDasharray="5,5"
          />
          <line
            x1="0"
            y1="600"
            x2="1200"
            y2="600"
            stroke="#7ba8d4"
            strokeWidth="1"
            strokeDasharray="5,5"
          />
          <line
            x1="0"
            y1="700"
            x2="1200"
            y2="700"
            stroke="#7ba8d4"
            strokeWidth="1"
            strokeDasharray="5,5"
          />
          {/* Vertical lines */}
          <line
            x1="100"
            y1="0"
            x2="100"
            y2="800"
            stroke="#7ba8d4"
            strokeWidth="1"
            strokeDasharray="5,5"
          />
          <line
            x1="200"
            y1="0"
            x2="200"
            y2="800"
            stroke="#7ba8d4"
            strokeWidth="1"
            strokeDasharray="5,5"
          />
          <line
            x1="300"
            y1="0"
            x2="300"
            y2="800"
            stroke="#7ba8d4"
            strokeWidth="1"
            strokeDasharray="5,5"
          />
          <line
            x1="400"
            y1="0"
            x2="400"
            y2="800"
            stroke="#7ba8d4"
            strokeWidth="1"
            strokeDasharray="5,5"
          />
          <line
            x1="500"
            y1="0"
            x2="500"
            y2="800"
            stroke="#7ba8d4"
            strokeWidth="1"
            strokeDasharray="5,5"
          />
          <line
            x1="600"
            y1="0"
            x2="600"
            y2="800"
            stroke="#7ba8d4"
            strokeWidth="1"
            strokeDasharray="5,5"
          />
          <line
            x1="700"
            y1="0"
            x2="700"
            y2="800"
            stroke="#7ba8d4"
            strokeWidth="1"
            strokeDasharray="5,5"
          />
          <line
            x1="800"
            y1="0"
            x2="800"
            y2="800"
            stroke="#7ba8d4"
            strokeWidth="1"
            strokeDasharray="5,5"
          />
          <line
            x1="900"
            y1="0"
            x2="900"
            y2="800"
            stroke="#7ba8d4"
            strokeWidth="1"
            strokeDasharray="5,5"
          />
          <line
            x1="1000"
            y1="0"
            x2="1000"
            y2="800"
            stroke="#7ba8d4"
            strokeWidth="1"
            strokeDasharray="5,5"
          />
          <line
            x1="1100"
            y1="0"
            x2="1100"
            y2="800"
            stroke="#7ba8d4"
            strokeWidth="1"
            strokeDasharray="5,5"
          />
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 pt-24 md:pt-32 pb-20">
        {/* White Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 p-8 md:p-12 lg:p-16">
            {/* Left Section - House Illustration */}
            <div className="relative flex items-center justify-center min-h-[400px] md:min-h-[500px] order-2 md:order-1">
              {/* Location Pin */}
              <div className="absolute top-8 left-8 z-20">
                <svg
                  width="50"
                  height="70"
                  viewBox="0 0 24 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-[#4a7ba8] drop-shadow-lg"
                >
                  <path
                    d="M12 0C5.373 0 0 5.373 0 12C0 19.5 12 32 12 32S24 19.5 24 12C24 5.373 18.627 0 12 0ZM12 16C9.791 16 8 14.209 8 12C8 9.791 9.791 8 12 8C14.209 8 16 9.791 16 12C16 14.209 14.209 16 12 16Z"
                    fill="currentColor"
                  />
                </svg>
              </div>

              {/* Sky Background */}
              <div className="absolute inset-0 bg-gradient-to-b from-blue-200 via-blue-100 to-white rounded-2xl overflow-hidden">
                {/* Clouds */}
                <div className="absolute top-10 right-20 w-24 h-16 bg-white/40 rounded-full blur-sm"></div>
                <div className="absolute top-16 left-16 w-32 h-20 bg-white/30 rounded-full blur-sm"></div>
              </div>

              {/* House Container */}
              <div className="relative z-10 w-full max-w-md">
                {/* Trees - Background */}
                <div className="absolute bottom-0 left-0 right-0 flex justify-between items-end px-8 pb-4 z-0">
                  {/* Left Tree */}
                  <div className="relative">
                    <div className="w-0 h-0 border-l-[25px] border-l-transparent border-r-[25px] border-r-transparent border-b-[60px] border-b-green-600"></div>
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-green-700 rounded-full"></div>
                  </div>
                  {/* Right Tree */}
                  <div className="relative">
                    <div className="w-0 h-0 border-l-[30px] border-l-transparent border-r-[30px] border-r-transparent border-b-[70px] border-b-green-600"></div>
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-green-700 rounded-full"></div>
                  </div>
                </div>

                {/* Modern House */}
                <div className="relative z-20 transform hover:scale-105 transition-transform duration-500">
                  {/* House Structure */}
                  <div className="relative mx-auto" style={{ width: "280px" }}>
                    {/* Flat Roof */}
                    <div className="w-full h-8 bg-gray-800 rounded-t-lg shadow-lg"></div>

                    {/* Main House Body */}
                    <div className="w-full bg-white relative">
                      {/* Second Floor */}
                      <div className="h-32 bg-gray-100 border-2 border-gray-300 rounded-t-lg">
                        {/* Windows - Second Floor */}
                        <div className="flex justify-center gap-4 pt-6">
                          <div className="w-16 h-20 bg-blue-200 border-2 border-gray-400 rounded shadow-inner">
                            <div className="w-full h-full bg-blue-300/30 rounded"></div>
                          </div>
                          <div className="w-16 h-20 bg-blue-200 border-2 border-gray-400 rounded shadow-inner">
                            <div className="w-full h-full bg-blue-300/30 rounded"></div>
                          </div>
                        </div>
                      </div>

                      {/* First Floor */}
                      <div className="h-40 bg-white border-x-2 border-b-2 border-gray-300 rounded-b-lg">
                        {/* Door */}
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-32 bg-gray-700 border-2 border-gray-800 rounded-t-lg">
                          {/* Door Handle */}
                          <div className="absolute top-1/2 right-2 w-2 h-2 bg-yellow-400 rounded-full"></div>
                        </div>

                        {/* Windows - First Floor */}
                        <div className="flex justify-around pt-4 px-4">
                          <div className="w-14 h-16 bg-blue-200 border-2 border-gray-400 rounded shadow-inner">
                            <div className="w-full h-full bg-blue-300/30 rounded"></div>
                          </div>
                          <div className="w-14 h-16 bg-blue-200 border-2 border-gray-400 rounded shadow-inner">
                            <div className="w-full h-full bg-blue-300/30 rounded"></div>
                          </div>
                        </div>
                      </div>

                      {/* Entrance Cover */}
                      <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-amber-800 rounded-t-lg shadow-md">
                        <div className="absolute -top-1 left-0 right-0 h-1 bg-amber-900"></div>
                      </div>
                    </div>

                    {/* Ground/Foundation */}
                    <div className="w-full h-4 bg-gray-600 rounded-b-lg"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section - Text and Buttons */}
            <div className="flex flex-col justify-center space-y-6 order-1 md:order-2">
              {/* Main Heading */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1e3a5f] leading-tight">
                خانه ایده‌آل شما
                <br />
                <span className="text-[#1e3a5f]">منتظر است!</span>
              </h1>

              {/* Description Text */}
              <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-xl">
                بسیار زیبا و با ارزش. ابتدا و بهترین شما در این وادی‌ها رو که
                متعلق بهترین کار مناب است. مجموعه‌ای از بهترین املاک را برای
                شما گردآوری کرده‌ایم.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                {/* مشاهده املاک Button - Blue with arrow */}
                <Link
                  href="/properties"
                  className="inline-flex items-center justify-center bg-[#1e3a5f] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#0f2a47] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <span>مشاهده املاک</span>
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </Link>

                {/* تماس با ما Button - White with blue border */}
                <Link
                  href="/CommunicationUs"
                  className="inline-flex items-center justify-center bg-white border-2 border-[#1e3a5f] text-[#1e3a5f] px-8 py-4 rounded-xl font-semibold hover:bg-[#f0f5fa] transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                >
                  تماس با ما
                </Link>
              </div>

              {/* Carousel Indicators */}
              <div className="flex items-center gap-3 pt-6">
                <div className="w-8 h-3 bg-[#1e3a5f] rounded-full"></div>
                <div className="w-3 h-3 border-2 border-[#1e3a5f] rounded-full"></div>
                <div className="w-3 h-3 border-2 border-[#1e3a5f] rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
