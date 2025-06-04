import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProductDetail from '../../components/ProductDetail';
import { getProductById, getProductImages, getProductSpecifications } from '../../data/products';
import { PageProps } from '../../../types/next';

type ProductParams = {
  id: string;
};

// 使用通用PageProps类型，不再需要手动定义Promise
export default async function ProductPage({ params }: PageProps<ProductParams>) {
  const { id } = await params;
  const product = getProductById(id);
  
  // 如果产品不存在，返回404
  if (!product) {
    notFound();
  }
  
  // 获取产品的多角度图片
  const images = getProductImages(id);
  
  // 获取产品的详细规格
  const specifications = getProductSpecifications(id);

  return (
    <div className="min-h-screen flex flex-col">
      {/* 导航栏 */}
      <nav className="bg-white shadow-md p-4 sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-gray-800">精艺控股</Link>
          <div className="space-x-6">
            <Link href="/#products" className="text-gray-600 hover:text-burberry-red transition-colors">返回产品系列</Link>
            <Link href="/#about" className="text-gray-600 hover:text-burberry-red transition-colors">关于我们</Link>
            <Link href="/#contact" className="text-gray-600 hover:text-burberry-red transition-colors">联系方式</Link>
          </div>
        </div>
      </nav>
      
      {/* 产品详情组件 */}
      <ProductDetail 
        product={product} 
        images={images} 
        specifications={specifications} 
      />
      
      {/* 相关产品推荐区域可以在这里添加 */}
      
      {/* 返回按钮 */}
      <div className="fixed bottom-8 left-8 z-50">
        <Link 
          href="/#products" 
          className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm text-gray-800 px-6 py-3 rounded-full shadow-lg hover:bg-burberry-red hover:text-white transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>返回产品系列</span>
        </Link>
      </div>
    </div>
  );
}