import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import svgPaths from "../../imports/svg-c0blfvocx0";
import svgPathsMenu from "../../imports/svg-6wyeqvkrgb";
import svgPathsModes from "../../imports/svg-ofq6aufqgu";
import svgPathsHelp from "../../imports/svg-4vk0l22bqa";

// ─── Icons ────────────────────────────────────────────────────────────────────

function Grip() {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Grip">
          <g id="Vector">
            <path d={svgPaths.p1440ff0} stroke="var(--stroke-0, #ECECF3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={svgPaths.p3900a900} stroke="var(--stroke-0, #ECECF3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={svgPaths.p118f4380} stroke="var(--stroke-0, #ECECF3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={svgPaths.p2559c600} stroke="var(--stroke-0, #ECECF3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={svgPaths.p2ae5a200} stroke="var(--stroke-0, #ECECF3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={svgPaths.p15770e00} stroke="var(--stroke-0, #ECECF3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Click() {
  return (
    <div className="relative shrink-0 size-[16px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <path d={svgPathsMenu.p29cfc600} stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
      </svg>
    </div>
  );
}

function HandClick() {
  return (
    <div className="relative shrink-0 size-[16px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <path d={svgPathsMenu.p8776b80} stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
      </svg>
    </div>
  );
}

function Capture() {
  return (
    <div className="relative shrink-0 size-[16px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <path d={svgPathsMenu.p28bcb00} stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
      </svg>
    </div>
  );
}

function CensorIcon() {
  return (
    <div className="relative shrink-0 size-[16px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <path d={svgPathsModes.p24c4700} stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
      </svg>
    </div>
  );
}

function PlayerPause() {
  return (
    <div className="relative shrink-0 size-[16px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <path d={svgPaths.p18e3a100} stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
        <path d={svgPaths.p121763f0} stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
      </svg>
    </div>
  );
}

function Check() {
  return (
    <div className="relative shrink-0 size-[16px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <path d={svgPaths.p3febb700} stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
      </svg>
    </div>
  );
}

function TrashIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}

