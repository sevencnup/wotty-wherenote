import React from 'react';
import { Camera, Check } from 'lucide-react';

export const PhoneMockup: React.FC = () => {
  return (
    <div className="relative mx-auto w-full max-w-[340px] rounded-[48px] bg-[#121c16] p-3 shadow-phone-mockup border-[5px] border-[#203a2c]">
      {/* 手机静音键与音量键装饰 */}
      <div className="absolute -left-[9px] top-24 h-8 w-[4px] rounded-l-md bg-slate-700" />
      <div className="absolute -left-[9px] top-36 h-12 w-[4px] rounded-l-md bg-slate-700" />
      <div className="absolute -right-[9px] top-28 h-14 w-[4px] rounded-r-md bg-slate-700" />

      {/* 屏幕区域 */}
      <div className="relative overflow-hidden rounded-[38px] bg-white pt-2 pb-5 text-slate-800">
        {/* 顶部刘海/动态岛与状态栏 */}
        <div className="flex items-center justify-between px-7 pt-2 pb-1 text-xs font-semibold text-slate-800">
          <span>9:41</span>
          {/* 听筒槽 */}
          <div className="h-4 w-20 rounded-full bg-black mx-auto" />
          <div className="flex items-center space-x-1">
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L4.35 19.4c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l1.9-1.9C9.22 19.57 10.56 20 12 20c4.97 0 9-4.03 9-9s-4.03-9-9-9z"/>
            </svg>
            <div className="w-4 h-2.5 border border-slate-700 rounded-sm p-0.5 flex items-center">
              <div className="w-full h-full bg-slate-800 rounded-xs" />
            </div>
          </div>
        </div>

        {/* App 标题栏 */}
        <div className="px-5 pt-3 pb-2 text-left">
          <h3 className="text-base font-bold text-slate-900 tracking-tight">记一笔</h3>
          <p className="text-[10px] text-slate-400">随手一记，不再翻箱倒柜</p>
        </div>

        {/* 表单内容区 */}
        <div className="px-5 space-y-3.5 text-left text-xs">
          {/* 物品名称 */}
          <div>
            <div className="flex items-center space-x-1.5 mb-1.5">
              <span className="w-3.5 h-3.5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 text-[10px]">
                📦
              </span>
              <label className="text-[11px] font-medium text-slate-700">
                物品名称 <span className="text-emerald-500">*</span>
              </label>
            </div>
            <div className="w-full bg-[#f8faf9] border border-slate-200/80 rounded-xl px-3 py-2 text-slate-800 text-[11px] font-medium shadow-inner">
              绿植养护工具
            </div>
          </div>

          {/* 放在哪里 */}
          <div>
            <div className="flex items-center space-x-1.5 mb-1.5">
              <span className="w-3.5 h-3.5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 text-[10px]">
                📍
              </span>
              <label className="text-[11px] font-medium text-slate-700">
                放在哪里
              </label>
            </div>
            <div className="w-full bg-[#f8faf9] border border-slate-200/80 rounded-xl px-3 py-2 text-slate-800 text-[11px] font-medium shadow-inner">
              阳台储物柜 · 中层
            </div>
          </div>

          {/* 备注说明 */}
          <div>
            <label className="block text-[11px] font-medium text-slate-700 mb-1.5">
              备注说明（可选）
            </label>
            <div className="relative w-full bg-[#f8faf9] border border-slate-200/80 rounded-xl px-3 py-2 text-slate-700 text-[11px] min-h-[46px] shadow-inner">
              每日浇水喷壶、剪刀、手套
              <span className="absolute right-2.5 bottom-1.5 text-[9px] text-slate-400">
                10/100
              </span>
            </div>
          </div>

          {/* 实物照片 */}
          <div>
            <label className="block text-[11px] font-medium text-slate-700 mb-1.5">
              实物照片（可选）
            </label>
            <div className="flex items-center space-x-2.5">
              {/* 已选图片预览 */}
              <div className="relative w-28 h-18 rounded-xl overflow-hidden border border-emerald-200 bg-emerald-50 shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=300&auto=format&fit=crop&q=80"
                  alt="绿植喷壶与工具"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* 添加照片按钮 */}
              <div className="w-12 h-18 rounded-xl border border-dashed border-slate-300 bg-[#f8faf9] flex items-center justify-center text-slate-400 hover:text-emerald-600 transition">
                <Camera className="w-5 h-5 opacity-60" />
              </div>
            </div>
          </div>

          {/* 操作按钮组 */}
          <div className="pt-2 space-y-2">
            <button className="w-full bg-[#1e5843] hover:bg-[#164735] text-white py-2.5 rounded-full font-medium text-xs flex items-center justify-center space-x-1.5 shadow-md shadow-emerald-900/15 active:scale-[0.98] transition">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
              <span>保存到随记</span>
            </button>
            <button className="w-full text-slate-500 hover:text-slate-700 py-1 text-[11px] font-medium flex items-center justify-center space-x-1">
              <span>✕ 取消并返回</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
