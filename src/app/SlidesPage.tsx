import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Toolbar } from './components/Toolbar';

/* ============================================================================
   Slides — leadership deck, one slide per section.
   Slide 01: "Designing for compute".

   A fixed 1440×810 artboard scaled to fit the viewport, so the slide reads
   and screenshots exactly as composed. Left: the argument. Right: the proof,
   the live Quick Capture chassis in the centre, hairlines branching to three
   product variants rebuilt on the exact same base.

   Reachable at  #slides .

   Type:   Space Grotesk display / Inter text (loaded in index.html).
   Colour: the showcase ink ramp. One blue, spent once in the headline.
           The dark chassis surfaces are the only dark objects on the slide.
   ========================================================================== */

const DISPLAY = "'Space Grotesk', 'Inter', system-ui, sans-serif";
const TEXT = "'Inter', system-ui, sans-serif";

const INK = {
  900: '#1a1a24',
  600: '#56555f',
  400: '#8a8992',
  300: '#b9b8c0',
  200: '#dcdce2',
  bg:  '#fafaf8',
};
const ACCENT = '#0975d7';

const EASE = [0.16, 1, 0.3, 1] as const;

// ?static skips the entrance choreography and renders the settled slide,
// for clean screenshots / deck export.
const STATIC = new URLSearchParams(window.location.search).has('static');

// ─── Toolbar primitives — exact classes lifted from components/Toolbar.tsx ────
// The variants below are compositions of these and nothing else. Same shell,
// same buttons, same divider, same single white pill. That is the argument.

function SIcon({ size = 18, children }: { size?: number; children: React.ReactNode }) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
      className="block shrink-0"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      {children}
    </svg>
  );
}

// Tabler paths, same family as the chassis.
const Paths = {
  pause: <><path d="M6 5m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v12a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" /><path d="M14 5m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v12a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" /></>,
  check: <path d="M5 12l5 5l10 -10" />,
  trash: <><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></>,
  help: <><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M12 17l0 .01" /><path d="M12 13.5a1.5 1.5 0 0 1 1 -1.5a2.6 2.6 0 1 0 -3 -4" /></>,
  plus: <><path d="M12 5l0 14" /><path d="M5 12l14 0" /></>,
  mic: <><path d="M9 2m0 3a3 3 0 0 1 3 -3h0a3 3 0 0 1 3 3v5a3 3 0 0 1 -3 3h0a3 3 0 0 1 -3 -3z" /><path d="M5 10a7 7 0 0 0 14 0" /><path d="M8 21l8 0" /><path d="M12 17l0 4" /></>,
  x: <><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></>,
  expand: <><path d="M16 4l4 0l0 4" /><path d="M14 10l6 -6" /><path d="M8 20l-4 0l0 -4" /><path d="M4 20l6 -6" /></>,
  restart: <path d="M19.95 11a8 8 0 1 0 -.5 4m.5 5v-5h-5" />,
  eyeOff: <><path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" /><path d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87" /><path d="M3 3l18 18" /></>,
};

function SShell({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="bg-[#1f1f32] flex h-[48px] items-center relative rounded-[10px]"
      style={{
        boxShadow:
          '0 0 0 1px rgba(255,255,255,0.06), 0 1px 0 rgba(255,255,255,0.05) inset, 0 12px 32px -10px rgba(0,0,0,0.55)',
      }}
    >
      {children}
    </div>
  );
}

function SGrip() {
  return (
    <div className="flex items-center justify-center px-[8px] h-full text-[#7c7a90] shrink-0 rounded-l-[10px]">
      <SIcon>
        <path d="M9 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
        <path d="M9 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
        <path d="M9 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
        <path d="M15 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
        <path d="M15 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
        <path d="M15 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
      </SIcon>
    </div>
  );
}

function SReadout({ children }: { children: React.ReactNode }) {
  return (
    <div className="pl-[4px] pr-[8px] shrink-0">
      <p
        className="font-['Inter:Medium',sans-serif] font-medium text-[13px] leading-[20px] whitespace-nowrap text-white flex items-center gap-[7px]"
        style={{ fontVariantNumeric: 'tabular-nums' }}
      >
        {children}
      </p>
    </div>
  );
}

