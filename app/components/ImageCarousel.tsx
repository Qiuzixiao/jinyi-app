'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface ImageCarouselProps {
  images: string[];
  interval?: number; // 轮播间隔，单位毫秒
  height?: number; // 轮播图高度
  titles?: string[]; // 每张图片对应的标题，可选
}

export default function ImageCarousel({ 
  images, 
  interval = 5000, 
  height = 400,
  titles = ['传承与创新'] // 默认标题
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 重置自动轮播计时器
  const resetTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      goToSlide((currentIndex + 1) % images.length);
    }, interval);
  };

  // 自动轮播
  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
    // eslint-disable-next-line
  }, [images.length, interval, currentIndex]);

  // 切换幻灯片的通用函数
  const goToSlide = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setTimeout(() => {
        setIsAnimating(false);
      }, 600);
    }, 20);
    resetTimer();
  };

  // 获取当前标题
  const currentTitle = titles[currentIndex % titles.length];

  return (
    <div 
      className="relative w-full overflow-hidden rounded-3xl shadow-2xl bg-white/90 hover:scale-105 transition-transform duration-500 group"
      style={{ height: `${height}px` }}
    >
      {/* 图片滑动容器 */}
      <div className="flex h-full w-full transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {images.map((image, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-full h-full flex flex-col items-center justify-center relative"
          >
            <img
              src={image}
              alt={`轮播图 ${index + 1}`}
              className="object-cover w-full h-full rounded-3xl"
              style={{ objectPosition: 'center' }}
            />
            {/* 图片渐变遮罩 */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded-3xl pointer-events-none"></div>
            {/* 标题覆盖层 */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 text-center">
              <h3 className="text-3xl font-bold text-white px-8 py-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] bg-black/30 rounded-xl inline-block animate-fade-in">
                {titles[index]}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* 左右箭头 - Apple风格 */}
      <button
        onClick={() => goToSlide((currentIndex - 1 + images.length) % images.length)}
        className="absolute left-8 top-1/2 -translate-y-1/2 bg-white/80 text-burberry-red p-3 rounded-full shadow-lg hover:bg-burberry-red hover:text-white hover:scale-110 transition-all duration-300 z-30 opacity-80 group-hover:opacity-100"
        aria-label="上一张"
        disabled={isAnimating}
        style={{ backdropFilter: 'blur(6px)' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={() => goToSlide((currentIndex + 1) % images.length)}
        className="absolute right-8 top-1/2 -translate-y-1/2 bg-white/80 text-burberry-red p-3 rounded-full shadow-lg hover:bg-burberry-red hover:text-white hover:scale-110 transition-all duration-300 z-30 opacity-80 group-hover:opacity-100"
        aria-label="下一张"
        disabled={isAnimating}
        style={{ backdropFilter: 'blur(6px)' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* 指示器 - Apple风格 */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-400 border-2 border-white ${index === currentIndex 
              ? 'bg-burberry-red scale-125 shadow-lg' 
              : 'bg-white/60 hover:bg-white/90'}`}
            aria-label={`切换到图片 ${index + 1}`}
            disabled={isAnimating}
          />
        ))}
      </div>
    </div>
  );
}