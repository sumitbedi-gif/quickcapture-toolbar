import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

// ─── Icon system ────────────────────────────────────────────────────────────
// One family: Tabler icons (24×24 viewBox, 2px stroke, round cap/join,
// currentColor). Rendered at 18px inside 32px buttons.

function Icon({ size = 18, children }: { size?: number; children: React.ReactNode }) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
      className="block shrink-0"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      {children}
    </svg>
  );
}

// tabler: click — capture & navigate
function Click() {
  return (
    <Icon>
      <path d="M3 12l3 0" />
      <path d="M12 3l0 3" />
      <path d="M7.8 7.8l-2.2 -2.2" />
      <path d="M16.2 7.8l2.2 -2.2" />
      <path d="M7.8 16.2l-2.2 2.2" />
      <path d="M12 12l9 3l-4 2l-2 4l-3 -9" />
    </Icon>
  );
}
// tabler: hand-stop — capture, stay on page
function HandClick() {
  return <Icon><path d="M8 13v-7.5a1.5 1.5 0 0 1 3 0v6.5" /><path d="M11 5.5v-2a1.5 1.5 0 1 1 3 0v8.5" /><path d="M14 5.5a1.5 1.5 0 0 1 3 0v6.5" /><path d="M17 7.5a1.5 1.5 0 0 1 3 0v8.5a6 6 0 0 1 -6 6h-2h.208a6 6 0 0 1 -5.012 -2.7a69.74 69.74 0 0 1 -.196 -.3c-.312 -.479 -1.407 -2.388 -3.286 -5.728a1.5 1.5 0 0 1 .536 -2.022a1.867 1.867 0 0 1 2.28 .28l1.762 1.78" /></Icon>;
}
// tabler: frame — free-floating step
function Capture() {
  return <Icon><path d="M4 7l16 0" /><path d="M4 17l16 0" /><path d="M7 4l0 16" /><path d="M17 4l0 16" /></Icon>;
}
// tabler: contrast — censor / mask
function CensorIcon() {
  return <Icon><path d="M12 3a9 9 0 0 0 0 18a9 9 0 0 0 0 -18z" /><path d="M12 3v18a9 9 0 0 0 0 -18z" fill="currentColor" /></Icon>;
}
// tabler: drag-drop — multi select
function MultiSelectIcon() {
  return (
    <Icon>
      <path d="M19 11v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2" />
      <path d="M13 13l9 3l-4 2l-2 4l-3 -9" />
      <path d="M3 3l0 .01" /><path d="M7 3l0 .01" /><path d="M11 3l0 .01" /><path d="M15 3l0 .01" />
      <path d="M3 7l0 .01" /><path d="M3 11l0 .01" /><path d="M3 15l0 .01" />
    </Icon>
  );
}
// tabler: player-pause
function PlayerPause() {
  return <Icon><path d="M6 5m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v12a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" /><path d="M14 5m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v12a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" /></Icon>;
}
// tabler: check
function Check() {
  return <Icon><path d="M5 12l5 5l10 -10" /></Icon>;
}
// tabler: trash
function TrashIcon() {
  return <Icon><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></Icon>;
}
// tabler: help-circle
function Help() {
  return <Icon><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M12 17l0 .01" /><path d="M12 13.5a1.5 1.5 0 0 1 1 -1.5a2.6 2.6 0 1 0 -3 -4" /></Icon>;
}
// tabler: chevron-down
function ChevronDown({ size = 16 }: { size?: number }) {
  return <Icon size={size}><path d="M6 9l6 6l6 -6" /></Icon>;
}
// tabler: grip-vertical
function Grip() {
  return (
    <Icon size={18}>
      <path d="M9 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
      <path d="M9 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
      <path d="M9 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
      <path d="M15 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
      <path d="M15 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
      <path d="M15 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
    </Icon>
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

function BaseButton({ isActive, onClick, children, roundedClass, tooltip }: ButtonProps) {
  // Idle = transparent (icon only). Selected = solid blue fill, white icon.
  const inactiveClass = 'bg-transparent text-[#ECECF3] hover:bg-[#33324a]';
  const activeClass = 'bg-[#0975d7] text-white hover:bg-[#0864b8]';
  const button = (
    <div
      className={`${isActive ? activeClass : inactiveClass} flex items-center justify-center size-[32px] relative ${roundedClass} shrink-0 cursor-pointer transition-[background-color,transform] active:scale-[0.92]`}
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

interface ModeGroupProps {
  isActive: boolean;
  onSelect: () => void;
  onChevronClick: (e: React.MouseEvent) => void;
  icon: React.ReactNode;
  tooltip?: string;
}

// A tool with a submenu: icon button (selects the tool) + a detached chevron
// always visible up front (its own hit area). Opens the tool's mode menu.
function ModeGroup({ isActive, onSelect, onChevronClick, icon, tooltip }: ModeGroupProps) {
  return (
    <div className="flex items-center shrink-0">
      <BaseButton isActive={isActive} onClick={onSelect} roundedClass="rounded-[8px]" tooltip={tooltip}>
        {icon}
      </BaseButton>
      <div
        className="flex items-center justify-center w-[18px] h-[32px] shrink-0 cursor-pointer text-[#7c7a90] hover:text-white transition-colors"
        onClick={onChevronClick}
      >
        <ChevronDown size={14} />
      </div>
    </div>
  );
}

function Divider() {
  return <div className="h-[20px] w-px mx-[4px] shrink-0 bg-white/[0.12]" />;
}

// ─── Click mode dropdown menu ──────────────────────────────────────────────────

function MenuItem({ icon, label, onClick, isActive, isSelected, onMouseEnter }: {
  icon: React.ReactNode; label: string; onClick: () => void; isActive?: boolean; isSelected?: boolean; onMouseEnter?: () => void;
}) {
  // Idle row: dark bg. Highlighted row: BLUE bg. Icon + label + checkmark all
  // inherit `currentColor` and stay white in both states.
  // isSelected = the mode currently chosen → trailing checkmark.
  return (
    <div
      className={`${isActive ? 'bg-[#0975d7]' : 'bg-transparent'} text-white flex items-center gap-[10px] h-[36px] px-[10px] w-full shrink-0 cursor-pointer transition-colors rounded-[8px]`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
    >
      <span className="shrink-0 flex items-center">{icon}</span>
      <p className="grow font-['Inter:Regular',sans-serif] leading-[20px] text-[14px] whitespace-nowrap">{label}</p>
      {isSelected && <Check />}
    </div>
  );
}

function ClickOptions({ onSelect, currentMode }: { onSelect: (option: 'click' | 'hand' | 'capture') => void; currentMode: 'click' | 'hand' | 'capture'; }) {
  const [highlighted, setHighlighted] = useState(currentMode);
  useEffect(() => { setHighlighted(currentMode); }, [currentMode]);
  return (
    <div
      className="bg-[#1f1f32] flex flex-col items-stretch gap-[2px] p-[4px] relative rounded-[10px] min-w-[248px] w-max shadow-lg border border-[#2b2b40]"
      onMouseLeave={() => setHighlighted(currentMode)}
    >
      <MenuItem icon={<Click />} label="Capture and navigate" onClick={() => onSelect('click')} isActive={highlighted === 'click'} isSelected={currentMode === 'click'} onMouseEnter={() => setHighlighted('click')} />
      <MenuItem icon={<HandClick />} label="Capture without navigation" onClick={() => onSelect('hand')} isActive={highlighted === 'hand'} isSelected={currentMode === 'hand'} onMouseEnter={() => setHighlighted('hand')} />
      <MenuItem icon={<Capture />} label="Free floating step" onClick={() => onSelect('capture')} isActive={highlighted === 'capture'} isSelected={currentMode === 'capture'} onMouseEnter={() => setHighlighted('capture')} />
    </div>
  );
}

// ─── Select mode dropdown (Multi-select + Censor) ───────────────────────────────

function SelectOptions({ onSelect, currentMode }: { onSelect: (mode: 'multiselect' | 'censor') => void; currentMode: 'multiselect' | 'censor'; }) {
  const [highlighted, setHighlighted] = useState(currentMode);
  useEffect(() => { setHighlighted(currentMode); }, [currentMode]);
  return (
    <div
      className="bg-[#1f1f32] flex flex-col items-stretch gap-[2px] p-[4px] relative rounded-[10px] min-w-[248px] w-max shadow-lg border border-[#2b2b40]"
      onMouseLeave={() => setHighlighted(currentMode)}
    >
      <MenuItem icon={<MultiSelectIcon />} label="Multi Select" onClick={() => onSelect('multiselect')} isActive={highlighted === 'multiselect'} isSelected={currentMode === 'multiselect'} onMouseEnter={() => setHighlighted('multiselect')} />
      <MenuItem icon={<CensorIcon />} label="Censor sensitive data" onClick={() => onSelect('censor')} isActive={highlighted === 'censor'} isSelected={currentMode === 'censor'} onMouseEnter={() => setHighlighted('censor')} />
    </div>
  );
}

// ─── Help button ───────────────────────────────────────────────────────────────

function HelpButton({ onClick }: { onClick: () => void }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className="bg-transparent text-[#7c7a90] flex items-center justify-center overflow-clip size-[32px] relative rounded-[8px] shrink-0 cursor-pointer hover:bg-[#33324a] hover:text-[#ECECF3] transition-colors"
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
  onGripPointerDown?: (e: React.PointerEvent) => void;
}

// ─── Main Toolbar ──────────────────────────────────────────────────────────────

function StepCapture({
  stepCount,
  activeTool, setActiveTool,
  clickMode, setClickMode,
  blurMode, setBlurMode,
  onRestart, onHelp, onDone,
  onGripPointerDown,
}: ToolbarStateProps) {
  const [isClickMenuOpen, setIsClickMenuOpen] = useState(false);
  const [isSelectMenuOpen, setIsSelectMenuOpen] = useState(false);
  const [dropdownDirection, setDropdownDirection] = useState<'up' | 'down'>('up');
  const clickMenuRef = useRef<HTMLDivElement>(null);
  const selectMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (clickMenuRef.current && !clickMenuRef.current.contains(event.target as Node)) {
        setIsClickMenuOpen(false);
      }
      if (selectMenuRef.current && !selectMenuRef.current.contains(event.target as Node)) {
        setIsSelectMenuOpen(false);
      }
    }
    if (isClickMenuOpen || isSelectMenuOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isClickMenuOpen, isSelectMenuOpen]);

  const measureDirection = (ref: React.RefObject<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    setDropdownDirection(rect && rect.top < 220 ? 'down' : 'up');
  };

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

  const getSelectIcon = () => (blurMode === 'multiselect' ? <MultiSelectIcon /> : <CensorIcon />);
  const getSelectTooltip = () => (blurMode === 'multiselect' ? 'Multi Select' : 'Censor sensitive data');

  return (
    <div
      className="bg-[#1f1f32] flex h-[48px] items-center relative rounded-[10px]"
      style={{
        boxShadow:
          '0 0 0 1px rgba(255,255,255,0.06), 0 1px 0 rgba(255,255,255,0.05) inset, 0 12px 32px -10px rgba(0,0,0,0.55)',
      }}
    >
      {/* Grip */}
      <div
        className="flex items-center justify-center px-[8px] h-full cursor-grab active:cursor-grabbing text-[#7c7a90] hover:text-[#ECECF3] hover:bg-[#2b2b40] transition-colors shrink-0 touch-none rounded-l-[10px]"
        onPointerDown={onGripPointerDown}
      >
        <Grip />
      </div>

      {/* Steps — status readout, anchored in its own zone by the divider */}
      <div className="pl-[4px] pr-[8px] shrink-0">
        <motion.p
          key={stepCount}
          initial={{ opacity: 0.55 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="font-['Inter:Medium',sans-serif] font-medium text-[13px] leading-[20px] whitespace-nowrap text-white"
          style={{ fontVariantNumeric: 'tabular-nums' }}
        >
          {stepCount} {stepCount === 1 ? 'step' : 'steps'}
        </motion.p>
      </div>

      <Divider />

      {/* Mode pair: Capture · Select(Multi-select/Censor) · then Pause */}
      <div className="flex items-center gap-[2px] px-[4px]">
        {/* Capture modes group */}
        <div className="relative" ref={clickMenuRef}>
          <AnimatePresence>
            {isClickMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: dropdownDirection === 'up' ? 10 : -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: dropdownDirection === 'up' ? 10 : -10, scale: 0.95 }}
                transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                className={dropdownDirection === 'up'
                  ? 'absolute bottom-full left-0 mb-[12px] z-50 origin-bottom-left'
                  : 'absolute top-full left-0 mt-[12px] z-50 origin-top-left'}
              >
                <ClickOptions
                  onSelect={(mode) => { setClickMode(mode); setActiveTool('click'); setIsClickMenuOpen(false); }}
                  currentMode={clickMode}
                />
              </motion.div>
            )}
          </AnimatePresence>
          <ModeGroup
            isActive={activeTool === 'click'}
            onSelect={() => setActiveTool('click')}
            onChevronClick={(e) => {
              e.stopPropagation();
              if (!isClickMenuOpen) { measureDirection(clickMenuRef); setIsSelectMenuOpen(false); }
              setIsClickMenuOpen(prev => !prev);
            }}
            icon={getClickIcon()}
            tooltip={getClickTooltip()}
          />
        </div>

        {/* Select modes group (Multi-select / Censor) */}
        <div className="relative" ref={selectMenuRef}>
          <AnimatePresence>
            {isSelectMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: dropdownDirection === 'up' ? 10 : -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: dropdownDirection === 'up' ? 10 : -10, scale: 0.95 }}
                transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                className={dropdownDirection === 'up'
                  ? 'absolute bottom-full left-0 mb-[12px] z-50 origin-bottom-left'
                  : 'absolute top-full left-0 mt-[12px] z-50 origin-top-left'}
              >
                <SelectOptions
                  onSelect={(mode) => { setBlurMode(mode); setActiveTool('blur'); setIsSelectMenuOpen(false); }}
                  currentMode={blurMode}
                />
              </motion.div>
            )}
          </AnimatePresence>
          <ModeGroup
            isActive={activeTool === 'blur'}
            onSelect={() => setActiveTool('blur')}
            onChevronClick={(e) => {
              e.stopPropagation();
              if (!isSelectMenuOpen) { measureDirection(selectMenuRef); setIsClickMenuOpen(false); }
              setIsSelectMenuOpen(prev => !prev);
            }}
            icon={getSelectIcon()}
            tooltip={getSelectTooltip()}
          />
        </div>

        {/* Pause — transient control, set slightly apart from the mode pair */}
        <div className="ml-[4px]">
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
      </div>

      <Divider />

      {/* Done (the one solid accent) | Discard */}
      <div className="flex items-center gap-[2px] px-[4px]">
        <button
          type="button"
          aria-label="Done"
          className="bg-white flex items-center justify-center gap-[6px] h-[32px] pl-[10px] pr-[12px] rounded-[8px] shrink-0 cursor-pointer hover:bg-[#f0f0f4] transition-[background-color,transform] active:scale-[0.96] text-[#1f1f32] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1f1f32]"
          onClick={() => onDone?.()}
        >
          <Check />
          <span className="font-['Inter:Medium',sans-serif] font-medium text-[13px] leading-[20px]">Done</span>
        </button>

        <BaseButton
          isActive={false}
          onClick={() => onRestart?.()}
          roundedClass="rounded-[8px]"
          tooltip="Discard"
          variant="ghost"
        >
          <TrashIcon />
        </BaseButton>
      </div>

      <Divider />

      {/* Help */}
      <div className="pr-[8px] pl-[4px]">
        <HelpButton onClick={() => onHelp?.()} />
      </div>
    </div>
  );
}

export function Toolbar(props: ToolbarStateProps) {
  return <StepCapture {...props} />;
}
