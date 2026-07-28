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
          <VariantLabel name="Video AI · Screen + audio + interactions" />
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
          <VariantLabel name="SEEK · Voice co-pilot (Teach mode)" />
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
  { y: 476, label: 'Video AI · Screen + audio + interactions' },
  { y: 616, label: 'SEEK · Voice co-pilot (Teach mode)' },
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

// ─── Slide 02 building blocks: input composer → proposed plan ────────────────

// Connector marks, inlined from simple-icons so the slide stays self-contained.
function ZendeskMark({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#03363D">
      <path d="M12.914 2.904V16.29L24 2.905H12.914zM0 2.906C0 5.966 2.483 8.45 5.543 8.45s5.542-2.484 5.543-5.544H0zm11.086 4.807L0 21.096h11.086V7.713zm7.37 7.84c-3.063 0-5.542 2.48-5.542 5.543H24c0-3.06-2.48-5.543-5.543-5.543z" />
    </svg>
  );
}
function ConfluenceMark({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#1868DB">
      <path d="M.87 18.257c-.248.382-.53.875-.763 1.245a.764.764 0 0 0 .255 1.04l4.965 3.054a.764.764 0 0 0 1.058-.26c.199-.332.454-.763.733-1.221 1.967-3.247 3.945-2.853 7.508-1.146l4.957 2.337a.764.764 0 0 0 1.028-.382l2.364-5.346a.764.764 0 0 0-.382-1 599.851 599.851 0 0 1-4.965-2.361C10.911 10.97 5.224 11.185.87 18.257zM23.131 5.743c.249-.405.531-.875.764-1.25a.764.764 0 0 0-.256-1.034L18.675.404a.764.764 0 0 0-1.058.26c-.195.335-.451.763-.734 1.225-1.966 3.246-3.945 2.85-7.508 1.146L4.437.694a.764.764 0 0 0-1.027.382L1.046 6.422a.764.764 0 0 0 .382 1c1.039.49 3.105 1.467 4.965 2.361 6.698 3.246 12.392 3.029 16.738-4.04z" />
    </svg>
  );
}
function SharePointMark({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#0078D4">
      <path d="M24 13.5q0 1.242-.475 2.332-.474 1.09-1.289 1.904-.814.815-1.904 1.29-1.09.474-2.332.474-.762 0-1.523-.2-.106.997-.557 1.858-.451.862-1.154 1.494-.704.633-1.606.99-.902.358-1.91.358-1.09 0-2.045-.416-.955-.416-1.664-1.125-.709-.709-1.125-1.664Q6 19.84 6 18.75q0-.188.018-.375.017-.188.04-.375H.997q-.41 0-.703-.293T0 17.004V6.996q0-.41.293-.703T.996 6h3.54q.14-1.277.726-2.373.586-1.096 1.488-1.904Q7.652.914 8.807.457 9.96 0 11.25 0q1.395 0 2.625.533T16.02 1.98q.914.915 1.447 2.145T18 6.75q0 .188-.012.375-.011.188-.035.375 1.242 0 2.344.469 1.101.468 1.928 1.277.826.809 1.3 1.904Q24 12.246 24 13.5zm-12.75-12q-.973 0-1.857.34-.885.34-1.577.943-.691.604-1.154 1.43Q6.2 5.039 6.06 6h4.945q.41 0 .703.293t.293.703v4.945l.21-.035q.212-.75.61-1.424.399-.673.944-1.218.545-.545 1.213-.944.668-.398 1.43-.61.093-.503.093-.96 0-1.09-.416-2.045-.416-.955-1.125-1.664-.709-.709-1.664-1.125Q12.34 1.5 11.25 1.5zM6.117 15.902q.54 0 1.06-.111.522-.111.932-.37.41-.257.662-.679.252-.422.252-1.055 0-.632-.263-1.054-.264-.422-.662-.703-.399-.282-.856-.463l-.855-.34q-.399-.158-.662-.334-.264-.176-.264-.445 0-.2.14-.323.141-.123.335-.193.193-.07.404-.094.21-.023.351-.023.598 0 1.055.152.457.153.95.457V8.543q-.282-.082-.522-.14-.24-.06-.475-.1-.234-.041-.486-.059-.252-.017-.557-.017-.515 0-1.054.117-.54.117-.979.375-.44.258-.715.68-.275.421-.275 1.03 0 .598.263.997.264.398.663.68.398.28.855.474l.856.363q.398.17.662.358.263.187.263.457 0 .222-.123.351-.123.13-.31.2-.188.07-.393.087-.205.018-.369.018-.703 0-1.248-.234-.545-.235-1.107-.621v1.875q1.195.468 2.472.468z" />
    </svg>
  );
}

