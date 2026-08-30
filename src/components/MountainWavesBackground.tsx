import React from 'react';

/**
 * 1:1 还原参考图的高清有机山峦与起伏波浪背景
 */
export const MountainWavesBackground: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`pointer-events-none absolute inset-x-0 top-0 w-full overflow-hidden select-none -z-10 ${className}`}>
      <svg
        className="w-full h-[520px] sm:h-[620px] lg:h-[720px] object-cover object-top"
        viewBox="0 0 1920 650"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          {/* 最远层右侧大山峰渐变 */}
          <linearGradient id="peakRight" x1="1720" y1="80" x2="1720" y2="650" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#BCDCCB" stopOpacity="0.85" />
            <stop offset="70%" stopColor="#D8EDE1" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#F4FAF6" stopOpacity="0.1" />
          </linearGradient>

          {/* 远层右中平缓山丘 */}
          <linearGradient id="hillRightMid" x1="1500" y1="220" x2="1500" y2="650" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#C4E3D3" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#E0F2E8" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#F4FAF6" stopOpacity="0.2" />
          </linearGradient>

          {/* 中间最高山峰（关键山形） */}
          <linearGradient id="centerPeak" x1="1100" y1="200" x2="1100" y2="650" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#B3DC8" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#D3ECE0" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#F4FAF6" stopOpacity="0.2" />
          </linearGradient>

          {/* 中景贯穿起伏波浪山脊（从左到右连绵曲线） */}
          <linearGradient id="ridgeWave" x1="700" y1="260" x2="700" y2="650" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#BFE0CF" stopOpacity="0.95" />
            <stop offset="40%" stopColor="#D9EFE3" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#F4FAF6" stopOpacity="0.1" />
          </linearGradient>

          {/* 前景平滑白绿大弧线过渡层 */}
          <linearGradient id="frontWave" x1="960" y1="320" x2="960" y2="650" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.98" />
            <stop offset="35%" stopColor="#F8FCF9" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#F4FAF6" stopOpacity="1" />
          </linearGradient>
        </defs>

        {/* 1. 最右侧高高隆起的大圆弧绿山（参考图最右） */}
        <path
          d="M1520 650 C1550 300 1620 90 1780 100 C1880 108 1920 180 1920 220 V650 H1520 Z"
          fill="url(#peakRight)"
        />

        {/* 2. 紧贴右侧山峰左侧的连绵小山丘 */}
        <path
          d="M1300 650 C1340 380 1440 240 1620 240 C1750 240 1860 310 1920 350 V650 H1300 Z"
          fill="url(#hillRightMid)"
        />

        {/* 3. 中间隆起的主山包（参考图中部核心山峰） */}
        <path
          d="M780 650 C860 420 980 230 1140 230 C1280 230 1380 340 1480 360 V650 H780 Z"
          fill="url(#centerPeak)"
        />

        {/* 4. 左侧优雅起伏延伸的山峦曲线（从左侧进入、凹陷、再升起连接中间） */}
        <path
          d="M0 650 V310 C80 370 200 400 320 400 C480 400 600 290 750 300 C880 308 1000 420 1180 410 C1360 400 1620 460 1920 450 V650 H0 Z"
          fill="url(#ridgeWave)"
        />

        {/* 5. 前景自左向右缓缓升起的大白色起伏坡度（压住底部，形成干净的前景台） */}
        <path
          d="M0 650 V500 C180 520 380 530 580 490 C780 445 980 385 1250 365 C1500 345 1740 400 1920 440 V650 H0 Z"
          fill="url(#frontWave)"
        />
      </svg>
    </div>
  );
};
