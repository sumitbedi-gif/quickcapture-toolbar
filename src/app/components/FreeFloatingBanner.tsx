import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

function AddButton({ onClick }: { onClick: () => void }) {
  const [captured, setCaptured] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (captured) return;
    setCaptured(true);
    onClick();
    setTimeout(() => setCaptured(false), 1000);
  };

  return (
    <button
      className="shrink-0 cursor-pointer font-medium text-[14px] leading-[20px] transition-colors"
      style={{ color: captured ? '#10B981' : '#0975d7' }}
      onClick={handleClick}
    >
      <AnimatePresence mode="wait" initial={false}>
        {captured ? (
          <motion.span key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-1">
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 13l4 4L19 7" />
            </svg>
            Added
          </motion.span>
        ) : (
          <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            Add step without one
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

export function FreeFloatingBanner({ onAddStep }: { onAddStep: () => void }) {
  return (
    <div className="bg-white flex items-center justify-between px-[16px] py-[12px] rounded-[12px] w-full border border-[#e4e4ed]">
      <p className="font-medium text-[14px] text-[#3d3c52] leading-[20px] whitespace-nowrap">Don't need a screenshot?</p>
      <AddButton onClick={onAddStep} />
    </div>
  );
}

export function NavigationDisabledBanner() {
  return (
    <div className="bg-white flex items-center gap-[8px] px-[16px] py-[12px] rounded-[12px] w-full border border-[#e4e4ed]">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B697B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
        <circle cx="12" cy="12" r="10" />
        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
      </svg>
      <p className="font-medium text-[14px] text-[#3d3c52] leading-[20px] whitespace-nowrap">Navigation disabled. You can still capture steps</p>
    </div>
  );
}