function SDivider() {
  return <div className="h-[20px] w-px mx-[4px] shrink-0 bg-white/[0.12]" />;
}

function SGhost({ children, muted = false }: { children: React.ReactNode; muted?: boolean }) {
  return (
    <div className={`${muted ? 'text-[#7c7a90]' : 'text-[#ECECF3]'} bg-transparent flex items-center justify-center size-[32px] rounded-[8px] shrink-0`}>
      {children}
    </div>
  );
}

function SPill({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="bg-white flex items-center justify-center gap-[6px] h-[32px] pl-[10px] pr-[12px] rounded-[8px] shrink-0 text-[#1f1f32]">
      {icon}
      <span className="font-['Inter:Medium',sans-serif] font-medium text-[13px] leading-[20px]">{label}</span>
    </div>
  );
}

// ─── The three variants, rebuilt on the chassis ───────────────────────────────

// SEEK, guided flows: the readout and finishing row are untouched;
// a manual step control joins the tool zone.
function SeekFlowsBar() {
  return (
    <SShell>
      <SGrip />
      <SReadout>0 steps</SReadout>
      <SDivider />
      <div className="flex items-center gap-[2px] px-[4px]">
        <SGhost><SIcon>{Paths.plus}</SIcon></SGhost>
        <SGhost><SIcon>{Paths.pause}</SIcon></SGhost>
      </div>
      <SDivider />
      <div className="flex items-center gap-[2px] px-[4px]">
        <SPill icon={<SIcon>{Paths.check}</SIcon>} label="Done" />
        <SGhost><SIcon>{Paths.trash}</SIcon></SGhost>
      </div>
      <SDivider />
      <div className="pr-[8px] pl-[4px]">
        <SGhost muted><SIcon>{Paths.help}</SIcon></SGhost>
      </div>
    </SShell>
  );
}

// Video AI, screen recording: the readout becomes a timer, Done becomes Stop.
// The red dot is the one semantic colour, it means "recording", nothing else.
function VideoAiBar() {
  return (
    <SShell>
      <SGrip />
      <SReadout>
        <span className="relative flex size-[8px] shrink-0">
          <span className="absolute inline-flex h-full w-full rounded-full bg-[#e5484d] opacity-60 animate-ping" style={{ animationDuration: '2.2s' }} />
          <span className="relative inline-flex size-[8px] rounded-full bg-[#e5484d]" />
        </span>
        0:00
      </SReadout>
      <SDivider />
      <div className="flex items-center gap-[2px] px-[4px]">
        <SGhost><SIcon>{Paths.pause}</SIcon></SGhost>
        <SGhost><SIcon>{Paths.restart}</SIcon></SGhost>
        <SGhost><SIcon>{Paths.eyeOff}</SIcon></SGhost>
      </div>
      <SDivider />
      <div className="flex items-center gap-[2px] px-[4px] pr-[8px]">
        <SPill
          icon={<svg width={11} height={11} viewBox="0 0 11 11" className="block shrink-0"><rect x="0.5" y="0.5" width="10" height="10" rx="2.5" fill="currentColor" /></svg>}
          label="Stop"
        />
        <SGhost><SIcon>{Paths.trash}</SIcon></SGhost>
      </div>
    </SShell>
  );
}

// SEEK, voice co-pilot: voice input joins the tool zone, exit joins the
// finishing row as a ghost, and an expand control takes the far seat.
function SeekVoiceBar() {
  return (
    <SShell>
      <SGrip />
      <SReadout>0 steps</SReadout>
      <SDivider />
      <div className="flex items-center gap-[2px] px-[4px]">
        <SGhost><SIcon>{Paths.mic}</SIcon></SGhost>
        <SGhost><SIcon>{Paths.pause}</SIcon></SGhost>
      </div>
      <SDivider />
      <div className="flex items-center gap-[2px] px-[4px]">
        <SPill icon={<SIcon>{Paths.check}</SIcon>} label="Done" />
        <SGhost><SIcon>{Paths.x}</SIcon></SGhost>
      </div>
      <SDivider />
      <div className="pr-[8px] pl-[4px]">
        <SGhost muted><SIcon>{Paths.expand}</SIcon></SGhost>
      </div>
    </SShell>
  );
}

// ─── The live chassis (the real component, untouched) ─────────────────────────

