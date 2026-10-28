import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "lenis";

let lenis = null;

const NAV_OFFSET = -56;

/* Scroll to an element id (or the top) through Lenis when it is running. */
export function scrollToTarget(target, { immediate = false } = {}) {
  const el = typeof target === "string" ? document.getElementById(target) : null;
  const dest = el ?? 0;
  if (lenis) {
    // Lenis caches the page height; after a route change it still holds the
    // previous page's, which clamps the scroll short. Re-measure first.
    lenis.resize();
    lenis.scrollTo(dest, {
      offset: el ? NAV_OFFSET : 0,
      immediate,
      duration: 1.4,
      force: true,
      // If late layout (images, fonts) moved the target, settle on it.
      onComplete: () => {
        if (el && Math.abs(el.getBoundingClientRect().top + NAV_OFFSET) > 4) {
          lenis.resize();
          lenis.scrollTo(el, { offset: NAV_OFFSET, immediate: true, force: true });
        }
      },
    });
  } else if (el) {
    el.scrollIntoView({ behavior: immediate ? "auto" : "smooth" });
  } else {
    window.scrollTo({ top: 0, behavior: immediate ? "auto" : "smooth" });
  }
}

/* Scroll to an absolute y position (used by the scroll ruler). */
export function scrollToY(y, { immediate = false } = {}) {
  if (lenis) {
    lenis.scrollTo(y, { immediate, duration: 1.1, force: true });
  } else {
    window.scrollTo({ top: y, behavior: immediate ? "auto" : "smooth" });
  }
}

export default function SmoothScroll() {
  // `key` changes on every navigation, so re-clicking "#contact" scrolls again.
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    lenis = new Lenis({ duration: 1.15, smoothWheel: true, anchors: { offset: NAV_OFFSET } });
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
      // Give the new page a moment to lay out before measuring it.
      const t = setTimeout(() => requestAnimationFrame(() => scrollToTarget(id)), 150);
      return () => clearTimeout(t);
    }
    scrollToTarget(null, { immediate: true });
  }, [pathname, hash, key]);

  return null;
}