// A floating circular source chip, arranged in an arc above the composer.
function SourceChip({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex size-[64px] items-center justify-center rounded-full bg-white"
      style={{ boxShadow: '0 12px 28px -12px rgba(26,26,36,0.28), 0 0 0 1px rgba(26,26,36,0.04)' }}
    >
      {children}
    </div>
  );
}

function WaveformGlyph() {
  return (
    <div className="flex items-center gap-[3px]">
      {[9, 17, 24, 13, 19, 8].map((h, i) => (
        <span key={i} className="w-[3px] rounded-full" style={{ height: h, backgroundColor: INK[600] }} />
      ))}
    </div>
  );
}

function PdfGlyph() {
  return (
    <div className="flex flex-col items-center gap-[2px]" style={{ color: INK[600] }}>
      <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 3v4a1 1 0 0 0 1 1h4" />
        <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
      </svg>
      <span className="text-[7.5px] font-bold tracking-[0.1em]" style={{ color: INK[400] }}>PDF</span>
    </div>
  );
}

// Four-point spark, the compute moment where inputs converge.
function Spark({ size = 22, color = ACCENT, gradient = false }: { size?: number; color?: string; gradient?: boolean }) {
  const id = gradient ? `spark-grad-${size}` : undefined;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={gradient ? `url(#${id})` : color}>
      {gradient && (
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFA450" />
            <stop offset="100%" stopColor="#F55800" />
          </linearGradient>
        </defs>
      )}
      <path d="M12 1.6C13.1 7.7 16.3 10.9 22.4 12 16.3 13.1 13.1 16.3 12 22.4 10.9 16.3 7.7 13.1 1.6 12 7.7 10.9 10.9 7.7 12 1.6Z" />
    </svg>
  );
}

// ── Miniature experience previews — real little UIs, not wireframes ──────────

function Bar({ w, h = 4, c = '#dcdce2', r = 2 }: { w: number; h?: number; c?: string; r?: number }) {
  return <span className="block" style={{ width: w, height: h, backgroundColor: c, borderRadius: r }} />;
}

function StepBadge({ n }: { n: number }) {
  return (
    <span
      className="absolute left-[8px] top-[8px] z-10 flex size-[16px] items-center justify-center rounded-full bg-white text-[8.5px] font-bold"
      style={{ color: INK[600], boxShadow: '0 2px 6px rgba(26,26,36,0.14)' }}
    >
      {n}
    </span>
  );
}

// Pop-up: a tiny announcement modal over a dimmed app.
function PopupPreview() {
  return (
    <div className="relative flex h-full items-center justify-center overflow-hidden" style={{ background: 'linear-gradient(160deg, #E8F0FC 0%, #DCE8F9 100%)' }}>
      <StepBadge n={1} />
      {/* app ghost behind */}
      <div className="absolute left-[14px] top-[12px] flex flex-col gap-[5px] opacity-50">
        <Bar w={40} c="#c5cede" /><Bar w={70} c="#cfd7e4" /><Bar w={56} c="#cfd7e4" />
      </div>
      <div className="relative w-[100px] rounded-[9px] bg-white p-[9px]" style={{ boxShadow: '0 10px 24px -8px rgba(26,26,36,0.3)' }}>
        <p className="text-[8px] font-bold leading-[10px]" style={{ color: INK[900] }}>Meet Approval Bot</p>
        <div className="mt-[5px] flex flex-col gap-[3.5px]">
          <Bar w={78} h={3.5} /><Bar w={62} h={3.5} />
        </div>
        <div className="mt-[7px] flex h-[16px] w-full items-center justify-center rounded-[5px]" style={{ backgroundColor: ACCENT }}>
          <span className="text-[7px] font-semibold text-white">Show me</span>
        </div>
      </div>
    </div>
  );
}

