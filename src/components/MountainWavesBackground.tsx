import React from 'react';

/**
 * 柔和淡绿有机山峦/波浪背景装饰组件
 * 模拟多层起伏山峦与半透明渐变薄雾质感
 */
export const MountainWavesBackground: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`pointer-events-none absolute inset-x-0 overflow-hidden select-none -z-10 ${className}`}>
      <svg
        className="w-full h-auto min-w-[1440px] opacity-80"
        viewBox="0 0 1440 460"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          {/* 最远层：最右侧淡绿山丘 */}
          <linearGradient id="hillFarRight" x1="1200" y1="50" x2="1200" y2="460" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#CDE8D8" stopOpacity="0.65" />
            <stop offset="60%" stopColor="#E2F3EA" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#F5F9F6" stopOpacity="0" />
          </linearGradient>

          {/* 远景山丘 2（偏右中间） */}
          <linearGradient id="hillMidRight" x1="1050" y1="120" x2="1050" y2="460" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#BFE2CD" stopOpacity="0.7" />
            <stop offset="50%" stopColor="#DDF1E6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#F5F9F6" stopOpacity="0" />
          </linearGradient>

          {/* 中景主要波浪山峦（贯穿中部与中偏左） */}
          <linearGradient id="hillCenter" x1="780" y1="160" x2="780" y2="460" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#CCEBD9" stopOpacity="0.8" />
            <stop offset="45%" stopColor="#E5F5ED" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#F5F9F6" stopOpacity="0" />
          </linearGradient>

          {/* 左侧平缓起伏波浪 */}
          <linearGradient id="hillLeft" x1="400" y1="210" x2="400" y2="460" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#D8EFE2" stopOpacity="0.75" />
            <stop offset="55%" stopColor="#EEFAF3" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#F5F9F6" stopOpacity="0" />
          </linearGradient>

          {/* 前景最底部大弧度白色/极浅绿融合层 */}
          <linearGradient id="hillForeground" x1="720" y1="260" x2="720" y2="460" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="40%" stopColor="#F7FCF9" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#F5F8F5" stopOpacity="1" />
          </linearGradient>
        </defs>

        {/* 1. 最远景右侧高山丘 (Far Right Peak) */}
        <path
          d="M1120 460 C1140 220 1220 60 1370 70 C1430 75 1440 140 1440 160 V460 H1120 Z"
          fill="url(#hillFarRight)"
        />

        {/* 2. 远景右中连绵山丘 (Mid Right Hill) */}
        <path
          d="M900 460 C960 270 1060 180 1260 180 C1380 180 1420 230 1440 250 V460 H900 Z"
          fill="url(#hillMidRight)"
        />

        {/* 3. 中景中间主峰与双弧线波浪 (Center Mountain Curve) */}
        <path
          d="M0 460 V330 C120 330 200 240 380 220 C540 200 660 300 750 210 C830 130 960 210 1060 260 C1160 310 1300 320 1440 330 V460 H0 Z"
          fill="url(#hillCenter)"
        />

        {/* 4. 中近景左侧柔和波浪 (Left Smooth Wave) */}
        <path
          d="M0 460 V260 C80 270 160 310 260 310 C380 310 470 220 590 230 C710 240 800 340 940 330 C1080 320 1280 370 1440 360 V460 H0 Z"
          fill="url(#hillLeft)"
        />

        {/* 5. 前景渐隐大曲线 (Foreground Transition Layer) */}
        <path
          d="M0 460 V390 C220 380 400 390 600 350 C760 315 900 270 1100 275 C1260 280 1360 330 1440 360 V460 H0 Z"
          fill="url(#hillForeground)"
        />
      </svg>
    </div>
  );
};
