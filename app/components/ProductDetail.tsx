'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Product } from './ProductGrid';

interface ProductDetailProps {
  product: Product;
  // 产品的多角度图片
  images: string[];
  // 产品的详细规格
  specifications: {
    title: string;
    value: string;
  }[];
}

export default function ProductDetail({ product, images, specifications }: ProductDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isRotating, setIsRotating] = useState(false);
  
  // 切换到下一张图片
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };
  
  // 切换到上一张图片
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };
  
  // 开始/停止360度旋转
  const toggleRotation = () => {
    setIsRotating(!isRotating);
  };
  
  // 自动旋转效果
  React.useEffect(() => {
    if (!isRotating) return;
    
    const interval = setInterval(() => {
      nextImage();
    }, 500); // 每500ms切换一次图片，形成旋转效果
    
    return () => clearInterval(interval);
  }, [isRotating]);

  return (
    <div className="min-h-screen bg-white">
      {/* 产品图片展示区 */}
      <div className="relative h-screen w-full overflow-hidden bg-light-gray">
        {/* 主图片 */}
        {images.map((image, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
          >
            <Image
              src={image}
              alt={`${product.name} - 视图 ${index + 1}`}
              fill
              className="object-contain"
              priority={index === 0}
            />
          </div>
        ))}
        
        {/* 导航控制 */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-6 z-10">
          {/* 上一张按钮 */}
          <button 
            onClick={prevImage}
            className="bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all"
            aria-label="上一张图片"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          {/* 360度旋转按钮 */}
          <button 
            onClick={toggleRotation}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full shadow-lg transition-all ${isRotating ? 'bg-burberry-red text-white' : 'bg-white/80 hover:bg-white text-gray-800'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>{isRotating ? '停止旋转' : '360° 视图'}</span>
          </button>
          
          {/* 下一张按钮 */}
          <button 
            onClick={nextImage}
            className="bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all"
            aria-label="下一张图片"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        
        {/* 缩略图选择器 */}
        <div className="absolute top-1/2 right-8 transform -translate-y-1/2 flex flex-col space-y-4 z-10">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`relative w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${index === currentImageIndex ? 'border-burberry-red' : 'border-transparent hover:border-gray-300'}`}
            >
              <Image
                src={image}
                alt={`缩略图 ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
        
        {/* 悬浮式产品信息卡片 */}
        <div className="absolute top-8 left-8 max-w-md bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-xl z-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
          <div className="flex items-center mb-4">
            <span className="bg-burberry-red text-white text-sm font-medium px-3 py-1 rounded-full">
              {product.category}
            </span>
          </div>
          
          {/* 产品规格信息 */}
          <div className="space-y-3">
            {specifications.map((spec, index) => (
              <div key={index} className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-600">{spec.title}</span>
                <span className="font-medium text-gray-900">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}