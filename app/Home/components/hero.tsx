"use client";

import React from "react";

export default function Hero() {
  return (
    <div className="min-h-screen bg-[#1e3a5f] relative overflow-hidden">
      {/* Navigation Bar */}
      <nav className="absolute top-0 left-0 right-0 z-50 px-8 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-2xl font-bold text-[#1e3a5f] bg-white px-4 py-2 rounded">
            LOGO
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#"
              className="text-[#1e3a5f] font-medium hover:text-[#0f2a47] transition-colors"
            >
              Home
            </a>
            <a
              href="#"
              className="text-[#1e3a5f] font-medium hover:text-[#0f2a47] transition-colors"
            >
              About Us
            </a>
            <a
              href="#"
              className="text-[#1e3a5f] font-medium hover:text-[#0f2a47] transition-colors"
            >
              Services
            </a>
            <a
              href="#"
              className="text-[#1e3a5f] font-medium hover:text-[#0f2a47] transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-8 pt-32 pb-20">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
            {/* Left Content */}
            <div className="flex flex-col justify-center space-y-6">
              <div className="text-[#1e3a5f] text-sm font-semibold uppercase tracking-wider">
                Real Estate
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1e3a5f] leading-tight">
                Your Ideal Home
                <br />
                <span className="text-[#2d5a8f]">Is Waiting!</span>
              </h1>

              <p className="text-[#1e3a5f] text-base md:text-lg leading-relaxed opacity-80">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris.
              </p>

              <button
                className="bg-[#1e3a5f] text-white px-8 py-3 rounded-lg font-semibold 
                                hover:bg-[#0f2a47] transition-all duration-300 transform hover:scale-105 
                                shadow-lg hover:shadow-xl w-fit"
              >
                Read More
              </button>

              {/* Pagination Dots */}
              <div className="flex items-center space-x-2 pt-4">
                {[1, 2, 3, 4].map((dot) => (
                  <div
                    key={dot}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      dot === 1
                        ? "bg-[#2d5a8f] w-8"
                        : "bg-[#a0c4e8] hover:bg-[#7ba8d4]"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Right Illustration */}
            <div className="relative flex items-center justify-center min-h-[400px]">
              {/* Location Pin */}
              <div className="absolute top-8 right-16 z-10">
                <svg
                  width="60"
                  height="80"
                  viewBox="0 0 24 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-[#7ba8d4]"
                >
                  <path
                    d="M12 0C5.373 0 0 5.373 0 12C0 19.5 12 32 12 32S24 19.5 24 12C24 5.373 18.627 0 12 0ZM12 16C9.791 16 8 14.209 8 12C8 9.791 9.791 8 12 8C14.209 8 16 9.791 16 12C16 14.209 14.209 16 12 16Z"
                    fill="currentColor"
                  />
                </svg>
              </div>

              {/* Trees */}
              <div className="absolute bottom-20 left-8 z-0">
                <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[40px] border-b-[#7ba8d4]"></div>
              </div>
              <div className="absolute bottom-20 right-8 z-0">
                <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[40px] border-b-[#7ba8d4]"></div>
              </div>

              {/* House Illustration */}
              <div className="relative z-20">
                {/* Main House Structure */}
                <div className="relative">
                  {/* Roof */}
                  <div className="w-64 h-32 bg-[#1e3a5f] transform -skew-x-12 relative">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#0f2a47] to-[#1e3a5f]"></div>
                  </div>

                  {/* House Body */}
                  <div className="w-64 h-48 bg-[#4a7ba8] relative -mt-2">
                    {/* Ground Floor Windows */}
                    <div className="absolute bottom-16 left-8 w-20 h-24 bg-[#7ba8d4] border-4 border-[#1e3a5f]"></div>
                    <div className="absolute bottom-16 right-8 w-20 h-24 bg-[#7ba8d4] border-4 border-[#1e3a5f]"></div>

                    {/* Upper Floor Circular Window */}
                    <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-[#7ba8d4] border-4 border-[#1e3a5f] rounded-full">
                      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-[#1e3a5f]"></div>
                      <div className="absolute top-0 left-1/2 w-0.5 h-full bg-[#1e3a5f]"></div>
                    </div>

                    {/* Balcony */}
                    <div className="absolute top-0 left-4 right-4 h-8 bg-[#1e3a5f]">
                      <div className="absolute -bottom-2 left-0 right-0 h-2 bg-[#0f2a47]"></div>
                      {/* Balcony Railing */}
                      <div className="absolute -bottom-4 left-2 w-1 h-4 bg-[#1e3a5f]"></div>
                      <div className="absolute -bottom-4 right-2 w-1 h-4 bg-[#1e3a5f]"></div>
                      <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-1 h-4 bg-[#1e3a5f]"></div>

                      {/* Potted Plants */}
                      <div className="absolute -bottom-6 left-6 w-6 h-6 bg-[#5a9bd4] rounded-full"></div>
                      <div className="absolute -bottom-6 right-6 w-6 h-6 bg-[#5a9bd4] rounded-full"></div>
                    </div>
                  </div>

                  {/* FOR SALE Sign */}
                  <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                    <div className="w-32 h-20 bg-[#1e3a5f] border-2 border-[#0f2a47] flex items-center justify-center relative">
                      <div className="text-white font-bold text-sm">
                        FOR SALE
                      </div>
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
