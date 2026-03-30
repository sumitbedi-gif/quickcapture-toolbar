import React from 'react';

function AlertCircleIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="#b3141d" strokeWidth="2" />
      <path d="M12 8v4" stroke="#b3141d" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="16" r="1" fill="#b3141d" />
    </svg>
  );
}

function RotateIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3d3c52" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  );
}

function ExitIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}

interface AlertModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  onExit?: () => void;
}

export function AlertModal({ onConfirm, onCancel, onExit }: AlertModalProps) {
  return (
    <div className="bg-white rounded-[12px] shadow-[0px_8px_40px_rgba(0,0,0,0.14)] w-[540px] overflow-hidden">
      {/* Header */}
      <div className="flex items-start gap-[14px] px-[24px] pt-[24px] pb-[12px]">
        {/* Icon */}
        <div className="bg-[#fef2f2] rounded-full p-[10px] shrink-0 mt-[1px]">
          <AlertCircleIcon />
        </div>

        {/* Title + body */}
        <div className="flex-1 min-w-0">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[18px] text-[#1f1f32] leading-[26px]">
            Discard?
          </p>
          <p className="font-['Inter:Regular',sans-serif] text-[14px] text-[#525066] leading-[22px] mt-[6px]">
            This will delete all the captured steps.
          </p>
        </div>

        {/* Close X */}
        <button
          className="text-[#6B697B] hover:text-[#3d3c52] transition-colors p-[4px] shrink-0 cursor-pointer"
          onClick={onCancel}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-end gap-[10px] px-[24px] py-[20px]">
        {/* Start over (outlined) */}
        <div
          className="relative rounded-[8px] cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={onConfirm}
        >
          <div className="flex items-center gap-[8px] px-[18px] py-[10px]">
            <RotateIcon />
            <p className="font-['Inter:Medium',sans-serif] font-medium text-[14px] text-[#3d3c52]">Start over</p>
          </div>
          <div aria-hidden="true" className="absolute border border-[#dfdde7] inset-0 pointer-events-none rounded-[8px]" />
        </div>

        {/* Exit (dark red) */}
        <div
          className="bg-[#9B1C1C] rounded-[8px] cursor-pointer hover:bg-[#7f1d1d] transition-colors"
          onClick={onExit ?? onCancel}
        >
          <div className="flex items-center gap-[8px] px-[18px] py-[10px]">
            <ExitIcon />
            <p className="font-['Inter:Medium',sans-serif] font-medium text-[14px] text-white">Exit</p>
          </div>
        </div>
      </div>
    </div>
  );
}
