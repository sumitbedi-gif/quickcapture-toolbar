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

// All banners share this shell so their height is identical regardless of
// whether they hold text only or text + a button.
const BANNER = "bg-white flex items-center h-[52px] px-[16px] rounded-[12px] w-full border border-[#e4e4ed]";

export function FreeFloatingBanner({ onAddStep }: { onAddStep: () => void }) {
  return (
    <div className={`${BANNER} justify-between`}>
      <p className="font-medium text-[14px] text-[#3d3c52] leading-[20px] whitespace-nowrap">Don't need a screenshot?</p>
      <AddButton onClick={onAddStep} />
    </div>
  );
}

export function NavigationDisabledBanner() {
  return (
    <div className={`${BANNER} gap-[8px]`}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B697B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
        <circle cx="12" cy="12" r="10" />
        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
      </svg>
      <p className="font-medium text-[14px] text-[#3d3c52] leading-[20px] whitespace-nowrap">Navigation disabled. You can still capture steps</p>
    </div>
  );
}

export function CensorBanner() {
  return (
    <div className={`${BANNER} gap-[8px]`}>
      <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="#6B697B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
        <circle cx="10" cy="10" r="8" />
        <path d="M10 2a8 8 0 0 0 0 16z" fill="#6B697B" stroke="none" />
      </svg>
      <p className="font-medium text-[14px] text-[#3d3c52] leading-[20px] whitespace-nowrap">Click any element to blur it. Click a blurred area to undo.</p>
    </div>
  );
}

export function MultiSelectBanner({ count, onConfirm }: { count: number; onConfirm: () => void }) {
  const selecting = count > 0;
  return (
    <div className={`${BANNER} gap-[12px]`}>
      <p className="font-medium text-[14px] text-[#3d3c52] leading-[20px] whitespace-nowrap grow">
        {selecting
          ? `${count} element${count === 1 ? '' : 's'} selected`
          : 'Click elements to add them to this step'}
      </p>
      <button
        type="button"
        disabled={!selecting}
        onClick={onConfirm}
        className="shrink-0 flex items-center gap-[6px] h-[32px] pl-[10px] pr-[12px] rounded-[8px] bg-[#0975d7] text-white text-[14px] font-medium leading-[20px] cursor-pointer hover:bg-[#0864b8] transition-colors disabled:bg-[#cdd5df] disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0975d7] focus-visible:ring-offset-2"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 13l4 4L19 7" />
        </svg>
        Confirm
      </button>
    </div>
  );
}
