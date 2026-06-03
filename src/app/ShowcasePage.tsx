import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue } from 'motion/react';
import { Toolbar } from './components/Toolbar';
import {
  FreeFloatingBanner,
  NavigationDisabledBanner,
  CensorBanner,
  MultiSelectBanner,
} from './components/FreeFloatingBanner';

/* ============================================================================
   Quick Capture Toolbar 2.0 — one-page spec sheet.
   Editorial, left-led layout: an asymmetric hero, the live playground
   (untouched), an editorial principles narrative, then a differentiated
   feature breakdown. Built to share with stakeholders.
   Reachable at  #showcase .

   Type:  Space Grotesk for display, Inter for text (loaded in index.html).
   Colour: one blue, reserved for the primary CTA and the live active control
           inside the playground. Everything else is a warm ink ramp.
   ========================================================================== */

const APP_URL = `${window.location.pathname}${window.location.search}`; // the real app (no hash)

// Type stacks.
const DISPLAY = "'Space Grotesk', 'Inter', system-ui, sans-serif";
const TEXT = "'Inter', system-ui, sans-serif";

// Warm ink ramp (replaces the six cold hand-tuned greys).
const INK = {
  900: '#1a1a24', // primary text
  600: '#56555f', // body text
  400: '#8a8992', // muted / meta
  200: '#dcdce2', // hairlines / borders
  bg:  '#fafaf8', // warm near-white page
  surface: '#ffffff',
};
const ACCENT = '#0975d7'; // the one blue — CTA + live active control only

// ─── Tiny toolbar-matching icons (used in the feature breakdown) ───────────────
function MiniIcon({ children }: { children: React.ReactNode }) {
  return (
    <svg
      width={18} height={18} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
      className="block shrink-0"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      {children}
    </svg>
  );
}
const Icons = {
  click: (
    <MiniIcon>
      <path d="M3 12l3 0" /><path d="M12 3l0 3" /><path d="M7.8 7.8l-2.2 -2.2" />
      <path d="M16.2 7.8l2.2 -2.2" /><path d="M7.8 16.2l-2.2 2.2" />
      <path d="M12 12l9 3l-4 2l-2 4l-3 -9" />
    </MiniIcon>
  ),
  hand: (
    <MiniIcon>
      <path d="M8 13v-7.5a1.5 1.5 0 0 1 3 0v6.5" /><path d="M11 5.5v-2a1.5 1.5 0 1 1 3 0v8.5" />
      <path d="M14 5.5a1.5 1.5 0 0 1 3 0v6.5" />
      <path d="M17 7.5a1.5 1.5 0 0 1 3 0v8.5a6 6 0 0 1 -6 6h-2h.208a6 6 0 0 1 -5.012 -2.7a69.74 69.74 0 0 1 -.196 -.3c-.312 -.479 -1.407 -2.388 -3.286 -5.728a1.5 1.5 0 0 1 .536 -2.022a1.867 1.867 0 0 1 2.28 .28l1.762 1.78" />
    </MiniIcon>
  ),
  capture: (
    <MiniIcon>
      <path d="M4 7l16 0" /><path d="M4 17l16 0" /><path d="M7 4l0 16" /><path d="M17 4l0 16" />
    </MiniIcon>
  ),
  multiselect: (
    <MiniIcon>
      <path d="M19 11v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2" />
      <path d="M13 13l9 3l-4 2l-2 4l-3 -9" />
      <path d="M3 3l0 .01" /><path d="M7 3l0 .01" /><path d="M11 3l0 .01" /><path d="M15 3l0 .01" />
      <path d="M3 7l0 .01" /><path d="M3 11l0 .01" /><path d="M3 15l0 .01" />
    </MiniIcon>
  ),
  censor: (
    <MiniIcon>
      <path d="M12 3a9 9 0 0 0 0 18a9 9 0 0 0 0 -18z" />
      <path d="M12 3v18a9 9 0 0 0 0 -18z" fill="currentColor" />
    </MiniIcon>
  ),
  pause: (
    <MiniIcon>
      <path d="M6 5m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v12a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" />
      <path d="M14 5m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v12a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" />
    </MiniIcon>
  ),
  help: (
    <MiniIcon>
      <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M12 17l0 .01" />
      <path d="M12 13.5a1.5 1.5 0 0 1 1 -1.5a2.6 2.6 0 1 0 -3 -4" />
    </MiniIcon>
  ),
  done: (
    <MiniIcon>
      <path d="M5 12l5 5l10 -10" />
    </MiniIcon>
  ),
};