function LiveChassis() {
  const [activeTool, setActiveTool] = useState('click');
  const [clickMode, setClickMode] = useState<'click' | 'hand' | 'capture'>('click');
  const [blurMode, setBlurMode] = useState<'censor' | 'multiselect'>('censor');
  const [stepCount, setStepCount] = useState(3);

  return (
    <Toolbar
      stepCount={stepCount}
      setStepCount={(c) => { if (c === 0) setStepCount(0); }}
      activeTool={activeTool}
      setActiveTool={setActiveTool}
      clickMode={clickMode}
      setClickMode={setClickMode}
      blurMode={blurMode}
      setBlurMode={setBlurMode}
      onRestart={() => setStepCount(0)}
      onCancel={() => {}}
      onHelp={() => {}}
      onDone={() => {}}
      onGripPointerDown={() => {}}
    />
  );
}

// ─── Stage annotations ────────────────────────────────────────────────────────

function VariantLabel({ name }: { name: string }) {
  return (
    <p className="whitespace-nowrap text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--ink-900)]" style={{ fontFamily: TEXT }}>
      {name}
    </p>
  );
}

// A positioned element on the artboard, centred on (x, y).
function At({ x, y, children, z = 1 }: { x: number; y: number; children: React.ReactNode; z?: number }) {
  return (
    <div className="absolute" style={{ left: x, top: y, transform: 'translate(-50%, -50%)', zIndex: z }}>
      {children}
    </div>
  );
}

const enter = (delay: number) => ({
  initial: STATIC ? false : { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: EASE },
} as const);

// ─── Visual A: the chassis in the centre, variants branching off ─────────────

function BranchVisual() {
  return (
    <>
      {/* faint dot field centred on the chassis */}
      <div
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          left: 520, top: 70, width: 872, height: 690,
          backgroundImage: `radial-gradient(${INK[900]} 1px, transparent 1px)`,
          backgroundSize: '26px 26px',
          maskImage: 'radial-gradient(58% 52% at 50% 48%, #000 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(58% 52% at 50% 48%, #000 30%, transparent 75%)',
          opacity: 0.055,
        }}
      />

      {/* connector hairlines */}
      <svg aria-hidden className="pointer-events-none absolute inset-0" width={1440} height={810} fill="none">
        {[
          'M 956 371 L 956 180',
          'M 830 429 C 830 520, 760 548, 760 610',
          'M 1082 429 C 1082 520, 1160 548, 1160 610',
        ].map((d, i) => (
          <motion.path
            key={d}
            d={d}
            stroke={INK[300]}
            strokeWidth={1.2}
            initial={STATIC ? false : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.65, delay: 0.5 + i * 0.12, ease: EASE }}
          />
        ))}
        {[[956, 180], [956, 371], [830, 429], [760, 610], [1082, 429], [1160, 610]].map(([cx, cy], i) => (
          <motion.circle
            key={i}
            cx={cx} cy={cy} r={2.6}
            fill={INK.bg} stroke={INK[300]} strokeWidth={1.2}
            initial={STATIC ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.62 + Math.floor(i / 2) * 0.12 }}
          />
        ))}
      </svg>

      {/* the chassis: the real, live component */}
      <At x={956} y={400} z={5}>
        <motion.div
          initial={STATIC ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
        >
          <LiveChassis />
        </motion.div>
      </At>
      <At x={956} y={464} z={2}>
        <motion.div {...enter(0.42)}>
          <p className="whitespace-nowrap text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--ink-900)]">
            Quick Capture · the chassis
          </p>
        </motion.div>
      </At>

      {/* configuration 1: Mirror */}
      <At x={956} y={118} z={3}>
        <motion.div {...enter(0.62)}>
          <VariantLabel name="Mirror · Captured screens" />
        </motion.div>
      </At>
      <At x={956} y={155} z={4}>
        <motion.div {...enter(0.66)} style={{ scale: 0.88 }}>
          <SeekFlowsBar />
        </motion.div>
      </At>

      {/* configuration 2: Video AI recording */}
      <At x={760} y={640} z={4}>
        <motion.div {...enter(0.74)} style={{ scale: 0.88 }}>
          <VideoAiBar />
        </motion.div>
      </At>
      <At x={760} y={694} z={3}>
        <motion.div {...enter(0.78)}>
          <VariantLabel name="Video AI · Recording" />
        </motion.div>
      </At>

      {/* configuration 3: SEEK voice co-pilot */}
      <At x={1160} y={640} z={4}>
        <motion.div {...enter(0.82)} style={{ scale: 0.88 }}>
          <SeekVoiceBar />
        </motion.div>
      </At>
      <At x={1160} y={694} z={3}>
        <motion.div {...enter(0.86)}>
          <VariantLabel name="SEEK · Voice co-pilot" />
        </motion.div>
      </At>
    </>
  );
}

