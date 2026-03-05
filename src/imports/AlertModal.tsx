import svgPaths from "./svg-9xw3qbpn2j";

function Text() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Text">
      <p className="basis-0 font-['Inter:Semi_Bold',sans-serif] font-semibold grow leading-[24px] min-h-px min-w-px not-italic relative shrink-0 text-[#1f1f32] text-[16px]">Start over?</p>
    </div>
  );
}

function TitleAndDescription() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="Title and description">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-0 relative w-full">
          <Text />
        </div>
      </div>
    </div>
  );
}

function AlertTriangle() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="alert-triangle">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="alert-triangle">
          <path d={svgPaths.p3c870c80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function IconContainer() {
  return (
    <div className="bg-[#e0a400] content-stretch flex items-start p-[4px] relative rounded-[24px] shrink-0" data-name="Icon Container">
      <AlertTriangle />
    </div>
  );
}

function AlertPictogram() {
  return (
    <div className="absolute bg-[#fefbeb] content-stretch flex items-center justify-center left-0 p-[8px] rounded-[24px] top-0" data-name="Alert Pictogram">
      <IconContainer />
    </div>
  );
}

function TitleContent() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="Title content">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pl-[44px] pr-0 py-[10px] relative w-full">
          <TitleAndDescription />
          <AlertPictogram />
        </div>
      </div>
    </div>
  );
}

function X() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="x">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="x">
          <path d="M15 5L5 15M5 5L15 15" id="Vector" stroke="var(--stroke-0, #6B697B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip p-[12px] relative rounded-[24px] shrink-0" data-name="Button">
      <X />
    </div>
  );
}

function QuickActions() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Quick Actions">
      <Button />
    </div>
  );
}

function ModalHeader() {
  return (
    <div className="bg-white content-stretch flex gap-[12px] items-center pb-0 pt-[8px] px-[12px] relative shrink-0 w-[420px] z-[3]" data-name="Modal Header">
      <TitleContent />
      <QuickActions />
    </div>
  );
}

function Text1() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Text">
      <p className="basis-0 font-['Inter:Regular',sans-serif] grow leading-[22px] min-h-px min-w-px not-italic relative shrink-0 text-[#3d3c52] text-[14px]">This will clear the steps captured in this session so you can re-capture the steps.</p>
    </div>
  );
}

function Body() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start pb-[8px] pl-[64px] pr-[24px] pt-0 relative shrink-0 w-[420px] z-[2]" data-name="Body">
      <Text1 />
    </div>
  );
}

function SecondaryCta() {
  return (
    <div className="relative rounded-[4px] shrink-0" data-name="SecondaryCTA">
      <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[16px] py-[12px] relative rounded-[inherit]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#3d3c52] text-[14px] text-center text-nowrap">Cancel</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#dfdde7] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Rotate() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="rotate">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="rotate">
          <path d={svgPaths.p2e6e2d00} id="Vector" stroke="var(--stroke-0, #3D3C52)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function MainCta() {
  return (
    <div className="bg-[#f4b31a] content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[16px] py-[12px] relative rounded-[4px] shrink-0" data-name="Main CTA">
      <Rotate />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#1f1f32] text-[14px] text-center text-nowrap">Start over</p>
    </div>
  );
}

function MainCtAs() {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-center justify-end min-h-px min-w-px relative shrink-0" data-name="Main CTAs">
      <SecondaryCta />
      <MainCta />
    </div>
  );
}

function ModalFooter() {
  return (
    <div className="bg-white relative shrink-0 w-full z-[1]" data-name="Modal Footer">
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex gap-[16px] items-center justify-end pl-[16px] pr-[32px] py-[24px] relative w-full">
          <MainCtAs />
        </div>
      </div>
    </div>
  );
}

export default function AlertModal() {
  return (
    <div className="content-stretch flex flex-col isolate items-center overflow-clip relative rounded-[8px] shadow-[0px_4px_30px_10px_rgba(0,0,0,0.08),0px_8px_28px_4px_rgba(0,0,0,0.1),0px_6px_22px_4px_rgba(0,0,0,0.12)] size-full" data-name="Alert Modal">
      <ModalHeader />
      <Body />
      <ModalFooter />
    </div>
  );
}