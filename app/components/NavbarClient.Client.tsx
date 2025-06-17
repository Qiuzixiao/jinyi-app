  <div className="flex flex-col items-center space-y-8 text-2xl">
    <button 
      onClick={() => {
        document.getElementById('products')?.scrollIntoView({behavior: 'smooth'});
        setMobileMenuOpen(false);
      }}
      className="relative py-2 group bg-transparent border-none cursor-pointer text-white hover:text-burberry-red"
    >
      <span>产品系列</span>
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-current group-hover:w-full transition-all duration-300"></span>
    </button>
    <button 
      onClick={() => {
        document.getElementById('about')?.scrollIntoView({behavior: 'smooth'});
        setMobileMenuOpen(false);
      }}
      className="relative py-2 group bg-transparent border-none cursor-pointer text-white hover:text-burberry-red"
    >
      <span>关于我们</span>
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-current group-hover:w-full transition-all duration-300"></span>
    </button>
    
    {/* 联系方式及子菜单 */}
    <div className="flex flex-col items-center space-y-4">
      <button 
        onClick={() => {
          setMobileContactDropdownOpen(!mobileContactDropdownOpen);
        }}
        className="relative py-2 group bg-transparent border-none cursor-pointer text-white hover:text-burberry-red flex items-center"
      >
        <span>联系方式</span>
        <svg xmlns="http://www.w3.org/2000/svg" 
  </div> 