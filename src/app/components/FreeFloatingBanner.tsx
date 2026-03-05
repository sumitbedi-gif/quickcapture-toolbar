import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

function TextSection() {
  return (
    <div className="basis-0 content-stretch flex grow items-center min-h-px min-w-px relative shrink-0">
      <p className="font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-nowrap text-white">Don't need a screenshot?</p>
    </div>
  );
}

function AddButton({ onClick }: { onClick: () => void }) {
  const [captureState, setCaptureState] = useState<'idle' | 'captured'>('idle');

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (captureState !== 'idle') return;
    
    // Create improved flash overlay with reduced opacity so elements stay visible
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(255,255,255,0);z-index:45;pointer-events:none;transition:background 120ms cubic-bezier(0.4, 0, 0.2, 1);';
    document.body.appendChild(overlay);
    
    // Create border flash effect
    const border = document.createElement('div');
    border.style.cssText = 'position:fixed;inset:0;border:3px solid #10B981;z-index:45;pointer-events:none;opacity:0;transition:opacity 120ms cubic-bezier(0.4, 0, 0.2, 1);box-shadow:inset 0 0 60px rgba(16, 185, 129, 0.25);';
    document.body.appendChild(border);
    
    // Trigger flash to lighter white so elements remain visible
    requestAnimationFrame(() => {
      overlay.style.background = 'rgba(255, 255, 255, 0.5)';
      border.style.opacity = '1';
    });
    
    // Fade out flash and border - increased hold time from 150ms to 600ms
    setTimeout(() => {
      overlay.style.transition = 'background 350ms cubic-bezier(0.4, 0, 0.2, 1)';
      overlay.style.background = 'rgba(255, 255, 255, 0)';
      border.style.transition = 'opacity 350ms cubic-bezier(0.4, 0, 0.2, 1)';
      border.style.opacity = '0';
      setTimeout(() => {
        overlay.remove();
        border.remove();
      }, 350);
    }, 600);
    
    // Show captured state immediately
    setCaptureState('captured');
    onClick();
    
    // Reset to idle state after shorter duration
    setTimeout(() => setCaptureState('idle'), 1000);
  };

  return (
    <motion.div 
      className="content-stretch flex gap-[8px] items-center justify-center overflow-hidden px-[12px] py-[6px] relative rounded-[8px] shrink-0 cursor-pointer mt-[0px] mr-[8px] mb-[0px] ml-[0px] w-[260px]" 
      animate={{ 
        backgroundColor: captureState === 'captured' ? "#10B981" : "#ffffff"
      }}
      transition={{
        backgroundColor: { duration: 0.3, ease: "easeInOut" }
      }}
      data-name="Button"
      onClick={handleClick}
      whileHover={{ backgroundColor: captureState === 'idle' ? "#f3f4f6" : "#10B981" }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {captureState === 'captured' && (
          <motion.div
            key="captured"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex items-center gap-2 justify-center"
          >
            <svg className="w-4 h-4 text-white shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <p className="font-medium leading-[20px] not-italic relative shrink-0 text-white text-[14px] text-center text-nowrap">
              Added
            </p>
          </motion.div>
        )}
        {captureState === 'idle' && (
          <motion.p
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="font-medium leading-[20px] not-italic relative shrink-0 text-[#3d3c52] text-[14px] text-center text-nowrap"
          >
            Add step without screenshot
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function BannerContent({ onAddStep }: { onAddStep: () => void }) {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0 w-full mx-[8px] my-[0px]">
      <TextSection />
      <AddButton onClick={onAddStep} />
    </div>
  );
}

export function FreeFloatingBanner({ onAddStep }: { onAddStep: () => void }) {
  return (
    <div className="bg-[#0975d7] content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] pt-[8px] pb-[12px] relative rounded-tl-[12px] rounded-tr-[12px] w-full shadow-md">
      <BannerContent onAddStep={onAddStep} />
    </div>
  );
}

export function NavigationDisabledBanner() {
  return (
    <div className="bg-[#0975d7] content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] pt-[8px] pb-[12px] relative rounded-tl-[12px] rounded-tr-[12px] w-full shadow-md">
      <div className="content-stretch flex gap-[10px] items-center relative shrink-0 w-full mx-[8px] my-[0px]">
        <div className="basis-0 content-stretch flex grow items-center min-h-px min-w-px relative shrink-0 gap-2">
           <svg className="text-white shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
             <circle cx="12" cy="12" r="10"/>
             <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
           </svg>
           <p className="font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-nowrap text-white">Navigation disabled. You can still capture steps</p>
        </div>
      </div>
    </div>
  );
}