import React from 'react';

export const BrandLogo: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
        {/* 背景圆角盒 */}
        <rect x="10" y="24" width="100" height="76" rx="20" fill="#E2F2E9" />
        <rect x="15" y="32" width="90" height="64" rx="16" fill="#FFFFFF" />
        {/* 书籍/收纳本 */}
        <path d="M28 42C28 38 31 35 35 35H55C59 35 62 38 62 42V82C62 82 56 80 45 80C34 80 28 82 28 82V42Z" fill="#2E7D5B" />
        <path d="M45 50C48 50 51 53 51 56C51 59 47 62 43 60C41 58 42 53 45 50Z" fill="#8CE0B0" />
        {/* 钥匙/标签 */}
        <circle cx="72" cy="46" r="10" stroke="#E59838" strokeWidth="4" fill="none" />
        <path d="M72 56V76M72 66H80M72 72H78" stroke="#E59838" strokeWidth="4" strokeLinecap="round" />
        {/* 定位针 */}
        <path d="M82 22C82 17 86 13 91 13C96 13 100 17 100 22C100 29 91 38 91 38C91 38 82 29 82 22Z" fill="#388E68" />
        <circle cx="91" cy="22" r="3.5" fill="#FFFFFF" />
      </svg>
    </div>
  );
};

// 3D 风格主视觉插画组件 (Hero 3D Illustration)
export const Hero3DIllustration: React.FC = () => {
  return (
    <div className="relative w-full max-w-[480px] aspect-square flex items-center justify-center select-none">
      {/* 渐变装饰背景晕影 */}
      <div className="absolute w-80 h-80 bg-gradient-to-tr from-emerald-100/70 to-teal-50/50 rounded-full blur-3xl -z-10" />

      {/* 浮动光晕和装饰粒子 */}
      <div className="absolute top-6 right-12 w-2.5 h-6 bg-emerald-400/50 rounded-full rotate-45 animate-pulse" />
      <div className="absolute top-12 right-6 w-2.5 h-6 bg-emerald-400/50 rounded-full rotate-12" />
      <div className="absolute top-20 right-2 w-2.5 h-6 bg-emerald-400/50 rounded-full -rotate-45" />

      <svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
          <linearGradient id="boxFront" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#E6F2EA" />
          </linearGradient>
          <linearGradient id="boxInner" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C9E6D4" />
            <stop offset="100%" stopColor="#DCF0E4" />
          </linearGradient>
          <linearGradient id="bookGreen" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3FA87A" />
            <stop offset="100%" stopColor="#226346" />
          </linearGradient>
          <linearGradient id="pinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2E7E5A" />
            <stop offset="100%" stopColor="#1C533A" />
          </linearGradient>
          <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="18" stdDeviation="16" floodColor="#1B4D36" floodOpacity="0.12" />
          </filter>
          <filter id="cardShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#1B4D36" floodOpacity="0.08" />
          </filter>
        </defs>

        {/* 顶部定位大图钉 (3D Location Pin) */}
        <g transform="translate(370, 100)" filter="url(#softShadow)">
          <path d="M0 -30C-28 -30 -50 -8 -50 20C-50 56 0 95 0 95C0 95 50 56 50 20C50 -8 28 -30 0 -30Z" fill="url(#pinGrad)" />
          {/* 高光内圆 */}
          <circle cx="0" cy="18" r="18" fill="#FFFFFF" opacity="0.95" />
          {/* 3D 边缘高光弧线 */}
          <path d="M-36 8C-28 -14 0 -22 18 -22" stroke="#66C899" strokeWidth="4" strokeLinecap="round" opacity="0.6" />
        </g>

        {/* 主收纳箱后壁与内里 */}
        <g transform="translate(130, 160)">
          <path d="M20 60 L230 25 L250 85 L35 125 Z" fill="url(#boxInner)" opacity="0.9" />
        </g>

        {/* 绿色收纳手账本 (Green Notebook) */}
        <g transform="translate(150, 115) rotate(-14)" filter="url(#cardShadow)">
          <rect width="105" height="135" rx="20" fill="url(#bookGreen)" />
          {/* 书脊装订厚度 */}
          <path d="M0 20C0 9 9 0 20 0H28V135H20C9 135 0 126 0 115V20Z" fill="#1C523A" opacity="0.5" />
          {/* 书面叶子图标 */}
          <path d="M60 55C60 72 45 82 45 82C45 82 45 68 55 58C62 50 72 48 72 48C72 48 72 58 60 55Z" fill="#FFFFFF" opacity="0.9" />
          <path d="M48 78C56 70 66 62 66 62" stroke="#226346" strokeWidth="2.5" strokeLinecap="round" />
        </g>

        {/* 白色耳机/充电盒配件 */}
        <g transform="translate(155, 205)" filter="url(#cardShadow)">
          <rect width="55" height="52" rx="16" fill="#FFFFFF" />
          <rect x="4" y="4" width="47" height="44" rx="13" fill="#F4FAF6" />
          <line x1="12" y1="26" x2="43" y2="26" stroke="#D1E7DA" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* 金色钥匙 (Golden Key) */}
        <g transform="translate(240, 175) rotate(15)" filter="url(#cardShadow)">
          <circle cx="26" cy="26" r="18" stroke="#EDB659" strokeWidth="7" fill="none" />
          <circle cx="26" cy="26" r="18" stroke="#FCE6B8" strokeWidth="3" fill="none" opacity="0.6" />
          <path d="M26 44V108" stroke="#EDB659" strokeWidth="8" strokeLinecap="round" />
          <path d="M26 80H42M26 95H38" stroke="#EDB659" strokeWidth="7" strokeLinecap="round" />
        </g>

        {/* 收纳箱白色前体 (3D Storage Box Front) */}
        <g filter="url(#softShadow)">
          {/* 箱体外壳主正面 */}
          <path d="M135 220 C135 198 152 185 174 182 L330 162 C352 159 372 174 374 196 L385 285 C387 308 370 328 348 331 L182 352 C160 355 140 338 138 316 Z" fill="url(#boxFront)" />
          {/* 箱体正面凹槽把手 */}
          <rect x="225" y="240" width="70" height="26" rx="13" fill="#D3EADB" />
          <rect x="228" y="243" width="64" height="20" rx="10" fill="#BBDDC6" opacity="0.6" />
        </g>

        {/* 右下方便利贴纸与铅笔 (Notepad & Pencil) */}
        <g transform="translate(285, 235)" filter="url(#softShadow)">
          {/* 便签底纸 */}
          <path d="M15 35 C15 22 26 12 39 12 L140 12 C153 12 164 22 164 35 L164 125 C164 138 153 148 140 148 L39 148 C26 148 15 138 15 125 Z" fill="#FFFFFF" />
          {/* 横线条 */}
          <line x1="42" y1="45" x2="95" y2="45" stroke="#77C79E" strokeWidth="7" strokeLinecap="round" />
          <line x1="42" y1="70" x2="135" y2="70" stroke="#A9E0C4" strokeWidth="7" strokeLinecap="round" />
          <line x1="42" y1="95" x2="115" y2="95" stroke="#CDEFE0" strokeWidth="7" strokeLinecap="round" />

          {/* 3D 绿色铅笔 */}
          <g transform="translate(95, 38) rotate(42)" filter="url(#cardShadow)">
            {/* 笔身 */}
            <path d="M0 0 H20 V90 H0 Z" fill="#2E7D59" />
            <path d="M0 0 H7 V90 H0 Z" fill="#225F43" />
            {/* 笔头木质 */}
            <path d="M0 90 L10 112 L20 90 Z" fill="#F0DCB8" />
            {/* 笔尖铅芯 */}
            <path d="M6 103 L10 112 L14 103 Z" fill="#1C4F38" />
            {/* 笔尾橡皮擦 */}
            <path d="M0 -12 C0 -16 4 -18 10 -18 C16 -18 20 -16 20 -12 V0 H0 Z" fill="#E8F4EC" />
          </g>
        </g>
      </svg>
    </div>
  );
};

