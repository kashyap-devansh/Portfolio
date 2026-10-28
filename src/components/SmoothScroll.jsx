import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "lenis";

let lenis = null;

/* Scroll to an element id (or the top) through Lenis when it is running. */
export function scrollToTarget(target, { immediate = false } = {}) {
  const el = typeof target === "string" ? document.getElementById(target) : null;
  const dest = el ?? 0;
  if (lenis) {
    lenis.scrollTo(dest, { offset: el ? -56 : 0, immediate, duration: 1.4 });
  } else if (el) {
    el.scrollIntoView({ behavior: immediate ? "auto" : "smooth" });
  } else {
    window.scrollTo({ top: 0, behavior: immediate ? "auto" : "smooth" });
  }
}

export default function SmoothScroll() {
  // `key` changes on every navigation, so re-clicking "#contact" scrolls again.
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    lenis = new Lenis({ duration: 1.15, smoothWheel: true, anchors: { offset: -56 } });
    let raf = requestAnimationFrame(function loop(t) {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    });
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenis = null;
    };
  }, []);

  // New page: jump to top, or to the #section the link pointed at.
  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      const t = setTimeout(() => scrollToTarget(id), 120);
      return () => clearTimeout(t);
    }
    scrollToTarget(null, { immediate: true });
  }, [pathname, hash, key]);

  return null;
}
