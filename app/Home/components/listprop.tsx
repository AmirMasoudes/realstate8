"use client";

import React from "react";

interface Property {
  id: number;
  title: string;
  location: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  image: string;
}

const properties: Property[] = [
  {
    id: 1,
    title: "Modern Family Home",
    location: "Tehran, District 1",
    price: "$450,000",
    bedrooms: 4,
    bathrooms: 3,
    area: "250 sqm",
    image: "house1",
  },
  {
    id: 2,
    title: "Luxury Apartment",
    location: "Tehran, District 2",
    price: "$320,000",
    bedrooms: 3,
    bathrooms: 2,
    area: "180 sqm",
    image: "house2",
  },
  {
    id: 3,
    title: "Villa with Garden",
    location: "Tehran, District 3",
    price: "$680,000",
    bedrooms: 5,
    bathrooms: 4,
    area: "350 sqm",
    image: "house3",
  },
  {
    id: 4,
    title: "Cozy Studio",
    location: "Tehran, District 4",
    price: "$180,000",
    bedrooms: 1,
    bathrooms: 1,
    area: "80 sqm",
    image: "house4",
  },
  {
    id: 5,
    title: "Penthouse Suite",
    location: "Tehran, District 5",
    price: "$550,000",
    bedrooms: 4,
    bathrooms: 3,
    area: "280 sqm",
    image: "house5",
  },
  {
    id: 6,
    title: "Townhouse",
    location: "Tehran, District 6",
    price: "$380,000",
    bedrooms: 3,
    bathrooms: 2,
    area: "200 sqm",
    image: "house6",
  },
];

export default function ListProp() {
  return (
    <div className="bg-gray-50 py-20 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1e3a5f] mb-4">
            Featured Properties
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover your perfect home from our curated selection of premium
            properties
          </p>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl 
                         transition-all duration-300 transform hover:-translate-y-2 group"
            >
              {/* Property Image Placeholder */}
              <div
                className="relative h-64 bg-gradient-to-br from-[#1e3a5f] via-[#4a7ba8] to-[#7ba8d4] 
                            overflow-hidden"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white text-6xl opacity-30">🏠</div>
                </div>
                <div
                  className="absolute top-4 right-4 bg-[#1e3a5f] text-white px-3 py-1 rounded-full 
                              text-sm font-semibold"
                >
                  {property.price}
                </div>
                <div
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent 
                              p-4"
                >
                  <div className="text-white font-semibold text-lg">
                    {property.title}
                  </div>
                  <div className="text-white/90 text-sm flex items-center gap-1 mt-1">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {property.location}
                  </div>
                </div>
              </div>

              {/* Property Details */}
              <div className="p-6">
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl mb-1">🛏️</div>
                    <div className="text-sm text-gray-600">
                      {property.bedrooms} Bedrooms
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl mb-1">🚿</div>
                    <div className="text-sm text-gray-600">
                      {property.bathrooms} Bathrooms
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl mb-1">📐</div>
                    <div className="text-sm text-gray-600">{property.area}</div>
                  </div>
                </div>

                <button
                  className="w-full bg-[#1e3a5f] text-white py-3 rounded-lg font-semibold 
                                 hover:bg-[#0f2a47] transition-all duration-300 transform 
                                 group-hover:scale-105"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button
            className="bg-white border-2 border-[#1e3a5f] text-[#1e3a5f] px-8 py-3 
                           rounded-lg font-semibold hover:bg-[#1e3a5f] hover:text-white 
                           transition-all duration-300"
          >
            View All Properties
          </button>
        </div>
      </div>
    </div>
  );
}
