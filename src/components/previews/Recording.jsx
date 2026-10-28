import { useEffect, useState } from "react";
import { scripts } from "./scripts.js";
import DsaApp from "./DsaApp.jsx";

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const UNO_COLORS = { R: "#e5484d", G: "#30a46c", B: "#3e63dd", Y: "#f5c400" };

/* Turns "[[G+2]]" markers into little coloured cards. */
function Rich({ text }) {
  const parts = text.split(/(\[\[[^\]]+\]\])/g);
  return parts.map((p, i) => {
    const m = p.match(/^\[\[([RGBYW])(.*)\]\]$/);
    if (!m) return p;
    const [, c, v] = m;
    return (
      <span
        key={i}
        className={`rec__card ${c === "W" ? "rec__card--wild" : ""}`}
        style={c === "W" ? undefined : { background: UNO_COLORS[c] }}
      >
        {v || "★"}
      </span>
    );
  });
}

function Editor({ data }) {
  const rows = 9;
  return (
    <div className="rec__editor">
      <div className="rec__editor-body">
        {Array.from({ length: rows }, (_, i) => {
          const line = data.lines[i];
          return (
            <div key={i} className="rec__editor-line">
              <span className="rec__gutter">{line === undefined ? "~" : i + 1}</span>
              <span>
                {line}
                {i === data.cur && !data.cmd && <span className="rec__cursor" />}
              </span>
            </div>
          );
        })}
      </div>
      <div className="rec__status">
        <span className={`rec__mode rec__mode--${data.mode.toLowerCase()}`}>-- {data.mode} --</span>
        <span>{data.file}</span>
        <span>
          {data.cur + 1}:{(data.lines[data.cur] ?? "").length + 1}
        </span>
      </div>
      <div className="rec__cmdline">
        {data.cmd}
        {data.cmd && <span className="rec__cursor" />}
      </div>
    </div>
  );
}

function Tui({ data }) {
  return (
    <div className="rec__tui">
      <div className="rec__tui-head">
        <span>{data.title}</span>
        <span className="rec__dim">{data.sub}</span>
      </div>
      <div className="rec__tui-rows">
        {data.rows.map((r, i) => (
          <div
            key={i}
            className={`rec__tui-row ${i === data.active ? "is-active" : ""} ${
              data.header && i === 0 ? "is-header" : ""
            }`}
          >
            {!data.header && <span className="rec__dim">{i === data.active ? "›" : " "} </span>}
            {r}
          </div>
        ))}
      </div>
      <div className="rec__tui-foot rec__dim">{data.footer}</div>
    </div>
  );
}

/*
  A fake screen recording: plays the project's script while `playing`
  and rewinds to the start when it stops.
*/
export default function Recording({ project, playing }) {
  const script = scripts[project.id];
  const [log, setLog] = useState([]);
  const [screen, setScreen] = useState(null);
  const [typing, setTyping] = useState(null);
  const [step, setStep] = useState(0);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!playing || !script) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let cancelled = false;
    const started = Date.now();
    const clock = setInterval(() => setElapsed(Math.floor((Date.now() - started) / 1000)), 250);

    (async () => {
      while (!cancelled) {
        setLog([]);
        setScreen(null);
        setTyping(null);
        await wait(350);
        for (let i = 0; i < script.length; i++) {
          if (cancelled) return;
          const s = script[i];
          setStep(i + 1);
          if (s.cmd !== undefined) {
            setScreen(null);
            const prompt = s.prompt ?? "$";
            if (!reduced) {
              for (let c = 1; c <= s.cmd.length; c++) {
                if (cancelled) return;
                setTyping({ prompt, text: s.cmd.slice(0, c) });
                await wait(18 + Math.random() * 38);
              }
              await wait(180);
            }
            setTyping(null);
            setLog((l) => [...l, { cmd: s.cmd, prompt }]);
            await wait(120);
          } else if (s.out !== undefined) {
            setScreen(null);
            setLog((l) => [...l, { out: s.out }]);
            await wait(s.wait ?? 280);
          } else if (s.screen) {
            setScreen({ kind: s.screen, data: s.data });
            await wait(s.wait ?? 400);
          } else if (s.clear) {
            setLog([]);
            setScreen(null);
          } else if (s.wait) {
            await wait(s.wait);
          }
        }
        await wait(2200);
      }
    })();

    return () => {
      cancelled = true;
      clearInterval(clock);
      setLog([]);
      setScreen(null);
      setTyping(null);
      setStep(0);
      setElapsed(0);
    };
  }, [playing, script]);

  if (!script) return null;

  const mm = String(Math.floor(elapsed / 60)).padStart(2, "0");
  const ss = String(elapsed % 60).padStart(2, "0");
  // The idle prompt shows whichever program the next command is typed into.
  const nextPrompt = script.slice(step).find((s) => s.cmd !== undefined)?.prompt ?? "$";

  return (
    <div className={`rec ${playing ? "is-playing" : ""}`} aria-hidden="true">
      <div className="rec__bar">
        <span className="rec__live">
          <i /> REC
        </span>
        <span className="rec__dim">~/{project.id}</span>
        <span className="rec__time">
          {mm}:{ss}
        </span>
      </div>

      <div className="rec__screen">
        {screen?.kind === "editor" ? (
          <Editor data={screen.data} />
        ) : screen?.kind === "tui" ? (
          <Tui data={screen.data} />
        ) : screen?.kind === "dsa" ? (
          <DsaApp {...screen.data} playing />
        ) : (
          <pre className="rec__log">
            {log.map((l, i) =>
              l.cmd !== undefined ? (
                <div key={i}>
                  <span className="rec__prompt">{l.prompt}</span> {l.cmd}
                </div>
              ) : (
                <div key={i} className="rec__out">
                  <Rich text={l.out} />
                </div>
              ),
            )}
            <div>
              <span className="rec__prompt">{typing?.prompt ?? nextPrompt}</span>{" "}
              {typing?.text}
              <span className="rec__cursor" />
            </div>
          </pre>
        )}
      </div>

      <div className="rec__progress">
        <span style={{ transform: `scaleX(${step / script.length})` }} />
      </div>
    </div>
  );
}