function Help() {
  return (
    <div className="relative shrink-0 size-[16px]">
      <svg className="block size-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" stroke="#9CA3AF" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" stroke="#9CA3AF" strokeLinecap="round" />
        <path d="M12 17h.01" stroke="#9CA3AF" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function ChevronDown() {
  return (
    <div className="relative shrink-0 size-[10px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
        <path d="M2.5 3.75L5 6.25L7.5 3.75" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function Confetti() {
  return (
    <div className="relative shrink-0 size-[16px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <path d={svgPathsHelp.p6820480} stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </svg>
    </div>
  );
}

// ─── Shared UI components ──────────────────────────────────────────────────────

interface ButtonProps {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
  roundedClass: string;
  tooltip?: string;
  variant?: 'default' | 'ghost';
}

function BaseButton({ isActive, onClick, children, roundedClass, tooltip, variant = 'default' }: ButtonProps) {
  const inactiveClass = variant === 'ghost' ? 'bg-transparent hover:bg-[#4d4c62]' : 'bg-[#3d3c52] hover:bg-[#4d4c62]';
  const button = (
    <div
      className={`${isActive ? 'bg-[#0975d7] hover:bg-[#0864b8]' : inactiveClass} content-stretch flex items-center justify-center overflow-clip p-[8px] relative ${roundedClass} shrink-0 cursor-pointer transition-colors`}
      onClick={onClick}
    >
      {children}
    </div>
  );
  if (tooltip) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent><p>{tooltip}</p></TooltipContent>
      </Tooltip>
    );
  }
  return button;
}

function ButtonDropdown({ onClick }: { onClick: (e: React.MouseEvent) => void }) {
  return (
    <div
      className="bg-[#3d3c52] relative rounded-br-[4px] rounded-tr-[4px] self-stretch shrink-0 w-[15px] cursor-pointer hover:bg-[#4d4c62] transition-colors"
      onClick={onClick}
    >
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center p-[8px] relative size-full">
          <ChevronDown />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#2b2b40] border-[0px_0px_0px_1px] border-solid inset-0 pointer-events-none rounded-br-[4px] rounded-tr-[4px]" />
    </div>
  );
}

interface SplitButtonProps {
  isActive: boolean;
  onSelect: () => void;
  onDropdownClick: (e: React.MouseEvent) => void;
  icon: React.ReactNode;
  tooltip?: string;
}

function SplitButton({ isActive, onSelect, onDropdownClick, icon, tooltip }: SplitButtonProps) {
  return (
    <div className="content-stretch flex items-start overflow-clip relative rounded-[8px] shrink-0">
      <BaseButton isActive={isActive} onClick={onSelect} roundedClass="rounded-bl-[4px] rounded-tl-[4px]" tooltip={tooltip}>
        {icon}
      </BaseButton>
      <ButtonDropdown onClick={onDropdownClick} />
    </div>
  );
}

function Divider() {
  return (
    <div className="content-stretch flex flex-col h-[32px] items-center justify-center relative w-px mx-[2px]">
      <div className="basis-0 bg-white grow min-h-px min-w-px opacity-[0.16] shrink-0 w-full" />
    </div>
  );
}

// ─── Click mode dropdown menu ──────────────────────────────────────────────────

function MenuItem({ icon, label, onClick, isActive, onMouseEnter }: {
  icon: React.ReactNode; label: string; onClick: () => void; isActive?: boolean; onMouseEnter?: () => void;
}) {
  return (
    <div
      className={`${isActive ? 'bg-[#0975d7]' : 'bg-[#1f1f32]'} relative shrink-0 w-full cursor-pointer transition-colors rounded-[4px]`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
    >
      <div className="content-stretch flex flex-col items-start px-[8px] py-[4px] relative w-full">
        <div className="relative shrink-0 w-full">
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex gap-[8px] items-center px-[4px] py-[2px] relative w-full">
              {icon}
              <p className="basis-0 font-['Inter:Regular',sans-serif] grow leading-[20px] not-italic relative shrink-0 text-[14px] text-white">{label}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ClickOptions({ onSelect, currentMode }: { onSelect: (option: 'click' | 'hand' | 'capture') => void; currentMode: 'click' | 'hand' | 'capture'; }) {
  const [highlighted, setHighlighted] = useState(currentMode);
  useEffect(() => { setHighlighted(currentMode); }, [currentMode]);
  return (
    <div
      className="bg-[#1f1f32] content-stretch flex flex-col items-start px-0 py-[4px] relative rounded-[6px] w-[240px] shadow-lg border border-[#2b2b40]"
      onMouseLeave={() => setHighlighted(currentMode)}
    >
      <MenuItem icon={<Click />} label="Capture and navigate" onClick={() => onSelect('click')} isActive={highlighted === 'click'} onMouseEnter={() => setHighlighted('click')} />
      <MenuItem icon={<HandClick />} label="Capture without navigation" onClick={() => onSelect('hand')} isActive={highlighted === 'hand'} onMouseEnter={() => setHighlighted('hand')} />
      <MenuItem icon={<Capture />} label="Free floating step" onClick={() => onSelect('capture')} isActive={highlighted === 'capture'} onMouseEnter={() => setHighlighted('capture')} />
    </div>
  );
}

// ─── Help button ───────────────────────────────────────────────────────────────

function HelpButton({ onClick }: { onClick: () => void }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className="bg-[#1f1f32] content-stretch flex items-center justify-center overflow-clip p-[8px] relative rounded-[8px] shrink-0 cursor-pointer hover:bg-[#2b2b40] transition-colors"
          onClick={onClick}
        >
          <Help />
        </div>
      </TooltipTrigger>
      <TooltipContent><p>Learn more</p></TooltipContent>
    </Tooltip>
  );
}

// ─── Interface ─────────────────────────────────────────────────────────────────

interface Step {
  id: string;
  number: number;
}

interface ToolbarStateProps {
  stepCount: number;
  setStepCount: (count: number) => void;
  activeTool: string;
  setActiveTool: (tool: string) => void;
  clickMode: 'click' | 'hand' | 'capture';
  setClickMode: (mode: 'click' | 'hand' | 'capture') => void;
  blurMode: 'censor' | 'multiselect';
  setBlurMode: (mode: 'censor' | 'multiselect') => void;
  onRestart?: () => void;
  onCancel?: () => void;
  onHelp?: () => void;
  onDone?: () => void;
  steps?: Step[];
  onDeleteStep?: (id: string) => void;
}

// ─── Main Toolbar ──────────────────────────────────────────────────────────────

function StepCapture({
  stepCount,
  activeTool, setActiveTool,
  clickMode, setClickMode,
  blurMode, setBlurMode,
  onRestart, onHelp, onDone,
}: ToolbarStateProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isClickMenuOpen, setIsClickMenuOpen] = useState(false);
  const clickMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (clickMenuRef.current && !clickMenuRef.current.contains(event.target as Node)) {
        setIsClickMenuOpen(false);
      }
    }
    if (isClickMenuOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isClickMenuOpen]);

  const getClickIcon = () => {
    switch (clickMode) {
      case 'click': return <Click />;
      case 'hand': return <HandClick />;
      case 'capture': return <Capture />;
    }
  };

  const getClickTooltip = () => {
    switch (clickMode) {
      case 'click': return 'Capture and navigate';
      case 'hand': return 'Capture without navigation';
      case 'capture': return 'Free floating step';
    }
  };

  return (
    <div
      className="bg-[#1f1f32] flex h-[56px] items-center relative rounded-[12px] shadow-2xl"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Grip */}
      <div className="flex items-center justify-center px-[10px] h-full cursor-move hover:bg-[#2b2b40] transition-colors shrink-0">
        <Grip />
      </div>

      {/* Steps — plain text */}
      <div className="px-[4px] pr-[12px] shrink-0">
        <motion.p
          key={stepCount}
          initial={{ scale: 1.15, color: '#fb923c' }}
          animate={{ scale: 1, color: '#ffffff' }}
          transition={{ duration: 0.3 }}
          className="font-['Inter:Medium',sans-serif] font-medium text-[14px] leading-[20px] whitespace-nowrap"
        >
          {stepCount} steps
        </motion.p>
      </div>

      {/* Always-visible: capture | pause | done */}
      <div className="flex items-center gap-[6px] pr-[10px] shrink-0">
        {/* Capture split button */}
        <div className="relative" ref={clickMenuRef}>
          <AnimatePresence>
            {isClickMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute bottom-full left-0 mb-[14px] z-50 origin-bottom-left"
              >
                <ClickOptions
                  onSelect={(mode) => { setClickMode(mode); setActiveTool('click'); setIsClickMenuOpen(false); }}
                  currentMode={clickMode}
                />
              </motion.div>
            )}
          </AnimatePresence>
          <SplitButton
            isActive={activeTool === 'click'}
            onSelect={() => setActiveTool('click')}
            onDropdownClick={(e) => { e.stopPropagation(); setIsClickMenuOpen(prev => !prev); }}
            icon={getClickIcon()}
            tooltip={getClickTooltip()}
          />
        </div>

        {/* Pause */}
        <BaseButton
          isActive={activeTool === 'pause'}
          onClick={() => setActiveTool('pause')}
          roundedClass="rounded-[8px]"
          tooltip="Pause"
          variant="ghost"
        >
          <PlayerPause />
        </BaseButton>

        {/* Done */}
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className="flex items-center justify-center p-[8px] rounded-[8px] shrink-0 cursor-pointer hover:bg-[#2b2b40] transition-colors"
              onClick={onDone}
            >
              <Check />
            </div>
          </TooltipTrigger>
          <TooltipContent><p>Done</p></TooltipContent>
        </Tooltip>
      </div>

      {/* Hover-expanded: | censor | trash | | help */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: 'hidden' }}
            className="flex items-center shrink-0"
          >
            <div className="flex items-center gap-[6px] pr-[10px]">
              <Divider />

              <BaseButton
                isActive={activeTool === 'blur'}
                onClick={() => { setActiveTool('blur'); setBlurMode('censor'); }}
                roundedClass="rounded-[8px]"
                tooltip="Censor mode"
                variant="ghost"
              >
                <CensorIcon />
              </BaseButton>

              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className="bg-[#b3141d] flex items-center justify-center p-[8px] rounded-[8px] shrink-0 cursor-pointer hover:bg-[#921017] transition-colors"
                    onClick={onRestart}
                  >
                    <TrashIcon />
                  </div>
                </TooltipTrigger>
                <TooltipContent><p>Start over</p></TooltipContent>
              </Tooltip>

              <Divider />

              <HelpButton onClick={() => onHelp?.()} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Toolbar(props: ToolbarStateProps) {
  return <StepCapture {...props} />;
}
