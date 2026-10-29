import { useEffect, useState } from "react";
import { getMusic } from "./music.js";

/* Live wall-clock time in a given IANA zone, ticking every second. */
function formatTime(timeZone) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(new Date());
}

export function useClock(timeZone) {
  const [time, setTime] = useState(() => formatTime(timeZone));

  useEffect(() => {
    const id = setInterval(() => setTime(formatTime(timeZone)), 1000);
    return () => clearInterval(id);
  }, [timeZone]);

  return time;
}

function readTheme() {
  try {
    return localStorage.getItem("theme") || "dark";
  } catch {
    return "dark";
  }
}

export function useTheme() {
  const [theme, setTheme] = useState(readTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "light" ? "#efe9df" : "#0f0f11");
    try {
      localStorage.setItem("theme", theme);
    } catch {
      /* storage unavailable — theme still applies for this visit */
    }
  }, [theme]);

  return [theme, () => setTheme((t) => (t === "light" ? "dark" : "light"))];
}

/*
  Background music on/off, remembered between visits and on by default.
  Browsers only allow sound after the visitor interacts with the page, so
  "on" starts at the first click, tap or key press — scrolling doesn't count.
*/
export function useMusic() {
  const [on, setOn] = useState(() => {
    try {
      return localStorage.getItem("music") !== "off";
    } catch {
      return true;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("music", on ? "on" : "off");
    } catch {
      /* storage unavailable — the choice lasts for this visit */
    }
    if (!on) {
      getMusic(false)?.pause();
      return;
    }

    const music = getMusic();
    let playing = false;
    const events = ["pointerdown", "click", "keydown", "touchend"];
    const detach = () => events.forEach((e) => window.removeEventListener(e, start, true));

    // Runs inside every gesture; a no-op once sound is playing, and the retry
    // path if a browser blocked a start that happened outside a gesture.
    function start() {
      if (playing || document.hidden) return;
      music
        .play()
        .then((ok) => (playing = ok))
        .catch(() => {});
    }

    const onVisibility = () => {
      if (document.hidden) {
        music.pause();
        playing = false;
      } else {
        start();
      }
    };

    events.forEach((e) => window.addEventListener(e, start, true));
    document.addEventListener("visibilitychange", onVisibility);
    // After the visitor has interacted (e.g. toggling back on), start straight away.
    if (navigator.userActivation?.hasBeenActive) start();

    return () => {
      detach();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [on]);

  return [on, () => setOn((o) => !o)];
}