// Flow: one tooltip latched onto a target button, beacon pulsing.
function FlowPreview() {
  return (
    <div className="relative h-full overflow-hidden" style={{ background: 'linear-gradient(160deg, #EDEBFB 0%, #E2DFF6 100%)' }}>
      <StepBadge n={2} />
      {/* target button, lower right */}
      <div className="absolute bottom-[14px] right-[12px] flex h-[20px] items-center rounded-[5px] bg-white px-[8px]" style={{ boxShadow: '0 3px 8px rgba(26,26,36,0.12)' }}>
        <span className="text-[7.5px] font-semibold" style={{ color: INK[600] }}>Request approval</span>
        <span className="absolute -right-[4px] -top-[4px] size-[9px] rounded-full border-[2px] border-white" style={{ backgroundColor: ACCENT }} />
      </div>
      {/* tooltip above-left, pointing at it */}
      <div className="absolute left-[12px] top-[22px] w-[92px] rounded-[8px] p-[8px]" style={{ backgroundColor: '#1f1f32', boxShadow: '0 10px 22px -8px rgba(26,26,36,0.45)' }}>
        <p className="text-[6.5px] font-semibold tracking-[0.08em] text-white/50">STEP 1 OF 4</p>
        <p className="mt-[3px] text-[8px] font-semibold leading-[11px] text-white">Click Request approval</p>
        <span className="absolute -bottom-[4px] right-[18px] size-[8px] rotate-45" style={{ backgroundColor: '#1f1f32' }} />
      </div>
    </div>
  );
}

// Smart tip: a bulb note riding beside a form field.
function SmartTipPreview() {
  return (
    <div className="relative h-full overflow-hidden" style={{ background: 'linear-gradient(160deg, #FBF3E6 0%, #F7EBD8 100%)' }}>
      <StepBadge n={3} />
      {/* form field */}
      <div className="absolute left-[12px] top-[24px] w-[86px]">
        <Bar w={34} h={3.5} c="#d8cdb9" />
        <div className="mt-[4px] flex h-[18px] items-center rounded-[5px] bg-white px-[6px]" style={{ boxShadow: '0 2px 6px rgba(26,26,36,0.08)' }}>
          <Bar w={40} h={3.5} c="#e4e0d6" />
        </div>
      </div>
      {/* tip bubble */}
      <div className="absolute bottom-[12px] left-[26px] flex w-[108px] items-start gap-[5px] rounded-[8px] bg-white p-[7px]" style={{ boxShadow: '0 8px 20px -8px rgba(26,26,36,0.28)' }}>
        <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="mt-[1px] shrink-0">
          <path d="M9 16a5 5 0 1 1 6 0a3.5 3.5 0 0 0 -1 3a2 2 0 0 1 -4 0a3.5 3.5 0 0 0 -1 -3" />
          <path d="M9.7 17l4.6 0" />
        </svg>
        <p className="text-[8px] font-medium leading-[11px]" style={{ color: INK[900] }}>Approvals route by deal size</p>
      </div>
    </div>
  );
}

// Article: a small help-center page.
function ArticlePreview() {
  return (
    <div className="relative flex h-full items-center justify-center overflow-hidden" style={{ background: 'linear-gradient(160deg, #E9F4EE 0%, #DDEDE4 100%)' }}>
      <StepBadge n={4} />
      <div className="w-[92px] rounded-[8px] bg-white p-[9px]" style={{ boxShadow: '0 10px 22px -10px rgba(26,26,36,0.26)' }}>
        <p className="text-[8px] font-bold leading-[10px]" style={{ color: INK[900] }}>Approval Bot guide</p>
        <div className="mt-[5px] h-[22px] w-full rounded-[4px]" style={{ background: 'linear-gradient(135deg, #DCE8F9, #EDEBFB)' }} />
        <div className="mt-[5px] flex flex-col gap-[3.5px]">
          <Bar w={74} h={3.5} /><Bar w={74} h={3.5} /><Bar w={52} h={3.5} />
        </div>
      </div>
    </div>
  );
}

// Experience cards, gallery style: the miniature preview does the talking,
// a single centred name underneath, nothing else.
const PLAN_CARDS = [
  { name: 'Pop-up', Preview: PopupPreview },
  { name: 'Flow', Preview: FlowPreview },
  { name: 'Smart tip', Preview: SmartTipPreview },
  { name: 'Article', Preview: ArticlePreview },
];

