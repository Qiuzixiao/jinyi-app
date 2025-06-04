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
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [isAnimating, setIsAnimating] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 重置自动轮播计时器
  const resetTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    timerRef.current = setInterval(() => {
      changeSlide('next');
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
  }, [images.length, interval]);

  // 切换幻灯片的通用函数
  const changeSlide = (dir: 'next' | 'prev') => {
    if (isAnimating) return; // 防止动画过程中重复触发
    
    setIsAnimating(true);
    setDirection(dir);
    
    setTimeout(() => {
      if (dir === 'next') {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      } else {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
      }
      
      // 动画完成后重置状态
      setTimeout(() => {
        setIsAnimating(false);
      }, 500); // 与CSS过渡时间匹配
    }, 50); // 短暂延迟以确保方向状态已更新
    
    resetTimer(); // 重置自动轮播计时器
  };

  // 手动切换到上一张
  const prevSlide = () => changeSlide('prev');

  // 手动切换到下一张
  const nextSlide = () => changeSlide('next');

  // 直接跳转到指定幻灯片
  const goToSlide = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    setDirection(index > currentIndex ? 'next' : 'prev');
    setIsAnimating(true);
    
    setTimeout(() => {
      setCurrentIndex(index);
      
      // 动画完成后重置状态
      setTimeout(() => {
        setIsAnimating(false);
      }, 500);
    }, 50);
    
    resetTimer();
  };

  // 获取当前标题
  const currentTitle = titles[currentIndex % titles.length];

  return (
    <div 
      className="relative w-full overflow-hidden rounded-lg shadow-xl" 
      style={{ height: `${height}px` }}
    >
      {/* 图片容器 */}
      <div className="relative h-full w-full">
        {images.map((image, index) => {
          // 确定每张图片的动画类名
          let animationClass = '';
          
          if (index === currentIndex) {
            animationClass = 'opacity-100 scale-100 z-10';
          } else {
            // 确定非当前图片的位置和动画
            const isPrev = (index === ((currentIndex - 1 + images.length) % images.length));
            const isNext = (index === ((currentIndex + 1) % images.length));
            
            if (isPrev) {
              animationClass = direction === 'prev' ? 'opacity-0 -translate-x-full scale-95 z-0' : 'opacity-0 translate-x-full scale-95 z-0';
            } else if (isNext) {
              animationClass = direction === 'next' ? 'opacity-0 -translate-x-full scale-95 z-0' : 'opacity-0 translate-x-full scale-95 z-0';
            } else {
              animationClass = 'opacity-0 scale-90 z-0';
            }
          }
          
          return (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-600 ease-in-out ${animationClass}`}
            >
              <Image
                src={image}
                alt={`轮播图 ${index + 1}`}
                fill
                className="object-cover transform transition-transform duration-600 hover:scale-105"
                priority={index === 0}
              />
              
              {/* 图片渐变遮罩 */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            </div>
          );
        })}
      </div>

      {/* 左右箭头 - 优化悬停效果 */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-3 rounded-full hover:bg-burberry-red hover:scale-110 transition-all duration-400 z-20 opacity-70 hover:opacity-100"
        aria-label="上一张"
        disabled={isAnimating}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-3 rounded-full hover:bg-burberry-red hover:scale-110 transition-all duration-400 z-20 opacity-70 hover:opacity-100"
        aria-label="下一张"
        disabled={isAnimating}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* 指示器 - 增强交互效果 */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-400 ${index === currentIndex 
              ? 'bg-burberry-red w-6' 
              : 'bg-white/60 hover:bg-white/90'}`}
            aria-label={`切换到图片 ${index + 1}`}
            disabled={isAnimating}
          />
        ))}
      </div>

      {/* 标题覆盖层 - 添加动画效果 */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 overflow-hidden">
        <h3 
          className={`text-2xl font-bold text-white px-8 py-4 bg-burberry-red/90 rounded shadow-lg transform transition-all duration-500 ${isAnimating ? 'translate-y-10 opacity-0' : 'translate-y-0 opacity-100'}`}
        >
          {currentTitle}
        </h3>
      </div>
    </div>
  );
}