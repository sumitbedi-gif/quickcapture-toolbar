import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import svgPaths from "../../imports/svg-4vk0l22bqa";
import imgTitle from "../../assets/02749286c7e109f7ec2b981d2999959d0d553bbc.png";

// Icons
function Click({ color = "#6B697B" }: { color?: string }) {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <path d={svgPaths.p29cfc600} stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </svg>
    </div>
  );
}

function HandClick({ color = "#6B697B" }: { color?: string }) {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <path d={svgPaths.p8776b80} stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </svg>
    </div>
  );
}

function Capture({ color = "#6B697B" }: { color?: string }) {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <path d={svgPaths.p28bcb00} stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </svg>
    </div>
  );
}

function Blur({ color = "#6B697B" }: { color?: string }) {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <path d={svgPaths.p24c4700} stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </svg>
    </div>
  );
}

// Whatfix Logo
function Group() {
  return (
    <div className="[grid-area:1_/_1] h-[20.468px] ml-0 mt-0 relative w-[27.245px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27.2448 20.468">
        <path d={svgPaths.p1f248180} fill="#F55800" />
        <path d={svgPaths.p7084400} fill="#FFA450" />
        <path d={svgPaths.p222ca500} fill="#C63D22" />
      </svg>
    </div>
  );
}

function Group3() {
  return (
    <div className="[grid-area:1_/_1] h-[18.64px] ml-0 mt-0 relative w-[69.194px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 69.1944 18.6396">
        <path d={svgPaths.p1230cc00} fill="#25223B" />
        <path d={svgPaths.p36cb0700} fill="#25223B" />
        <path d={svgPaths.p1c5e7100} fill="#25223B" />
        <path d={svgPaths.p27cbb900} fill="#25223B" />
        <path d={svgPaths.p31706280} fill="#25223B" />
        <path d={svgPaths.p49f2f80} fill="#25223B" />
        <path d={svgPaths.p1b1a5b80} fill="#25223B" />
      </svg>
    </div>
  );
}

function Logo() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <div className="[grid-area:1_/_1] grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] ml-0 mt-0 place-items-start relative">
        <Group />
      </div>
      <div className="[grid-area:1_/_1] grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[20.52%] mt-[22.25%] place-items-start relative">
        <div className="[grid-area:1_/_1] grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] ml-0 mt-0 place-items-start relative">
          <Group3 />
        </div>
      </div>
    </div>
  );
}

function Rotate() {
  return (
    <div className="relative shrink-0 size-[18px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <path d={svgPaths.p2e6e2d00} stroke="#6B697B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </svg>
    </div>
  );
}

function Confetti() {
  return (
    <div className="relative shrink-0 size-[18px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <path d={svgPaths.p6820480} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </svg>
    </div>
  );
}

function FeatureItem({
  icon, title, description, isActive, onClick
}: {
  icon: React.ReactNode; title: string; description: string; isActive: boolean; onClick: () => void;
}) {
  return (
    <div
      className={`relative rounded-[12px] w-full cursor-pointer transition-colors ${isActive ? '' : 'hover:bg-gray-50'}`}
      onClick={onClick}
    >
      <div className="flex gap-[12px] items-start px-[12px] py-[14px]">
        <div className={`${isActive ? 'bg-[#f0f9ff]' : 'bg-[#f2f2f8]'} flex items-center justify-center p-[8px] rounded-[14px] shrink-0 transition-colors`}>
          {icon}
        </div>
        <div className="flex flex-col gap-[3px] justify-center">
          <p className={`font-['Inter:Semi_Bold',sans-serif] font-semibold text-[13.5px] leading-[18px] ${isActive ? 'text-[#0975d7]' : 'text-[#3d3c52]'}`}>{title}</p>
          <p className="font-['Inter:Regular',sans-serif] text-[12.5px] leading-[17px] text-[#525066]">{description}</p>
        </div>
      </div>
      <div aria-hidden="true" className={`absolute border border-solid inset-0 pointer-events-none rounded-[12px] transition-colors ${isActive ? 'border-[#0975d7]' : 'border-[#dfdde7]'}`} />
    </div>
  );
}

interface HelpPopupProps {
  onClose: () => void;
}

