'use client';

import { useEffect, useRef } from 'react';
import Image from "next/image";
import ImageCarousel from "./components/ImageCarousel";
import ProductGrid from "./components/ProductGrid";
import { products, categories } from "./data/products";

import NavbarClient from './components/NavbarClient';
import { Smokum } from 'next/font/google';

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  
  // 视差滚动效果和动画触发
  useEffect(() => {
    // 获取所有带有视差动画的元素
    const parallaxElements = document.querySelectorAll('[class*="animate-parallax"]');
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const handleScroll = () => {
      if (!heroRef.current) return;
      
      const scrollY = window.scrollY;
      const heroHeight = heroRef.current.offsetHeight;
      const windowHeight = window.innerHeight;
      
      // 只在Hero区域可见时应用视差效果
      if (scrollY <= heroHeight) {
        // 视差效果：背景图片移动速度比滚动慢
        const translateY = scrollY * 0.5; // 视差系数
        heroRef.current.style.backgroundPositionY = `-${translateY}px`;
        
        // 文字内容上移效果
        const heroContent = heroRef.current.querySelector('.hero-content');
        if (heroContent instanceof HTMLElement) {
          heroContent.style.transform = `translateY(${scrollY * 0.2}px)`;
          heroContent.style.opacity = `${1 - (scrollY / (heroHeight * 0.8))}`;
        }
      }
      
      // 处理视差动画元素
      parallaxElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        
        // 当元素进入视口时触发动画
        if (rect.top < windowHeight * 0.85) {
          (element as HTMLElement).style.animationPlayState = 'running';
        }
      });
      
      // 处理时间轴项目的动画
      timelineItems.forEach(item => {
        const rect = item.getBoundingClientRect();
        
        if (rect.top < windowHeight * 0.85) {
          const side = item.getAttribute('data-side');
          if (side === 'left') {
            item.classList.add('animate-slide-in-left-elastic');
            item.classList.remove('animate-slide-in-right-elastic');
          } else {
            item.classList.add('animate-slide-in-right-elastic');
            item.classList.remove('animate-slide-in-left-elastic');
          }
          item.classList.remove('opacity-0');
          item.classList.add('opacity-100');
          item.classList.add('translate-x-0');
        } else {
          item.classList.remove('animate-slide-in-left-elastic', 'animate-slide-in-right-elastic', 'opacity-100', 'translate-x-0');
          item.classList.add('opacity-0');
        }
      });
    };
    
    // 初始触发一次滚动处理
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // 滚动到指定区域
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col overflow-hidden" style={{ backgroundColor: 'var(--page-background-color)' }}>
      {/* Hero Section - 添加视差滚动效果 */}
      <section
        ref={heroRef}
        className="relative h-screen flex flex-col items-center justify-center bg-cover bg-center bg-fixed text-white transition-all duration-1000 ease-out"
        style={{ backgroundImage: "url('/Img/banner.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50 transition-opacity duration-1000"></div> {/* 背景遮罩 */}
        
        <NavbarClient />

        {/* Hero 内容 */}
        <div className="hero-content relative z-10 text-center p-8 pt-32 transition-all duration-1000 ease-out">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-slide-down">
            精艺控股
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto animate-slide-up opacity-0" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
            探索精艺控股的非凡产品系列，体验匠心工艺与极致设计的完美融合。
          </p>
          <button 
            onClick={() => scrollToSection('products')}
            className="px-10 py-4 border-2 border-white rounded-full text-lg font-semibold hover:bg-white hover:text-black transition-all duration-400 transform hover:scale-105 animate-slide-up opacity-0" 
            style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}
          >
            探索
          </button>
        </div>
      </section>

      {/* 产品系列展示区 - 添加视差滚动效果 */}
      <section id="products" className="py-24 px-8 relative overflow-hidden" style={{ backgroundColor: 'var(--page-background-color)' }}>
        {/* 背景装饰元素 */}
        <div className="absolute -right-20 top-20 w-64 h-64 rounded-full bg-beige opacity-10 blur-3xl animate-float"></div>
        <div className="absolute -left-20 bottom-20 w-80 h-80 rounded-full bg-burberry-red opacity-5 blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        
        <div className="container mx-auto relative z-10">
          <h2 className="text-5xl font-bold text-center mb-12 text-gray-800 opacity-0 animate-parallax-slow" style={{ animationFillMode: 'forwards', animationPlayState: 'paused' }}>
            产品系列
          </h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-16 opacity-0 animate-parallax-medium" style={{ animationFillMode: 'forwards', animationPlayState: 'paused', animationDelay: '0.2s' }}>
            精艺控股提供多种高品质紧固件系列，从装饰螺丝到工业强力螺栓，满足各种应用场景的需求。
            每一款产品都融合了经典工艺与现代科技，展现卓越品质。
          </p>
          
          {/* 引入产品网格组件 */}
          <div className="mt-16 opacity-0 animate-parallax-fast" style={{ animationFillMode: 'forwards', animationPlayState: 'paused', animationDelay: '0.4s' }}>
            <ProductGrid products={products} categories={categories} />
          </div>
        </div>
      </section>

      {/* 品牌故事区 - 添加视差滚动和交互效果 */}
      <section className="py-24 px-8 relative overflow-hidden" id="about" style={{ backgroundColor: 'var(--page-background-color)' }}>
        {/* 删除了Burberry格纹背景 */}
        
        <h2 className="text-5xl font-bold text-center mb-16 text-gray-800 relative z-10 opacity-0 animate-parallax-slow" style={{ animationFillMode: 'forwards', animationPlayState: 'paused' }}>
          品牌故事
        </h2>
        
        <div className="container mx-auto relative z-10">
          {/* 轮播图 - 增强动画效果 */}
          <div className="mb-20 opacity-0 animate-parallax-medium shadow-2xl rounded-3xl overflow-hidden" style={{ animationFillMode: 'forwards', animationPlayState: 'paused', animationDelay: '0.2s' }}>
            <ImageCarousel 
              images={[
                '/Carousel/Carousel-1.jpg',
                '/Carousel/Carousel-2.jpg',
                '/Carousel/Carousel-3.jpg',
                '/Carousel/Carousel-4.jpg'
              ]}
              titles={[
                '传承与创新',
                '精工技艺',
                '匠心品质',
                '大师风范'
              ]}
              height={450}
              interval={5000}
            />
          </div>
          
          {/* 品牌宣言 - 添加悬停效果 */}
          <div className="text-center mb-20 max-w-3xl mx-auto transform transition-all duration-600 hover:scale-105 opacity-0 animate-parallax-medium" style={{ animationFillMode: 'forwards', animationPlayState: 'paused', animationDelay: '0.4s' }}>
            <p className="text-2xl font-light italic text-black mb-8 leading-relaxed">
              "精艺控股致力于将经典工艺与现代科技完美融合，
              每一个紧固件都是我们对品质的执着追求与匠心精神的体现。"
            </p>
            <div className="w-32 h-1 bg-burberry-red mx-auto transition-all duration-400 group-hover:w-48"></div>
          </div>
          
          {/* 时间轴 - 交错排列 */}
          <div className="relative opacity-0 animate-parallax-slow" style={{ animationFillMode: 'forwards', animationPlayState: 'paused', animationDelay: '0.6s' }}>
            {/* 中心线：渐变色 */}
            <div className="absolute left-1/2 top-0 h-full w-1 bg-gradient-to-b from-burberry-red via-beige to-cyan-400 -translate-x-1/2"></div>
            <div className="flex flex-col gap-16">
              {/* 节点1：左侧 */}
              <div className="flex justify-start items-center relative timeline-item opacity-0 translate-x-10" data-side="left" style={{ transitionDelay: '0.1s' }}>
                <div className="w-1/2 pr-8 flex justify-end">
                  <div className="timeline-card bg-white rounded-lg p-6">
                    <h4 className="font-bold text-xl mb-3">1988年</h4>
                    <p>精艺控股在浙江成立，专注于紧固件的研发与制造。</p>
                  </div>
                </div>
                <div className="w-0 flex flex-col items-center">
                  <div className="timeline-dot w-5 h-5 rounded-full bg-burberry-red z-10"></div>
                </div>
                <div className="w-1/2"></div>
              </div>
              {/* 节点2：右侧 */}
              <div className="flex justify-end items-center relative timeline-item opacity-0 -translate-x-10" data-side="right" style={{ transitionDelay: '0.3s' }}>
                <div className="w-1/2"></div>
                <div className="w-0 flex flex-col items-center">
                  <div className="timeline-dot w-5 h-5 rounded-full bg-burberry-red z-10"></div>
                </div>
                <div className="w-1/2 pl-8 flex justify-start">
                  <div className="timeline-card bg-white rounded-lg p-6">
                    <h4 className="font-bold text-xl mb-3">2000年</h4>
                    <p>精艺步入快速发展轨道</p>
                  </div>
                </div>
              </div>
              {/* 节点3：左侧 */}
              <div className="flex justify-start items-center relative timeline-item opacity-0 translate-x-10" data-side="left" style={{ transitionDelay: '0.5s' }}>
                <div className="w-1/2 pr-8 flex justify-end">
                  <div className="timeline-card bg-white rounded-lg p-6">
                    <h4 className="font-bold text-xl mb-3">2006年</h4>
                    <p>2006年，ERP系统上线，精艺迈入数字化经营新时代，效率与管理并进。</p>
                  </div>
                </div>
                <div className="w-0 flex flex-col items-center">
                  <div className="timeline-dot w-5 h-5 rounded-full bg-burberry-red z-10"></div>
                </div>
                <div className="w-1/2"></div>
              </div>
              {/* 节点4：右侧 */}
              <div className="flex justify-end items-center relative timeline-item opacity-0 -translate-x-10" data-side="right" style={{ transitionDelay: '0.7s' }}>
                <div className="w-1/2"></div>
                <div className="w-0 flex flex-col items-center">
                  <div className="timeline-dot w-5 h-5 rounded-full bg-burberry-red z-10"></div>
                </div>
                <div className="w-1/2 pl-8 flex justify-start">
                  <div className="timeline-card bg-white rounded-lg p-6">
                    <h4 className="font-bold text-xl mb-3">2021年</h4>
                    <p>上线数字化车间，开启数据决策用的经营模式。</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 关于我们区 - 添加视差滚动和交互效果 */}
      <section className="py-24 px-8 relative overflow-hidden" id="contact" style={{ backgroundColor: 'var(--page-background-color)' }}>
        {/* 背景装饰元素 */}
        <div className="absolute -left-32 top-0 w-96 h-96 rounded-full bg-beige opacity-20 blur-3xl"></div>
        <div className="absolute -right-32 bottom-0 w-96 h-96 rounded-full bg-burberry-red opacity-10 blur-3xl"></div>
        
        <div className="container mx-auto relative z-10">
          <h2 className="text-5xl font-bold text-center mb-16 text-burberry-red opacity-0 animate-parallax-slow drop-shadow-[0_2px_4px_rgba(158,27,50,0.3)]" style={{ animationFillMode: 'forwards', animationPlayState: 'paused' }}>
            关于我们
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* 左侧：公司介绍 */}
            <div className="opacity-0 animate-parallax-medium" style={{ animationFillMode: 'forwards', animationPlayState: 'paused', animationDelay: '0.2s' }}>
              <h3 className="text-3xl font-bold mb-6 text-gray-800">精艺控股有限公司</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                精艺控股是一家专注于高端紧固件研发与制造的全球领先企业。
                公司总部位于浙江，拥有全球领先的技术团队和先进的生产线。
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                我们致力于将经典工艺与现代科技完美融合，为全球客户提供卓越品质的紧固件解决方案。
              </p>
              
              {/* 联系信息 */}
              <div className="mt-8 space-y-4">
                <div className="flex items-center space-x-4 group">
                  <div className="w-10 h-10 rounded-full bg-beige flex items-center justify-center text-burberry-red group-hover:bg-burberry-red group-hover:text-white transition-all duration-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-gray-700 group-hover:text-burberry-red transition-all duration-400">contact@jinyi-holdings.com</span>
                </div>
                <div className="flex items-center space-x-4 group" id="contact-phone">
                  <div className="w-10 h-10 rounded-full bg-beige flex items-center justify-center text-burberry-red group-hover:bg-burberry-red group-hover:text-white transition-all duration-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <span className="text-gray-700 group-hover:text-burberry-red transition-all duration-400">0577-62877317 / 0577-62863333</span>
                </div>
                <div className="flex items-center space-x-4 group">
                  <div className="w-10 h-10 rounded-full bg-beige flex items-center justify-center text-burberry-red group-hover:bg-burberry-red group-hover:text-white transition-all duration-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <span className="text-gray-700 group-hover:text-burberry-red transition-all duration-400">浙江温州市乐清市北白象镇</span>
                </div>
              </div>
            </div>
            
            {/* 右侧：联系表单 */}
            <div className="bg-white p-8 rounded-lg shadow-xl opacity-0 animate-parallax-medium" id="contact-form" style={{ animationFillMode: 'forwards', animationPlayState: 'paused', animationDelay: '0.4s' }}>
              <form className="space-y-6" onSubmit={async (e) => {
                e.preventDefault();
                const formElement = e.currentTarget; // 先保存
                const formData = new FormData(formElement);
                const data = {
                  name: formData.get('name'),
                  email: formData.get('email'),
                  message: formData.get('message')
                };

                try {
                  console.log('开始发送请求...');
                  const response = await fetch('/api/send-email', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                  });

                  console.log('收到响应:', response.status);
                  const result = await response.json();
                  console.log('响应数据:', result);

                  if (result.success) {
                    console.log('发送成功，显示成功提示');
                    alert('留言已发送，我们会尽快回复您！');
                    formElement.reset(); // 用保存的变量
                    return;
                  }
                  
                  console.log('发送失败，显示错误提示');
                  alert(`发送失败：${result.error}\n${result.details || ''}`);
                } catch (error) {
                  console.error('发生错误:', error);
                  alert('发送失败，请检查网络连接后重试');
                }
              }}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">姓名 / 公司名称</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-beige focus:border-transparent transition-all duration-400" 
                    placeholder="请输入您的姓名或公司名称" 
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">邮箱</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-beige focus:border-transparent transition-all duration-400" 
                    placeholder="请输入您的邮箱" 
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">留言 / 需求</label>
                  <textarea 
                    id="message" 
                    name="message"
                    required
                    rows={4} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-beige focus:border-transparent transition-all duration-400" 
                    placeholder="请留下您的合作意向或联系方式，我们会尽快与您联系"
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-burberry-red text-white py-3 px-6 rounded-md hover:bg-red-700 transition-all duration-400 transform hover:-translate-y-1 hover:shadow-lg"
                >
                  提交
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 页脚设计 - 预留充足的上方留白空间 */}
      <footer className="pt-24 bg-black">
        {/* 主要页脚内容 - 分栏设计 */}
        <div className="container mx-auto px-8 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {/* 品牌信息栏 */}
            <div className="lg:col-span-1">
              <h3 className="text-xl font-bold mb-6 text-white">精艺控股</h3>
              <p className="text-white mb-4">专注于高品质紧固件的研发与制造，致力于为全球客户提供创新、可靠的紧固解决方案。</p>
              <div className="flex items-center space-x-2 mt-6">
                <div className="w-16 h-16 rounded-full flex items-center justify-center">
                  <img src="/Img/logo.png" alt="精艺控股Logo" className="w-full h-full object-contain" />
                </div>
                <span className="text-white font-semibold">精艺控股</span>
              </div>
            </div>

            {/* 企业文化栏 */}
            <div>
              <h3 className="text-xl font-bold mb-6 text-white">企业文化</h3>
              <ul className="space-y-3">
                <li>
                  <a href="/about" className="text-white hover:text-burberry-red transition-colors duration-300">公司简介</a>
                </li>
                <li>
                  <a href="#" className="text-white hover:text-burberry-red transition-colors duration-300">企业使命</a>
                </li>
                <li>
                  <a href="#" className="text-white hover:text-burberry-red transition-colors duration-300">发展历程</a>
                </li>
                <li>
                  <a href="#" className="text-white hover:text-burberry-red transition-colors duration-300">荣誉资质</a>
                </li>
                <li>
                  <a href="#" className="text-white hover:text-burberry-red transition-colors duration-300">社会责任</a>
                </li>
              </ul>
            </div>

            {/* 客户服务栏 */}
            <div>
              <h3 className="text-xl font-bold mb-6 text-white">客户服务</h3>
              <ul className="space-y-3">
                <li className="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-burberry-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-white">400-123-4567</span>
                </li>
                <li className="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-burberry-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-white">service@jinyi.com</span>
                </li>
                <li>
                  <a href="#" className="text-white hover:text-burberry-red transition-colors duration-300">常见问题</a>
                </li>
                <li>
                  <a href="#" className="text-white hover:text-burberry-red transition-colors duration-300">技术支持</a>
                </li>
                <li>
                  <a href="#" className="text-white hover:text-burberry-red transition-colors duration-300">产品手册</a>
                </li>
              </ul>
            </div>

            {/* 社交媒体栏 */}
            <div>
              <h3 className="text-xl font-bold mb-6 text-white">关注我们</h3>
              <div className="flex space-x-4 mb-6">
                {/* 微信 */}
                <a href="#" className="w-10 h-10 rounded-full bg-burberry-red flex items-center justify-center hover:bg-white hover:text-burberry-red transition-colors duration-300">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8.69,11.52c-0.59,0-1.06,0.47-1.06,1.06s0.47,1.06,1.06,1.06s1.06-0.47,1.06-1.06S9.28,11.52,8.69,11.52z M15.31,11.52c-0.59,0-1.06,0.47-1.06,1.06s0.47,1.06,1.06,1.06s1.06-0.47,1.06-1.06S15.9,11.52,15.31,11.52z M19.94,12.12c0-3.95-3.95-7.16-8.82-7.16s-8.82,3.21-8.82,7.16c0,3.95,3.95,7.16,8.82,7.16c0.34,0,0.67-0.02,1-0.05c0.09-0.01,0.18-0.02,0.27-0.03c0.23-0.03,0.46-0.07,0.68-0.11c0.07-0.01,0.14-0.03,0.21-0.04c0.23-0.05,0.46-0.11,0.68-0.18c0.05-0.01,0.09-0.03,0.14-0.04c0.23-0.07,0.45-0.15,0.67-0.23c0.02-0.01,0.05-0.02,0.07-0.03c0.22-0.09,0.44-0.19,0.65-0.29c0.02-0.01,0.04-0.02,0.06-0.03c0.21-0.11,0.41-0.22,0.61-0.34c0.02-0.01,0.04-0.02,0.06-0.04c0.2-0.13,0.39-0.26,0.58-0.4c0.01-0.01,0.03-0.02,0.04-0.03c0.19-0.14,0.37-0.29,0.54-0.45c0.01-0.01,0.02-0.02,0.03-0.03c0.17-0.16,0.34-0.33,0.5-0.5c0.01-0.01,0.02-0.02,0.03-0.03c0.16-0.17,0.31-0.35,0.45-0.54c0.01-0.01,0.02-0.03,0.03-0.04c0.14-0.19,0.27-0.38,0.4-0.58c0.01-0.02,0.02-0.04,0.04-0.06c0.12-0.2,0.23-0.4,0.34-0.61c0.01-0.02,0.02-0.04,0.03-0.06c0.1-0.21,0.2-0.43,0.29-0.65c0.01-0.02,0.02-0.05,0.03-0.07c0.08-0.22,0.16-0.44,0.23-0.67c0.01-0.05,0.03-0.09,0.04-0.14c0.07-0.22,0.13-0.45,0.18-0.68c0.01-0.07,0.03-0.14,0.04-0.21c0.04-0.22,0.08-0.45,0.11-0.68c0.01-0.09,0.02-0.18,0.03-0.27c0.03-0.33,0.05-0.66,0.05-1C27.1,8.17,23.89,4.96,19.94,12.12z"/>
                  </svg>
                </a>
                {/* 微博 */}
                <a href="#" className="w-10 h-10 rounded-full bg-burberry-red flex items-center justify-center hover:bg-white hover:text-burberry-red transition-colors duration-300">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M10.9,18.3c-4.2,0.4-7.8-1.5-8-4.2c-0.2-2.7,3.1-5.2,7.3-5.6c4.2-0.4,7.8,1.5,8,4.2C18.4,15.4,15.1,17.9,10.9,18.3z M12.3,12.9c-0.4-0.1-0.8,0.1-0.9,0.5c-0.1,0.4,0.1,0.8,0.5,0.9c0.4,0.1,0.8-0.1,0.9-0.5C12.9,13.4,12.7,13,12.3,12.9z M9.9,14.2c-1.1,0.1-2.1-0.7-2.2-1.8c-0.1-1.1,0.7-2.1,1.8-2.2c1.1-0.1,2.1,0.7,2.2,1.8C11.8,13.1,11,14.1,9.9,14.2z M10.5,12.9c-0.4,0-0.7-0.3-0.7-0.7c0-0.4,0.3-0.7,0.7-0.7c0.4,0,0.7,0.3,0.7,0.7C11.2,12.6,10.9,12.9,10.5,12.9z M20.8,10.5c-0.5-2.2-2.1-3.8-4.3-4.3c-0.5-0.1-1,0.2-1.1,0.7c-0.1,0.5,0.2,1,0.7,1.1c1.6,0.4,2.8,1.5,3.2,3.1c0.1,0.5,0.6,0.8,1.1,0.7C20.6,11.6,20.9,11,20.8,10.5z M19.4,6.8c-1-1-2.3-1.4-3.6-1.3C15.3,5.5,15,6,15.1,6.5c0.1,0.5,0.5,0.8,1,0.7c0.8-0.1,1.6,0.2,2.2,0.8c0.6,0.6,0.8,1.4,0.7,2.2c-0.1,0.5,0.2,1,0.7,1.1c0.5,0.1,1-0.2,1.1-0.7C21,9.2,20.4,7.8,19.4,6.8z"/>
                  </svg>
                </a>
                {/* 抖音 */}
                <a href="https://v.douyin.com" className="w-10 h-10 rounded-full bg-burberry-red flex items-center justify-center hover:bg-white hover:text-burberry-red transition-colors duration-300">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z"/>
                  </svg>
                </a>
                {/* 领英 */}
                {/* <a href="#" className="w-10 h-10 rounded-full bg-burberry-red flex items-center justify-center hover:bg-white hover:text-burberry-red transition-colors duration-300">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                  </svg>
                </a> */}
              </div>
              <p className="text-white mb-2">扫描二维码关注微信公众号</p>
              <div className="w-32 h-32 bg-white p-2 border border-gray-300">
                {/* 二维码图片 */}
                <img src="/Img/erwei.jpg" alt="精艺控股公众号二维码" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>

        {/* 底部版权和法律链接 */}
        <div className="border-t border-gray-700">
          <div className="container mx-auto px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm mb-4 md:mb-0">&copy; {new Date().getFullYear()} 精艺控股. 版权所有.</p>
              <div className="flex flex-wrap justify-center space-x-4">
                <a href="#" className="text-gray-400 text-sm hover:text-burberry-red transition-colors duration-300 mb-2 md:mb-0">隐私政策</a>
                <a href="#" className="text-gray-400 text-sm hover:text-burberry-red transition-colors duration-300 mb-2 md:mb-0">使用条款</a>
                <a href="#" className="text-gray-400 text-sm hover:text-burberry-red transition-colors duration-300 mb-2 md:mb-0">Cookie政策</a>
                <a href="#" className="text-gray-400 text-sm hover:text-burberry-red transition-colors duration-300 mb-2 md:mb-0">网站地图</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