function PlanCard({ card, index }: { card: (typeof PLAN_CARDS)[number]; index: number }) {
  const { Preview } = card;
  return (
    <motion.div
      {...enter(0.72 + index * 0.1)}
      className="w-[152px] shrink-0 overflow-hidden rounded-[13px] border border-[var(--ink-200)] bg-white"
      style={{ boxShadow: '0 8px 20px -12px rgba(26,26,36,0.14)' }}
    >
      <div className="h-[104px]">
        <Preview />
      </div>
      <p className="py-[10px] text-center text-[12px] font-semibold text-[var(--ink-900)]">{card.name}</p>
    </motion.div>
  );
}

// The right-hand stage of slide 02: an arc of source chips raining into the
// spark, the prompt pill beneath, and the proposed plan below that.
const CHIPS: Array<{ x: number; y: number; glyph: React.ReactNode }> = [
  { x: 682, y: 208, glyph: <svg width={20} height={20} viewBox="0 0 24 24" fill="#1a1a24"><path d="M8 5.5v13l11 -6.5z" /></svg> },
  { x: 782, y: 156, glyph: <WaveformGlyph /> },
  { x: 890, y: 128, glyph: <PdfGlyph /> },
  { x: 994, y: 128, glyph: <ConfluenceMark size={22} /> },
  { x: 1102, y: 156, glyph: <ZendeskMark size={22} /> },
  { x: 1202, y: 208, glyph: <SharePointMark size={22} /> },
];

// One dashed curve per chip, converging on the spark at (942, 288).
const CHIP_PATHS = [
  'M 690 244 C 700 292, 850 296, 928 290',
  'M 786 192 C 792 244, 870 280, 930 287',
  'M 892 164 C 896 208, 920 262, 938 280',
  'M 992 164 C 988 208, 964 262, 946 280',
  'M 1098 192 C 1092 244, 1014 280, 954 287',
  'M 1194 244 C 1184 292, 1034 296, 956 290',
];

