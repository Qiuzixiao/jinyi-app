'use client';

import { useEffect } from 'react';

export default function NavbarClient() {
  useEffect(() => {
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const menuToggleSpans = document.querySelectorAll('#menu-toggle span');
    
    if (!navbar || !menuToggle || !mobileMenu) {
      console.error('导航栏元素未找到');
      return;
    }
    
    // 滚动时改变导航栏样式
    const handleScroll = () => {
      if (window.scrollY > 50) {
        // 白色背景模式
        navbar.classList.add('bg-white', 'shadow-md');
        navbar.classList.remove('bg-transparent');
        
        // 文字改为黑色
        navLinks.forEach(link => {
          link.classList.add('text-black');
          link.classList.remove('text-white');
        });
        
        // 汉堡菜单按钮改为黑色
        menuToggleSpans.forEach(span => {
          span.classList.add('bg-black');
          span.classList.remove('bg-white');
        });
        
        // Logo旁边的文字改为黑色
        document.querySelector('.logo-text')?.classList.remove('text-white');
        document.querySelector('.logo-text')?.classList.add('text-black');
      } else {
        // 透明背景模式
        navbar.classList.remove('bg-white', 'shadow-md');
        navbar.classList.add('bg-transparent');
        
        // 文字改为白色
        navLinks.forEach(link => {
          link.classList.remove('text-black');
          link.classList.add('text-white');
        });
        
        // 汉堡菜单按钮改为白色
        menuToggleSpans.forEach(span => {
          span.classList.remove('bg-black');
          span.classList.add('bg-white');
        });
        
        // Logo旁边的文字改为白色
        document.querySelector('.logo-text')?.classList.add('text-white');
        document.querySelector('.logo-text')?.classList.remove('text-black');
      }
    };
    
    // 初始状态设置
    if (window.scrollY <= 50) {
      navbar.classList.add('bg-transparent');
      
      // 初始文字为白色
      navLinks.forEach(link => {
        link.classList.add('text-white');
      });
      
      // 初始汉堡菜单按钮为白色
      menuToggleSpans.forEach(span => {
        span.classList.add('bg-white');
      });
      
      // 初始Logo旁边的文字为白色
      document.querySelector('.logo-text')?.classList.add('text-white');
    } else {
      navbar.classList.add('bg-white', 'shadow-md');
      
      // 初始文字为黑色
      navLinks.forEach(link => {
        link.classList.add('text-black');
      });
      
      // 初始汉堡菜单按钮为黑色
      menuToggleSpans.forEach(span => {
        span.classList.add('bg-black');
      });
      
      // 初始Logo旁边的文字为黑色
      document.querySelector('.logo-text')?.classList.add('text-black');
    }
    
    // 立即执行一次滚动处理函数
    handleScroll();
    
    // 移动端菜单切换
    const toggleMenu = () => {
      const spans = menuToggle.querySelectorAll('span');
      
      // 切换汉堡按钮动画
      if (mobileMenu.classList.contains('hidden')) {
        // 打开菜单
        mobileMenu.classList.remove('hidden');
        mobileMenu.classList.add('flex');
        
        // 汉堡变X动画
        spans[0].classList.add('rotate-45', 'translate-y-2');
        spans[1].classList.add('opacity-0');
        spans[2].classList.add('-rotate-45', '-translate-y-2');
      } else {
        // 关闭菜单
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('flex');
        
        // X变汉堡动画
        spans[0].classList.remove('rotate-45', 'translate-y-2');
        spans[1].classList.remove('opacity-0');
        spans[2].classList.remove('-rotate-45', '-translate-y-2');
      }
    };
    
    // 添加事件监听器
    window.addEventListener('scroll', handleScroll);
    
    // 确保汉堡菜单按钮可点击
    menuToggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleMenu();
    });
    
    // 清理函数
    return () => {
      window.removeEventListener('scroll', handleScroll);
      menuToggle.removeEventListener('click', toggleMenu);
    };
  }, []); // 空依赖数组确保只在组件挂载时运行一次
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300" id="navbar">
      <nav className="px-8 py-4 flex justify-between items-center transition-all duration-300">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 flex items-center justify-center">
            <img src="/Img/logo.png" alt="精艺控股Logo" className="w-full h-full object-contain" />
          </div>
          <div className="text-3xl font-bold logo-text">精艺控股</div>
        </div>
        
        {/* 桌面端菜单 */}
        <div className="hidden md:flex space-x-8">
          <button 
            onClick={() => document.getElementById('products')?.scrollIntoView({behavior: 'smooth'})}
            className="relative py-2 text-lg group bg-transparent border-none cursor-pointer nav-link"
          >
            <span>产品系列</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-current group-hover:w-full transition-all duration-300"></span>
          </button>
          <button 
            onClick={() => document.getElementById('about')?.scrollIntoView({behavior: 'smooth'})}
            className="relative py-2 text-lg group bg-transparent border-none cursor-pointer nav-link"
          >
            <span>关于我们</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-current group-hover:w-full transition-all duration-300"></span>
          </button>
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})}
            className="relative py-2 text-lg group bg-transparent border-none cursor-pointer nav-link"
          >
            <span>联系方式</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-current group-hover:w-full transition-all duration-300"></span>
          </button>
        </div>
        
        {/* 移动端汉堡菜单按钮 */}
        <button 
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5" 
          id="menu-toggle"
        >
          <span className="w-6 h-0.5 transition-all duration-300"></span>
          <span className="w-6 h-0.5 transition-all duration-300"></span>
          <span className="w-6 h-0.5 transition-all duration-300"></span>
        </button>
      </nav>
      
      {/* 移动端全屏菜单 */}
      <div className="fixed inset-0 bg-white z-40 flex-col items-center justify-center hidden pt-24" id="mobile-menu">
        <div className="flex flex-col items-center space-y-8 text-2xl">
          <button 
            onClick={() => {
              document.getElementById('products')?.scrollIntoView({behavior: 'smooth'});
              document.getElementById('mobile-menu')?.classList.add('hidden');
              document.getElementById('mobile-menu')?.classList.remove('flex');
            }}
            className="relative py-2 group bg-transparent border-none cursor-pointer nav-link text-black"
          >
            <span>产品系列</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-current group-hover:w-full transition-all duration-300"></span>
          </button>
          <button 
            onClick={() => {
              document.getElementById('about')?.scrollIntoView({behavior: 'smooth'});
              document.getElementById('mobile-menu')?.classList.add('hidden');
              document.getElementById('mobile-menu')?.classList.remove('flex');
            }}
            className="relative py-2 group bg-transparent border-none cursor-pointer nav-link text-black"
          >
            <span>关于我们</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-current group-hover:w-full transition-all duration-300"></span>
          </button>
          <button 
            onClick={() => {
              document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'});
              document.getElementById('mobile-menu')?.classList.add('hidden');
              document.getElementById('mobile-menu')?.classList.remove('flex');
            }}
            className="relative py-2 group bg-transparent border-none cursor-pointer nav-link text-black"
          >
            <span>联系方式</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-current group-hover:w-full transition-all duration-300"></span>
          </button>
        </div>
      </div>
    </header>
  );
}