// ─── Feature data ─────────────────────────────────────────────────────────────
type FeatureKey =
  | 'click' | 'hand' | 'capture'
  | 'multiselect' | 'censor'
  | 'pause' | 'help' | 'done';

interface Feature {
  key: FeatureKey;
  title: string;
  blurb: string;
  icon: React.ReactNode;
}

interface Group {
  n: string;
  name: string;
  hint: string;
  features: Feature[];
}

const GROUPS: Group[] = [
  {
    n: '01', name: 'Capture modes', hint: 'Three ways to record a step',
    features: [
      {
        key: 'click', icon: Icons.click, title: 'Capture & navigate',
        blurb: 'The default. Click through the live application and every click becomes a step, and the flow follows you from page to page as you go.',
      },
      {
        key: 'hand', icon: Icons.hand, title: 'Capture without navigation',
        blurb: 'Navigation is blocked, but you can still select elements and record several steps on a single screen. Perfect for menus, dropdowns and dialogs.',
      },
      {
        key: 'capture', icon: Icons.capture, title: 'Free floating',
        blurb: 'Drag to frame any region of the screen. The selection is captured as a screenshot and becomes a free-floating tooltip, latched to nothing.',
      },
    ],
  },
  {
    n: '02', name: 'Select modes', hint: 'Work across many elements',
    features: [
      {
        key: 'censor', icon: Icons.censor, title: 'Censor sensitive data',
        blurb: 'Blur anything private before it is captured. Click an element to mask it; click the blurred area again to reveal it.',
      },
      {
        key: 'multiselect', icon: Icons.multiselect, title: 'Multi-select',
        blurb: 'Click to add several elements to one step, then confirm. The toolbar drops straight back to Capture & navigate so you keep recording.',
      },
    ],
  },
  {
    n: '03', name: 'Controls', hint: 'Pause, get help, and finish',
    features: [
      {
        key: 'pause', icon: Icons.pause, title: 'Pause',
        blurb: 'Freeze capture and move around the app freely without recording a thing. Resume whenever you are ready.',
      },
      {
        key: 'help', icon: Icons.help, title: 'Help',
        blurb: 'Opens a quick reference for every mode, so an author who is new to the bar can orient themselves without leaving the page.',
      },
      {
        key: 'done', icon: Icons.done, title: 'Done',
        blurb: 'Finish the session and hand the captured steps off. One clear, terminal action, always within reach.',
      },
    ],
  },
];

// ─── Feature rows ─────────────────────────────────────────────────────────────
// Three weights so the breakdown isn't an identical card wall:
//   · 'feature' — the lead capture mode, given room
//   · 'row'     — a quiet text row with a hairline rule
//   · 'inline'  — compact, for the secondary controls

function FeatureLead({ f }: { f: Feature }) {
  return (
    <div className="group flex flex-col gap-4 rounded-[16px] border border-[var(--ink-200)] bg-[var(--surface)] p-6 sm:flex-row sm:items-start sm:gap-5">
      <div className="flex size-11 shrink-0 items-center justify-center rounded-[12px] bg-[var(--ink-900)] text-white">
        {f.icon}
      </div>
      <div className="min-w-0">
        <h3 className="text-[17px] font-semibold leading-[22px] text-[var(--ink-900)]" style={{ fontFamily: DISPLAY }}>
          {f.title}
        </h3>
        <p className="mt-2 max-w-[46ch] text-[14px] leading-[22px] text-[var(--ink-600)]">{f.blurb}</p>
      </div>
    </div>
  );
}