// 核心功能卡片 1：记录物品位置 (3D 地图定位图标)
export const FeatureIconLocation: React.FC = () => (
  <div className="w-24 h-24 relative flex items-center justify-center mb-3">
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* 倾斜底盘地图 */}
      <path d="M12 45 L50 24 L88 45 L50 68 Z" fill="#E2F3E8" stroke="#CCE8D6" strokeWidth="2" />
      <path d="M18 45 L50 62 L82 45" stroke="#B4DEC3" strokeWidth="2.5" strokeDasharray="3 3" />
      <path d="M50 28 L50 64" stroke="#B4DEC3" strokeWidth="2" />
      {/* 立体大定位图钉 */}
      <g transform="translate(50, 42)">
        <path d="M0 -34C-16 -34 -28 -22 -28 -6C-28 14 0 36 0 36C0 36 28 14 28 -6C28 -22 16 -34 0 -34Z" fill="#2E7D5B" />
        <circle cx="0" cy="-8" r="9.5" fill="#FFFFFF" />
        {/* 高光 */}
        <path d="M-19 -15C-14 -27 0 -30 11 -28" stroke="#71C99C" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
      </g>
    </svg>
  </div>
);

// 核心功能卡片 2：拍照存档 (3D 薄荷绿相机图标)
export const FeatureIconCamera: React.FC = () => (
  <div className="w-24 h-24 relative flex items-center justify-center mb-3">
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* 相机主体 */}
      <rect x="14" y="28" width="72" height="52" rx="14" fill="#E6F5EC" stroke="#CBE7D7" strokeWidth="2" />
      {/* 顶部机顶与快门 */}
      <path d="M36 28 L42 20 H58 L64 28 Z" fill="#CEEBD9" />
      <rect x="22" y="22" width="10" height="6" rx="2" fill="#3AA876" />
      <circle cx="74" cy="38" r="3.5" fill="#3AA876" />
      {/* 镜头 */}
      <circle cx="50" cy="54" r="21" fill="#FFFFFF" stroke="#3AA876" strokeWidth="3.5" />
      <circle cx="50" cy="54" r="14" fill="#2D7B58" />
      <circle cx="50" cy="54" r="7" fill="#1C533A" />
      <circle cx="46" cy="50" r="3" fill="#FFFFFF" opacity="0.9" />
    </svg>
  </div>
);

// 核心功能卡片 3：备注说明 (3D 便签与铅笔图标)
export const FeatureIconNote: React.FC = () => (
  <div className="w-24 h-24 relative flex items-center justify-center mb-3">
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* 便签卡片 */}
      <rect x="18" y="16" width="58" height="68" rx="12" fill="#E8F6ED" stroke="#CCE9D7" strokeWidth="2" />
      {/* 横线 */}
      <line x1="28" y1="32" x2="52" y2="32" stroke="#68C395" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="28" y1="44" x2="62" y2="44" stroke="#90DCB2" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="28" y1="56" x2="55" y2="56" stroke="#B8ECCF" strokeWidth="3.5" strokeLinecap="round" />
      {/* 铅笔 */}
      <g transform="translate(56, 32) rotate(35)">
        <rect x="0" y="0" width="9" height="42" rx="1.5" fill="#2E7E5A" />
        <path d="M0 42 L4.5 52 L9 42 Z" fill="#F1DCB6" />
        <path d="M2.5 48 L4.5 52 L6.5 48 Z" fill="#1B4D36" />
      </g>
    </svg>
  </div>
);
