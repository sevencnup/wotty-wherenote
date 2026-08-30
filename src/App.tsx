import { useState } from 'react';
import {
  Apple,
  Monitor,
  CheckCircle2,
  Search,
  Camera,
  ShieldCheck,
  Download,
  Menu,
  X,
  MessageCircle,
  Share2
} from 'lucide-react';
import {
  BrandLogo,
  Hero3DIllustration,
  FeatureIconLocation,
  FeatureIconCamera,
  FeatureIconNote
} from './components/Icons';
import { PhoneMockup } from './components/PhoneMockup';
import { MountainWavesBackground } from './components/MountainWavesBackground';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'features' | 'download' | 'about'>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f5f8f5] text-slate-800 flex flex-col font-sans selection:bg-emerald-200 selection:text-emerald-900 relative">
      {/* 贯穿顶部的真实山峦背景装饰 */}
      <MountainWavesBackground />

      {/* 顶部导航栏 (Navbar) */}
      <header className="sticky top-0 z-50 glass-panel border-b border-emerald-900/5 transition-all">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 h-20 flex items-center justify-between">
          {/* 品牌标识 */}
          <div className="flex items-center space-x-3.5 cursor-pointer" onClick={() => setActiveTab('home')}>
            <BrandLogo className="w-11 h-11" />
            <div className="flex flex-col">
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold text-slate-900 tracking-tight">随记</span>
                <span className="text-base font-semibold text-emerald-800/90 font-mono tracking-tight">WhereNote</span>
              </div>
              <span className="text-xs text-slate-400 font-normal tracking-wider -mt-0.5">
                简单实用的收纳备忘
              </span>
            </div>
          </div>

          {/* 桌面端导航 */}
          <nav className="hidden md:flex items-center space-x-9 text-sm font-medium">
            <button
              onClick={() => setActiveTab('home')}
              className={`relative py-1 transition ${
                activeTab === 'home'
                  ? 'text-emerald-800 font-semibold'
                  : 'text-slate-600 hover:text-emerald-700'
              }`}
            >
              首页
              {activeTab === 'home' && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-emerald-700 rounded-full" />
              )}
            </button>
            <a
              href="#features"
              onClick={() => setActiveTab('features')}
              className={`py-1 transition ${
                activeTab === 'features'
                  ? 'text-emerald-800 font-semibold'
                  : 'text-slate-600 hover:text-emerald-700'
              }`}
            >
              功能
            </a>
            <a
              href="#download"
              onClick={() => setActiveTab('download')}
              className={`py-1 transition ${
                activeTab === 'download'
                  ? 'text-emerald-800 font-semibold'
                  : 'text-slate-600 hover:text-emerald-700'
              }`}
            >
              下载
            </a>
            <a
              href="#about"
              onClick={() => setActiveTab('about')}
              className={`py-1 transition ${
                activeTab === 'about'
                  ? 'text-emerald-800 font-semibold'
                  : 'text-slate-600 hover:text-emerald-700'
              }`}
            >
              关于
            </a>
          </nav>

          {/* 移动端汉堡按钮 */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-emerald-700 focus:outline-none"
              aria-label="切换菜单"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* 移动端折叠菜单 */}
        {mobileMenuOpen && (
          <div className="md:hidden glass-panel border-b border-emerald-100 px-6 py-4 space-y-3 animate-fadeIn">
            <a
              href="#home"
              onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }}
              className="block py-2 text-base font-medium text-emerald-800"
            >
              首页
            </a>
            <a
              href="#features"
              onClick={() => { setActiveTab('features'); setMobileMenuOpen(false); }}
              className="block py-2 text-base font-medium text-slate-700 hover:text-emerald-800"
            >
              功能
            </a>
            <a
              href="#download"
              onClick={() => { setActiveTab('download'); setMobileMenuOpen(false); }}
              className="block py-2 text-base font-medium text-slate-700 hover:text-emerald-800"
            >
              下载
            </a>
            <a
              href="#about"
              onClick={() => { setActiveTab('about'); setMobileMenuOpen(false); }}
              className="block py-2 text-base font-medium text-slate-700 hover:text-emerald-800"
            >
              关于
            </a>
          </div>
        )}
      </header>

      {/* 主体区域 */}
      <main className="flex-1 relative">

        {/* 1. Hero 首屏展示区 */}
        <section id="home" className="max-w-6xl mx-auto px-6 sm:px-8 pt-10 sm:pt-14 pb-16 lg:pb-24 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* 左侧文案与下载按钮 */}
            <div className="lg:col-span-7 text-left space-y-6">
              <div className="space-y-3">
                <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold text-[#1a4435] leading-tight tracking-tight">
                  随手记一笔
                </h1>
                <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#225744] tracking-tight">
                  东西放在哪里，一目了然
                </h2>
              </div>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-lg">
                告别翻箱倒柜，轻松记录物品位置、实物照片与备注，<br className="hidden sm:inline" />
                让生活井井有条。
              </p>

              {/* 三大平台按钮 */}
              <div className="pt-3 flex flex-wrap gap-3.5">
                {/* App Store 下载 */}
                <button className="flex items-center space-x-3 bg-[#1e5843] hover:bg-[#164735] text-white px-5 py-3 rounded-xl font-medium shadow-md shadow-emerald-950/15 hover:shadow-lg transition-all active:scale-[0.98]">
                  <Apple className="w-6 h-6 fill-current" />
                  <div className="text-left leading-none">
                    <span className="text-[11px] block font-light opacity-90">App Store</span>
                    <span className="text-xs font-semibold">下载</span>
                  </div>
                </button>

                {/* Android 下载 */}
                <button className="flex items-center space-x-3 bg-[#1e5843] hover:bg-[#164735] text-white px-5 py-3 rounded-xl font-medium shadow-md shadow-emerald-950/15 hover:shadow-lg transition-all active:scale-[0.98]">
                  {/* 安卓机器小人图标 */}
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v6c0 .83.67 1.5 1.5 1.5S5 16.33 5 15.5v-6C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v6c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-6c0-.83-.67-1.5-1.5-1.5zm-4.97-4.84l1.3-1.3c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0l-1.48 1.48C13.61 2.23 12.36 2 11 2s-2.61.23-3.64.63L5.88 1.15c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.3 1.3C4.59 4.39 3.5 6.07 3.5 8h15c0-1.93-1.09-3.61-2.97-4.84zM8 5c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm6 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
                  </svg>
                  <div className="text-left leading-none">
                    <span className="text-[11px] block font-light opacity-90">Android</span>
                    <span className="text-xs font-semibold">下载</span>
                  </div>
                </button>

                {/* 网页版 */}
                <button className="flex items-center space-x-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 px-5 py-3 rounded-xl font-medium shadow-sm hover:border-emerald-300 transition-all active:scale-[0.98]">
                  <Monitor className="w-5 h-5 text-emerald-800" />
                  <div className="text-left leading-none">
                    <span className="text-[11px] block text-slate-500 font-light">网页版</span>
                    <span className="text-xs font-semibold text-slate-800">立即使用</span>
                  </div>
                </button>
              </div>
            </div>

            {/* 右侧 3D 收纳箱插画 */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <Hero3DIllustration />
            </div>
          </div>
        </section>

        {/* 2. 核心功能卡片区 (Features Section) */}
        <section id="features" className="max-w-6xl mx-auto px-6 sm:px-8 py-12">
          {/* 标题 */}
          <div className="text-center space-y-1.5 mb-10">
            <div className="inline-flex items-center space-x-1.5">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">核心功能</h2>
              <span className="text-emerald-600 text-lg">🍃</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500">让记录更简单，查找更高效</p>
          </div>

          {/* 3 张卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* 卡片 1 */}
            <div className="bg-white/90 rounded-3xl p-7 border border-emerald-100/80 shadow-soft-card flex flex-col items-center text-center hover:translate-y-[-4px] hover:shadow-float-box transition-all duration-300">
              <FeatureIconLocation />
              <h3 className="text-base font-bold text-slate-900 mb-1.5">记录物品位置</h3>
              <p className="text-xs text-slate-500 leading-normal">
                精确到家中任意位置，快速定位不迷路
              </p>
            </div>

            {/* 卡片 2 */}
            <div className="bg-white/90 rounded-3xl p-7 border border-emerald-100/80 shadow-soft-card flex flex-col items-center text-center hover:translate-y-[-4px] hover:shadow-float-box transition-all duration-300">
              <FeatureIconCamera />
              <h3 className="text-base font-bold text-slate-900 mb-1.5">拍照存档</h3>
              <p className="text-xs text-slate-500 leading-normal">
                实物照片 + 备注，记录更直观
              </p>
            </div>

            {/* 卡片 3 */}
            <div className="bg-white/90 rounded-3xl p-7 border border-emerald-100/80 shadow-soft-card flex flex-col items-center text-center hover:translate-y-[-4px] hover:shadow-float-box transition-all duration-300">
              <FeatureIconNote />
              <h3 className="text-base font-bold text-slate-900 mb-1.5">备注说明</h3>
              <p className="text-xs text-slate-500 leading-normal">
                自定义备注，补充更多细节信息
              </p>
            </div>
          </div>
        </section>

        {/* 3. 手机演示与核心卖点区 (App Showcase & Selling Points) */}
        <section id="download" className="max-w-6xl mx-auto px-6 sm:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* 左侧卖点列表 */}
            <div className="lg:col-span-4 space-y-6 text-left">
              <div>
                <h2 className="text-3xl font-extrabold text-[#173e31] leading-tight">
                  轻松记录
                </h2>
                <h2 className="text-3xl font-extrabold text-[#173e31] leading-tight">
                  生活每一个角落
                </h2>
              </div>

              <div className="space-y-3.5 pt-2">
                <div className="flex items-center space-x-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 stroke-[2.2]" />
                  <span className="text-sm font-medium text-slate-700">操作简单，随手一记</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 stroke-[2.2]" />
                  <span className="text-sm font-medium text-slate-700">支持搜索，秒速查找</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 stroke-[2.2]" />
                  <span className="text-sm font-medium text-slate-700">数据安全，本地优先存储</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 stroke-[2.2]" />
                  <span className="text-sm font-medium text-slate-700">简洁界面，清爽无广告</span>
                </div>
              </div>

              <div className="pt-4">
                <button className="bg-[#1e5843] hover:bg-[#164735] text-white px-7 py-3.5 rounded-full font-semibold text-sm flex items-center space-x-2 shadow-lg shadow-emerald-950/20 active:scale-[0.98] transition">
                  <Download className="w-4 h-4" />
                  <span>立即下载随记</span>
                </button>
                <p className="text-[11px] text-slate-400 mt-2">支持 iOS、Android 与网页版</p>
              </div>
            </div>

            {/* 中间手机模型 */}
            <div className="lg:col-span-4 flex justify-center">
              <PhoneMockup />
            </div>

            {/* 右侧 3 大特色胶囊卡片 */}
            <div className="lg:col-span-4 space-y-4">
              {/* 特色 1：秒级模糊搜索 */}
              <div className="bg-white/95 rounded-2xl p-4.5 border border-emerald-100 shadow-sm flex items-center space-x-4 hover:shadow-md transition">
                <div className="w-12 h-12 rounded-xl bg-[#eaf4ee] flex items-center justify-center shrink-0 text-emerald-800">
                  <Search className="w-6 h-6 stroke-[2.5]" />
                </div>
                <div className="text-left">
                  <h4 className="text-sm font-bold text-slate-900">秒级模糊搜索</h4>
                  <p className="text-xs text-slate-500 mt-0.5">输入关键词，瞬间定位存放处</p>
                </div>
              </div>

              {/* 特色 2：拍照归档 */}
              <div className="bg-white/95 rounded-2xl p-4.5 border border-emerald-100 shadow-sm flex items-center space-x-4 hover:shadow-md transition">
                <div className="w-12 h-12 rounded-xl bg-[#eaf4ee] flex items-center justify-center shrink-0 text-emerald-800">
                  <Camera className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div className="text-left">
                  <h4 className="text-sm font-bold text-slate-900">拍照归档</h4>
                  <p className="text-xs text-slate-500 mt-0.5">自动压缩存储，节省空间</p>
                </div>
              </div>

              {/* 特色 3：本地优先存储 */}
              <div className="bg-white/95 rounded-2xl p-4.5 border border-emerald-100 shadow-sm flex items-center space-x-4 hover:shadow-md transition">
                <div className="w-12 h-12 rounded-xl bg-[#eaf4ee] flex items-center justify-center shrink-0 text-emerald-800">
                  <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div className="text-left">
                  <h4 className="text-sm font-bold text-slate-900">本地优先存储</h4>
                  <p className="text-xs text-slate-500 mt-0.5">数据安全，你的隐私你做主</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 底部页脚 (Footer) */}
      <footer id="about" className="max-w-6xl mx-auto px-6 sm:px-8 w-full pb-10">
        <div className="bg-[#eaf3ee] rounded-3xl p-8 sm:p-10 border border-emerald-200/60">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* 左侧品牌 */}
            <div className="md:col-span-6 flex items-start space-x-4">
              <BrandLogo className="w-14 h-14 shrink-0" />
              <div className="text-left">
                <div className="flex items-center space-x-2">
                  <span className="text-xl font-bold text-slate-900">随记</span>
                  <span className="text-base font-semibold text-emerald-800 font-mono">WhereNote</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">简单实用的收纳备忘应用</p>
                <p className="text-xs text-slate-500">让生活更有条理，让查找更轻松</p>
              </div>
            </div>

            {/* 快速导航 */}
            <div className="md:col-span-3 text-left">
              <h5 className="text-xs font-bold text-slate-800 mb-3 tracking-wide">快速导航</h5>
              <ul className="space-y-1.5 text-xs text-slate-600">
                <li><a href="#home" className="hover:text-emerald-700 transition">首页</a></li>
                <li><a href="#features" className="hover:text-emerald-700 transition">功能介绍</a></li>
                <li><a href="#download" className="hover:text-emerald-700 transition">下载应用</a></li>
                <li><a href="#about" className="hover:text-emerald-700 transition">关于我们</a></li>
              </ul>
            </div>

            {/* 关注我们 */}
            <div className="md:col-span-3 text-left">
              <h5 className="text-xs font-bold text-slate-800 mb-3 tracking-wide">关注我们</h5>
              <div className="flex items-center space-x-3 text-emerald-800">
                <a href="#wechat" title="微信" className="w-8 h-8 rounded-full bg-emerald-100 hover:bg-emerald-200 flex items-center justify-center transition">
                  <MessageCircle className="w-4 h-4" />
                </a>
                <a href="#weibo" title="微博" className="w-8 h-8 rounded-full bg-emerald-100 hover:bg-emerald-200 flex items-center justify-center transition">
                  <Share2 className="w-4 h-4" />
                </a>
                <a href="#community" title="交流社区" className="w-8 h-8 rounded-full bg-emerald-100 hover:bg-emerald-200 flex items-center justify-center transition">
                  <span className="text-sm font-bold">💬</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 备案号与版权 */}
        <div className="text-center mt-6 text-xs text-slate-400">
          © 2024 WhereNote 随记 · 粤ICP备2024XXXX号
        </div>
      </footer>
    </div>
  );
}