function FirstDraftStage() {
  return (
    <>
      {/* soft atmosphere behind the illustration */}
      <div
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          left: 520, top: 66, width: 872, height: 660,
          background:
            'radial-gradient(52% 42% at 48% 34%, rgba(9,117,215,0.065), transparent 72%), radial-gradient(40% 34% at 62% 56%, rgba(124,108,255,0.05), transparent 70%)',
        }}
      />

      {/* dashed convergence + spark lift strokes */}
      <svg aria-hidden className="pointer-events-none absolute inset-0" width={1440} height={810} fill="none">
        {CHIP_PATHS.map((d, i) => (
          <motion.path
            key={d}
            d={d}
            stroke={INK[300]}
            strokeWidth={1.2}
            strokeDasharray="2.5 5"
            initial={STATIC ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.42 + i * 0.06, ease: EASE }}
          />
        ))}
        {/* connection dots where each line leaves its chip */}
        {CHIP_PATHS.map((d, i) => {
          const [x, y] = d.split(' ').slice(1, 3).map(Number);
          return (
            <motion.circle
              key={`dot-${i}`}
              cx={x} cy={y} r={2.4}
              fill="#fff" stroke={INK[300]} strokeWidth={1.2}
              initial={STATIC ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.46 + i * 0.06 }}
            />
          );
        })}
        {/* line from the pill down into the plan */}
        <motion.path
          d="M 942 398 L 942 442"
          stroke={INK[300]}
          strokeWidth={1.2}
          strokeDasharray="2.5 5"
          initial={STATIC ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8, ease: EASE }}
        />
      </svg>

      {/* source chips in an arc */}
      {CHIPS.map((chip, i) => (
        <At key={i} x={chip.x} y={chip.y} z={4}>
          <motion.div
            initial={STATIC ? false : { opacity: 0, y: 12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 + i * 0.07, ease: EASE }}
          >
            <SourceChip>{chip.glyph}</SourceChip>
          </motion.div>
        </At>
      ))}

      {/* the spark, catching everything, lift strokes beneath */}
      <At x={942} y={288} z={5}>
        <motion.div
          initial={STATIC ? false : { opacity: 0, scale: 0.3 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.72, ease: EASE }}
          className="relative"
        >
          <Spark size={30} gradient />
          <svg width={26} height={12} viewBox="0 0 26 12" fill="none" className="absolute left-1/2 top-full mt-[2px] -translate-x-1/2">
            <path d="M4 10 L7 4" stroke="#FFA450" strokeWidth={2} strokeLinecap="round" />
            <path d="M13 11 L13 3" stroke="#F55800" strokeWidth={2} strokeLinecap="round" />
            <path d="M22 10 L19 4" stroke="#FFA450" strokeWidth={2} strokeLinecap="round" />
          </svg>
        </motion.div>
      </At>

      {/* the prompt pill — context goes in, not text */}
      <At x={942} y={364} z={4}>
        <motion.div
          initial={STATIC ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
          className="flex h-[62px] w-[470px] items-center gap-[12px] rounded-full bg-white pl-[22px] pr-[9px]"
          style={{ boxShadow: '0 18px 44px -18px rgba(26,26,36,0.28), 0 0 0 1px rgba(26,26,36,0.04)' }}
        >
          <svg width={17} height={17} viewBox="0 0 24 24" fill="none" stroke={INK[300]} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
            <path d="M15 7l-6.5 6.5a1.5 1.5 0 0 0 3 3l6.5 -6.5a3 3 0 0 0 -6 -6l-6.5 6.5a4.5 4.5 0 0 0 9 9l6.5 -6.5" />
          </svg>
          <span className="grow text-[13.5px]" style={{ color: INK[400] }}>Add your context</span>
          <div
            className="flex size-[46px] shrink-0 items-center justify-center rounded-full"
            style={{ background: 'linear-gradient(135deg, #FFA450 0%, #F55800 100%)', boxShadow: '0 6px 16px -6px rgba(245,88,0,0.5)' }}
          >
            <Spark size={18} color="white" />
          </div>
        </motion.div>
      </At>

      {/* proposed plan panel — rich previews, one Approve */}
      <At x={942} y={560} z={4}>
        <motion.div
          initial={STATIC ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.66, ease: EASE }}
          className="w-[692px] rounded-[18px] border border-[var(--ink-200)] bg-white"
          style={{ boxShadow: '0 24px 56px -28px rgba(26,26,36,0.28), 0 1px 2px rgba(26,26,36,0.05)' }}
        >
          <div className="flex items-center justify-between border-b px-[18px] py-[12px]" style={{ borderColor: 'rgba(220,220,226,0.7)' }}>
            <div className="flex items-baseline gap-[10px]">
              <h3 className="text-[14.5px] font-semibold tracking-[-0.01em] text-[var(--ink-900)]" style={{ fontFamily: DISPLAY }}>
                Proposed plan
              </h3>
              <span className="text-[11.5px]" style={{ color: INK[400] }}>Draft · v1 · 4 experiences</span>
            </div>
            <div className="flex items-center justify-center gap-[6px] rounded-[8px] bg-[#1f1f32] h-[30px] pl-[10px] pr-[12px] text-white">
              <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12l5 5l10 -10" />
              </svg>
              <span className="text-[12px] font-medium">Approve</span>
            </div>
          </div>
          <div className="flex items-stretch gap-[10px] p-[15px]">
            {PLAN_CARDS.map((card, i) => (
              <PlanCard key={card.type} card={card} index={i} />
            ))}
          </div>
        </motion.div>
      </At>

      {/* zone label: experiences out */}
      <At x={942} y={710} z={2}>
        <motion.div {...enter(1.05)}>
          <p className="whitespace-nowrap text-center text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: INK[400] }}>
            Experiences out · one connected draft
          </p>
        </motion.div>
      </At>
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

// Slide 01: Designing for compute — left argument + chassis stage.
function SlideCompute() {
  // ?visual=stack starts on the stacked visual (handy for deck export).
  const [visual, setVisual] = useState<'branch' | 'stack'>(
    new URLSearchParams(window.location.search).get('visual') === 'stack' ? 'stack' : 'branch'
  );

  return (
    <>
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
            Every capability captures a different raw input — screen, video, voice,
            user activity — into{' '}
            <span className="font-medium text-[var(--ink-900)]">one compute-backed chassis</span>.
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
    </>
  );
}

