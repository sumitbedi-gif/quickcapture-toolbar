import { useEffect } from 'react';

/* ============================================================================
   Popup CTA — Selection & Edit Behaviour spec sheet.
   A self-contained interactive spec for the popup button editor: the button
   moves idle → button-selected → text-editing, with floating toolbars, plus
   the behavioural spec (states, transitions, cursor rules, notes).

   Ported verbatim from the standalone popup-button-interaction-spec.html so it
   can live on the same deploy. All styles are scoped under `.pbspec` so they
   never touch the rest of the app. Reachable at  #popup-button .
   ========================================================================== */

const STYLES = `
.pbspec {
  --pb-bg: #E5E7EB;
  --pb-canvas: #9CA3AF;
  --pb-popup: #FFFFFF;
  --pb-ink: #111827;
  --pb-muted: #6B7280;
  --pb-border: #E5E7EB;

  --pb-cta: #B91C1C;
  --pb-cta-hover: #991B1B;

  --pb-select: #F97316;
  --pb-select-tint: #FFEDD5;

  --pb-toolbar: #0F172A;
  --pb-toolbar-ink: #F8FAFC;
  --pb-toolbar-muted: #94A3B8;
  --pb-toolbar-divider: #1E293B;
  --pb-toolbar-pill: #1E293B;

  --pb-code-bg: #F3F4F6;

  --pb-r-sm: 6px;
  --pb-r-md: 10px;
  --pb-r-lg: 14px;

  position: fixed;
  inset: 0;
  overflow: auto;
  background: var(--pb-bg);
  color: var(--pb-ink);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  font-size: 14px;
  line-height: 1.5;
  user-select: none;
  -webkit-user-select: none;
}
.pbspec * { box-sizing: border-box; }

.pbspec .page {
  max-width: 1080px;
  margin: 0 auto;
  padding: 32px 24px 64px;
}

.pbspec header.spec-header { margin-bottom: 24px; }
.pbspec header.spec-header h1 {
  font-size: 22px;
  margin: 0 0 4px;
  letter-spacing: -0.01em;
}
.pbspec header.spec-header p {
  margin: 0;
  color: var(--pb-muted);
  max-width: 720px;
  user-select: text;
}

/* ───── Demo canvas ───── */
.pbspec .demo {
  position: relative;
  background: var(--pb-canvas);
  border-radius: var(--pb-r-lg);
  padding: 56px 24px 180px;
  margin-bottom: 32px;
  overflow: visible;
}
.pbspec .popup {
  background: var(--pb-popup);
  border-radius: var(--pb-r-md);
  padding: 28px 32px 36px;
  max-width: 560px;
  margin: 0 auto;
  box-shadow: 0 10px 30px rgba(0,0,0,0.15);
  position: relative;
  overflow: visible;
}
.pbspec .support-text {
  color: #4B5563;
  margin: 0 0 24px;
  text-align: center;
  font-size: 14px;
  line-height: 1.55;
}

.pbspec .button-area {
  display: flex;
  justify-content: center;
  position: relative;
}
.pbspec .button-wrap {
  position: relative;
  padding: 14px;
  border: 2px dashed transparent;
  border-radius: 8px;
  transition: background-color 120ms ease;
}
.pbspec[data-state="button-selected"] .button-wrap,
.pbspec[data-state="text-editing"] .button-wrap {
  border-color: var(--pb-select);
  background: var(--pb-select-tint);
  cursor: grab;
}
.pbspec[data-state="button-selected"] .button-wrap:active,
.pbspec[data-state="text-editing"] .button-wrap:active {
  cursor: grabbing;
}
.pbspec .button-wrap::before {
  content: "";
  position: absolute;
  width: 12px;
  height: 12px;
  background-image: radial-gradient(circle, var(--pb-select) 1.2px, transparent 1.4px);
  background-size: 4px 4px;
  right: -16px;
  bottom: -16px;
  opacity: 0;
  transition: opacity 120ms ease;
  pointer-events: none;
}
.pbspec[data-state="button-selected"] .button-wrap::before,
.pbspec[data-state="text-editing"] .button-wrap::before { opacity: 1; }

.pbspec .drag-handle {
  position: absolute;
  top: -14px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--pb-select);
  color: white;
  border-radius: 4px 4px 0 0;
  padding: 4px 10px;
  display: none;
  cursor: grab;
  line-height: 1;
  user-select: none;
}
.pbspec .drag-handle:active { cursor: grabbing; }
.pbspec .drag-handle .dots {
  display: grid;
  grid-template-columns: repeat(3, 3px);
  grid-template-rows: repeat(2, 3px);
  gap: 1px;
}
.pbspec .drag-handle .dots span {
  width: 3px; height: 3px;
  background: white;
  border-radius: 50%;
}
.pbspec[data-state="button-selected"] .drag-handle,
.pbspec[data-state="text-editing"] .drag-handle { display: block; }

.pbspec .cta {
  appearance: none;
  border: 0;
  background: var(--pb-cta);
  color: white;
  font-size: 15px;
  font-weight: 600;
  padding: 10px 28px;
  border-radius: var(--pb-r-sm);
  cursor: pointer;
  font-family: inherit;
  user-select: none;
}
.pbspec .cta:hover { background: var(--pb-cta-hover); }
.pbspec .cta-text {
  display: inline-block;
  outline: none;
  cursor: inherit;
}
.pbspec[data-state="button-selected"] .cta-text { cursor: text; }
.pbspec[data-state="text-editing"] .cta-text {
  cursor: text;
  user-select: text;
  -webkit-user-select: text;
}

/* ───── Toolbars ───── */
.pbspec .toolbar {
  position: absolute;
  top: calc(100% + 14px);
  left: 50%;
  transform: translateX(-50%);
  background: var(--pb-toolbar);
  color: var(--pb-toolbar-ink);
  border-radius: 10px;
  padding: 10px 14px;
  display: none;
  align-items: center;
  gap: 14px;
  box-shadow: 0 12px 28px rgba(0,0,0,0.25);
  font-size: 13px;
  white-space: nowrap;
  user-select: none;
  z-index: 10;
  cursor: default;
}
.pbspec[data-state="button-selected"] #pb-buttonToolbar { display: flex; }
.pbspec[data-state="text-editing"]   #pb-textToolbar   { display: flex; }

.pbspec .tb-section { display: flex; align-items: center; gap: 8px; }
.pbspec .tb-label { color: var(--pb-toolbar-muted); font-size: 12px; }
.pbspec .tb-pill {
  background: var(--pb-toolbar-pill);
  border-radius: 6px;
  padding: 6px 10px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
}
.pbspec .tb-pill .chev { color: var(--pb-toolbar-muted); font-size: 10px; }
.pbspec .tb-divider { width: 1px; height: 20px; background: var(--pb-toolbar-divider); }
.pbspec .tb-icon {
  width: 28px; height: 28px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--pb-toolbar-ink);
  border-radius: 4px;
  cursor: pointer;
}
.pbspec .tb-icon:hover { background: var(--pb-toolbar-pill); }
.pbspec .tb-toggle {
  background: var(--pb-toolbar-pill);
  border-radius: 6px;
  padding: 3px;
  display: inline-flex;
  gap: 2px;
}
.pbspec .tb-toggle button {
  background: transparent;
  border: 0;
  color: var(--pb-toolbar-muted);
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  font-family: inherit;
}
.pbspec .tb-toggle button.active {
  background: white;
  color: var(--pb-toolbar);
  font-weight: 600;
}
.pbspec .tb-plus {
  background: #FCA5A5;
  color: var(--pb-cta);
  width: 28px; height: 28px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  cursor: pointer;
}

.pbspec #pb-textToolbar .rte-btn {
  background: transparent;
  border: 0;
  color: var(--pb-toolbar-ink);
  padding: 4px 6px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  font-family: inherit;
  min-width: 24px;
}
.pbspec #pb-textToolbar .rte-btn:hover { background: var(--pb-toolbar-pill); }
.pbspec #pb-textToolbar .rte-btn.b { font-weight: 700; }
.pbspec #pb-textToolbar .rte-btn.i { font-style: italic; }
.pbspec #pb-textToolbar .rte-btn.u { text-decoration: underline; }
.pbspec #pb-textToolbar .size {
  color: var(--pb-toolbar-muted);
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding-left: 8px;
}

/* ───── Spec sections ───── */
.pbspec .spec { user-select: text; }
.pbspec .spec h2 {
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--pb-muted);
  margin: 32px 0 12px;
  font-weight: 600;
}
.pbspec .spec h2:first-child { margin-top: 0; }

.pbspec table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: var(--pb-r-md);
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04);
}
.pbspec th, .pbspec td {
  text-align: left;
  padding: 12px 16px;
  border-bottom: 1px solid var(--pb-border);
  font-size: 13px;
  vertical-align: top;
}
.pbspec th {
  background: #F9FAFB;
  font-weight: 600;
  color: #374151;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
.pbspec tr:last-child td { border-bottom: 0; }
.pbspec td code, .pbspec p code, .pbspec li code {
  background: var(--pb-code-bg);
  padding: 1px 6px;
  border-radius: 4px;
  font-size: 12px;
  font-family: "SF Mono", Menlo, Consolas, monospace;
}

.pbspec .grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}
@media (max-width: 720px) {
  .pbspec .grid-2 { grid-template-columns: 1fr; }
}

.pbspec .card {
  background: white;
  padding: 16px 20px;
  border-radius: var(--pb-r-md);
  border: 1px solid var(--pb-border);
}
.pbspec .card h3 {
  margin: 0 0 8px;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #374151;
}
.pbspec .card p { margin: 6px 0; color: #4B5563; }

.pbspec .kbd {
  background: #F3F4F6;
  border: 1px solid #D1D5DB;
  border-bottom-width: 2px;
  padding: 1px 6px;
  border-radius: 4px;
  font-family: "SF Mono", Menlo, monospace;
  font-size: 11px;
}

.pbspec .state-pill {
  position: fixed;
  bottom: 16px;
  right: 16px;
  background: var(--pb-toolbar);
  color: var(--pb-toolbar-ink);
  padding: 8px 14px;
  border-radius: 999px;
  font-size: 12px;
  font-family: "SF Mono", Menlo, monospace;
  box-shadow: 0 6px 20px rgba(0,0,0,0.2);
  z-index: 100;
}
.pbspec .state-pill .dot {
  display: inline-block;
  width: 8px; height: 8px;
  border-radius: 50%;
  background: #6B7280;
  margin-right: 8px;
  vertical-align: middle;
}
.pbspec[data-state="button-selected"] .state-pill .dot { background: var(--pb-select); }
.pbspec[data-state="text-editing"] .state-pill .dot { background: #22C55E; }

.pbspec .hint {
  text-align: center;
  color: white;
  opacity: 0.85;
  font-size: 12px;
  margin-top: 96px;
  user-select: none;
}
`;

