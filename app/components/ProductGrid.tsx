'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// 产品类型定义
export interface Product {
  id: string;
  name: string;
  image: string;
  category: string;
  specs?: {
    [key: string]: string;
  };
}

interface ProductGridProps {
  products: Product[];
  categories?: string[];
}

export default function ProductGrid({ products, categories = [] }: ProductGridProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  const [showAllCategories, setShowAllCategories] = useState<boolean>(false);
  const [showAllProducts, setShowAllProducts] = useState<boolean>(false);
  const gridRef = useRef<HTMLDivElement>(null);
  
  // 默认只显示凉行产品（这里假设凉行产品是前4个分类）
  const defaultCategories = categories.slice(0, 4); // 只显示前4个分类
  const extraCategories = categories.slice(4); // 剩余的分类
  
  // 使用useMemo缓存筛选后的产品，避免每次渲染都重新计算
  const filteredProducts = React.useMemo(() => {
    return activeCategory === 'all' 
      ? products 
      : products.filter(product => product.category === activeCategory);
  }, [products, activeCategory]);

  // 根据showAllProducts状态决定显示多少产品
  const displayProducts = React.useMemo(() => {
    // 如果显示全部，则返回所有筛选后的产品
    if (showAllProducts) return filteredProducts;
    // 否则只返回前8个产品（假设每行4个，共2行）
    return filteredProducts.slice(0, 8);
  }, [filteredProducts, showAllProducts]);

  // 处理分类变化时的动画效果
  useEffect(() => {
    // 先隐藏所有产品
    setVisibleProducts([]);
    // 重置显示全部产品的状态
    setShowAllProducts(false);
    
    // 短暂延迟后显示筛选后的产品，创造淡入效果
    const timer = setTimeout(() => {
      // 分类变化时只显示前8个产品
      setVisibleProducts(filteredProducts.slice(0, 8));
    }, 300);
    
    return () => clearTimeout(timer);
  }, [activeCategory, filteredProducts]);

  // 处理显示更多产品按钮点击时的更新
  useEffect(() => {
    // 当showAllProducts状态变化时，更新visibleProducts
    setVisibleProducts([]);
    
    // 短暂延迟后显示筛选后的产品，创造淡入效果
    const timer = setTimeout(() => {
      // 根据showAllProducts状态决定显示哪些产品
      const productsToShow = showAllProducts ? filteredProducts : filteredProducts.slice(0, 8);
      setVisibleProducts(productsToShow);
      
      // 如果显示更多产品，滚动到产品网格底部
      if (showAllProducts && gridRef.current) {
        const gridBottom = gridRef.current.getBoundingClientRect().bottom;
        window.scrollTo({
          top: window.scrollY + gridBottom - window.innerHeight + 100, // 额外滚动100px确保看到新内容
          behavior: 'smooth'
        });
      }
    }, 300);
    
    return () => clearTimeout(timer);
  }, [showAllProducts, filteredProducts]);

  // 滚动时的视差效果 - 使用useCallback缓存handleScroll函数
  const handleScroll = React.useCallback(() => {
    if (!gridRef.current) return;
    
    const cards = gridRef.current.querySelectorAll('.product-card');
    const gridTop = gridRef.current.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    // 只有当网格进入视口时才应用动画
    if (gridTop < windowHeight && gridTop > -gridRef.current.offsetHeight) {
      cards.forEach((card, index) => {
        const cardElement = card as HTMLElement;
        const cardTop = cardElement.getBoundingClientRect().top;
        const scrollProgress = Math.max(0, Math.min(1, 1 - (cardTop / windowHeight)));
        
        // 根据滚动位置应用不同程度的变换
        const translateY = 30 * (1 - scrollProgress);
        const scale = 0.95 + (0.05 * scrollProgress);
        const opacity = Math.min(1, scrollProgress * 1.5);
        
        // 应用交错效果，使每个卡片的动画稍微延迟
        const delay = index % 4 * 0.1; // 每行的卡片有不同的延迟
        
        cardElement.style.transform = `translateY(${translateY}px) scale(${scale})`;
        cardElement.style.opacity = `${opacity}`;
        cardElement.style.transitionDelay = `${delay}s`;
      });
    }
  }, []);
  
  // 当visibleProducts变化时，应用视差效果
  useEffect(() => {
    if (visibleProducts.length > 0) {
      // 给一点时间让DOM更新
      setTimeout(handleScroll, 100);
    }
  }, [visibleProducts, handleScroll]);
  
  // 添加和移除滚动事件监听器
  useEffect(() => {
    // 初始运行一次
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div className="space-y-12">
      {/* 分类筛选器 - 增强交互效果 */}
      {categories.length > 0 && (
        <div className="relative">
          <div className="flex flex-wrap justify-center gap-4 mb-12 transition-all duration-500">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-8 py-3 rounded-full transition-all duration-400 transform ${activeCategory === 'all' 
                ? 'bg-burberry-red text-white scale-105 shadow-lg' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-800 hover:scale-105 hover:shadow-md'}`}
            >
              全部
            </button>
            
            {/* 默认只显示前4个分类（凉行产品） */}
            {(showAllCategories ? categories : defaultCategories).map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-8 py-3 rounded-full transition-all duration-400 transform ${activeCategory === category 
                  ? 'bg-burberry-red text-white scale-105 shadow-lg' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-800 hover:scale-105 hover:shadow-md'}`}
              >
                {category}
              </button>
            ))}
            
            {/* 展示更多按钮 - 当有额外分类时显示 */}
            {extraCategories.length > 0 && (
              <button 
                onClick={() => setShowAllCategories(!showAllCategories)}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 px-4 py-3 rounded-full bg-white border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2 text-gray-700 hover:text-burberry-red"
              >
                <span>{showAllCategories ? '收起' : '展示更多'}</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-4 w-4 transition-transform duration-300 ${showAllCategories ? 'rotate-180' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            )}
          </div>
        </div>
      )}

      {/* 产品网格 - 添加视差滚动效果 */}
      <div 
        ref={gridRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
      >
        {visibleProducts.map((product, index) => (
          <Link href={`/products/${product.id}`} key={product.id}>
            <div 
              className="product-card group relative overflow-hidden rounded-lg shadow-lg transition-all duration-600 hover:shadow-xl bg-white h-full transform hover:-translate-y-2 opacity-0"
              style={{ 
                transitionDelay: `${index % 4 * 0.1}s`,
                animationDelay: `${index % 4 * 0.1}s`,
              }}
            >
              {/* 产品图片 */}
              <div className="relative h-64 w-full overflow-hidden">
                <Image 
                  src={product.image} 
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-600 ease-in-out group-hover:scale-110"
                />
                
                {/* 悬停时的光效 */}
                <div className="absolute inset-0 bg-gradient-to-tr from-burberry-red/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-600 ease-in-out"></div>
              </div>
              
              {/* 产品信息悬浮卡片 - 增强动画效果 */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out flex flex-col justify-end p-6 transform translate-y-4 group-hover:translate-y-0">
                <h3 className="text-xl font-bold text-white mb-3 transform -translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                  {product.name}
                </h3>
                
                {/* 产品规格信息 - 交错动画 */}
                {product.specs && (
                  <div className="space-y-2">
                    {Object.entries(product.specs).map(([key, value], i) => (
                      <p 
                        key={key} 
                        className="text-sm text-white/90 transform -translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500"
                        style={{ transitionDelay: `${150 + i * 50}ms` }}
                      >
                        <span className="font-medium">{key}:</span> {value}
                      </p>
                    ))}
                  </div>
                )}
                
                <div className="mt-4 inline-block transform -translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-300">
                  <span className="text-white text-sm font-medium bg-burberry-red px-5 py-2 rounded-full hover:bg-white hover:text-burberry-red transition-colors duration-300">
                    {product.category}
                  </span>
                </div>
              </div>
              
              {/* 默认显示的产品名称 */}
              <div className="p-5 group-hover:opacity-0 transition-all duration-400 transform group-hover:-translate-y-2">
                <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{product.category}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {/* 显示更多产品按钮 */}
      {filteredProducts.length > 8 && (
        <div className="flex justify-center mt-8">
          <button 
            onClick={() => setShowAllProducts(!showAllProducts)}
            className="px-8 py-3 rounded-full bg-white border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2 text-gray-700 hover:text-burberry-red"
          >
            <span>{showAllProducts ? '收起' : '显示更多产品'}</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-4 w-4 transition-transform duration-300 ${showAllProducts ? 'rotate-180' : ''}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      )}
      
      {/* 无产品时的提示 */}
      {visibleProducts.length === 0 && (
        <div className="text-center py-12 animate-pulse">
          <p className="text-gray-500">正在加载产品...</p>
        </div>
      )}
    </div>
  );
}