// Slide 02: First draft — knowledge in, proposed experiences out.
function SlideFirstDraft() {
  return (
    <>
      {/* ── Left column: the argument ──────────────────────────────────── */}
      <div className="absolute left-[72px] top-[150px] w-[400px]">
        <motion.div {...enter(0.05)} className="flex items-center gap-3">
          <span className="h-px w-7" style={{ backgroundColor: INK[300] }} />
          <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[var(--ink-400)]">
            Reinventing the creation experience
          </span>
        </motion.div>

        <motion.h1
          {...enter(0.1)}
          className="mt-[26px] text-[62px] font-bold leading-[1.02] tracking-[-0.025em] text-[var(--ink-900)]"
          style={{ fontFamily: DISPLAY }}
        >
          First <span style={{ color: ACCENT }}>draft</span>
        </motion.h1>

        <motion.div {...enter(0.18)} className="mt-[30px] flex flex-col gap-[16px] text-[15.5px] leading-[25px] text-[var(--ink-600)]">
          <p>
            The author no longer starts from a blank canvas. Knowledge — documents,
            recordings, tickets, threads — goes in; the system proposes the right mix
            of experiences — flow, smart tip, pop-up, article — as a{' '}
            <span className="font-medium text-[var(--ink-900)]">connected first draft</span>.
            The author's job shifts{' '}
            <span className="font-medium text-[var(--ink-900)]">from assembling to approving</span>.
          </p>
        </motion.div>

        <motion.div {...enter(0.26)} className="mt-[34px] border-t border-[var(--ink-200)] pt-[22px]">
          <p className="text-[16.5px] font-semibold leading-[24px] tracking-[-0.01em] text-[var(--ink-900)]" style={{ fontFamily: DISPLAY }}>
            The prompt is the context you bring,<br />not a text box you fill.
          </p>
          <p className="mt-[10px] text-[13.5px] leading-[20px] text-[var(--ink-400)]">
            Record a video. Speak while you capture. Point at a document.
          </p>
        </motion.div>
      </div>

      {/* ── Stage: composer → spark → proposed plan ────────────────────── */}
      <FirstDraftStage />
    </>
  );
}

const SLIDES = [
  { track: 'Track 01', footer: 'One compute-backed chassis · every capability plugs in' },
  { track: 'Track 02', footer: 'Knowledge in · experiences out · the author approves' },
];

export default function SlidesPage() {
  const scale = useFitScale();

  const cssVars = {
    ['--ink-900' as string]: INK[900],
    ['--ink-600' as string]: INK[600],
    ['--ink-400' as string]: INK[400],
    ['--ink-200' as string]: INK[200],
  } as React.CSSProperties;

  // ?slide=2 opens directly on a slide (deck export). Arrow keys navigate.
  const [slide, setSlide] = useState(() =>
    new URLSearchParams(window.location.search).get('slide') === '2' ? 1 : 0
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setSlide((s) => Math.min(SLIDES.length - 1, s + 1));
      if (e.key === 'ArrowLeft') setSlide((s) => Math.max(0, s - 1));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

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
            <span className="uppercase tracking-[0.14em] font-medium">{SLIDES[slide].track}</span>
            <span className="h-[3px] w-[3px] rounded-full" style={{ backgroundColor: INK[300] }} />
            <div className="flex items-center gap-[6px]">
              <button
                type="button"
                aria-label="Previous slide"
                onClick={() => setSlide((s) => Math.max(0, s - 1))}
                disabled={slide === 0}
                className="flex size-[22px] items-center justify-center rounded-full transition-colors hover:text-[var(--ink-900)] disabled:opacity-30 disabled:hover:text-[var(--ink-400)]"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 6l-6 6l6 6" /></svg>
              </button>
              <span className="tabular-nums">0{slide + 1} / 0{SLIDES.length}</span>
              <button
                type="button"
                aria-label="Next slide"
                onClick={() => setSlide((s) => Math.min(SLIDES.length - 1, s + 1))}
                disabled={slide === SLIDES.length - 1}
                className="flex size-[22px] items-center justify-center rounded-full transition-colors hover:text-[var(--ink-900)] disabled:opacity-30 disabled:hover:text-[var(--ink-400)]"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6l-6 6" /></svg>
              </button>
            </div>
          </div>
        </div>

        {/* ── Slide body ─────────────────────────────────────────────────── */}
        {slide === 0 ? <SlideCompute key="s1" /> : <SlideFirstDraft key="s2" />}

        {/* ── Footer chrome ──────────────────────────────────────────────── */}
        <div className="absolute bottom-0 left-[72px] right-[72px] flex h-[52px] items-center justify-between border-t border-[var(--ink-200)] text-[12px] text-[var(--ink-400)]">
          <span>{SLIDES[slide].footer}</span>
          <span className="uppercase tracking-[0.14em]">Whatfix design</span>
        </div>
      </div>
    </div>
  );
}
