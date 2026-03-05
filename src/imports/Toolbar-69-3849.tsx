import svgPaths from "./svg-v5bcpl36c9";

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
    <div className="bg-[#1f1f32] content-stretch flex h-full items-center justify-center px-0 py-[10px] relative rounded-bl-[8px] rounded-tl-[8px] shrink-0" data-name="Drag & Drop">
      <DragDrop />
    </div>
  );
}

function PrimaryActio() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Primary actio">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-center px-[12px] py-[6px] relative w-full">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#3d3c52] text-[14px] text-center text-nowrap">0 steps</p>
        </div>
      </div>
    </div>
  );
}

function TitleContainer() {
  return (
    <div className="basis-0 bg-[#1f1f32] grow h-full min-h-px min-w-px relative shrink-0" data-name="Title Container">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[10px] relative size-full">
          <PrimaryActio />
        </div>
      </div>
    </div>
  );
}

function Capture() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="capture">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_69_3871)" id="capture">
          <path d={svgPaths.p28bcb00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
        </g>
        <defs>
          <clipPath id="clip0_69_3871">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#0975d7] content-stretch flex items-center justify-center overflow-clip p-[8px] relative rounded-bl-[4px] rounded-tl-[4px] shrink-0" data-name="Button">
      <Capture />
    </div>
  );
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

function Button1() {
  return (
    <div className="bg-[#3d3c52] relative rounded-br-[4px] rounded-tr-[4px] self-stretch shrink-0 w-[15px]" data-name="Button">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center p-[8px] relative size-full">
          <ChevronDown />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#2b2b40] border-[0px_0px_0px_1px] border-solid inset-0 pointer-events-none rounded-br-[4px] rounded-tr-[4px]" />
    </div>
  );
}

function SplitButton() {
  return (
    <div className="content-stretch flex items-start overflow-clip relative rounded-[8px] shrink-0" data-name="Split Button">
      <Button />
      <Button1 />
    </div>
  );
}

function Blur() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="blur">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_69_3892)">
          <path d={svgPaths.p24c4700} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
        </g>
        <defs>
          <clipPath id="clip0_69_3892">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[#1f1f32] content-stretch flex items-center justify-center overflow-clip p-[8px] relative rounded-[8px] shrink-0" data-name="Button">
      <Blur />
    </div>
  );
}

function Rotate() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="rotate">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_69_3868)" id="rotate">
          <path d={svgPaths.p2e6e2d00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
        </g>
        <defs>
          <clipPath id="clip0_69_3868">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-[#1f1f32] content-stretch flex items-center justify-center overflow-clip p-[8px] relative rounded-[8px] shrink-0" data-name="Button">
      <Rotate />
    </div>
  );
}

function PlayerPause() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="player-pause">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_69_3865)" id="player-pause">
          <g id="Vector">
            <path d={svgPaths.p290bb900} stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
            <path d={svgPaths.p1a725bf0} stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_69_3865">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-[#1f1f32] content-stretch flex items-center justify-center overflow-clip p-[8px] relative rounded-[8px] shrink-0" data-name="Button">
      <PlayerPause />
    </div>
  );
}

function ActionContainer() {
  return (
    <div className="bg-[#1f1f32] content-stretch flex gap-[6px] h-full items-center justify-center px-[4px] py-[10px] relative shrink-0" data-name="Action Container -2">
      <SplitButton />
      <Button2 />
      <Button3 />
      <Button4 />
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
        <g clipPath="url(#clip0_69_3856)" id="check">
          <path d={svgPaths.p3551b880} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
        </g>
        <defs>
          <clipPath id="clip0_69_3856">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function PrimaryActio1() {
  return (
    <div className="bg-[#198558] content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[12px] py-[6px] relative rounded-[8px] shrink-0" data-name="Primary actio">
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
          <path d="M15 5L5 15M5 5L15 15" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
        </g>
      </svg>
    </div>
  );
}

function Button5() {
  return (
    <div className="bg-[#b3141d] content-stretch flex items-center justify-center overflow-clip p-[8px] relative rounded-[8px] shrink-0" data-name="Button">
      <X />
    </div>
  );
}

function ActionContainer1() {
  return (
    <div className="bg-[#1f1f32] content-stretch flex gap-[5px] h-full items-center justify-center px-[4px] py-[10px] relative shrink-0" data-name="Action Container -2">
      <PrimaryActio1 />
      <Button5 />
    </div>
  );
}

function Help() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="help">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_69_3886)" id="help">
          <path d={svgPaths.p30d19e00} id="Vector" stroke="var(--stroke-0, #8C899F)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
        </g>
        <defs>
          <clipPath id="clip0_69_3886">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button6() {
  return (
    <div className="bg-[#1f1f32] content-stretch flex items-center justify-center overflow-clip p-[8px] relative rounded-[8px] shrink-0" data-name="Button">
      <Help />
    </div>
  );
}

function ActionGroupContainer() {
  return (
    <div className="content-stretch flex gap-[4px] h-full items-center justify-center pl-0 pr-[6px] py-0 relative shrink-0" data-name="Action group container">
      <ActionContainer />
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none rotate-[180deg]">
          <Divider />
        </div>
      </div>
      <ActionContainer1 />
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none rotate-[180deg]">
          <Divider />
        </div>
      </div>
      <Button6 />
    </div>
  );
}

function StepCapture() {
  return (
    <div className="bg-[#1f1f32] content-stretch flex h-[56px] items-start overflow-clip relative shrink-0 w-full" data-name="Step Capture">
      <DragDrop1 />
      <TitleContainer />
      <ActionGroupContainer />
    </div>
  );
}

export default function Toolbar() {
  return (
    <div className="bg-[#1f1f32] content-stretch flex flex-col items-start overflow-clip relative rounded-[12px] size-full" data-name="Toolbar">
      <StepCapture />
    </div>
  );
}