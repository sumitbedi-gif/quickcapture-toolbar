import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

/* ============================================================================
   TOOLBAR LAB — three minimal layout directions for the QuickCapture toolbar.
   Standalone, reachable at  #lab . The real App.tsx is untouched.

   Active-mode feedback in every variant = FILLED ACCENT + CHECKMARK
   (the direction picked in the design review).

   Modes:  click  = Capture & navigate
           hand   = Capture, stay on page
           float  = Free-floating step
           censor = Censor sensitive data
   ========================================================================== */

type Mode = 'click' | 'hand' | 'float' | 'censor';

const MODES: { id: Mode; label: string; short: string; banner?: string; icon: (c: string) => React.ReactNode }[] = [
  { id: 'click',  label: 'Capture & navigate',   short: 'Capture', icon: (c) => <CursorIcon color={c} /> },
  { id: 'hand',   label: 'Capture, stay on page', short: 'Stay',   banner: 'Navigation disabled. You can still capture steps.', icon: (c) => <HandIcon color={c} /> },
  { id: 'float',  label: 'Free-floating step',    short: 'Free',   banner: "Don't need a screenshot? Drag to capture, or add a step without one.", icon: (c) => <FrameIcon color={c} /> },
  { id: 'censor', label: 'Censor sensitive data', short: 'Censor', banner: 'Click any element to blur it. Click a blurred area to undo.', icon: (c) => <CensorIcon color={c} /> },
];

// ─── Tokens (proposed toolbar surface set — calmer than the 5-accent sprawl) ──
const T = {
  bg:       '#1f1f32',
  surface:  '#33324a',
  surfaceHi:'#42415c',
  border:   '#2b2b40',
  text:     '#ECECF3',
  textDim:  '#9b99ad',
  accent:   '#2f7ff0',  // single capture/active hue
  accentHi: '#1f6ad8',
  success:  '#198558',
  successHi:'#146c48',
  danger:   '#e5484d',
};

// ─── Premium token set (Variant D) — ONE accent + neutrals, red only in dialog ─
const P = {
  bg:        '#1d1d2e',
  hairline:  'rgba(255,255,255,0.08)', // lightened edge, not a muddy dark fill
  divider:   'rgba(255,255,255,0.08)',
  text:      '#ECECF3',
  textDim:   '#8d8b9e',
  accent:    '#2f7ff0',
  accentHi:  '#418bf3',
  accentSoft:'rgba(47,127,240,0.16)',  // tinted (not green) Done
  grip:      'rgba(255,255,255,0.20)',
  // restrained two-layer shadow, not shadow-2xl
  shadow:    '0 1px 0 rgba(255,255,255,0.05) inset, 0 10px 30px -10px rgba(0,0,0,0.55)',
  rOuter:    14,
  rInner:    8,
};

// ─── Icons (lightweight, stroke-based) ───────────────────────────────────────
function CursorIcon({ color = '#fff' }: { color?: string }) {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12l3 0" /><path d="M12 3l0 3" /><path d="M7.8 7.8l-2.2 -2.2" /><path d="M16.2 7.8l2.2 -2.2" /><path d="M7.8 16.2l-2.2 2.2" /><path d="M12 12l9 3l-4 2l-2 4l-3 -9" /></svg>;
}
function HandIcon({ color = '#fff' }: { color?: string }) {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 11V6a2 2 0 0 0-4 0v5M14 10V4a2 2 0 0 0-4 0v7M10 10.5V6a2 2 0 0 0-4 0v8a6 6 0 0 0 6 6h1a6 6 0 0 0 6-6v-2a2 2 0 0 0-4 0" /></svg>;
}
function FrameIcon({ color = '#fff' }: { color?: string }) {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7V5a1 1 0 0 1 1-1h2M17 4h2a1 1 0 0 1 1 1v2M20 17v2a1 1 0 0 1-1 1h-2M7 20H5a1 1 0 0 1-1-1v-2" /><circle cx="12" cy="12" r="2.5" /></svg>;
}
function CensorIcon({ color = '#fff' }: { color?: string }) {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 3a9 9 0 0 0 0 18z" fill={color} stroke="none" /></svg>;
}
function PauseIcon({ color = '#fff' }: { color?: string }) {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round"><path d="M9 5v14M15 5v14" /></svg>;
}
function CheckIcon({ color = '#fff' }: { color?: string }) {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>;
}
function TrashIcon({ color = '#fff' }: { color?: string }) {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg>;
}
function HelpIcon({ color = '#fff' }: { color?: string }) {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01" /></svg>;
}
function MoreIcon({ color = '#fff' }: { color?: string }) {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><circle cx="5" cy="12" r="1.4" fill={color} stroke="none" /><circle cx="12" cy="12" r="1.4" fill={color} stroke="none" /><circle cx="19" cy="12" r="1.4" fill={color} stroke="none" /></svg>;
}
function ChevronIcon({ color = '#fff' }: { color?: string }) {
  return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>;
}
function GripIcon() {
  return (
    <svg width="14" height="20" viewBox="0 0 14 20" fill="none">
      {[5, 10, 15].flatMap((y) => [4, 10].map((x) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="1.4" fill={T.textDim} />
      )))}
    </svg>
  );
}

