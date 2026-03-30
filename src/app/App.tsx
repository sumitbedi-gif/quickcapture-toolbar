import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useMotionValue } from 'motion/react';
import { Toolbar } from './components/Toolbar';
import { FreeFloatingBanner, NavigationDisabledBanner } from './components/FreeFloatingBanner';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner';
import { DummyApp } from './components/DummyApp';
import { PostFinishTooltip } from './components/PostFinishTooltip';

import { AlertModal } from './components/AlertModal';
import { ExitModal } from './components/ExitModal';
import { HelpPopup } from './components/HelpPopup';

export default function App() {
  const [stepCount, setStepCount] = useState(0);
  const [steps, setSteps] = useState<{id: string, number: number}[]>([]);
  const [nextStepNumber, setNextStepNumber] = useState(1);
  const [activeTool, setActiveTool] = useState('click');
  const [clickMode, setClickMode] = useState<'click' | 'hand' | 'capture'>('click');
  const [blurMode, setBlurMode] = useState<'censor' | 'multiselect'>('censor');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState<{x:number, y:number} | null>(null);
  const [clickedElements, setClickedElements] = useState<{id: string, label: string}[]>([]);
  const [activePage, setActivePage] = useState<'main' | 'form'>('main');
  const [isHoveringFloatingButton, setIsHoveringFloatingButton] = useState(false);
  const [showStartOverModal, setShowStartOverModal] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [capturedArea, setCapturedArea] = useState<{x: number, y: number, width: number, height: number} | null>(null);
  const [dragTooltipState, setDragTooltipState] = useState<'drag' | 'captured'>('drag');
  const [showInsertCard] = useState<{show: boolean, stepNumber: number, screenshot: string | null}>({
    show: false, stepNumber: 0, screenshot: null
  });
  const [postFinishMode, setPostFinishMode] = useState<'capture-navigate' | 'capture-stay' | null>(null);

  const toolbarX = useMotionValue(0);
  const toolbarY = useMotionValue(0);
  const toolbarContainerRef = useRef<HTMLDivElement>(null);

  const handleGripPointerDown = (e: React.PointerEvent) => {
    const startX = e.clientX - toolbarX.get();
    const startY = e.clientY - toolbarY.get();

    const onMove = (ev: PointerEvent) => {
      const el = toolbarContainerRef.current;
      const newX = ev.clientX - startX;
      const newY = ev.clientY - startY;
      if (el) {
        const w = el.offsetWidth;
        const h = el.offsetHeight;
        const baseLeft = window.innerWidth / 2 - 124;
        const baseTop = window.innerHeight - 40 - h;
        toolbarX.set(Math.max(-baseLeft + 8, Math.min(window.innerWidth - baseLeft - w - 8, newX)));
        toolbarY.set(Math.max(-baseTop + 8, Math.min(40, newY)));
      } else {
        toolbarX.set(newX);
        toolbarY.set(newY);
      }
    };

    const onUp = () => window.removeEventListener('pointermove', onMove);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp, { once: true });
  };

  // Censor mode state
  const censoredRefs = useRef<Map<string, HTMLElement>>(new Map());
  const [censoredIds, setCensoredIds] = useState<string[]>([]);

  // Hover highlight overlay (direct DOM for perf — no re-renders on mousemove)
  const hoverOverlayRef = useRef<HTMLDivElement>(null);

  const isClickNavigateActive = (activeTool === 'click' || activeTool === 'pause') && clickMode === 'click';
  const isClickStayActive = (activeTool === 'click' || activeTool === 'pause') && clickMode === 'hand';
  const isFreeFloatingActive = activeTool === 'click' && clickMode === 'capture';
  const isCensorActive = activeTool === 'blur' && blurMode === 'censor';

  const [captureTooltip, setCaptureTooltip] = useState<{x: number, y: number, id: number, count: number} | null>(null);

  // ─── JS inspector-style hover highlight ───────────────────────────────────
  useEffect(() => {
    const overlay = hoverOverlayRef.current;
    if (!overlay) return;

    const needsHighlight = (isClickNavigateActive || isClickStayActive || isCensorActive) && activeTool !== 'pause' && !postFinishMode;

    if (!needsHighlight) {
      overlay.style.opacity = '0';
      return;
    }

    const hide = () => { overlay.style.opacity = '0'; };

    const onMove = (e: MouseEvent) => {
      const toolbarRoot = document.querySelector('[data-toolbar-root]');
      const el = document.elementFromPoint(e.clientX, e.clientY);

      if (!el || !(el instanceof HTMLElement) || toolbarRoot?.contains(el)) {
        hide();
        return;
      }

      // Skip censor overlays themselves
      if (el.hasAttribute('data-censor-overlay')) {
        hide();
        return;
      }

      const rect = el.getBoundingClientRect();
      // Skip degenerate rects (invisible or full-page wrappers)
      if (rect.width < 4 || rect.height < 4 || rect.width > window.innerWidth * 0.98) {
        hide();
        return;
      }

      overlay.style.left   = rect.left   + 'px';
      overlay.style.top    = rect.top    + 'px';
      overlay.style.width  = rect.width  + 'px';
      overlay.style.height = rect.height + 'px';
      overlay.style.opacity = '1';

      if (isCensorActive) {
        overlay.style.border     = '1.5px solid rgba(139, 92, 246, 0.75)';
        overlay.style.background = 'transparent';
      } else {
        overlay.style.border     = '1.5px solid rgba(220, 38, 38, 0.65)';
        overlay.style.background = 'transparent';
      }
    };

    document.addEventListener('mousemove', onMove);
    document.body.addEventListener('mouseleave', hide);
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.body.removeEventListener('mouseleave', hide);
      hide();
    };
  }, [isClickNavigateActive, isClickStayActive, isCensorActive, activeTool, postFinishMode]);

  // ─── Step helpers ──────────────────────────────────────────────────────────
  const triggerCaptureTooltip = (x: number, y: number, count: number) => {
    setCaptureTooltip({ x, y, id: Date.now(), count });
    setTimeout(() => setCaptureTooltip(null), 500);
  };

  const addStep = () => {
    setSteps(prev => [...prev, { id: Math.random().toString(36).substring(7), number: nextStepNumber }]);
    setNextStepNumber(prev => prev + 1);
    setStepCount(prev => prev + 1);
  };

  const removeStep = (id: string) => {
    setSteps(prev => prev.filter(step => step.id !== id));
    setStepCount(prev => Math.max(0, prev - 1));
  };

  // ─── Click handler for Mode 1 + Mode 2 ────────────────────────────────────
  const handleElementClick = (elementId: string, elementLabel: string) => {
    if (activeTool === 'click' || activeTool === 'pause') {
      if (activeTool !== 'pause') {
        addStep();
        triggerCaptureTooltip(mousePos.x, mousePos.y, steps.length + 1);
      }
      if (clickMode === 'hand') {
        setClickedElements(prev => [...prev, { id: elementId, label: elementLabel }]);
      }
    }
  };

  // ─── Censor click handler (called via onClickCapture on DummyApp wrapper) ─
  const handleCensorClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    const target = e.target as HTMLElement;
    if (!target || target === document.body || target === document.documentElement) return;

    // Walk up to find a meaningfully-sized element
    let el: HTMLElement = target;
    while (el && el !== document.body) {
      const rect = el.getBoundingClientRect();
      if (rect.width >= 20 && rect.height >= 10) break;
      el = el.parentElement as HTMLElement;
    }
    if (!el || el === document.body) return;

    const existingId = el.getAttribute('data-element-id');
    const censorId   = existingId || el.getAttribute('data-censor-id');

    // Toggle: if already censored, remove
    if (censorId && censoredIds.includes(censorId)) {
      setCensoredIds(prev => prev.filter(id => id !== censorId));
      if (!existingId) {
        el.removeAttribute('data-censor-id');
        censoredRefs.current.delete(censorId);
      }
      return;
    }

    // Add new censor
    const newId = censorId || `censor-${Date.now()}`;
    if (!existingId && !el.getAttribute('data-censor-id')) {
      el.setAttribute('data-censor-id', newId);
    }
    censoredRefs.current.set(newId, el);
    setCensoredIds(prev => [...prev, newId]);
  };

  const removeCensorOverlay = (id: string) => {
    const el = censoredRefs.current.get(id);
    if (el && !el.getAttribute('data-element-id')) {
      el.removeAttribute('data-censor-id');
    }
    censoredRefs.current.delete(id);
    setCensoredIds(prev => prev.filter(i => i !== id));
  };

  // ─── Mouse events ──────────────────────────────────────────────────────────
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isFreeFloatingActive || isClickNavigateActive || isClickStayActive) {
      setMousePos({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isFreeFloatingActive) {
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (isFreeFloatingActive && dragStart) {
      const distance = Math.hypot(e.clientX - dragStart.x, e.clientY - dragStart.y);
      if (distance > 10) {
        addStep();
        const area = {
          x: Math.min(dragStart.x, mousePos.x),
          y: Math.min(dragStart.y, mousePos.y),
          width:  Math.abs(mousePos.x - dragStart.x),
          height: Math.abs(mousePos.y - dragStart.y),
        };
        setCapturedArea(area);
        setDragTooltipState('captured');
        setTimeout(() => {
          setCapturedArea(null);
          setTimeout(() => setDragTooltipState('drag'), 1500);
        }, 600);
      }
      setDragStart(null);
    }
  };

  // ─── Toolbar actions ───────────────────────────────────────────────────────
  const handleRestart = () => setShowStartOverModal(true);

  const confirmRestart = () => {
    setSteps([]);
    setStepCount(0);
    setNextStepNumber(1);
    setActiveTool('click');
    setClickMode('click');
    setActivePage('main');
    setClickedElements([]);
    setPostFinishMode(null);
    setCensoredIds([]);
    censoredRefs.current.clear();
    setShowStartOverModal(false);
  };

  const handleCancel = () => setShowExitModal(true);

  const confirmExit = () => {
    setShowExitModal(false);
    toast("Exited to Studio", { duration: 2000 });
  };

  const handleHelp = () => setShowHelpModal(true);

  const handleCaptureWithoutScreenshot = () => addStep();

  const handleDone = () => {
    if (stepCount > 0) {
      if (clickMode === 'click') {
        setPostFinishMode('capture-navigate');
      } else if (clickMode === 'hand') {
        setPostFinishMode('capture-stay');
      } else {
        toast("Flow built", { duration: 2000 });
      }
    }
  };

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <div
      className="fixed inset-0 flex flex-col bg-white"
      onMouseMove={handleMouseMove}
    >
      {/* Inspector-style hover highlight overlay */}
      <div
        ref={hoverOverlayRef}
        className="fixed pointer-events-none z-20 rounded-[3px]"
        style={{ opacity: 0, transition: 'opacity 0.08s ease' }}
      />

      {/* DummyApp */}
      <div
        className="flex-1 overflow-auto pb-32"
        onClickCapture={isCensorActive ? handleCensorClick : undefined}
      >
        <DummyApp
          currentPage={activePage}
          onNavigate={(page) => {
            if (clickMode === 'click') setActivePage(page);
          }}
          isInteractable={isClickNavigateActive || isClickStayActive || isCensorActive}
          onElementClick={handleElementClick}
          clickedElements={isClickStayActive ? clickedElements.map(el => el.id) : []}
        />
      </div>

      {/* Censor frosted-glass overlays */}
      <AnimatePresence>
        {isCensorActive && censoredIds.map(id => {
          const el = censoredRefs.current.get(id);
          if (!el) return null;
          const rect = el.getBoundingClientRect();
          if (rect.width === 0 && rect.height === 0) return null;
          return (
            <motion.div
              key={id}
              data-censor-overlay="true"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.15 }}
              className="fixed z-30 cursor-pointer group"
              style={{
                left:   rect.left,
                top:    rect.top,
                width:  rect.width,
                height: rect.height,
                backdropFilter:        'blur(9px)',
                WebkitBackdropFilter:  'blur(9px)',
                background:  'rgba(200, 195, 220, 0.08)',
                borderRadius: '4px',
                border: '1px dashed rgba(139, 92, 246, 0.4)',
              }}
              onClick={(e) => { e.stopPropagation(); removeCensorOverlay(id); }}
            >
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Click-Stay border overlay */}
      {isClickStayActive && (
        <div className="fixed inset-0 border-[6px] border-[#0975d7] pointer-events-none z-40" />
      )}

      {/* Capture tooltip (step recorded badge) */}
      <AnimatePresence>
        {captureTooltip && (
          <motion.div
            key={captureTooltip.id}
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            transition={{ duration: 0.1 }}
            className="fixed z-[60] bg-[#1f1f32] text-white text-xs px-2 py-1.5 rounded shadow-lg pointer-events-none flex items-center gap-1.5 border border-[#2b2b40]"
            style={{ left: mousePos.x + 16, top: mousePos.y }}
          >
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
            {captureTooltip.count} steps captured
          </motion.div>
        )}
      </AnimatePresence>

      {/* Free Floating Overlay */}
      {isFreeFloatingActive && (
        <>
          <div
            className="fixed inset-0 z-30 cursor-crosshair"
            onMouseMove={handleMouseMove}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
          />
          {dragStart && (
            <div
              className="fixed border-2 border-[#0975d7] bg-[#0975d7]/10 z-30 pointer-events-none"
              style={{
                left:   Math.min(dragStart.x, mousePos.x),
                top:    Math.min(dragStart.y, mousePos.y),
                width:  Math.abs(mousePos.x - dragStart.x),
                height: Math.abs(mousePos.y - dragStart.y),
              }}
            />
          )}
          <AnimatePresence>
            {capturedArea && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.8, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="fixed border-2 border-[#10B981] bg-white z-40 pointer-events-none"
                style={{
                  left:   capturedArea.x,
                  top:    capturedArea.y,
                  width:  capturedArea.width,
                  height: capturedArea.height,
                }}
              />
            )}
          </AnimatePresence>
          {!isHoveringFloatingButton && !dragStart && (
            <AnimatePresence mode="wait">
              {dragTooltipState === 'drag' ? (
                <motion.div
                  key="drag"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="fixed z-50 pointer-events-none flex flex-col items-start gap-1 bg-white px-3 py-2 rounded-md shadow-lg border border-gray-100"
                  style={{ left: mousePos.x + 5, top: mousePos.y + 5 }}
                >
                  <p className="text-[12px] font-medium text-gray-800">Drag to capture screenshot</p>
                  <p className="text-[10px] text-gray-500">This adds a step with the screenshot</p>
                </motion.div>
              ) : (
                <motion.div
                  key="captured"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="fixed z-50 pointer-events-none flex items-center gap-2 bg-white px-3 py-2 rounded-md shadow-lg border border-gray-100"
                  style={{ left: mousePos.x + 5, top: mousePos.y + 5 }}
                >
                  <svg className="w-4 h-4 text-[#10B981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <motion.path
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <p className="text-[12px] font-medium text-gray-800">Captured</p>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </>
      )}

      {/* Post-Finish Tooltip */}
      <PostFinishTooltip
        key={postFinishMode ?? 'none'}
        mode={postFinishMode}
        onClose={() => setPostFinishMode(null)}
      />

      {/* Modals */}
      <AnimatePresence>
        {showStartOverModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50"
          >
            <AlertModal onConfirm={confirmRestart} onCancel={() => setShowStartOverModal(false)} onExit={() => { setShowStartOverModal(false); confirmExit(); }} />
          </motion.div>
        )}
        {showExitModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50"
          >
            <ExitModal onConfirm={confirmExit} onCancel={() => setShowExitModal(false)} />
          </motion.div>
        )}
        {showHelpModal && (
          <div className="fixed inset-0 z-[100] flex items-end justify-center pb-[120px]">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40"
              onClick={() => setShowHelpModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative z-10"
            >
              <HelpPopup onClose={() => setShowHelpModal(false)} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Toolbar + Banners */}
      <motion.div
        ref={toolbarContainerRef}
        data-toolbar-root
        className="fixed bottom-10 z-50 flex flex-col items-start gap-0 select-none"
        style={{ left: 'calc(50% - 124px)', x: toolbarX, y: toolbarY }}
      >
        <AnimatePresence mode="wait">
          {isFreeFloatingActive && (
            <motion.div
              key="free-floating"
              initial={{ y: "100%", opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: "100%", opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", bounce: 0, duration: 0.3 }}
              className="w-[96%] relative z-0 -mb-2"
              onMouseEnter={() => setIsHoveringFloatingButton(true)}
              onMouseLeave={() => setIsHoveringFloatingButton(false)}
            >
              <FreeFloatingBanner onAddStep={handleCaptureWithoutScreenshot} />
            </motion.div>
          )}
          {isClickStayActive && (
            <motion.div
              key="nav-disabled"
              initial={{ y: "100%", opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: "100%", opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", bounce: 0, duration: 0.3 }}
              className="w-[96%] relative z-0 -mb-2"
            >
              <NavigationDisabledBanner />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative z-10">
          <Toolbar
            stepCount={steps.length}
            setStepCount={(count) => {
              if (count === 0) {
                setSteps([]);
                setStepCount(0);
                setNextStepNumber(1);
              }
            }}
            steps={steps}
            onDeleteStep={removeStep}
            activeTool={activeTool}
            setActiveTool={setActiveTool}
            clickMode={clickMode}
            setClickMode={setClickMode}
            blurMode={blurMode}
            setBlurMode={setBlurMode}
            onRestart={handleRestart}
            onCancel={handleCancel}
            onHelp={handleHelp}
            onDone={handleDone}
            onGripPointerDown={handleGripPointerDown}
          />
        </div>
      </motion.div>

      {/* Insert Card Animation (legacy, kept for compatibility) */}
      {showInsertCard.show && (
        <div
          className="fixed left-1/2 bg-white rounded-lg shadow-xl border border-gray-200 pointer-events-none z-45 p-4 w-80"
          style={{ animation: 'insertCard 1.2s cubic-bezier(0.34, 1.2, 0.64, 1) forwards' }}
        >
          <h3 className="font-semibold text-gray-900 mb-3">Step {showInsertCard.stepNumber}</h3>
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded w-3/4" />
            <div className="h-3 bg-gray-200 rounded w-full" />
            <div className="h-3 bg-gray-200 rounded w-5/6" />
          </div>
        </div>
      )}

      <Toaster position="bottom-center" offset={104} />
    </div>
  );
}