// ─── Visual B: the chassis on top, variants stacked beneath ──────────────────
// Left-aligned so the shared anatomy lines up column by column: grips over
// grips, readouts over readouts, one white pill per bar. Fine dashed spec
// lines mark the parent's edges and each row, redline style.

const STACK_LEFT = 740;          // shared left edge of every bar
const STACK_RIGHT = 1166;        // right edge of the parent chassis
const STACK_ROWS = [
  { y: 196, label: 'Quick Capture · the chassis', parent: true },
  { y: 336, label: 'Mirror · Captured screens' },
  { y: 476, label: 'Video AI · Recording' },
  { y: 616, label: 'SEEK · Voice co-pilot' },
];

function StackVisual() {
  const bars = [
    <LiveChassis key="chassis" />,
    <SeekFlowsBar key="mirror" />,
    <VideoAiBar key="video" />,
    <SeekVoiceBar key="voice" />,
  ];

  return (
    <>
      {/* redline grid: row rules + the parent's edge verticals */}
      <svg aria-hidden className="pointer-events-none absolute inset-0" width={1440} height={810} fill="none">
        {STACK_ROWS.map((row, i) => (
          <React.Fragment key={row.y}>
            {[row.y - 24, row.y + 24].map((y) => (
              <motion.line
                key={y}
                x1={556} x2={1372} y1={y} y2={y}
                stroke={INK[200]} strokeWidth={1} strokeDasharray="3 5"
                initial={STATIC ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.25 + i * 0.1, ease: EASE }}
              />
            ))}
          </React.Fragment>
        ))}
        {[STACK_LEFT, STACK_RIGHT].map((x) => (
          <motion.line
            key={x}
            x1={x} x2={x} y1={128} y2={668}
            stroke={INK[200]} strokeWidth={1} strokeDasharray="3 5"
            initial={STATIC ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
          />
        ))}
      </svg>

      {STACK_ROWS.map((row, i) => (
        <React.Fragment key={row.label}>
          {/* the bar, left-aligned to the shared edge */}
          <div className="absolute z-[5]" style={{ left: STACK_LEFT, top: row.y, transform: 'translateY(-50%)' }}>
            <motion.div {...enter(0.3 + i * 0.12)}>{bars[i]}</motion.div>
          </div>
          {/* row label, above the bar, aligned to the same edge */}
          <div className="absolute z-[2]" style={{ left: STACK_LEFT, top: row.y - 44 }}>
            <motion.div {...enter(0.26 + i * 0.12)}>
              <p
                className={`whitespace-nowrap text-[10.5px] font-semibold uppercase tracking-[0.14em] ${
                  row.parent ? 'text-[var(--ink-900)]' : 'text-[var(--ink-400)]'
                }`}
              >
                {row.label}
              </p>
            </motion.div>
          </div>
        </React.Fragment>
      ))}
    </>
  );
}

// ─── Slide 01 ────────────────────────────────────────────────────────────────

const ARTBOARD_W = 1440;
const ARTBOARD_H = 810;

function useFitScale() {
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const fit = () => setScale(Math.min(window.innerWidth / ARTBOARD_W, window.innerHeight / ARTBOARD_H));
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);
  return scale;
}