// ─── Shared bits ──────────────────────────────────────────────────────────────
function StepCount({ n }: { n: number }) {
  return (
    <div className="flex items-center gap-[6px] px-[10px] h-[34px] rounded-[8px] shrink-0"
         style={{ background: '#fff' }}>
      <motion.span key={n} initial={{ scale: 1.18, color: '#fb923c' }} animate={{ scale: 1, color: '#1f1f32' }}
        transition={{ duration: 0.3 }} className="text-[13px] font-semibold tabular-nums">{n}</motion.span>
      <span className="text-[13px] font-medium" style={{ color: '#6b697b' }}>steps</span>
    </div>
  );
}

function Grip() {
  return (
    <button aria-label="Move toolbar"
      className="flex items-center justify-center h-full px-[8px] rounded-l-[14px] cursor-grab active:cursor-grabbing focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2f7ff0]"
      style={{ background: 'transparent' }}>
      <GripIcon />
    </button>
  );
}

function DoneBtn({ disabled }: { disabled?: boolean }) {
  return (
    <button disabled={disabled} aria-label="Done"
      className="flex items-center gap-[6px] h-[34px] px-[12px] rounded-[8px] text-[13px] font-semibold text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-[#198558] disabled:opacity-40 disabled:cursor-not-allowed"
      style={{ background: disabled ? '#2a4d3c' : T.success }}
      onMouseEnter={(e) => !disabled && (e.currentTarget.style.background = T.successHi)}
      onMouseLeave={(e) => !disabled && (e.currentTarget.style.background = T.success)}>
      <CheckIcon /> Done
    </button>
  );
}

function IconBtn({ label, active, danger, children, onClick }: {
  label: string; active?: boolean; danger?: boolean; children: React.ReactNode; onClick?: () => void;
}) {
  const bg = active ? T.accent : 'transparent';
  return (
    <button aria-label={label} aria-pressed={active} onClick={onClick}
      title={label}
      className="flex items-center justify-center size-[34px] rounded-[8px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2f7ff0]"
      style={{ background: bg }}
      onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = T.surfaceHi; }}
      onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = 'transparent'; }}>
      {children}
    </button>
  );
}

function Divider() {
  return <div className="w-px h-[22px] mx-[3px] shrink-0" style={{ background: 'rgba(255,255,255,0.12)' }} />;
}

