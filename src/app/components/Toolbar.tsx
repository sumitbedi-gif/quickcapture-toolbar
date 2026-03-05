import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { HelpPopup } from './HelpPopup';
import svgPaths from "../../imports/svg-c0blfvocx0";
import svgPathsMenu from "../../imports/svg-6wyeqvkrgb";
import svgPathsModes from "../../imports/svg-ofq6aufqgu";
import svgPathsHelp from "../../imports/svg-4vk0l22bqa";

function Grip() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Grip">
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

function DragDrop() {
  return (
    <div className="content-stretch flex items-start px-[8px] py-[12px] relative shrink-0" data-name="Drag & Drop">
      <Grip />
    </div>
  );
}

function DragDrop1() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="bg-[#1f1f32] content-stretch flex h-full items-center justify-center px-0 py-[10px] relative rounded-bl-[8px] rounded-tl-[8px] shrink-0 cursor-move hover:bg-[#2b2b40] transition-colors" data-name="Drag & Drop">
          <DragDrop />
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>Drag to move</p>
      </TooltipContent>
    </Tooltip>
  );
}

function TrashIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}

interface Step {
  id: string;
  number: number;
}

function PrimaryActio({ stepCount }: { stepCount: number }) {
  return (
    <div className="relative">
      <div 
        className="bg-white relative rounded-[8px] shrink-0 w-[120px] cursor-default transition-colors overflow-hidden" 
        data-name="Primary actio"
      >
        <AnimatePresence mode="popLayout">
          <motion.div
              key={stepCount}
              initial={{ opacity: 0.6, scale: 0 }}
              animate={{ opacity: 0, scale: 2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute top-1/2 left-1/2 bg-orange-400 rounded-full pointer-events-none"
              style={{ width: 100, height: 100, x: "-50%", y: "-50%" }}
          />
        </AnimatePresence>
        <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full relative z-10">
          <div className="content-stretch flex gap-[8px] items-center justify-center px-[12px] py-[6px] relative w-full">
            <motion.p 
              key={stepCount}
              initial={{ scale: 1.2, color: "#fb923c" }} 
              animate={{ scale: 1, color: "#3d3c52" }}
              transition={{ duration: 0.3 }}
              className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#3d3c52] text-[14px] text-center text-nowrap"
            >
              {stepCount} steps
            </motion.p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TitleContainer({ stepCount }: { stepCount: number }) {
  return (
    <div className="bg-[#1f1f32] h-full relative shrink-0 mr-2" data-name="Title Container">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[10px] relative size-full">
          <PrimaryActio stepCount={stepCount} />
        </div>
      </div>
    </div>
  );
}

// Icons for the main toolbar
function Click() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="click">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g>
          <path d={svgPathsMenu.p29cfc600} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
        </g>
      </svg>
    </div>
  );
}

function HandClick() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="hand-click">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="hand-click">
          <path d={svgPathsMenu.p8776b80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
        </g>
      </svg>
    </div>
  );
}

function Capture() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="capture">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="capture">
          <path d={svgPathsMenu.p28bcb00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
        </g>
      </svg>
    </div>
  );
}

function CensorIcon() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="blur">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g>
          <path d={svgPathsModes.p24c4700} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
        </g>
      </svg>
    </div>
  );
}

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
      data-name="Button"
      onClick={onClick}
    >
      {children}
    </div>
  );

  if (tooltip) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          {button}
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    );
  }

  return button;
}