function FeatureRow({ f }: { f: Feature }) {
  return (
    <div className="flex items-start gap-4 border-t border-[var(--ink-200)] py-5 first:border-t-0">
      <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-[10px] bg-[var(--ink-900)]/[0.05] text-[var(--ink-900)]">
        {f.icon}
      </div>
      <div className="min-w-0">
        <h3 className="text-[15px] font-semibold leading-[20px] text-[var(--ink-900)]">{f.title}</h3>
        <p className="mt-1 max-w-[60ch] text-[13.5px] leading-[20px] text-[var(--ink-600)]">{f.blurb}</p>
      </div>
    </div>
  );
}

function FeatureInline({ f }: { f: Feature }) {
  return (
    <div className="flex items-start gap-3.5">
      <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-[9px] bg-[var(--ink-900)]/[0.05] text-[var(--ink-900)]">
        {f.icon}
      </div>
      <div className="min-w-0">
        <h3 className="text-[14px] font-semibold leading-[19px] text-[var(--ink-900)]">{f.title}</h3>
        <p className="mt-1 text-[13px] leading-[19px] text-[var(--ink-600)]">{f.blurb}</p>
      </div>
    </div>
  );
}

// ─── Design principles (scroll narrative) ──────────────────────────────────────
interface Principle {
  n: string;
  title: string;
  body: string;
  before: string; // v1
  after: string;  // v2
}

const PRINCIPLES: Principle[] = [
  {
    n: '01',
    title: 'A more compact toolbar',
    body: 'Related actions are now grouped behind a single control with a chevron, instead of spreading every mode across the bar. The toolbar takes up less room and is far easier to scan and understand at a glance.',
    before: 'Every mode sat out in the open, making a long, busy bar.',
    after: 'Related modes are grouped, so the bar stays short and clear.',
  },
  {
    n: '02',
    title: 'Informative assist banners',
    body: 'Modes that need a little more explaining now surface their own assist banner: a short line of guidance that appears right above the bar. It tells the author what this mode does and what to do next, exactly when they need it.',
    before: 'Deeper modes gave no in-context guidance.',
    after: 'A contextual banner explains the mode and the next action.',
  },
  {
    n: '03',
    title: 'Reduced colour, clearer actions',
    body: 'Colour now carries meaning instead of decoration. A single blue marks the one control that is active or primary; everything else stays calm and neutral, so the important action is always obvious.',
    before: 'Multiple colours competed and blurred what was primary.',
    after: 'One accent for the active control; neutral everywhere else.',
  },
  {
    n: '04',
    title: 'One icon language',
    body: 'A single icon family, with one grid, one stroke weight and one visual rhythm, runs across the bar, the menus and this page. Consistency makes each control feel like part of one considered system.',
    before: 'Mixed icon styles and weights across the toolbar.',
    after: 'A unified Tabler set: 24px grid, 2px stroke, throughout.',
  },
];

function PrincipleRow({ p }: { p: Principle }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12% 0px -12% 0px' }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="grid grid-cols-1 items-start gap-x-16 gap-y-7 lg:grid-cols-[7.5rem_minmax(0,1fr)]"
    >
      {/* oversized index as a typographic anchor */}
      <div
        aria-hidden
        className="select-none text-[64px] font-medium leading-none text-[var(--ink-200)] lg:text-[88px]"
        style={{ fontFamily: DISPLAY }}
      >
        {p.n}
      </div>

      <div>
        <h3
          className="text-[26px] font-semibold leading-[1.12] tracking-[-0.01em] text-[var(--ink-900)] lg:text-[32px]"
          style={{ fontFamily: DISPLAY }}
        >
          {p.title}
        </h3>
        <p className="mt-3 max-w-[58ch] text-[16px] leading-[26px] text-[var(--ink-600)]">{p.body}</p>

        {/* before → after, as a quiet inline ledger (no card, no blue tint) */}
        <dl className="mt-6 grid max-w-[640px] grid-cols-1 gap-px overflow-hidden rounded-[12px] border border-[var(--ink-200)] sm:grid-cols-2">
          <div className="bg-[var(--surface)] px-5 py-4">
            <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--ink-400)]">Before</dt>
            <dd className="mt-1.5 text-[13.5px] leading-[20px] text-[var(--ink-400)]">{p.before}</dd>
          </div>
          <div className="bg-[var(--ink-900)] px-5 py-4 text-white">
            <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/55">Now</dt>
            <dd className="mt-1.5 text-[13.5px] font-medium leading-[20px] text-white">{p.after}</dd>
          </div>
        </dl>
      </div>
    </motion.article>
  );
}