export default function PopupButtonPage() {
  // Interaction logic, ported from the original IIFE. Scoped to this page's
  // root element rather than document.body so it never leaks.
  useEffect(() => {
    const root = document.getElementById('pbspec-root') as HTMLElement | null;
    const cta = document.getElementById('pb-cta');
    const text = document.getElementById('pb-ctaText') as HTMLElement | null;
    const wrap = document.getElementById('pb-buttonWrap');
    const handle = document.getElementById('pb-dragHandle');
    const buttonToolbar = document.getElementById('pb-buttonToolbar');
    const textToolbar = document.getElementById('pb-textToolbar');
    const stateValue = document.getElementById('pb-stateValue');
    if (!root || !cta || !text || !wrap || !handle || !buttonToolbar || !textToolbar || !stateValue) return;

    let state = 'idle';

    function setState(next: string, opts: { preserveNativeCaret?: boolean } = {}) {
      if (next === state) return;
      state = next;
      root!.dataset.state = next;
      stateValue!.textContent = next;

      if (next === 'text-editing') {
        text!.contentEditable = 'true';
        if (!opts.preserveNativeCaret) {
          requestAnimationFrame(() => {
            text!.focus();
            const range = document.createRange();
            range.selectNodeContents(text!);
            range.collapse(false);
            const sel = window.getSelection();
            sel?.removeAllRanges();
            sel?.addRange(range);
          });
        }
      } else {
        text!.contentEditable = 'false';
        if (document.activeElement === text) text!.blur();
        window.getSelection()?.removeAllRanges();
      }
    }

    const onCtaMouseDown = (e: MouseEvent) => {
      if (state === 'text-editing') {
        if (e.target === text) return; // let native caret placement happen
        e.preventDefault();
        setState('button-selected');
        return;
      }
      if (state === 'idle') {
        e.preventDefault();
        setState('button-selected');
        return;
      }
      if (state === 'button-selected' && e.target === text) {
        // Enable contenteditable synchronously so the click that completes
        // this mousedown places the caret natively at the click position.
        text!.contentEditable = 'true';
        setState('text-editing', { preserveNativeCaret: true });
        return;
      }
      e.preventDefault(); // button-selected + padding click: no-op
    };

    const onHandleMouseDown = (e: MouseEvent) => { e.stopPropagation(); };

    const onDocMouseDown = (e: MouseEvent) => {
      const t = e.target as Node;
      const inside = wrap.contains(t) || buttonToolbar.contains(t) || textToolbar.contains(t);
      if (!inside) setState('idle');
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (state === 'text-editing') setState('button-selected');
        else if (state === 'button-selected') setState('idle');
      } else if (e.key === 'Enter' && state === 'button-selected') {
        e.preventDefault();
        setState('text-editing');
      }
    };

    cta.addEventListener('mousedown', onCtaMouseDown);
    handle.addEventListener('mousedown', onHandleMouseDown);
    document.addEventListener('mousedown', onDocMouseDown);
    document.addEventListener('keydown', onKeyDown);

    return () => {
      cta.removeEventListener('mousedown', onCtaMouseDown);
      handle.removeEventListener('mousedown', onHandleMouseDown);
      document.removeEventListener('mousedown', onDocMouseDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  return (
    <div id="pbspec-root" className="pbspec" data-state="idle">
      <style>{STYLES}</style>

      <div className="page">
        <header className="spec-header">
          <h1>Popup CTA — Selection &amp; Edit Behavior</h1>
          <p>
            First click on the button selects the button and surfaces the button configuration toolbar.
            While selected, the label shows a text cursor, and a single click on the label drops into
            rich-text editing. Both toolbars float as tooltips directly below the selection, not at the
            bottom of the canvas.
          </p>
        </header>

        {/* ───── INTERACTIVE DEMO ───── */}
        <section className="demo">
          <div className="popup">
            <p className="support-text">
              Here goes the support text to compliment the header title above and explain it. Here goes
              the support text to compliment the header title above and explain it.
            </p>

            <div className="button-area">
              <div className="button-wrap" id="pb-buttonWrap">
                <div className="drag-handle" id="pb-dragHandle" title="Drag to move">
                  <div className="dots">
                    <span /><span /><span />
                    <span /><span /><span />
                  </div>
                </div>
                <button className="cta" id="pb-cta" type="button">
                  <span className="cta-text" id="pb-ctaText" contentEditable={false} spellCheck={false}>
                    Alright!
                  </span>
                </button>

                {/* Toolbars float below the selection */}
                <div className="toolbar" id="pb-buttonToolbar">
                  <span className="tb-plus">+</span>
                  <div className="tb-section">
                    <span className="tb-label">Action</span>
                    <span className="tb-pill">Start flow <span className="chev">▾</span></span>
                    <span className="tb-pill">Select Flow ✎</span>
                  </div>
                  <div className="tb-divider" />
                  <div className="tb-section">
                    <span className="tb-label">Type</span>
                    <div className="tb-toggle">
                      <button className="active">Primary</button>
                      <button>Secondary</button>
                    </div>
                  </div>
                  <div className="tb-divider" />
                  <span className="tb-icon" title="Fill">◐</span>
                  <span className="tb-icon" title="Size">⛶</span>
                  <span className="tb-icon" title="Align H">↔</span>
                  <span className="tb-icon" title="Align V">↕</span>
                  <span className="tb-icon" title="Delete">🗑</span>
                </div>

                <div className="toolbar" id="pb-textToolbar">
                  <button className="rte-btn b" title="Bold">B</button>
                  <button className="rte-btn i" title="Italic">i</button>
                  <button className="rte-btn u" title="Underline">U</button>
                  <button className="rte-btn" title="Color">A</button>
                  <span className="size">14 <span style={{ fontSize: 9, color: 'var(--pb-toolbar-muted)' }}>▾</span></span>
                </div>
              </div>
            </div>
          </div>

          <div className="hint">
            Try it: <strong>click</strong> the button → <strong>click</strong> the label → <strong>Esc</strong> to step back
          </div>
        </section>

        {/* ───── BEHAVIORAL SPEC ───── */}
        <section className="spec">
          <h2>States</h2>
          <table>
            <thead>
              <tr><th>State</th><th>Visible chrome</th><th>Active toolbar</th></tr>
            </thead>
            <tbody>
              <tr>
                <td><code>idle</code></td>
                <td>None. Button renders as a normal CTA.</td>
                <td>None</td>
              </tr>
              <tr>
                <td><code>button-selected</code></td>
                <td>Dashed selection border around the button with surrounding pad area, corner dot marker, drag handle above.</td>
                <td>Button configuration toolbar floating just below the selection (Action, Type, Fill, Size, Align, Delete).</td>
              </tr>
              <tr>
                <td><code>text-editing</code></td>
                <td>Selection border and drag handle remain. Label is editable; caret visible.</td>
                <td>Rich Text Editor floating in the same anchored position (B, I, U, color, size). Button toolbar is hidden.</td>
              </tr>
            </tbody>
          </table>

          <h2>Transitions</h2>
          <table>
            <thead>
              <tr><th>From</th><th>Trigger</th><th>To</th></tr>
            </thead>
            <tbody>
              <tr><td><code>idle</code></td><td>Single click anywhere on the button (label or padding)</td><td><code>button-selected</code></td></tr>
              <tr><td><code>button-selected</code></td><td>Single click on the button label</td><td><code>text-editing</code></td></tr>
              <tr><td><code>button-selected</code></td><td>Single click on the button padding (red area, not the label)</td><td>No change — stays <code>button-selected</code></td></tr>
              <tr><td><code>button-selected</code></td><td><span className="kbd">Enter</span> key</td><td><code>text-editing</code> (keyboard parity)</td></tr>
              <tr><td><code>button-selected</code></td><td>Click outside the button &amp; its toolbar</td><td><code>idle</code></td></tr>
              <tr><td><code>button-selected</code></td><td><span className="kbd">Esc</span></td><td><code>idle</code></td></tr>
              <tr><td><code>text-editing</code></td><td>Click on the button padding (not the label)</td><td><code>button-selected</code></td></tr>
              <tr><td><code>text-editing</code></td><td><span className="kbd">Esc</span></td><td><code>button-selected</code></td></tr>
              <tr><td><code>text-editing</code></td><td>Click outside the button entirely</td><td><code>idle</code></td></tr>
            </tbody>
          </table>

          <h2>Cursor rules</h2>
          <table>
            <thead>
              <tr><th>State</th><th>Hover target</th><th>Cursor</th></tr>
            </thead>
            <tbody>
              <tr><td><code>idle</code></td><td>Button (any part, incl. label)</td><td><code>pointer</code></td></tr>
              <tr><td rowSpan={4}><code>button-selected</code></td><td>Button label</td><td><code>text</code> (I-beam), single click enters edit mode</td></tr>
              <tr><td>Button padding (red area, not label)</td><td><code>pointer</code></td></tr>
              <tr><td>Selection wrap padding (between button and dashed border)</td><td><code>grab</code> / <code>grabbing</code></td></tr>
              <tr><td>Drag handle</td><td><code>grab</code> / <code>grabbing</code></td></tr>
              <tr><td rowSpan={3}><code>text-editing</code></td><td>Button label</td><td><code>text</code> (I-beam; native selection enabled)</td></tr>
              <tr><td>Button padding (red area, not label)</td><td><code>pointer</code>, click exits to <code>button-selected</code></td></tr>
              <tr><td>Drag handle / wrap padding</td><td><code>grab</code> / <code>grabbing</code></td></tr>
            </tbody>
          </table>

          <h2>Toolbar positioning</h2>
          <div className="card" style={{ marginTop: 0 }}>
            <p style={{ marginTop: 0 }}>Both toolbars are anchored to the button selection, not the popup canvas. They render as a floating tooltip-style panel directly below the dashed selection border, centered on the button, with a 14px gap.</p>
            <p><strong>Implementation:</strong> position the toolbar absolutely against the selection wrap element (the dashed-border container), with <code>top: calc(100% + 14px); left: 50%; transform: translateX(-50%)</code>. The toolbar follows the button if the button is moved within the popup.</p>
            <p style={{ marginBottom: 0 }}><strong>Edge cases for production:</strong> if the button is near the bottom of the popup and the toolbar would overflow the viewport, flip the toolbar above the selection (<code>bottom: calc(100% + 14px)</code> instead). Also reposition horizontally if it would clip past the popup edges. For this spec, always-below is sufficient.</p>
          </div>

          <h2>Implementation notes</h2>
          <div className="grid-2">
            <div className="card">
              <h3>contenteditable</h3>
              <p>The label is <code>contenteditable="false"</code> by default. Flip to <code>"true"</code> only on entering <code>text-editing</code>. Flip back to <code>"false"</code> on every exit so the label cannot be edited or natively selected outside this state.</p>
            </div>
            <div className="card">
              <h3>user-select</h3>
              <p>Default the button and its label to <code>user-select: none</code>. Re-enable <code>user-select: text</code> on the label only in <code>text-editing</code>. This prevents accidental highlighting on drag and is what makes the click-through transition feel clean.</p>
            </div>
            <div className="card">
              <h3>Click-to-edit on the label</h3>
              <p>When <code>button-selected</code> and the click target is the label, enable <code>contenteditable</code> synchronously in the <code>mousedown</code> handler so the native click that follows places the caret at the click position. As a fallback, focus the label and place the caret at the end after the state transition.</p>
            </div>
            <div className="card">
              <h3>Click-outside detection</h3>
              <p>"Outside" means outside the union of the selection wrap and the currently visible toolbar. Toolbar clicks must not deselect, even though the toolbar is positioned outside the button's bounding box.</p>
            </div>
            <div className="card">
              <h3>Cursor disambiguation</h3>
              <p>Set cursors on three distinct layers: <code>.button-wrap</code> for grab, <code>.cta</code> for pointer (overrides grab on the button itself), and <code>.cta-text</code> for the I-beam in <code>button-selected</code> / <code>text-editing</code>. The cascade does the rest, so each region shows exactly one cursor.</p>
            </div>
            <div className="card">
              <h3>Keyboard parity</h3>
              <p><span className="kbd">Enter</span> from <code>button-selected</code> enters text edit. <span className="kbd">Esc</span> always steps back exactly one level. Keyboard users get the same affordance without needing a precise click on the label.</p>
            </div>
          </div>

          <h2>Why the change</h2>
          <div className="card" style={{ marginTop: 0 }}>
            <p style={{ marginTop: 0 }}><strong>Current behavior:</strong> the first hover on a button shows a text cursor over the label, and a click opens the Rich Text Editor. Button configuration (Action, Type, Fill, etc.) is only reachable by clicking the narrow strip between the label and the button edge, a target most users don't notice exists.</p>
            <p><strong>Problem:</strong> the most common reason a user clicks a button in the editor is to configure it, not to edit the label text. The default action serves the rarer intent, and the discoverable target opens the wrong toolbar.</p>
            <p style={{ marginBottom: 0 }}><strong>Fix:</strong> Treat the button as a container first. The first click on any part of the button selects it and opens the button toolbar. The label inside a selected button is then treated as the next-level edit target: its I-beam cursor signals "click me to edit text," and a single click drops into the RTE. Toolbars float directly below the selection so the relationship between the selected object and its controls is unambiguous.</p>
          </div>
        </section>
      </div>

      <div className="state-pill">
        <span className="dot" />
        state: <span id="pb-stateValue">idle</span>
      </div>
    </div>
  );
}