function ChevronDown() {
  return (
    <div className="relative shrink-0 size-[10px]" data-name="chevron-down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
        <g id="chevron-down">
          <path d="M2.5 3.75L5 6.25L7.5 3.75" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

interface ButtonDropdownProps {
    onClick: (e: React.MouseEvent) => void;
}

function ButtonDropdown({ onClick }: ButtonDropdownProps) {
  return (
    <div 
        className="bg-[#3d3c52] relative rounded-br-[4px] rounded-tr-[4px] self-stretch shrink-0 w-[15px] cursor-pointer hover:bg-[#4d4c62] transition-colors" 
        data-name="Button"
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
  onDropdownClick?: (e: React.MouseEvent) => void;
  icon: React.ReactNode;
  tooltip?: string;
}

function SplitButton({ isActive, onSelect, onDropdownClick, icon, tooltip }: SplitButtonProps) {
  return (
    <div className="content-stretch flex items-start overflow-clip relative rounded-[8px] shrink-0" data-name="Split Button">
      <BaseButton isActive={isActive} onClick={onSelect} roundedClass="rounded-bl-[4px] rounded-tl-[4px]" tooltip={tooltip}>
        {icon}
      </BaseButton>
      {onDropdownClick ? (
          <ButtonDropdown onClick={onDropdownClick} />
      ) : (
          <ButtonDropdown onClick={() => {}} />
      )}
    </div>
  );
}

function Blur() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="blur">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g>
          <path d={svgPaths.p16d89000} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
        </g>
      </svg>
    </div>
  );
}

function Rotate() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="rotate">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="rotate">
          <path d={svgPaths.p24dbb500} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
        </g>
      </svg>
    </div>
  );
}

function PlayerPause() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="player-pause">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="player-pause">
          <g id="Vector">
            <path d={svgPaths.p18e3a100} stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
            <path d={svgPaths.p121763f0} stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
          </g>
        </g>
      </svg>
    </div>
  );
}

// Menu Components
interface MenuItemProps {
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
    isActive?: boolean;
    onMouseEnter?: () => void;
}

function MenuItem({ icon, label, onClick, isActive, onMouseEnter }: MenuItemProps) {
  return (
    <div 
        className={`${isActive ? 'bg-[#0975d7]' : 'bg-[#1f1f32]'} relative shrink-0 w-full cursor-pointer transition-colors rounded-[4px]`} 
        data-name="Single-select Menu Item"
        onClick={onClick}
        onMouseEnter={onMouseEnter}
    >
      <div className="size-full">
        <div className="content-stretch flex flex-col items-start px-[8px] py-[4px] relative w-full">
            <div className="relative shrink-0 w-full" data-name="Item content">
                <div className="flex flex-row items-center size-full">
                    <div className="content-stretch flex gap-[8px] items-center px-[4px] py-[2px] relative w-full">
                        {icon}
                        <p className="basis-0 font-['Inter:Regular',sans-serif] grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[14px] text-white">{label}</p>
                    </div>
                </div>
            </div>
        </div>
      </div>

    </div>
  );
}

interface ClickOptionsProps {
    onSelect: (option: 'click' | 'hand' | 'capture') => void;
    currentMode: 'click' | 'hand' | 'capture';
}

function ClickOptions({ onSelect, currentMode }: ClickOptionsProps) {
  const [highlighted, setHighlighted] = useState(currentMode);

  useEffect(() => {
    setHighlighted(currentMode);
  }, [currentMode]);

  return (
    <div 
      className="bg-[#1f1f32] content-stretch flex flex-col items-start px-0 py-[4px] relative rounded-[6px] w-[240px] shadow-lg border border-[#2b2b40]" 
      data-name="Click options"
      onMouseLeave={() => setHighlighted(currentMode)}
    >
      <MenuItem 
        icon={<Click />} 
        label="Capture and navigate" 
        onClick={() => onSelect('click')} 
        isActive={highlighted === 'click'}
        onMouseEnter={() => setHighlighted('click')}
      />
      <MenuItem 
        icon={<HandClick />} 
        label="Capture without navigation" 
        onClick={() => onSelect('hand')} 
        isActive={highlighted === 'hand'} 
        onMouseEnter={() => setHighlighted('hand')}
      />
      <MenuItem 
        icon={<Capture />} 
        label="Free floating step" 
        onClick={() => onSelect('capture')} 
        isActive={highlighted === 'capture'} 
        onMouseEnter={() => setHighlighted('capture')}
      />
    </div>
  );
}

interface ActionContainerProps {
  activeTool: string;
  setActiveTool: (tool: string) => void;
  clickMode: 'click' | 'hand' | 'capture';
  setClickMode: (mode: 'click' | 'hand' | 'capture') => void;
  blurMode: 'censor' | 'multiselect';
  setBlurMode: (mode: 'censor' | 'multiselect') => void;
  setStepCount: (count: number) => void;
  stepCount?: number;
  onRestart?: () => void;
  onCancel?: () => void;
  onHelp?: () => void;
  steps?: Step[];
  onDeleteStep?: (id: string) => void;
}

