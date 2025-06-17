import NavbarClient from '../components/NavbarClient';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-beige via-white to-cyan-100">
      <NavbarClient />
      <section className="max-w-4xl mx-auto py-24 px-6">
        <h1 className="text-5xl font-bold text-center mb-12 bg-gradient-to-r from-burberry-red via-beige to-cyan-400 bg-clip-text text-transparent animate-slide-down">
          公司简介
        </h1>
        <div className="mb-16 text-lg text-gray-700 leading-relaxed text-center animate-fade-in">
          精艺控股，始创于1988年，专注于高品质紧固件的研发与制造。我们以"匠心精神，卓越品质"为核心价值观，致力于为全球客户提供创新、可靠的产品与服务。
        </div>
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white rounded-2xl shadow-xl p-8 hover:scale-105 transition-all duration-500 animate-slide-in-left-elastic">
            <h3 className="text-xl font-bold mb-4 text-burberry-red">公司愿景</h3>
            <p>成为全球领先的紧固件解决方案提供商。</p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-8 hover:scale-105 transition-all duration-500 animate-scale">
            <h3 className="text-xl font-bold mb-4 text-burberry-red">企业使命</h3>
            <p>以创新驱动发展，以品质赢得信赖。</p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-8 hover:scale-105 transition-all duration-500 animate-slide-in-right-elastic">
            <h3 className="text-xl font-bold mb-4 text-burberry-red">核心价值观</h3>
            <p>诚信、创新、协作、卓越。</p>
          </div>
        </div>
        {/* 可继续扩展团队、荣誉、文化等模块 */}
      </section>
    </div>
  );
} 