// ─── Mode menu (shared by variant A) ──────────────────────────────────────────
function ModeMenu({ mode, onPick, extras }: {
  mode: Mode; onPick: (m: Mode) => void; extras?: React.ReactNode;
}) {
  return (
    <div className="rounded-[10px] py-[5px] w-[248px] shadow-2xl"
         style={{ background: T.bg, border: `1px solid ${T.border}` }} role="menu">
      {MODES.map((m) => {
        const on = m.id === mode;
        return (
          <button key={m.id} role="menuitemradio" aria-checked={on} onClick={() => onPick(m.id)}
            className="flex items-center gap-[10px] w-full px-[10px] py-[8px] rounded-[6px] text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2f7ff0]"
            style={{ background: on ? T.accent : 'transparent' }}
            onMouseEnter={(e) => { if (!on) e.currentTarget.style.background = T.surface; }}
            onMouseLeave={(e) => { if (!on) e.currentTarget.style.background = 'transparent'; }}>
            <span className="shrink-0">{m.icon('#fff')}</span>
            <span className="flex-1 text-[13.5px] text-white">{m.label}</span>
            {on && <CheckIcon />}
          </button>
        );
      })}
      {extras}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// VARIANT A — Mode + overflow split  (Loom / Arcade)
// Resting bar = grip · steps · [active mode ▾] · Done.  Everything else in menu.
// ═══════════════════════════════════════════════════════════════════════════
function VariantA({ n }: { n: number }) {
  const [mode, setMode] = useState<Mode>('click');
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const active = MODES.find((m) => m.id === mode)!;

  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    if (open) document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [open]);

  return (
    <div className="flex items-center h-[50px] rounded-[14px] shadow-2xl pr-[8px]"
         style={{ background: T.bg, border: `1px solid ${T.border}` }}>
      <Grip />
      <StepCount n={n} />
      <Divider />
      <div className="relative" ref={ref}>
        <button aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}
          className="flex items-center gap-[8px] h-[34px] pl-[10px] pr-[8px] rounded-[8px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2f7ff0]"
          style={{ background: T.accent }}
          onMouseEnter={(e) => (e.currentTarget.style.background = T.accentHi)}
          onMouseLeave={(e) => (e.currentTarget.style.background = T.accent)}>
          {active.icon('#fff')}
          <span className="text-[13px] font-medium text-white whitespace-nowrap">{active.short}</span>
          <ChevronIcon />
        </button>
        <AnimatePresence>
          {open && (
            <motion.div initial={{ opacity: 0, y: 8, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.97 }} transition={{ duration: 0.14 }}
              className="absolute bottom-full left-0 mb-[12px] origin-bottom-left">
              <ModeMenu mode={mode} onPick={(m) => { setMode(m); setOpen(false); }}
                extras={
                  <>
                    <div className="h-px my-[5px] mx-[8px]" style={{ background: T.border }} />
                    <div className="flex items-center gap-[4px] px-[8px] pb-[2px]">
                      <MenuAction icon={<PauseIcon color={T.text} />} label="Pause" />
                      <MenuAction icon={<TrashIcon color={T.danger} />} label="Discard" danger />
                      <MenuAction icon={<HelpIcon color={T.text} />} label="Help" />
                    </div>
                  </>
                } />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Divider />
      <DoneBtn disabled={n === 0} />
    </div>
  );
}

function MenuAction({ icon, label, danger }: { icon: React.ReactNode; label: string; danger?: boolean }) {
  return (
    <button className="flex flex-1 flex-col items-center gap-[4px] py-[8px] rounded-[6px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2f7ff0]"
      style={{ background: 'transparent' }}
      onMouseEnter={(e) => (e.currentTarget.style.background = T.surface)}
      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}>
      {icon}
      <span className="text-[11px]" style={{ color: danger ? T.danger : T.textDim }}>{label}</span>
    </button>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// VARIANT B — Labeled segmented modes  (VEED)
// Modes are a visible segmented control; active = filled + label. Overflow ⋯.
// ═══════════════════════════════════════════════════════════════════════════
function VariantB({ n }: { n: number }) {
  const [mode, setMode] = useState<Mode>('click');
  const [more, setMore] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setMore(false); };
    if (more) document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [more]);

  return (
    <div className="flex items-center h-[50px] rounded-[14px] shadow-2xl pr-[8px]"
         style={{ background: T.bg, border: `1px solid ${T.border}` }}>
      <Grip />
      <StepCount n={n} />
      <Divider />
      {/* Segmented modes */}
      <div className="flex items-center gap-[2px] p-[3px] rounded-[10px]" style={{ background: '#181826' }} role="radiogroup" aria-label="Capture mode">
        {MODES.map((m) => {
          const on = m.id === mode;
          return (
            <button key={m.id} role="radio" aria-checked={on} aria-label={m.label} title={m.label}
              onClick={() => setMode(m.id)}
              className="flex items-center gap-[6px] h-[30px] rounded-[7px] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2f7ff0]"
              style={{ background: on ? T.accent : 'transparent', paddingLeft: on ? 10 : 8, paddingRight: on ? 11 : 8 }}
              onMouseEnter={(e) => { if (!on) e.currentTarget.style.background = T.surface; }}
              onMouseLeave={(e) => { if (!on) e.currentTarget.style.background = 'transparent'; }}>
              {m.icon(on ? '#fff' : T.textDim)}
              <AnimatePresence initial={false}>
                {on && (
                  <motion.span initial={{ width: 0, opacity: 0 }} animate={{ width: 'auto', opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }} transition={{ duration: 0.16 }}
                    className="text-[12.5px] font-medium text-white whitespace-nowrap overflow-hidden">{m.short}</motion.span>
                )}
              </AnimatePresence>
            </button>
          );
        })}
      </div>
      <Divider />
      <DoneBtn disabled={n === 0} />
      <div className="relative" ref={ref}>
        <IconBtn label="More actions" onClick={() => setMore((o) => !o)}><MoreIcon color={T.text} /></IconBtn>
        <AnimatePresence>
          {more && (
            <motion.div initial={{ opacity: 0, y: 8, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.97 }} transition={{ duration: 0.14 }}
              className="absolute bottom-full right-0 mb-[12px] origin-bottom-right rounded-[10px] py-[5px] w-[180px] shadow-2xl"
              style={{ background: T.bg, border: `1px solid ${T.border}` }} role="menu">
              <MenuRow icon={<PauseIcon color={T.text} />} label="Pause capture" />
              <MenuRow icon={<HelpIcon color={T.text} />} label="Help" />
              <div className="h-px my-[4px] mx-[8px]" style={{ background: T.border }} />
              <MenuRow icon={<TrashIcon color={T.danger} />} label="Discard all" danger />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function MenuRow({ icon, label, danger }: { icon: React.ReactNode; label: string; danger?: boolean }) {
  return (
    <button role="menuitem"
      className="flex items-center gap-[10px] w-full px-[12px] py-[8px] text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2f7ff0]"
      style={{ background: 'transparent' }}
      onMouseEnter={(e) => (e.currentTarget.style.background = T.surface)}
      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}>
      {icon}<span className="text-[13px]" style={{ color: danger ? T.danger : T.text }}>{label}</span>
    </button>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// VARIANT C — Two-pill transport  (Loom exact)
// Primary pill (steps · mode ▾ · Done) + a separate secondary pill that
// fades to low opacity until hovered.
// ═══════════════════════════════════════════════════════════════════════════
function VariantC({ n }: { n: number }) {
  const [mode, setMode] = useState<Mode>('click');
  const [open, setOpen] = useState(false);
  const [hoverSec, setHoverSec] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const active = MODES.find((m) => m.id === mode)!;
  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    if (open) document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [open]);

  return (
    <div className="flex items-center gap-[10px]">
      {/* PRIMARY */}
      <div className="flex items-center h-[50px] rounded-[14px] shadow-2xl pr-[8px]"
           style={{ background: T.bg, border: `1px solid ${T.border}` }}>
        <Grip />
        <StepCount n={n} />
        <Divider />
        <div className="relative" ref={ref}>
          <button aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}
            className="flex items-center gap-[8px] h-[34px] pl-[10px] pr-[8px] rounded-[8px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2f7ff0]"
            style={{ background: T.accent }}>
            {active.icon('#fff')}
            <span className="text-[13px] font-medium text-white whitespace-nowrap">{active.short}</span>
            <ChevronIcon />
          </button>
          <AnimatePresence>
            {open && (
              <motion.div initial={{ opacity: 0, y: 8, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.97 }} transition={{ duration: 0.14 }}
                className="absolute bottom-full left-0 mb-[12px] origin-bottom-left">
                <ModeMenu mode={mode} onPick={(m) => { setMode(m); setOpen(false); }} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <Divider />
        <DoneBtn disabled={n === 0} />
      </div>

      {/* SECONDARY — calm, fades unless hovered */}
      <motion.div animate={{ opacity: hoverSec ? 1 : 0.55 }} transition={{ duration: 0.2 }}
        onMouseEnter={() => setHoverSec(true)} onMouseLeave={() => setHoverSec(false)}
        className="flex items-center gap-[2px] h-[50px] px-[6px] rounded-[14px] shadow-2xl"
        style={{ background: T.bg, border: `1px solid ${T.border}` }}>
        <IconBtn label="Pause capture"><PauseIcon color={T.text} /></IconBtn>
        <IconBtn label="Help"><HelpIcon color={T.text} /></IconBtn>
        <Divider />
        <IconBtn label="Discard all"><TrashIcon color={T.danger} /></IconBtn>
      </motion.div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// VARIANT D — Premium minimal  (the reduction)
// ONE accent (blue) + neutrals at rest. "N steps" is plain tabular text, not a
// chip. Done is DEFERRED until n>0 and renders TINTED blue, never green.
// Red lives only inside the Discard confirm dialog. Hairline border, tight
// shadow, two-radius scale, single type weight (600 only on active mode).
// ═══════════════════════════════════════════════════════════════════════════
function VariantD({ n }: { n: number }) {
  const [mode, setMode] = useState<Mode>('click');
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const active = MODES.find((m) => m.id === mode)!;

  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    if (open) document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [open]);

  return (
    <div className="relative flex flex-col items-stretch gap-[8px]">
      {/* Per-mode banner — floats above the bar (no-nav / free-float / censor) */}
      <AnimatePresence mode="wait">
        {active.banner && (
          <motion.div key={active.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }} transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-[8px] px-[14px] py-[9px] self-start max-w-[360px]"
            style={{ background: '#fff', borderRadius: P.rInner + 2, border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 6px 18px -8px rgba(0,0,0,0.25)' }}>
            <span className="shrink-0">{active.icon('#6b697b')}</span>
            <p className="text-[12.5px] leading-[17px]" style={{ color: '#3d3c52', fontWeight: 500 }}>{active.banner}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center h-[48px] pr-[8px]"
        style={{ background: P.bg, border: `1px solid ${P.hairline}`, borderRadius: P.rOuter, boxShadow: P.shadow }}>

        {/* Grip — felt, not read */}
        <button aria-label="Move toolbar"
          className="flex items-center justify-center h-full px-[9px] cursor-grab active:cursor-grabbing focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2f7ff0]"
          style={{ borderTopLeftRadius: P.rOuter, borderBottomLeftRadius: P.rOuter }}>
          <svg width="14" height="20" viewBox="0 0 14 20" fill="none">
            {[5, 10, 15].flatMap((y) => [4, 10].map((x) => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r="1.4" fill={P.grip} />
            )))}
          </svg>
        </button>

        {/* Steps — PLAIN TEXT readout, no fill, no radius, tabular, quiet fade */}
        <div className="px-[6px] pr-[12px] select-none" aria-live="polite">
          <motion.span key={n} initial={{ opacity: 0.55 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}
            className="text-[13px] font-medium whitespace-nowrap" style={{ fontVariantNumeric: 'tabular-nums', color: P.textDim }}>
            <span style={{ color: P.text, fontWeight: 600 }}>{n}</span>{' '}{n === 1 ? 'step' : 'steps'}
          </motion.span>
        </div>

        <div className="w-px h-[20px] mr-[4px]" style={{ background: P.divider }} />

        {/* Capture — THE primary action. Only saturated object at rest. */}
        <div className="relative" ref={ref}>
          <button aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}
            className="flex items-center gap-[8px] h-[34px] pl-[11px] pr-[9px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-[#2f7ff0]"
            style={{ background: P.accent, borderRadius: P.rInner }}
            onMouseEnter={(e) => (e.currentTarget.style.background = P.accentHi)}
            onMouseLeave={(e) => (e.currentTarget.style.background = P.accent)}>
            {active.icon('#fff')}
            <span className="text-[13px] text-white whitespace-nowrap" style={{ fontWeight: 600 }}>{active.short}</span>
            <ChevronIcon />
          </button>
          <AnimatePresence>
            {open && (
              <motion.div initial={{ opacity: 0, y: 8, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.97 }} transition={{ duration: 0.14, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-full left-0 mb-[12px] origin-bottom-left">
                <div className="py-[5px] w-[252px]"
                  style={{ background: P.bg, border: `1px solid ${P.hairline}`, borderRadius: P.rInner + 2, boxShadow: P.shadow }} role="menu">
                  {MODES.map((m) => {
                    const on = m.id === mode;
                    return (
                      <button key={m.id} role="menuitemradio" aria-checked={on} onClick={() => { setMode(m.id); setOpen(false); }}
                        className="flex items-center gap-[11px] w-full px-[11px] py-[9px] mx-auto text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#2f7ff0]"
                        style={{ background: on ? P.accentSoft : 'transparent', borderRadius: P.rInner, width: 'calc(100% - 8px)' }}
                        onMouseEnter={(e) => { if (!on) e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                        onMouseLeave={(e) => { if (!on) e.currentTarget.style.background = 'transparent'; }}>
                        <span className="shrink-0">{m.icon(on ? P.accentHi : P.textDim)}</span>
                        <span className="flex-1 text-[13px]" style={{ color: P.text, fontWeight: on ? 600 : 500 }}>{m.label}</span>
                        {on && <CheckIcon color={P.accentHi} />}
                      </button>
                    );
                  })}
                  <div className="h-px my-[5px] mx-[11px]" style={{ background: P.divider }} />
                  {/* Secondary, monochrome — no green, no red */}
                  <button role="menuitem"
                    className="flex items-center gap-[11px] w-full px-[11px] py-[8px] text-left transition-colors focus-visible:outline-none"
                    style={{ borderRadius: P.rInner, width: 'calc(100% - 8px)', margin: '0 auto' }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}>
                    <PauseIcon color={P.textDim} /><span className="text-[13px]" style={{ color: P.text, fontWeight: 500 }}>Pause capture</span>
                  </button>
                  <button role="menuitem"
                    className="flex items-center gap-[11px] w-full px-[11px] py-[8px] text-left transition-colors focus-visible:outline-none"
                    style={{ borderRadius: P.rInner, width: 'calc(100% - 8px)', margin: '0 auto' }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}>
                    <HelpIcon color={P.textDim} /><span className="text-[13px]" style={{ color: P.text, fontWeight: 500 }}>Help</span>
                  </button>
                  <button role="menuitem" onClick={() => { setOpen(false); setConfirm(true); }}
                    className="flex items-center gap-[11px] w-full px-[11px] py-[8px] text-left transition-colors focus-visible:outline-none"
                    style={{ borderRadius: P.rInner, width: 'calc(100% - 8px)', margin: '0 auto' }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}>
                    <TrashIcon color={P.textDim} /><span className="text-[13px]" style={{ color: P.text, fontWeight: 500 }}>Discard all steps</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Done — ALWAYS visible. Quiet (tinted) at 0 steps, brightens to the
            loud filled "finish" primary once there's something to finish. */}
        <div className="flex items-center">
          <div className="w-px h-[20px] mx-[4px]" style={{ background: P.divider }} />
          <button aria-label="Done" disabled={n === 0} title={n === 0 ? 'Capture at least one step first' : 'Finish'}
            className="flex items-center gap-[6px] h-[34px] px-[13px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2f7ff0] whitespace-nowrap disabled:cursor-not-allowed"
            style={n === 0
              ? { background: 'transparent', border: `1px solid ${P.hairline}`, borderRadius: P.rInner, color: P.textDim }
              : { background: P.accent, borderRadius: P.rInner, color: '#fff' }}
            onMouseEnter={(e) => { if (n > 0) e.currentTarget.style.background = P.accentHi; }}
            onMouseLeave={(e) => { if (n > 0) e.currentTarget.style.background = P.accent; }}>
            <CheckIcon color={n === 0 ? P.textDim : '#fff'} />
            <span className="text-[13px]" style={{ fontWeight: 600 }}>Done</span>
          </button>
        </div>
      </div>

      {/* Discard confirm — the ONLY place red appears */}
      <AnimatePresence>
        {confirm && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.16 }}
            className="absolute left-1/2 -translate-x-1/2 bottom-full mb-[12px] w-[300px] p-[16px]"
            style={{ background: P.bg, border: `1px solid ${P.hairline}`, borderRadius: P.rInner + 2, boxShadow: P.shadow }}>
            <p className="text-[14px]" style={{ color: P.text, fontWeight: 600 }}>Discard all {n} {n === 1 ? 'step' : 'steps'}?</p>
            <p className="text-[12.5px] mt-[4px] leading-[18px]" style={{ color: P.textDim }}>This can't be undone.</p>
            <div className="flex justify-end gap-[8px] mt-[14px]">
              <button onClick={() => setConfirm(false)}
                className="h-[32px] px-[12px] text-[13px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2f7ff0]"
                style={{ color: P.text, fontWeight: 500, borderRadius: P.rInner, border: `1px solid ${P.hairline}` }}>Cancel</button>
              <button onClick={() => setConfirm(false)}
                className="h-[32px] px-[12px] text-[13px] text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e5484d]"
                style={{ background: T.danger, fontWeight: 600, borderRadius: P.rInner }}>Discard</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Lab shell ────────────────────────────────────────────────────────────────
function VariantBlock({ title, blurb, children }: { title: string; blurb: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-[14px]">
      <div className="text-center">
        <p className="text-[15px] font-semibold text-slate-800">{title}</p>
        <p className="text-[13px] text-slate-500 mt-[2px] max-w-[460px]">{blurb}</p>
      </div>
      <div className="flex items-center justify-center py-[10px]">{children}</div>
    </div>
  );
}

export default function ToolbarLab() {
  const [n, setN] = useState(0);
  return (
    <div className="fixed inset-0 overflow-auto" style={{
      background: 'radial-gradient(120% 120% at 50% 0%, #eef2f9 0%, #e2e8f3 60%, #d9e0ee 100%)',
    }}>
      {/* faux app behind, to judge weight over a bright surface */}
      <div className="pointer-events-none absolute inset-0 opacity-50"
        style={{ backgroundImage: 'linear-gradient(#fff 0 0)', }} />
      <div className="relative max-w-[920px] mx-auto px-6 py-12">
        <header className="mb-10 text-center">
          <p className="text-[12px] font-semibold tracking-wide uppercase text-[#2f7ff0]">Toolbar Lab · #lab</p>
          <h1 className="text-[26px] font-bold text-slate-900 mt-1">Three minimal directions</h1>
          <p className="text-[14px] text-slate-500 mt-2 max-w-[560px] mx-auto">
            Every action stays reachable. They differ in where the occasional ones live.
            Active mode = filled accent + checkmark in all three. Bump the step count to see the badge react.
          </p>
          <div className="mt-5 inline-flex items-center gap-2 bg-white rounded-full px-2 py-1.5 shadow-sm border border-slate-200">
            <button onClick={() => setN((v) => Math.max(0, v - 1))} className="size-7 rounded-full hover:bg-slate-100 text-slate-600 font-medium">–</button>
            <span className="text-[13px] text-slate-700 tabular-nums w-[64px] text-center">{n} steps</span>
            <button onClick={() => setN((v) => v + 1)} className="size-7 rounded-full hover:bg-slate-100 text-slate-600 font-medium">+</button>
          </div>
        </header>

        <div className="flex flex-col gap-14">
          <div className="rounded-[20px] p-8 pb-10" style={{ background: 'rgba(47,127,240,0.06)', border: '1px solid rgba(47,127,240,0.18)' }}>
            <VariantBlock title="D · Premium minimal  ★ recommended"
              blurb="One accent (blue) + neutrals. Status (grip · N steps as plain text) → PRIMARY (the active-mode pill; menu holds all 5 modes incl. Censor + Pause/Help/Discard) → TERMINAL (Done: quiet outline at 0 steps, brightens to filled accent once steps exist). Switch to Stay / Free / Censor to see the banner float above the bar. Red appears only in the discard confirm.">
              <VariantD n={n} />
            </VariantBlock>
          </div>

          <VariantBlock title="A · Mode + overflow split"
            blurb="Loom/Arcade pattern. Resting bar shows only steps, active mode, and Done. Other modes + Pause/Discard/Help live one click deep in the mode menu.">
            <VariantA n={n} />
          </VariantBlock>

          <VariantBlock title="B · Labeled segmented modes"
            blurb="VEED pattern. All four modes are visible as a segmented control; the active one fills blue and reveals its label. Pause/Help/Discard collapse into one ⋯ overflow.">
            <VariantB n={n} />
          </VariantBlock>

          <VariantBlock title="C · Two-pill transport"
            blurb="Loom recorder pattern. A tiny primary pill (steps · mode · Done) plus a separate secondary pill that stays faded until you reach for it.">
            <VariantC n={n} />
          </VariantBlock>
        </div>

        <footer className="mt-16 text-center text-[12px] text-slate-400">
          Mocks only · real App.tsx untouched · return to the app at <span className="font-mono">/</span> (remove #lab)
        </footer>
      </div>
    </div>
  );
}
