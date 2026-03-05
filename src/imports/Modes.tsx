import svgPaths from "./svg-ofq6aufqgu";

function Blur() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="blur">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_1_6548)">
          <path d={svgPaths.p24c4700} id="Vector" stroke="var(--stroke-0, #F6F6F9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
        </g>
        <defs>
          <clipPath id="clip0_1_6548">
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
          <Blur />
          <p className="basis-0 font-['Inter:Regular',sans-serif] grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[14px] text-white">Censor mode</p>
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

function LayersIntersect() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="layers-intersect">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_1_6545)" id="layers-intersect">
          <g id="Vector">
            <path d={svgPaths.p2c811b00} stroke="var(--stroke-0, #F6F6F9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
            <path d={svgPaths.p35291f00} stroke="var(--stroke-0, #F6F6F9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_1_6545">
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
          <LayersIntersect />
          <p className="basis-0 font-['Inter:Regular',sans-serif] grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[14px] text-white">Multi-element select</p>
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

export default function Modes() {
  return (
    <div className="bg-[#1f1f32] content-stretch flex flex-col items-start overflow-clip px-0 py-[4px] relative rounded-[6px] size-full" data-name="Modes">
      <SingleSelectMenuItem />
      <SingleSelectMenuItem1 />
    </div>
  );
}