function ActionContainer({ activeTool, setActiveTool, clickMode, setClickMode, blurMode, setBlurMode, setStepCount, onRestart }: ActionContainerProps) {
  const [isClickMenuOpen, setIsClickMenuOpen] = useState(false);
  const clickMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (clickMenuRef.current && !clickMenuRef.current.contains(event.target as Node)) {
        setIsClickMenuOpen(false);
      }
    }

    if (isClickMenuOpen) {
        document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isClickMenuOpen]);

  const getClickIcon = () => {
      switch (clickMode) {
          case 'click': return <Click />;
          case 'hand': return <HandClick />;
          case 'capture': return <Capture />;
          default: return <Click />;
      }
  };

  const getClickTooltip = () => {
      switch (clickMode) {
          case 'click': return "Capture and navigate";
          case 'hand': return "Capture without navigation";
          case 'capture': return "Free floating step";
          default: return "Capture and navigate";
      }
  };

  const handleClickSelect = () => {
      setActiveTool('click');
  };

  const handleClickDropdownClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      setIsClickMenuOpen(!isClickMenuOpen);
  };

  const handleClickOptionSelect = (mode: 'click' | 'hand' | 'capture') => {
      setClickMode(mode);
      setActiveTool('click');
      setIsClickMenuOpen(false);
  };

  return (
    <div className="bg-[#1f1f32] content-stretch flex gap-[6px] h-full items-center justify-center px-[4px] py-[10px] relative shrink-0" data-name="Action Container -2">
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
                 <ClickOptions onSelect={handleClickOptionSelect} currentMode={clickMode} />
              </motion.div>
            )}
          </AnimatePresence>
          <SplitButton 
            isActive={activeTool === 'click'} 
            onSelect={handleClickSelect} 
            onDropdownClick={handleClickDropdownClick}
            icon={getClickIcon()} 
            tooltip={getClickTooltip()}
          />
      </div>
      <BaseButton 
        isActive={activeTool === 'blur'} 
        onClick={() => {
            setActiveTool('blur');
            setBlurMode('censor');
        }} 
        roundedClass="rounded-[8px]"
        tooltip="Censor mode"
        variant="ghost"
      >
        <CensorIcon />
      </BaseButton>
      <BaseButton 
        isActive={false} 
        onClick={() => {
          if (onRestart) {
            onRestart();
          } else {
            setStepCount(0);
            setActiveTool('click');
            setClickMode('click');
          }
        }} 
        roundedClass="rounded-[8px]"
        tooltip="Start over"
        variant="ghost"
      >
        <Rotate />
      </BaseButton>
      <BaseButton 
        isActive={activeTool === 'pause'} 
        onClick={() => setActiveTool('pause')} 
        roundedClass="rounded-[8px]"
        tooltip="Pause"
        variant="ghost"
      >
        <PlayerPause />
      </BaseButton>
    </div>
  );
}

function Divider() {
  return (
    <div className="content-stretch flex flex-col h-[32px] items-center justify-center relative w-px" data-name="Divider">
      <div className="basis-0 bg-white grow min-h-px min-w-px opacity-[0.16] shrink-0 w-full" data-name="Divider" />
    </div>
  );
}

function Check() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="check">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="check">
          <path d={svgPaths.p3febb700} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
        </g>
      </svg>
    </div>
  );
}

interface PrimaryActio1Props {
  onClick: () => void;
}

function PrimaryActio1({ onClick }: PrimaryActio1Props) {
  return (
    <div 
      className="bg-[#198558] content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[12px] py-[6px] relative rounded-[8px] shrink-0 cursor-pointer hover:bg-[#146c48] transition-colors" 
      data-name="Primary actio"
      onClick={onClick}
    >
      <Check />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-center text-nowrap text-white">Done</p>
    </div>
  );
}

function X() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="x">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="x">
          <path d="M12 4L4 12M4 4L12 12" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
        </g>
      </svg>
    </div>
  );
}

