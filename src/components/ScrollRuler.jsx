import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { scrollToY } from "./SmoothScroll.jsx";

/*
  A measuring-tape scrollbar: a tick for every percent of the page, a needle
  with a rolling readout, and a marker at each "01/Section" heading. Ticks
  near the needle stretch with scroll speed. Click to jump, drag to scrub.
  Mouse-and-desktop only — touch devices keep native scrolling.
*/

const TICKS = Array.from({ length: 101 }, (_, i) => i);

function Digit({ value }) {
  return (
    <span className="ruler__digit">
      <span className="ruler__digit-col" style={{ transform: `translateY(${-value}em)` }}>
        {TICKS.slice(0, 10).map((d) => (
          <span key={d}>{d}</span>
        ))}
      </span>
    </span>
  );
}

function maxScroll() {
  return Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
}

export default function ScrollRuler() {
  const railRef = useRef(null);
  const tickRefs = useRef([]);
  const [pct, setPct] = useState(0);
  const [sections, setSections] = useState([]);
  const [enabled, setEnabled] = useState(false);
  const { pathname } = useLocation();

  // Only on wide screens with a fine pointer.
  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine) and (min-width: 900px)");
    const sync = () => {
      setEnabled(mq.matches);
      document.documentElement.toggleAttribute("data-ruler", mq.matches);
    };
    sync();
    mq.addEventListener("change", sync);
    return () => {
      mq.removeEventListener("change", sync);
      document.documentElement.removeAttribute("data-ruler");
    };
  }, []);

  // Section markers come from the page's own "01/Label" headings.
  useEffect(() => {
    if (!enabled) return;
    const measure = () => {
      const max = maxScroll();
      const found = [...document.querySelectorAll(".section-head__index")].map((el) => {
        const label = el.textContent.replace(/^\s*\d+\s*\/\s*/, "").trim();
        const y = el.getBoundingClientRect().top + window.scrollY - 80;
        return { label, at: Math.min(100, Math.max(0, (y / max) * 100)) };
      });
      setSections(found);
    };
    const t = setTimeout(measure, 400);
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    return () => {
      clearTimeout(t);
      ro.disconnect();
    };
  }, [enabled, pathname]);

  // Per-frame: needle position and velocity stretch, written straight to the DOM.
  useEffect(() => {
    if (!enabled) return;
    let raf;
    let lastY = window.scrollY;
    let vel = 0;
    let lastPct = -1;

    const frame = () => {
      const y = window.scrollY;
      const p = Math.min(1, Math.max(0, y / maxScroll()));
      vel += (Math.min(1, Math.abs(y - lastY) / 60) - vel) * 0.15;
      lastY = y;

      railRef.current?.style.setProperty("--p", p.toFixed(4));
      const needle = p * 100;
      tickRefs.current.forEach((el, i) => {
        if (!el) return;
        const near = Math.max(0, 1 - Math.abs(i - needle) / 12);
        el.style.setProperty("--s", (1 + near * vel * 1.4 + near * 0.35).toFixed(3));
      });

      const rounded = Math.round(needle);
      if (rounded !== lastPct) {
        lastPct = rounded;
        setPct(rounded);
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [enabled]);

  if (!enabled) return null;

  const toY = (clientY) => {
    const r = railRef.current.getBoundingClientRect();
    return Math.min(1, Math.max(0, (clientY - r.top) / r.height)) * maxScroll();
  };

  const onPointerDown = (e) => {
    e.preventDefault();
    railRef.current.setPointerCapture(e.pointerId);
    railRef.current.dataset.dragging = "";
    scrollToY(toY(e.clientY));
  };
  const onPointerMove = (e) => {
    if (railRef.current.hasPointerCapture(e.pointerId)) scrollToY(toY(e.clientY), { immediate: true });
  };
  const onPointerUp = (e) => {
    railRef.current.releasePointerCapture(e.pointerId);
    delete railRef.current.dataset.dragging;
  };

  const digits = String(pct).padStart(3, "0").split("").map(Number);

  return (
    <div
      ref={railRef}
      className="ruler"
      aria-hidden="true"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <div className="ruler__ticks">
        {TICKS.map((i) => (
          <span
            key={i}
            ref={(el) => (tickRefs.current[i] = el)}
            className={`ruler__tick ${i % 10 === 0 ? "is-major" : i % 5 === 0 ? "is-mid" : ""}`}
            style={{ top: `${i}%`, animationDelay: `${i * 6}ms` }}
          >
            {i % 10 === 0 && <em>{String(i).padStart(2, "0")}</em>}
          </span>
        ))}
      </div>

      {sections.map((s) => (
        <span key={`${s.label}-${s.at}`} className="ruler__section" style={{ top: `${s.at}%` }}>
          <b>{s.label}</b>
        </span>
      ))}

      <div className="ruler__needle">
        <span className="ruler__readout">
          {digits.map((d, i) => (
            <Digit key={i} value={d} />
          ))}
        </span>
      </div>
    </div>
  );
}
