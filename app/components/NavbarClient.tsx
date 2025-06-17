'use client';

import React, { useEffect, useState, useRef } from 'react';

export default function NavbarClient() {
  // 添加状态管理，用于控制联系方式下拉菜单、移动端菜单和二维码模态框的显示/隐藏
  const [contactDropdownOpen, setContactDropdownOpen] = useState(false);
  const [mobileContactDropdownOpen, setMobileContactDropdownOpen] = useState(false);
  const [qrCodeModalOpen, setQrCodeModalOpen] = useState(false);
  // 添加移动端菜单状态，用于控制移动端菜单的显示/隐藏
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // 添加状态变量来存储弹窗位置信息
  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });
  // 添加状态变量来存储窗口宽度
  const [windowWidth, setWindowWidth] = useState(0);
  // 创建引用，用于检测点击外部关闭弹窗
  const popoverRef = useRef<HTMLDivElement>(null);
  
  /**
   * 调整弹窗位置，确保不超出屏幕边界
   * @param position 初始位置对象，包含top和left属性
   * @returns 调整后的位置对象
   */
  const adjustPopoverPosition = (position: { top: number, left: number }) => {
    // 使用状态中的窗口宽度，而不是直接访问window对象
    const currentWindowWidth = windowWidth;
    const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 0;
    const popoverWidth = 240; // 调整后的弹窗宽度
    const popoverHeight = 280; // 调整后的弹窗高度
    const navbarHeight = 60; // 导航栏高度
    
    let { top, left } = position;
    
    // 移动设备上居中显示
    if (currentWindowWidth < 768) {
      left = (currentWindowWidth - popoverWidth) / 2;
      
      // 确保弹出框在可视区域内，并与按钮保持一定距离
      // 检查下方是否有足够空间
      const spaceBelow = windowHeight - position.top;
      
      if (spaceBelow >= popoverHeight + 20) {
        // 下方空间足够，在按钮下方显示
        top = position.top + 10;
      } else {
        // 下方空间不足，检查上方空间
        const spaceAbove = position.top - navbarHeight;
        
        if (spaceAbove >= popoverHeight + 20) {
          // 上方空间足够，在按钮上方显示
          top = position.top - popoverHeight - 10;
        } else {
          // 上下空间都不足，选择空间较大的一侧
          if (spaceBelow >= spaceAbove) {
            // 下方空间较大
            top = position.top + 10;
          } else {
            // 上方空间较大
            top = Math.max(navbarHeight + 10, position.top - popoverHeight - 10);
          }
        }
      }
    } else {
      // 桌面设备上的逻辑
      // 检查右边界
      if (left + popoverWidth > currentWindowWidth) {
        left = currentWindowWidth - popoverWidth - 10; // 10px 边距
      }
      
      // 检查下方是否有足够空间
      const spaceBelow = windowHeight - position.top;
      
      if (spaceBelow >= popoverHeight + 20) {
        // 下方空间足够，在按钮下方显示
        top = position.top + 10;
      } else {
        // 下方空间不足，检查上方空间
        const spaceAbove = position.top - navbarHeight;
        
        if (spaceAbove >= popoverHeight + 20) {
          // 上方空间足够，在按钮上方显示
          top = position.top - popoverHeight - 10;
        } else {
          // 上下空间都不足，选择空间较大的一侧
          if (spaceBelow >= spaceAbove) {
            // 下方空间较大，但确保不超出屏幕底部
            top = Math.min(position.top + 10, windowHeight - popoverHeight - 10);
          } else {
            // 上方空间较大，但确保不超出导航栏
            top = Math.max(navbarHeight + 10, position.top - popoverHeight - 10);
          }
        }
      }
    }
    
    // 最终安全检查，确保不超出屏幕边界
    top = Math.max(navbarHeight + 10, Math.min(top, windowHeight - popoverHeight - 10));
    left = Math.max(10, Math.min(left, currentWindowWidth - popoverWidth - 10));
    
    return { top, left };
  };
  
  // 添加useEffect来初始化和更新窗口宽度
  useEffect(() => {
    // 只在客户端执行
    if (typeof window !== 'undefined') {
      // 设置初始窗口宽度
      setWindowWidth(window.innerWidth);
      
      // 添加窗口大小变化监听器
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
      
      window.addEventListener('resize', handleResize);
      
      // 清理函数
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);
  
  useEffect(() => {
    // 添加键盘事件监听，按ESC键关闭二维码模态框
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setQrCodeModalOpen(false);
        setMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    // 滚动时改变导航栏样式
    const handleScroll = () => {
      const navbar = document.getElementById('navbar');
      const navLinks = document.querySelectorAll('.nav-link');
      const logoText = document.querySelector('.logo-text');
      
      if (!navbar) return;
      
      if (window.scrollY > 30) {
        // 磨砂玻璃效果背景
        navbar.classList.add('backdrop-blur-md', 'bg-white/30', 'shadow-lg');
        navbar.classList.remove('bg-transparent');
        
        // 文字改为深色并添加发光效果
        navLinks.forEach(link => {
          link.classList.add('text-gray-800', 'font-semibold', 'hover:text-blue-600', 'transition-colors');
          link.classList.remove('text-white');
        });
        
        // Logo旁边的文字改为深色并添加发光效果
        logoText?.classList.remove('text-white');
        logoText?.classList.add('text-gray-800', 'font-bold', 'hover:text-blue-600', 'transition-colors');
      } else {
        // 透明背景模式
        navbar.classList.remove('backdrop-blur-md', 'bg-white/30', 'shadow-lg');
        navbar.classList.add('bg-transparent');
        
        // 文字改为白色
        navLinks.forEach(link => {
          link.classList.remove('text-gray-800', 'font-semibold', 'hover:text-blue-600');
          link.classList.add('text-white');
        });
        
        // Logo旁边的文字改为白色
        logoText?.classList.add('text-white');
        logoText?.classList.remove('text-gray-800', 'font-bold', 'hover:text-blue-600');
      }
    };
    
    // 初始状态设置
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const logoText = document.querySelector('.logo-text');
    
    if (navbar) {
      if (window.scrollY <= 30) {
        navbar.classList.add('bg-transparent');
        
        // 初始文字为白色
        navLinks.forEach(link => {
          link.classList.add('text-white');
        });
        
        // 初始Logo旁边的文字为白色
        logoText?.classList.add('text-white');
      } else {
        navbar.classList.add('bg-white', 'shadow-md');
        
        // 初始文字为黑色
        navLinks.forEach(link => {
          link.classList.add('text-black');
        });
        
        // 初始Logo旁边的文字为黑色
        logoText?.classList.add('text-black');
      }
    }
    
    // 立即执行一次滚动处理函数
    handleScroll();
    
    // 添加事件监听器
    window.addEventListener('scroll', handleScroll);
    
    // 清理函数
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []); // 不再需要 qrCodeModalOpen 作为依赖
  
  // 处理点击外部关闭弹窗
  useEffect(() => {
    if (qrCodeModalOpen) {
      const handleClickOutside = (e: MouseEvent) => {
        if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
          setQrCodeModalOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [qrCodeModalOpen]);

  // 当移动菜单打开时，阻止页面滚动
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = ''; // 恢复默认滚动
    }
    // 清理函数，确保组件卸载或状态变化时恢复滚动
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);
  
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent" id="navbar">
        <nav className="mx-4 mt-1 px-6 py-1 flex justify-between items-center transition-all duration-300 rounded-2xl">
          <div className="flex items-center space-x-2">
            <div className="w-12 h-12 flex items-center justify-center">
              <img src="/Img/logo.png" alt="精艺控股Logo" className="w-full h-full object-contain" />
            </div>
            <div className="text-xl font-bold logo-text">精艺控股</div>
          </div>
          
          {/* 桌面端菜单 */}
          <div className="hidden md:flex space-x-6">
            <button 
              onClick={() => document.getElementById('products')?.scrollIntoView({behavior: 'smooth'})}
              className="relative py-1 text-sm group bg-transparent border-none cursor-pointer nav-link"
            >
              <span>产品系列</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-current group-hover:w-full transition-all duration-300"></span>
            </button>
            <button 
              onClick={() => document.getElementById('about')?.scrollIntoView({behavior: 'smooth'})}
              className="relative py-1 text-sm group bg-transparent border-none cursor-pointer nav-link"
            >
              <span>关于我们</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-current group-hover:w-full transition-all duration-300"></span>
            </button>
            {/* 联系方式下拉菜单 */}
            <div className="relative group" 
              onMouseEnter={() => setContactDropdownOpen(true)}
              onMouseLeave={() => setContactDropdownOpen(false)}
            >
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})}
                className="relative py-1 text-sm group bg-transparent border-none cursor-pointer nav-link flex items-center"
              >
                <span>联系方式</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-current group-hover:w-full transition-all duration-300"></span>
              </button>
              
              {/* 下拉菜单 */}
              <div className={`absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all duration-200 ${contactDropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                <div className="py-1">
                  <button
                    onClick={() => {
                      // 滚动到邮件联系表单
                    const contactForm = document.getElementById('contact-form');
                    if (contactForm) {
                      contactForm.scrollIntoView({behavior: 'smooth'});
                    } else {
                      document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'});
                    }
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    邮件咨询
                  </button>
                  <button
                    onClick={(e) => {
                      const buttonRect = e.currentTarget.getBoundingClientRect();
                      const position = {
                        top: buttonRect.bottom + window.scrollY,
                        left: buttonRect.left + window.scrollX
                      };
                      setPopoverPosition(adjustPopoverPosition(position));
                      setQrCodeModalOpen(true);
                      setContactDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    公众号
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* 移动端汉堡菜单按钮 */}
          <button 
            className="md:hidden flex flex-col justify-center items-center w-6 h-6 space-y-1" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="菜单按钮"
          >
            <span className={`w-5 h-0.5 transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1.5 bg-gray-800' : 'bg-gray-800'}`}></span>
            <span className={`w-5 h-0.5 transition-all duration-300 ${mobileMenuOpen ? 'opacity-0 bg-gray-800' : 'bg-gray-800'}`}></span>
            <span className={`w-5 h-0.5 transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5 bg-gray-800' : 'bg-gray-800'}`}></span>
          </button>
        </nav>
      </header>
      
      {/* 移动端全屏菜单 */}
      <div 
        className={`fixed inset-0 bg-gray-900 z-[999] flex-col items-center justify-center pt-24 ${
          mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="flex flex-col items-center space-y-8 text-2xl">
          <button 
            onClick={() => {
              document.getElementById('products')?.scrollIntoView({behavior: 'smooth'});
              setMobileMenuOpen(false);
            }}
            className="relative py-2 group bg-transparent border-none cursor-pointer hover:text-burberry-red"
          >
            <span className="!text-white">产品系列</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-current group-hover:w-full transition-all duration-300"></span>
          </button>
          <button 
            onClick={() => {
              document.getElementById('about')?.scrollIntoView({behavior: 'smooth'});
              setMobileMenuOpen(false);
            }}
            className="relative py-2 group bg-transparent border-none cursor-pointer hover:text-burberry-red"
          >
            <span className="!text-white">关于我们</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-current group-hover:w-full transition-all duration-300"></span>
          </button>
          
          {/* 联系方式及子菜单 */}
          <div className="flex flex-col items-center space-y-4">
            <button 
              onClick={() => {
                setMobileContactDropdownOpen(!mobileContactDropdownOpen);
              }}
              className="relative py-2 group bg-transparent border-none cursor-pointer hover:text-burberry-red flex items-center"
            >
              <span className="!text-white">联系方式</span>
              <svg xmlns="http://www.w3.org/2000/svg" 
                className={`h-5 w-5 ml-2 transition-transform duration-300 ${mobileContactDropdownOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-current group-hover:w-full transition-all duration-300"></span>
            </button>
            
            {/* 子菜单 */}
            <div className={`flex flex-col items-center space-y-4 overflow-hidden transition-all duration-300 ${mobileContactDropdownOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
              <button 
                onClick={() => {
                  // 滚动到邮件联系表单
                  const contactForm = document.getElementById('contact-form');
                  if (contactForm) {
                    contactForm.scrollIntoView({behavior: 'smooth'});
                  } else {
                    document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'});
                  }
                  setMobileMenuOpen(false);
                }}
                className="text-lg text-white hover:text-burberry-red transition-colors duration-300"
              >
                邮件咨询
              </button>
              <button 
                onClick={(e) => {
                  const buttonRect = e.currentTarget.getBoundingClientRect();
                  const position = {
                    top: buttonRect.bottom + window.scrollY,
                    left: buttonRect.left + window.scrollX
                  };
                  setPopoverPosition(adjustPopoverPosition(position));
                  setQrCodeModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="text-lg text-white hover:text-burberry-red transition-colors duration-300"
              >
                公众号
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* 二维码弹出框 */}
      {qrCodeModalOpen && (
        <div 
          ref={popoverRef}
          className="absolute z-50 p-3 rounded-lg shadow-lg"
          style={{ 
            top: `${popoverPosition.top}px`, 
            left: `${popoverPosition.left}px`,
            zIndex: 9999,
            animation: 'popoverFadeIn 0.3s ease-out',
            width: windowWidth < 768 ? 'calc(100% - 32px)' : '240px',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.3)'
          }}
        >
          <div className="relative">
            {/* 箭头指示器 - 几乎不可见 */}
            <div className="absolute -top-2 left-3 w-2.5 h-2.5 transform rotate-45" style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.5)', 
              border: '1px solid rgba(255, 255, 255, 0.05)', 
              borderBottom: 'none', 
              borderRight: 'none',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              boxShadow: '0 0 1px rgba(0, 0, 0, 0.03)'
            }}></div>
            
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-base font-medium text-gray-800">微信公众号</h3>
              <button 
                onClick={() => setQrCodeModalOpen(false)}
                className="text-gray-600 hover:text-gray-800"
                aria-label="关闭"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex justify-center">
              <img src="/Img/erwei.jpg" alt="微信公众号二维码" className="max-w-full h-auto rounded-md" style={{ maxWidth: '180px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}