function CancelButton({ onClick }: { onClick?: () => void }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div 
          className="bg-[#b3141d] content-stretch flex items-center justify-center overflow-clip p-[8px] relative rounded-[8px] shrink-0 cursor-pointer hover:bg-[#921017] transition-colors" 
          data-name="Button"
          onClick={onClick}
        >
          <X />
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>Discard and exit</p>
      </TooltipContent>
    </Tooltip>
  );
}

function Help() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="help">
      <svg className="block size-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" stroke="#9CA3AF" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" stroke="#9CA3AF" strokeLinecap="round" />
        <path d="M12 17h.01" stroke="#9CA3AF" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function HelpButton({ onClick, isActive }: { onClick: () => void, isActive: boolean }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div 
          className={`bg-[#1f1f32] content-stretch flex items-center justify-center overflow-clip p-[8px] relative rounded-[8px] shrink-0 cursor-pointer hover:bg-[#2b2b40] transition-colors ${isActive ? 'bg-[#2b2b40]' : ''}`} 
          data-name="Button"
          onClick={onClick}
        >
          <Help />
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>Learn more</p>
      </TooltipContent>
    </Tooltip>
  );
}

function ActionContainer1({ stepCount = 0, onCancel, onDone }: { stepCount?: number, onCancel?: () => void, onDone?: () => void }) {
  const handleDone = () => {
    if (onDone) {
      onDone();
    }
  };

  return (
    <div className="bg-[#1f1f32] content-stretch flex gap-[5px] h-full items-center justify-center px-[4px] py-[10px] relative shrink-0" data-name="Action Container -2">
      <PrimaryActio1 onClick={handleDone} />
      <CancelButton onClick={onCancel} />
    </div>
  );
}

function ActionGroupContainer({ activeTool, setActiveTool, clickMode, setClickMode, blurMode, setBlurMode, setStepCount, stepCount, onRestart, onCancel, onHelp, onDone }: ActionContainerProps & { onCancel?: () => void, onHelp?: () => void, onDone?: () => void }) {
  return (
    <div className="content-stretch flex gap-[4px] h-full items-center justify-center pl-0 pr-[6px] py-0 relative shrink-0" data-name="Action group container">
      <ActionContainer activeTool={activeTool} setActiveTool={setActiveTool} clickMode={clickMode} setClickMode={setClickMode} blurMode={blurMode} setBlurMode={setBlurMode} setStepCount={setStepCount} onRestart={onRestart} />
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none rotate-[180deg]">
          <Divider />
        </div>
      </div>
      <ActionContainer1 stepCount={stepCount} onCancel={onCancel} onDone={onDone} />
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none rotate-[180deg]">
          <Divider />
        </div>
      </div>
      <div className="relative">
        <HelpButton onClick={() => onHelp?.()} isActive={false} />
      </div>
    </div>
  );
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

function StepCapture({ 
  stepCount, 
  setStepCount,
  activeTool, 
  setActiveTool, 
  clickMode, 
  setClickMode, 
  blurMode, 
  setBlurMode,
  onRestart,
  onCancel,
  onHelp,
  onDone,
  steps,
  onDeleteStep
}: ToolbarStateProps) {
  return (
    <div className="bg-[#1f1f32] content-stretch flex h-[56px] items-start relative shrink-0 w-fit rounded-[12px]" data-name="Step Capture">
      <DragDrop1 />
      <TitleContainer stepCount={stepCount} />
      <ActionGroupContainer activeTool={activeTool} setActiveTool={setActiveTool} clickMode={clickMode} setClickMode={setClickMode} blurMode={blurMode} setBlurMode={setBlurMode} setStepCount={setStepCount} stepCount={stepCount} onRestart={onRestart} onCancel={onCancel} onHelp={onHelp} onDone={onDone} />
    </div>
  );
}

export function Toolbar(props: ToolbarStateProps) {
  return (
    <div className="bg-[#1f1f32] content-stretch flex flex-col items-start relative rounded-[12px] w-fit shadow-2xl" data-name="Toolbar">
      <StepCapture {...props} />
    </div>
  );
}