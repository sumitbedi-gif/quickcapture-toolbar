import svgPaths from "./svg-4vk0l22bqa";
import imgTitle from "figma:asset/02749286c7e109f7ec2b981d2999959d0d553bbc.png";
import imgImageWrap from "figma:asset/841578874330636e70807c419173be0a1c8e7b93.png";

function Group() {
  return (
    <div className="[grid-area:1_/_1] h-[20.468px] ml-0 mt-0 relative w-[27.245px]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27.2448 20.468">
        <g id="Group">
          <path d={svgPaths.p1f248180} fill="var(--fill-0, #F55800)" id="Vector" />
          <path d={svgPaths.p7084400} fill="var(--fill-0, #FFA450)" id="Vector_2" />
          <path d={svgPaths.p222ca500} fill="var(--fill-0, #C63D22)" id="Vector_3" />
        </g>
      </svg>
    </div>
  );
}

function Group1() {
  return (
    <div className="[grid-area:1_/_1] grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] ml-0 mt-0 place-items-start relative" data-name="Group">
      <Group />
    </div>
  );
}

function Group2() {
  return (
    <div className="[grid-area:1_/_1] grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative" data-name="Group">
      <Group1 />
    </div>
  );
}

function Group3() {
  return (
    <div className="[grid-area:1_/_1] h-[18.64px] ml-0 mt-0 relative w-[69.194px]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 69.1944 18.6396">
        <g id="Group">
          <path d={svgPaths.p1230cc00} fill="var(--fill-0, #25223B)" id="Vector" />
          <path d={svgPaths.p36cb0700} fill="var(--fill-0, #25223B)" id="Vector_2" />
          <path d={svgPaths.p1c5e7100} fill="var(--fill-0, #25223B)" id="Vector_3" />
          <path d={svgPaths.p27cbb900} fill="var(--fill-0, #25223B)" id="Vector_4" />
          <path d={svgPaths.p31706280} fill="var(--fill-0, #25223B)" id="Vector_5" />
          <path d={svgPaths.p49f2f80} fill="var(--fill-0, #25223B)" id="Vector_6" />
          <path d={svgPaths.p1b1a5b80} fill="var(--fill-0, #25223B)" id="Vector_7" />
        </g>
      </svg>
    </div>
  );
}

function Group4() {
  return (
    <div className="[grid-area:1_/_1] grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] ml-0 mt-0 place-items-start relative" data-name="Group">
      <Group3 />
    </div>
  );
}

function Group5() {
  return (
    <div className="[grid-area:1_/_1] grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[20.52%] mt-[22.25%] place-items-start relative" data-name="Group">
      <Group4 />
    </div>
  );
}

function Group6() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Group">
      <Group2 />
      <Group5 />
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start not-italic relative shrink-0 text-center w-full" data-name="Container">
      <p className="bg-center bg-clip-text bg-cover bg-no-repeat font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[32px] relative shrink-0 text-[24px] w-full" style={{ WebkitTextFillColor: "transparent", backgroundImage: `url('${imgTitle}')` }}>
        Explore the new capture toolbar
      </p>
      <p className="font-['Inter:Regular',sans-serif] h-[28px] leading-[28px] relative shrink-0 text-[#525066] text-[18px] w-full">Create flows faster by capturing steps directly as you work.</p>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-center relative shrink-0 w-full" data-name="Container">
      <Group6 />
      <Container />
    </div>
  );
}

function Click() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="click">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g>
          <path d={svgPaths.p29cfc600} id="Vector" stroke="var(--stroke-0, #0975D7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function OrnamentIcon() {
  return (
    <div className="bg-[#f0f9ff] content-stretch flex flex-col items-center justify-center overflow-clip p-[8px] relative rounded-[18px] shrink-0" data-name="Ornament icon">
      <Click />
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start justify-center leading-[20px] not-italic relative shrink-0 text-[14px] text-nowrap" data-name="Container">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold relative shrink-0 text-[#0975d7]">Capture and navigate</p>
      <p className="font-['Inter:Regular',sans-serif] relative shrink-0 text-[#525066]">Click through the application as usual</p>
    </div>
  );
}

