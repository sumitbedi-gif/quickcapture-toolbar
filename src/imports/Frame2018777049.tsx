function Frame2() {
  return (
    <div className="basis-0 content-stretch flex grow items-center min-h-px min-w-px relative shrink-0">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-nowrap text-white">Don’t need a screenshot? Add step without one</p>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-white content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[12px] py-[6px] relative rounded-[8px] shrink-0" data-name="Button">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#3d3c52] text-[14px] text-center text-nowrap">Add step</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0 w-full">
      <Frame2 />
      <Button />
    </div>
  );
}

export default function Frame() {
  return (
    <div className="bg-[#0975d7] content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative rounded-tl-[12px] rounded-tr-[12px] size-full">
      <Frame1 />
    </div>
  );
}