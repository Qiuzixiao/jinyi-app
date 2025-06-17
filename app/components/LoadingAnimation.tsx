'use client';

import { useState, useEffect } from 'react';

export default function LoadingAnimation() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 模拟页面加载完成
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 2秒后隐藏加载动画

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[radial-gradient(circle,#42bad6,#37add3,#34a0ce,#3892c7,#4184bf,#3c89c5,#368fca,#2f94d0,#00afe1,#00c9eb,#2be2f0,#5ffbf1)] transition-opacity duration-500">
      <div className="relative">
        {/* 品牌标志动画 */}
        <div className="w-24 h-24 relative">
          {/* 外圈旋转动画 */}
          <div className="absolute inset-0 border-4 border-beige rounded-full animate-spin-slow opacity-80"></div>
          
          {/* 内圈脉动动画 */}
          <div className="absolute inset-2 border-2 border-burberry-red rounded-full animate-pulse"></div>
          
          {/* 品牌首字母 */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-bold text-black animate-fade-in">精艺</span>
          </div>
        </div>
        
        {/* 加载文字 */}
        <div className="mt-4 text-center">
          <p className="text-black text-sm font-medium animate-pulse">精艺控股</p>
          <p className="text-gray-500 text-xs mt-1">匠心精神 · 卓越品质</p>
        </div>
      </div>
    </div>
  );
}