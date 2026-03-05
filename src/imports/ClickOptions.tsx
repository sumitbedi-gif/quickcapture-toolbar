import svgPaths from "./svg-6wyeqvkrgb";

function Click() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="click">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_1_6443)">
          <path d={svgPaths.p29cfc600} id="Vector" stroke="var(--stroke-0, #F6F6F9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
        </g>
        <defs>
          <clipPath id="clip0_1_6443">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function ItemContent() {
  return (
    <div className="relative shrink-0 w-full" data-name="Item content">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[4px] py-[2px] relative w-full">
          <Click />
          <p className="basis-0 font-['Inter:Regular',sans-serif] grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[14px] text-white">Click to navigate</p>
        </div>
      </div>
    </div>
  );
}

function SingleSelectMenuItem() {
  return (
    <div className="bg-[#1f1f32] relative shrink-0 w-full" data-name="Single-select Menu Item">
      <div className="size-full">
        <div className="content-stretch flex flex-col items-start px-[8px] py-[4px] relative w-full">
          <ItemContent />
        </div>
      </div>
    </div>
  );
}

function HandClick() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="hand-click">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_1_6437)" id="hand-click">
          <path d={svgPaths.p8776b80} id="Vector" stroke="var(--stroke-0, #F6F6F9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
        </g>
        <defs>
          <clipPath id="clip0_1_6437">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function ItemContent1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Item content">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[4px] py-[2px] relative w-full">
          <HandClick />
          <p className="basis-0 font-['Inter:Regular',sans-serif] grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[14px] text-white">Click and stay</p>
        </div>
      </div>
    </div>
  );
}

function SingleSelectMenuItem1() {
  return (
    <div className="bg-[#1f1f32] relative shrink-0 w-full" data-name="Single-select Menu Item">
      <div className="size-full">
        <div className="content-stretch flex flex-col items-start px-[8px] py-[4px] relative w-full">
          <ItemContent1 />
        </div>
      </div>
    </div>
  );
}

function Capture() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="capture">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_1_6434)" id="capture">
          <path d={svgPaths.p28bcb00} id="Vector" stroke="var(--stroke-0, #F6F6F9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
        </g>
        <defs>
          <clipPath id="clip0_1_6434">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function ItemContent2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Item content">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[4px] py-[2px] relative w-full">
          <Capture />
          <p className="basis-0 font-['Inter:Regular',sans-serif] grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[14px] text-white">Free floating step</p>
        </div>
      </div>
    </div>
  );
}

function SingleSelectMenuItem2() {
  return (
    <div className="bg-[#1f1f32] relative shrink-0 w-full" data-name="Single-select Menu Item">
      <div className="size-full">
        <div className="content-stretch flex flex-col items-start px-[8px] py-[4px] relative w-full">
          <ItemContent2 />
        </div>
      </div>
    </div>
  );
}

export default function ClickOptions() {
  return (
    <div className="bg-[#1f1f32] content-stretch flex flex-col items-start overflow-clip px-0 py-[4px] relative rounded-[6px] size-full" data-name="Click options">
      <SingleSelectMenuItem />
      <SingleSelectMenuItem1 />
      <SingleSelectMenuItem2 />
    </div>
  );
}