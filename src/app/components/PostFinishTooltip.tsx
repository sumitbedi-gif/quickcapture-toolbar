import { useLayoutEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PostFinishTooltipProps {
  mode: 'capture-navigate' | 'capture-stay' | null;
  onClose: () => void;
}

interface TooltipStep {
  elementId: string;
  title: string;
  description: string;
}

const STEPS: Record<'capture-navigate' | 'capture-stay', TooltipStep[]> = {
  'capture-navigate': [
    {
      elementId: 'new-contact-button',
      title: 'Step 1 — Click New Contact',
      description: 'Start by clicking <strong>New Contact</strong> to open the form. This is where your users will begin adding a contact to the CRM.',
    },
  ],
  'capture-stay': [
    {
      elementId: 'new-contact-button',
      title: 'Step 1 — New Contact',
      description: 'Click <strong>New Contact</strong> to open the add-contact form. This is the primary entry point for creating new CRM records.',
    },
    {
      elementId: 'stat-contacts-card',
      title: 'Step 2 — Total Contacts',
      description: 'The <strong>Total Contacts</strong> card shows how many contacts are in your CRM. It updates in real time as new records are added.',
    },
    {
      elementId: 'stat-deals-card',
      title: 'Step 3 — Open Deals',
      description: 'The <strong>Open Deals</strong> card tracks active opportunities in your pipeline. Deals closing soon are highlighted in amber.',
    },
    {
      elementId: 'stat-revenue-card',
      title: 'Step 4 — Revenue MTD',
      description: 'The <strong>Revenue MTD</strong> card shows month-to-date revenue with a percentage change vs. the previous month.',
    },
  ],
};

interface TooltipPos {
  left: number;
  top: number;
  arrowSide: 'top' | 'bottom';
  arrowLeft: number;
  ringLeft: number;
  ringTop: number;
  ringWidth: number;
  ringHeight: number;
}

function computePos(elementId: string): TooltipPos | null {
  const el = document.querySelector(`[data-element-id="${elementId}"]`);
  if (!el) return null;
  const rect = el.getBoundingClientRect();
  if (rect.width === 0 && rect.height === 0) return null;

  const TW = 320;
  const TH = 190;
  const GAP = 14;

  const spaceBelow = window.innerHeight - rect.bottom;
  const arrowSide: 'top' | 'bottom' = spaceBelow >= TH + GAP + 20 ? 'top' : 'bottom';
  const tooltipTop = arrowSide === 'top' ? rect.bottom + GAP : rect.top - TH - GAP;

  let tooltipLeft = rect.left + rect.width / 2 - TW / 2;
  tooltipLeft = Math.max(12, Math.min(tooltipLeft, window.innerWidth - TW - 12));

  const arrowLeft = Math.max(16, Math.min(
    rect.left + rect.width / 2 - tooltipLeft,
    TW - 24
  ));

  return {
    left: tooltipLeft,
    top: tooltipTop,
    arrowSide,
    arrowLeft,
    ringLeft: rect.left - 3,
    ringTop: rect.top - 3,
    ringWidth: rect.width + 6,
    ringHeight: rect.height + 6,
  };
}

export function PostFinishTooltip({ mode, onClose }: PostFinishTooltipProps) {
  const [stepIdx, setStepIdx] = useState(0);
  const [pos, setPos] = useState<TooltipPos | null>(null);

  const steps = mode ? STEPS[mode] : [];
  const currentStep = steps[stepIdx];

  useLayoutEffect(() => {
    if (!mode || !currentStep) {
      setPos(null);
      return;
    }
    setPos(computePos(currentStep.elementId));
  }, [stepIdx]); // eslint-disable-line react-hooks/exhaustive-deps
  // `stepIdx` is the only real dependency — mode never changes while this instance is mounted
  // because App.tsx uses key={postFinishMode} to remount on mode change

  if (!mode || steps.length === 0) return null;

  const isFirst = stepIdx === 0;
  const isLast = stepIdx === steps.length - 1;

  return (
    <AnimatePresence>
      {pos && (
        <>
          {/* Highlight ring */}
          <motion.div
            key={`ring-${stepIdx}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed z-[90] pointer-events-none rounded-[4px]"
            style={{
              left: pos.ringLeft,
              top: pos.ringTop,
              width: pos.ringWidth,
              height: pos.ringHeight,
              border: '2px solid #6366f1',
              boxShadow: '0 0 0 4px rgba(99, 102, 241, 0.12)',
            }}
          />

          {/* Tooltip card */}
          <motion.div
            key={`tooltip-${stepIdx}`}
            initial={{ opacity: 0, y: pos.arrowSide === 'top' ? -8 : 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: pos.arrowSide === 'top' ? -8 : 8 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="fixed z-[91] bg-white rounded-2xl w-[320px] overflow-visible"
            style={{
              left: pos.left,
              top: pos.top,
              boxShadow: '0 4px 24px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)',
              border: '1px solid rgba(0,0,0,0.07)',
            }}
          >
            {/* Arrow pointing up toward element */}
            {pos.arrowSide === 'top' && (
              <div
                className="absolute -top-[8px] w-[15px] h-[15px] bg-white border-l border-t border-black/[0.07]"
                style={{ left: pos.arrowLeft - 7, transform: 'rotate(45deg)' }}
              />
            )}
            {/* Arrow pointing down toward element */}
            {pos.arrowSide === 'bottom' && (
              <div
                className="absolute -bottom-[8px] w-[15px] h-[15px] bg-white border-r border-b border-black/[0.07]"
                style={{ left: pos.arrowLeft - 7, transform: 'rotate(45deg)' }}
              />
            )}

            {/* Body */}
            <div className="p-4 pb-3">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full tracking-wide">
                  {stepIdx + 1} of {steps.length}
                </span>
                <button
                  onClick={onClose}
                  className="text-gray-300 hover:text-gray-500 transition-colors rounded p-0.5 -mr-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-[14px] font-semibold text-gray-900 mb-1 leading-snug">
                {currentStep.title}
              </p>
              <p
                className="text-[13px] text-gray-500 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: currentStep.description }}
              />
            </div>

            {/* Footer */}
            <div className="border-t border-gray-100 px-4 py-3 flex items-center justify-between">
              {/* Progress dots */}
              <div className="flex items-center gap-1.5">
                {steps.map((_, i) => (
                  <div
                    key={i}
                    className={`rounded-full transition-all duration-200 ${
                      i === stepIdx ? 'w-4 h-2 bg-indigo-500' : 'w-2 h-2 bg-gray-200'
                    }`}
                  />
                ))}
              </div>

              {/* Navigation buttons */}
              <div className="flex items-center gap-2">
                {steps.length > 1 && (
                  <button
                    onClick={() => setStepIdx(i => i - 1)}
                    disabled={isFirst}
                    className="text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed text-[13px] font-medium px-3 py-1.5 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors disabled:hover:border-gray-200 disabled:hover:text-gray-400"
                  >
                    ← Back
                  </button>
                )}
                <button
                  onClick={() => isLast ? onClose() : setStepIdx(i => i + 1)}
                  className="bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-[13px] font-medium px-4 py-1.5 rounded-lg transition-colors"
                >
                  {isLast ? 'Got it' : 'Next →'}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