// ─── The live, draggable playground stage ──────────────────────────────────────
function PlaygroundStage() {
  const [activeTool, setActiveTool] = useState('click');
  const [clickMode, setClickMode] = useState<'click' | 'hand' | 'capture'>('click');
  const [blurMode, setBlurMode] = useState<'censor' | 'multiselect'>('censor');
  const [stepCount, setStepCount] = useState(3);
  const [multiCount, setMultiCount] = useState(0);

  const toolbarX = useMotionValue(0);
  const toolbarY = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const onGrip = (e: React.PointerEvent) => {
    const startX = e.clientX - toolbarX.get();
    const startY = e.clientY - toolbarY.get();
    const move = (ev: PointerEvent) => { toolbarX.set(ev.clientX - startX); toolbarY.set(ev.clientY - startY); };
    const up = () => window.removeEventListener('pointermove', move);
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up, { once: true });
  };

  const isStay   = activeTool === 'click' && clickMode === 'hand';
  const isFree   = activeTool === 'click' && clickMode === 'capture';
  const isCensor = activeTool === 'blur'  && blurMode === 'censor';
  const isMulti  = activeTool === 'blur'  && blurMode === 'multiselect';

  React.useEffect(() => { if (!isMulti) setMultiCount(0); }, [isMulti]);

  const reset = () => {
    setActiveTool('click'); setClickMode('click'); setBlurMode('censor'); setStepCount(0);
    setMultiCount(0); toolbarX.set(0); toolbarY.set(0);
  };
  const addStep = () => setStepCount((c) => c + 1);

  const currentLabel = (() => {
    if (activeTool === 'pause') return 'Pause';
    if (activeTool === 'click') return clickMode === 'click' ? 'Capture & navigate' : clickMode === 'hand' ? 'Capture without navigation' : 'Free floating';
    return blurMode === 'multiselect' ? 'Multi-select' : 'Censor sensitive data';
  })();

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className="relative flex h-[440px] w-full items-center justify-center overflow-hidden rounded-[24px] border border-[#e7e7ee]"
        style={{
          background: 'radial-gradient(120% 120% at 50% 0%, #ffffff 0%, #eef0f6 55%, #e4e7f0 100%)',
        }}
      >
        {/* faint grid so the stage reads as an app surface */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(#1f1f32 1px, transparent 1px), linear-gradient(90deg, #1f1f32 1px, transparent 1px)',
            backgroundSize: '30px 30px',
            maskImage: 'radial-gradient(120% 90% at 50% 40%, #000 25%, transparent 78%)',
            WebkitMaskImage: 'radial-gradient(120% 90% at 50% 40%, #000 25%, transparent 78%)',
            opacity: 0.05,
          }}
        />
        {/* soft shadow pool under the bar */}
        <div
          className="pointer-events-none absolute bottom-[22%] left-1/2 h-[150px] w-[460px] -translate-x-1/2 rounded-full"
          style={{ background: 'radial-gradient(50% 50% at 50% 50%, rgba(31,31,50,0.10), transparent 70%)' }}
        />

        <div className="absolute left-7 top-6 flex items-center gap-2 text-[12px] font-medium tracking-wide text-[#8a8998]">
          <span className="size-1.5 rounded-full bg-[#10B981]" />
          Live · drag the grip, open the chevrons, try every control
        </div>
        <button
          onClick={reset}
          className="absolute right-7 top-5 rounded-full border border-[#dcdce4] bg-white/80 px-3 py-1 text-[12px] font-medium text-[#6b6a7c] backdrop-blur-sm transition-colors hover:border-[#c7c7d2] hover:text-[#1f1f32]"
        >
          Reset
        </button>

        <motion.div
          data-toolbar-root
          className="relative flex select-none flex-col items-stretch"
          style={{ x: toolbarX, y: toolbarY }}
        >
          {/* Banner — absolutely anchored ABOVE the bar so it floats in without
              nudging the toolbar. Sits on a clearly elevated surface so it never
              merges into the light stage behind it. */}
          <AnimatePresence mode="wait">
            {(isFree || isStay || isCensor || isMulti) && (
              <motion.div
                key={isFree ? 'free' : isStay ? 'stay' : isCensor ? 'censor' : 'multi'}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-full left-0 mb-[10px] w-full rounded-[12px]"
                style={{ filter: 'drop-shadow(0 10px 24px rgba(31,31,50,0.16))' }}
              >
                {isFree   && <FreeFloatingBanner onAddStep={addStep} />}
                {isStay   && <NavigationDisabledBanner />}
                {isCensor && <CensorBanner />}
                {isMulti  && (
                  <MultiSelectBanner
                    count={multiCount}
                    onConfirm={() => { addStep(); setMultiCount(0); setActiveTool('click'); setClickMode('click'); }}
                  />
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="relative drop-shadow-2xl">
            <Toolbar
              stepCount={stepCount}
              setStepCount={(c) => { if (c === 0) reset(); }}
              activeTool={activeTool}
              setActiveTool={setActiveTool}
              clickMode={clickMode}
              setClickMode={setClickMode}
              blurMode={blurMode}
              setBlurMode={setBlurMode}
              onRestart={reset}
              onCancel={() => {}}
              onHelp={() => {}}
              onDone={() => {}}
              onGripPointerDown={onGrip}
            />
          </div>

          {/* multi-select is interactive here — let viewers simulate a selection.
              Absolutely anchored BELOW so it likewise never shifts the bar. */}
          {isMulti && (
            <button
              onClick={() => setMultiCount((c) => c + 1)}
              className="absolute top-full left-1/2 mt-[10px] -translate-x-1/2 whitespace-nowrap text-[12px] font-medium text-[#6b6a7c] transition-colors hover:text-[#1f1f32]"
            >
              + simulate selecting an element ({multiCount})
            </button>
          )}
        </motion.div>
      </div>

      {/* status strip below the stage */}
      <div className="mt-4 flex items-center justify-between text-[13px] text-[#5b5a6e]">
        <span>
          Currently:{' '}
          <span className="font-semibold text-[#1f1f32]">{currentLabel}</span>
        </span>
        <span className="tabular-nums">{stepCount} step{stepCount === 1 ? '' : 's'} captured</span>
      </div>
    </div>
  );
}

// ─── Small bits ────────────────────────────────────────────────────────────────
function ArrowRight({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5">
      <path d="M5 12l14 0" /><path d="M13 18l6 -6" /><path d="M13 6l6 6" />
    </svg>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px w-7 bg-[var(--ink-200)]" />
      <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[var(--ink-400)]">{children}</span>
    </div>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────────────
export default function ShowcasePage() {
  const cssVars = {
    ['--ink-900' as string]: INK[900],
    ['--ink-600' as string]: INK[600],
    ['--ink-400' as string]: INK[400],
    ['--ink-200' as string]: INK[200],
    ['--surface' as string]: INK.surface,
  } as React.CSSProperties;

  return (
    <div
      className="fixed inset-0 overflow-auto text-[var(--ink-900)]"
      style={{ ...cssVars, backgroundColor: INK.bg, fontFamily: TEXT }}
    >
      {/* Top utility bar — logo is neutral; the one accent is saved for the CTA */}
      <div className="sticky top-0 z-20 border-b border-[var(--ink-200)]" style={{ backgroundColor: `${INK.bg}d9`, backdropFilter: 'blur(10px)' }}>
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-3.5 lg:px-12">
          <div className="flex items-center gap-2.5 text-[14px] font-semibold tracking-[-0.01em] text-[var(--ink-900)]" style={{ fontFamily: DISPLAY }}>
            <span className="flex size-6 items-center justify-center rounded-[7px] bg-[var(--ink-900)] text-white">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 12l9 3l-4 2l-2 4l-3 -9" /><path d="M3 12l3 0" /><path d="M12 3l0 3" />
              </svg>
            </span>
            Quick Capture
          </div>
          <a
            href={APP_URL}
            className="group inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold text-white transition-[background-color] hover:brightness-110"
            style={{ backgroundColor: ACCENT }}
          >
            Experience it
            <ArrowRight />
          </a>
        </div>
      </div>

      {/* ─── Hero — asymmetric, left-led ───────────────────────────────────── */}
      <header className="relative overflow-hidden">
        {/* oversized ghost wordmark anchoring the composition */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-6 top-1/2 hidden -translate-y-1/2 select-none leading-none text-[var(--ink-900)]/[0.035] lg:block"
          style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 'clamp(180px, 26vw, 380px)' }}
        >
          2.0
        </div>

        <div className="relative mx-auto max-w-[1200px] px-6 pt-20 pb-14 lg:px-12 lg:pt-28 lg:pb-16">
          <div className="max-w-[44ch]">
            <SectionLabel>Interactive spec sheet</SectionLabel>
            <h1
              className="mt-6 text-[46px] font-bold leading-[1.02] tracking-[-0.025em] text-[var(--ink-900)] lg:text-[72px]"
              style={{ fontFamily: DISPLAY }}
            >
              Quick Capture<br />Toolbar{' '}
              <span style={{ color: ACCENT }}>2.0</span>
            </h1>
            <p className="mt-7 max-w-[54ch] text-[18px] leading-[28px] text-[var(--ink-600)]">
              One floating bar that follows an author across their live app. Choose how each step is
              captured, mask anything sensitive, and finish, without ever leaving the page.
            </p>
            <div className="mt-9 flex items-center gap-5">
              <a
                href={APP_URL}
                className="group inline-flex items-center gap-2 rounded-full px-5 py-3 text-[14px] font-semibold text-white transition-[filter] hover:brightness-110"
                style={{ backgroundColor: ACCENT }}
              >
                Experience the toolbar
                <ArrowRight size={16} />
              </a>
              <span className="text-[13px] text-[var(--ink-400)]">or play with it live below</span>
            </div>
          </div>
        </div>
      </header>

      {/* ─── Playground — given its own wider frame; component left UNTOUCHED ── */}
      <section className="mx-auto max-w-[1240px] px-6 pb-28 lg:px-12 lg:pb-36">
        <PlaygroundStage />
      </section>

      {/* ─── Design principles — editorial scroll narrative ──────────────────── */}
      <section className="mx-auto max-w-[1200px] px-6 pb-28 lg:px-12 lg:pb-36">
        <div className="max-w-[46ch]">
          <SectionLabel>Design principles</SectionLabel>
          <h2
            className="mt-5 text-[34px] font-semibold leading-[1.08] tracking-[-0.02em] text-[var(--ink-900)] lg:text-[44px]"
            style={{ fontFamily: DISPLAY }}
          >
            The thinking behind 2.0
          </h2>
          <p className="mt-4 text-[16px] leading-[25px] text-[var(--ink-600)]">
            Four ideas guided the redesign. Read them top to bottom; each one shows what the old toolbar
            did, and what it does now.
          </p>
        </div>

        <div className="mt-16 flex flex-col gap-20 lg:mt-20 lg:gap-28">
          {PRINCIPLES.map((p) => (
            <PrincipleRow key={p.n} p={p} />
          ))}
        </div>
      </section>

      {/* ─── How it works — differentiated by group, not a card wall ─────────── */}
      <section className="border-t border-[var(--ink-200)]" style={{ backgroundColor: INK.surface }}>
        <div className="mx-auto max-w-[1200px] px-6 py-24 lg:px-12 lg:py-28">
          <div className="max-w-[44ch]">
            <SectionLabel>How it works</SectionLabel>
            <h2
              className="mt-5 text-[34px] font-semibold leading-[1.08] tracking-[-0.02em] text-[var(--ink-900)] lg:text-[44px]"
              style={{ fontFamily: DISPLAY }}
            >
              Every control, in plain terms
            </h2>
          </div>

          {/* Group 01 — Capture modes: the lead feature, given room (3 leads) */}
          <div className="mt-16">
            <div className="mb-6 flex items-baseline gap-3">
              <span className="text-[13px] font-semibold tabular-nums text-[var(--ink-400)]" style={{ fontFamily: DISPLAY }}>01</span>
              <h3 className="text-[15px] font-semibold uppercase tracking-[0.1em] text-[var(--ink-900)]">Capture modes</h3>
              <span className="text-[13px] text-[var(--ink-400)]">Three ways to record a step</span>
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
              {GROUPS[0].features.map((f) => (
                <FeatureLead key={f.key} f={f} />
              ))}
            </div>
          </div>

          {/* Groups 02 + 03 — quieter weights, side by side */}
          <div className="mt-16 grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <div className="mb-2 flex items-baseline gap-3">
                <span className="text-[13px] font-semibold tabular-nums text-[var(--ink-400)]" style={{ fontFamily: DISPLAY }}>02</span>
                <h3 className="text-[15px] font-semibold uppercase tracking-[0.1em] text-[var(--ink-900)]">Select modes</h3>
                <span className="text-[13px] text-[var(--ink-400)]">Work across many elements</span>
              </div>
              <div>
                {GROUPS[1].features.map((f) => (
                  <FeatureRow key={f.key} f={f} />
                ))}
              </div>
            </div>

            <div>
              <div className="mb-6 flex items-baseline gap-3">
                <span className="text-[13px] font-semibold tabular-nums text-[var(--ink-400)]" style={{ fontFamily: DISPLAY }}>03</span>
                <h3 className="text-[15px] font-semibold uppercase tracking-[0.1em] text-[var(--ink-900)]">Controls</h3>
                <span className="text-[13px] text-[var(--ink-400)]">Pause, get help, and finish</span>
              </div>
              <div className="flex flex-col gap-5">
                {GROUPS[2].features.map((f) => (
                  <FeatureInline key={f.key} f={f} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Closing CTA ────────────────────────────────────────────────────── */}
      <footer className="border-t border-[var(--ink-200)]">
        <div className="mx-auto flex max-w-[1200px] flex-col items-start gap-7 px-6 py-20 lg:flex-row lg:items-center lg:justify-between lg:px-12">
          <div>
            <h2 className="text-[28px] font-semibold leading-[1.1] tracking-[-0.02em] text-[var(--ink-900)] lg:text-[34px]" style={{ fontFamily: DISPLAY }}>
              See it on a real app.
            </h2>
            <p className="mt-2 text-[15px] text-[var(--ink-600)]">The same toolbar, running over a live product. Step in and try it.</p>
          </div>
          <a
            href={APP_URL}
            className="group inline-flex shrink-0 items-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-semibold text-white transition-[filter] hover:brightness-110"
            style={{ backgroundColor: ACCENT }}
          >
            Experience the toolbar
            <ArrowRight size={17} />
          </a>
        </div>
        <div className="mx-auto max-w-[1200px] border-t border-[var(--ink-200)] px-6 py-6 text-[12px] text-[var(--ink-400)] lg:px-12">
          Quick Capture Toolbar 2.0 · interactive spec sheet
        </div>
      </footer>
    </div>
  );
}