const steps = [
  {
    id: 'navigate',
    title: 'Capture and navigate',
    description: 'Click through the application as usual',
    icon: (isActive: boolean) => <Click color={isActive ? "#0975D7" : "#6B697B"} />,
    video: '/videos/mode-1.mp4',
  },
  {
    id: 'hand',
    title: 'Capture without navigation',
    description: 'Record steps without page changes',
    icon: (isActive: boolean) => <HandClick color={isActive ? "#0975D7" : "#6B697B"} />,
    video: '/videos/mode-2.mp4',
  },
  {
    id: 'floating',
    title: 'Free-floating step',
    description: 'Drag to capture a screenshot',
    icon: (isActive: boolean) => <Capture color={isActive ? "#0975D7" : "#6B697B"} />,
    video: '/videos/mode-3.mp4',
  },
  {
    id: 'censor',
    title: 'Censor mode',
    description: 'Blur out sensitive information',
    icon: (isActive: boolean) => <Blur color={isActive ? "#0975D7" : "#6B697B"} />,
    video: '/videos/censor-mode.mp4',
  },
];

export function HelpPopup({ onClose }: HelpPopupProps) {
  const [activeStepId, setActiveStepId] = useState('navigate');
  const activeStep = steps.find(s => s.id === activeStepId) || steps[0];

  return (
    <div className="bg-white flex flex-col overflow-clip relative rounded-[16px] shadow-[0px_24px_48px_-12px_rgba(16,24,40,0.18)] w-[900px]">

      {/* Header */}
      <div className="flex flex-col items-center gap-[10px] pt-[28px] pb-[20px] px-[24px]">
        <Logo />
        <div className="text-center">
          <p
            className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[22px] leading-[30px] bg-center bg-clip-text bg-cover bg-no-repeat"
            style={{ WebkitTextFillColor: "transparent", backgroundImage: `url('${imgTitle}')` }}
          >
            Explore the new capture toolbar
          </p>
          <p className="font-['Inter:Regular',sans-serif] text-[15px] text-[#525066] mt-[4px] leading-[22px]">
            Create flows faster by capturing steps directly as you work.
          </p>
        </div>
      </div>

      {/* Body: left menu + right video */}
      <div className="flex gap-[20px] px-[24px] pb-[24px]">
        {/* Left: feature list */}
        <div className="flex flex-col gap-[10px] w-[280px] shrink-0">
          {steps.map((step) => (
            <FeatureItem
              key={step.id}
              title={step.title}
              description={step.description}
              icon={step.icon(activeStepId === step.id)}
              isActive={activeStepId === step.id}
              onClick={() => setActiveStepId(step.id)}
            />
          ))}
        </div>

        {/* Right: video panel */}
        <div className="flex-1 min-w-0 rounded-[14px] overflow-hidden bg-slate-950 relative" style={{ minHeight: '300px' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStepId}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="absolute inset-0"
            >
              <video
                key={activeStepId}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-contain"
              >
                <source src={activeStep.video} type="video/mp4" />
              </video>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-[#EAECF0] flex items-center justify-between px-[24px] py-[16px]">
        {/* Left: tertiary support link */}
        <button
          className="font-['Inter:Medium',sans-serif] font-medium text-[13.5px] text-[#0975d7] hover:text-[#0864b8] transition-colors"
          onClick={onClose}
        >
          Support Page
        </button>

        {/* Right: secondary + primary */}
        <div className="flex items-center gap-[10px]">
          <div
            className="relative rounded-[8px] cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={onClose}
          >
            <div className="flex items-center gap-[8px] px-[18px] py-[9px]">
              <p className="font-['Inter:Medium',sans-serif] font-medium text-[13.5px] text-[#3d3c52]">Switch back to legacy</p>
              <Rotate />
            </div>
            <div aria-hidden="true" className="absolute border border-[#dfdde7] inset-0 pointer-events-none rounded-[8px]" />
          </div>

          <div
            className="bg-[#0975d7] rounded-[8px] cursor-pointer hover:bg-[#0864b8] transition-colors"
            onClick={onClose}
          >
            <div className="flex items-center gap-[8px] px-[18px] py-[9px]">
              <p className="font-['Inter:Medium',sans-serif] font-medium text-[13.5px] text-white">Let's explore</p>
              <Confetti />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