function Container3() {
  return (
    <div className="bg-white relative rounded-[12px] shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[12px] items-start px-[12px] py-[16px] relative w-full">
          <OrnamentIcon />
          <Container2 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#0975d7] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function HandClick() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="hand-click">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="hand-click">
          <path d={svgPaths.p8776b80} id="Vector" stroke="var(--stroke-0, #6B697B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function OrnamentIcon1() {
  return (
    <div className="bg-[#f2f2f8] content-stretch flex flex-col items-center justify-center overflow-clip p-[8px] relative rounded-[18px] shrink-0" data-name="Ornament icon">
      <HandClick />
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start justify-center leading-[20px] not-italic relative shrink-0 text-[14px] text-nowrap" data-name="Container">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold relative shrink-0 text-[#3d3c52]">Capture without navigation</p>
      <p className="font-['Inter:Regular',sans-serif] relative shrink-0 text-[#525066]">Record steps without page changes</p>
    </div>
  );
}

function Container5() {
  return (
    <div className="bg-white relative rounded-[12px] shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[12px] items-start px-[12px] py-[16px] relative w-full">
          <OrnamentIcon1 />
          <Container4 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#dfdde7] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function Capture() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="capture">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="capture">
          <path d={svgPaths.p28bcb00} id="Vector" stroke="var(--stroke-0, #6B697B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function OrnamentIcon2() {
  return (
    <div className="bg-[#f2f2f8] content-stretch flex flex-col items-center justify-center overflow-clip p-[8px] relative rounded-[18px] shrink-0" data-name="Ornament icon">
      <Capture />
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start justify-center leading-[20px] not-italic relative shrink-0 text-[14px]" data-name="Container">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold relative shrink-0 text-[#3d3c52] text-nowrap">Free-floating step</p>
      <p className="font-['Inter:Regular',sans-serif] relative shrink-0 text-[#525066] w-[240px]">{`Drag to capture a screenshot `}</p>
    </div>
  );
}

function Container7() {
  return (
    <div className="bg-white relative rounded-[12px] shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[12px] items-start px-[12px] py-[16px] relative w-full">
          <OrnamentIcon2 />
          <Container6 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#dfdde7] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function Blur() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="blur">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g>
          <path d={svgPaths.p24c4700} id="Vector" stroke="var(--stroke-0, #6B697B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function OrnamentIcon3() {
  return (
    <div className="bg-[#f2f2f8] content-stretch flex flex-col items-center justify-center overflow-clip p-[8px] relative rounded-[18px] shrink-0" data-name="Ornament icon">
      <Blur />
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start justify-center leading-[20px] not-italic relative shrink-0 text-[14px]" data-name="Container">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold relative shrink-0 text-[#3d3c52] text-nowrap">Censor mode</p>
      <p className="font-['Inter:Regular',sans-serif] relative shrink-0 text-[#525066] w-[240px]">Blur out sensitive information</p>
    </div>
  );
}

function Container9() {
  return (
    <div className="bg-white relative rounded-[12px] shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[12px] items-start px-[12px] py-[16px] relative w-full">
          <OrnamentIcon3 />
          <Container8 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#dfdde7] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function Container10() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[12px] grow items-start justify-center min-h-px min-w-px relative shrink-0" data-name="Container">
      <Container3 />
      <Container5 />
      <Container7 />
      <Container9 />
    </div>
  );
}

function ImageWrap() {
  return (
    <div className="basis-0 grow min-h-px min-w-px overflow-clip relative rounded-[16px] self-stretch shrink-0" data-name="Image wrap">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[16px]">
        <div className="absolute inset-0 rounded-[16px]" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\\'0 0 326 340\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\' preserveAspectRatio=\\\'none\\\'><rect x=\\\'0\\\' y=\\\'0\\\' height=\\\'100%\\\' width=\\\'100%\\\' fill=\\\'url(%23grad)\\\' opacity=\\\'1\\\'/><defs><radialGradient id=\\\'grad\\\' gradientUnits=\\\'userSpaceOnUse\\\' cx=\\\'0\\\' cy=\\\'0\\\' r=\\\'10\\\' gradientTransform=\\\'matrix(9.9809e-16 17 -15 1.6106e-15 163 170)\\\'><stop stop-color=\\\'rgba(202,238,255,1)\\\' offset=\\\'0\\\'/><stop stop-color=\\\'rgba(248,245,254,1)\\\' offset=\\\'1\\\'/></radialGradient></defs></svg>')" }} />
        <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[16px] size-full" src={imgImageWrap} />
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex gap-[20px] items-start relative shrink-0 w-full" data-name="Container">
      <Container10 />
      <ImageWrap />
    </div>
  );
}

function Content() {
  return (
    <div className="relative shrink-0 w-full" data-name="Content">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[32px] items-center pb-0 pt-[24px] px-[24px] relative w-full">
          <Container1 />
          <Container11 />
        </div>
      </div>
    </div>
  );
}

function DividerWrap() {
  return (
    <div className="h-[25px] relative shrink-0 w-full" data-name="Divider-wrap">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 720 25">
        <g id="Divider-wrap">
          <path clipRule="evenodd" d="M720 1H0V0H720V1Z" fill="var(--fill-0, #EAECF0)" fillRule="evenodd" id="Divider" />
        </g>
      </svg>
    </div>
  );
}

function Rotate() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="rotate">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="rotate">
          <path d={svgPaths.p2e6e2d00} id="Vector" stroke="var(--stroke-0, #6B697B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function PrimaryActio() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="Primary actio">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-center px-[16px] py-[12px] relative w-full">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#3d3c52] text-[14px] text-center text-nowrap">Switch back to legacy</p>
          <Rotate />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#dfdde7] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Confetti() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="confetti">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="confetti">
          <path d={svgPaths.p6820480} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function PrimaryActio1() {
  return (
    <div className="basis-0 bg-[#0975d7] grow min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="Primary actio">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-center px-[16px] py-[12px] relative w-full">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-center text-nowrap text-white">Let’s explore</p>
          <Confetti />
        </div>
      </div>
    </div>
  );
}

function Content1() {
  return (
    <div className="content-stretch flex gap-[12px] items-start justify-center pb-[24px] pt-0 px-[24px] relative shrink-0 w-[560px]" data-name="Content">
      <PrimaryActio />
      <PrimaryActio1 />
    </div>
  );
}

function ModalActions() {
  return (
    <div className="content-stretch flex flex-col items-center pb-0 pt-[32px] px-0 relative shrink-0 w-full" data-name="_Modal actions">
      <DividerWrap />
      <Content1 />
    </div>
  );
}

export default function Help() {
  return (
    <div className="bg-white content-stretch flex flex-col items-center overflow-clip relative rounded-[12px] shadow-[0px_20px_24px_-4px_rgba(16,24,40,0.08),0px_8px_8px_-4px_rgba(16,24,40,0.03)] size-full" data-name="Help">
      <Content />
      <ModalActions />
    </div>
  );
}