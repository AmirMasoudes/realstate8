"use client";

import React, { useEffect } from "react";
import { useAtom } from "jotai";
import { loadingAtom, errorAtom } from "../../services/base/atoms";
import ErrorMessage from "../../services/components/ErrorMessage";

export default function AboutUsPage() {
  const [loading, setLoading] = useAtom(loadingAtom);
  const [, setError] = useAtom(errorAtom);

  useEffect(() => {
    // In a real app, you would fetch data here
    setLoading(false);
  }, [setLoading]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="h-8 skeleton w-1/2 mb-6"></div>
            <div className="space-y-4">
              <div className="h-4 skeleton w-full"></div>
              <div className="h-4 skeleton w-full"></div>
              <div className="h-4 skeleton w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <ErrorMessage className="mb-6" onDismiss={() => setError(null)} />

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1e3a5f] mb-4">
            درباره ما
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            ما در زمینه املاک و خدمات مسکن تخصص داریم
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 mb-8">
          <h2 className="text-2xl font-bold text-[#1e3a5f] mb-4">ماموریت ما</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            ماموریت ما کمک به شما در پیدا کردن خانه ایده‌آل است. ما با سال‌ها
            تجربه در زمینه املاک، بهترین خدمات را به مشتریان خود ارائه می‌دهیم.
          </p>

          <h2 className="text-2xl font-bold text-[#1e3a5f] mb-4">
            چشم‌انداز ما
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            چشم‌انداز ما تبدیل شدن به برترین شرکت املاک در منطقه است. ما به
            دنبال ایجاد تجربه‌ای استثنایی برای مشتریان خود هستیم.
          </p>

          <h2 className="text-2xl font-bold text-[#1e3a5f] mb-4">
            ارزش‌های ما
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>صداقت و شفافیت در تمام معاملات</li>
            <li>تعهد به رضایت مشتری</li>
            <li>تخصص و تجربه در زمینه املاک</li>
            <li>خدمات با کیفیت و قابل اعتماد</li>
          </ul>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-4xl font-bold text-[#1e3a5f] mb-2">500+</div>
            <div className="text-gray-600">املاک فروخته شده</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-4xl font-bold text-[#1e3a5f] mb-2">1000+</div>
            <div className="text-gray-600">مشتری راضی</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-4xl font-bold text-[#1e3a5f] mb-2">10+</div>
            <div className="text-gray-600">سال تجربه</div>
          </div>
        </div>
      </div>
    </div>
  );
}
