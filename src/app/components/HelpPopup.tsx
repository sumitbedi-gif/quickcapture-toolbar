import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import svgPaths from "../../imports/svg-4vk0l22bqa";
import imgTitle from "../../assets/02749286c7e109f7ec2b981d2999959d0d553bbc.png";

function Logo() {
  return <img src="/logos/logo.svg" alt="Whatfix" className="h-[44px] w-auto" />;
}

// Capture mode icons
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
    description: 'Use this if you want to add only one tooltip per page',
    icon: (isActive: boolean) => <Click color={isActive ? "#0975D7" : "#6B697B"} />,
    gif: '/gifs/mode-1.gif',
  },
  {
    id: 'hand',
    title: 'Capture without navigation',
    description: 'Use this when you want to add multiple tooltips on the same page',
    icon: (isActive: boolean) => <HandClick color={isActive ? "#0975D7" : "#6B697B"} />,
    gif: '/gifs/mode-2.gif',
  },
  {
    id: 'floating',
    title: 'Free-floating step',
    description: "Use this when you don't want to latch the tooltip on any element",
    icon: (isActive: boolean) => <Capture color={isActive ? "#0975D7" : "#6B697B"} />,
    gif: '/gifs/mode-3.gif',
  },
  {
    id: 'censor',
    title: 'Censor mode',
    description: 'Use this when you want to blur out sensitive information',
    icon: (isActive: boolean) => <Blur color={isActive ? "#0975D7" : "#6B697B"} />,
    gif: '/gifs/censor-mode.gif',
  },
];

export function HelpPopup({ onClose }: HelpPopupProps) {
  const [activeStepId, setActiveStepId] = useState('navigate');
  const activeStep = steps.find(s => s.id === activeStepId) || steps[0];

  return (
    <div className="bg-white flex flex-col overflow-clip relative rounded-[16px] shadow-[0px_24px_48px_-12px_rgba(16,24,40,0.18)] w-[860px]">

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
            Create flows faster by recording all your steps at once.
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

        {/* Right: GIF panel — fixed size, never resizes on tab switch */}
        <div className="flex-1 min-w-0 rounded-[14px] overflow-hidden bg-[#f6f7f9] relative" style={{ height: '340px' }}>
          <AnimatePresence>
            <motion.img
              key={activeStepId}
              src={activeStep.gif}
              alt={activeStep.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, position: 'absolute' }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 w-full h-full object-contain"
            />
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
          Learn more
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