export default function SlidesPage() {
  const scale = useFitScale();

  const cssVars = {
    ['--ink-900' as string]: INK[900],
    ['--ink-600' as string]: INK[600],
    ['--ink-400' as string]: INK[400],
    ['--ink-200' as string]: INK[200],
  } as React.CSSProperties;

  // ?visual=stack starts on the stacked visual (handy for deck export).
  const [visual, setVisual] = useState<'branch' | 'stack'>(
    new URLSearchParams(window.location.search).get('visual') === 'stack' ? 'stack' : 'branch'
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden" style={{ backgroundColor: INK.bg }}>
      <div
        className="relative shrink-0 overflow-hidden"
        style={{
          ...cssVars,
          width: ARTBOARD_W,
          height: ARTBOARD_H,
          transform: `scale(${scale})`,
          backgroundColor: INK.bg,
          fontFamily: TEXT,
          color: INK[900],
        }}
      >
        {/* ── Chrome ─────────────────────────────────────────────────────── */}
        <div className="absolute left-[72px] right-[72px] top-0 flex h-[58px] items-center justify-between border-b border-[var(--ink-200)]">
          <img src="/logos/whatfix.png" alt="Whatfix" className="h-[24px] w-auto" />
          <div className="flex items-center gap-[14px] text-[12px] text-[var(--ink-400)]">
            <span className="uppercase tracking-[0.14em] font-medium">Track 01</span>
            <span className="h-[3px] w-[3px] rounded-full bg-[var(--ink-300)]" style={{ backgroundColor: INK[300] }} />
            <span className="tabular-nums">01</span>
          </div>
        </div>

        {/* ── Left column: the argument ──────────────────────────────────── */}
        <div className="absolute left-[72px] top-[150px] w-[400px]">
          <motion.div {...enter(0.05)} className="flex items-center gap-3">
            <span className="h-px w-7" style={{ backgroundColor: INK[300] }} />
            <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[var(--ink-400)]">
              Compute as a design material
            </span>
          </motion.div>

          <motion.h1
            {...enter(0.1)}
            className="mt-[26px] text-[62px] font-bold leading-[1.02] tracking-[-0.025em] text-[var(--ink-900)]"
            style={{ fontFamily: DISPLAY }}
          >
            Designing<br />for <span style={{ color: ACCENT }}>compute</span>
          </motion.h1>

          <motion.div {...enter(0.18)} className="mt-[30px] flex flex-col gap-[16px] text-[15.5px] leading-[25px] text-[var(--ink-600)]">
            <p>
              We design with{' '}
              <span className="font-medium text-[var(--ink-900)]">composable primitives</span>, not bespoke
              UIs: <span className="font-medium text-[var(--ink-900)]">one compute-backed chassis</span>,
              where any capability that spends compute on the user's behalf plugs in.
              Capture a flow, record a video, plan with SEEK: same surface, same anatomy.
            </p>
          </motion.div>

          <motion.div {...enter(0.26)} className="mt-[34px] border-t border-[var(--ink-200)] pt-[22px]">
            <p className="text-[16.5px] font-semibold leading-[24px] tracking-[-0.01em] text-[var(--ink-900)]" style={{ fontFamily: DISPLAY }}>
              The variations are configurations,<br />not new designs.
            </p>
            <p className="mt-[10px] text-[13.5px] leading-[20px] text-[var(--ink-400)]">
              Design cost scales sub-linearly with the number of product surfaces.
            </p>
          </motion.div>
        </div>

        {/* ── Stage: one chassis, three configurations ───────────────────── */}
        {visual === 'branch' ? <BranchVisual /> : <StackVisual />}

        {/* visual switcher — tiny, utilitarian, out of the composition */}
        <button
          type="button"
          onClick={() => setVisual((v) => (v === 'branch' ? 'stack' : 'branch'))}
          className="absolute z-10 flex items-center gap-[6px] rounded-full border border-[var(--ink-200)] px-[11px] py-[5px] text-[11px] font-medium text-[var(--ink-400)] transition-colors hover:border-[var(--ink-300)] hover:text-[var(--ink-900)]"
          style={{ left: 956, top: 726, transform: 'translate(-50%, -50%)' }}
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 10h14l-4 -4" /><path d="M17 14h-14l4 4" />
          </svg>
          Switch visual
        </button>

        {/* ── Footer chrome ──────────────────────────────────────────────── */}
        <div className="absolute bottom-0 left-[72px] right-[72px] flex h-[52px] items-center justify-between border-t border-[var(--ink-200)] text-[12px] text-[var(--ink-400)]">
          <span>One compute-backed chassis · every capability plugs in</span>
          <span className="uppercase tracking-[0.14em]">Whatfix design</span>
        </div>
      </div>
    </div>
  );
}
