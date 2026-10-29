/*
  Background music (public domain, see public/music/CREDITS.txt) on a
  seamless loop. Playback goes through Web Audio so it can fade smoothly —
  iOS ignores volume on a plain <audio> element — and so the page can listen
  to it: onBeat() subscribers get a 0–1 pulse on the beat plus four live
  frequency bands every frame while it plays.

  The pulse follows the track's own beat grid rather than guessing from the
  audio, so it never misses or double-fires. BPM and FIRST_BEAT were measured
  from this file (onset autocorrelation; the grid holds across all 3.5 min) —
  re-measure them if the track changes.
*/

const TRACK = "/music/track.mp3";
const VOLUME = 0.4;
const BPM = 165.78;
const FIRST_BEAT = 0.0302; // seconds
const PULSE_EVERY = 2; // pulse on every 2nd beat: ~83 a minute reads calmer on screen

const listeners = new Set();

// Subscribe to the beat; returns an unsubscribe function.
export function onBeat(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

const SILENT = [0, 0, 0, 0];
const emit = (pulse, bands) => listeners.forEach((fn) => fn(pulse, bands));

function createMusic() {
  const audio = new Audio(TRACK);
  audio.loop = true;
  audio.preload = "auto";

  let ctx = null;
  let gain = null;
  let analyser = null;
  let bins = null;
  let stopTimer = 0;
  let raf = 0;
  let bassPeak = 0.05;

  const fade = (to, seconds) => {
    const now = ctx.currentTime;
    gain.gain.cancelScheduledValues(now);
    gain.gain.setValueAtTime(gain.gain.value, now);
    gain.gain.linearRampToValueAtTime(to, now + seconds);
  };

  const band = (from, to) => {
    let sum = 0;
    for (let i = from; i < to; i++) sum += bins[i];
    return sum / (to - from) / 255;
  };

  const tick = () => {
    analyser.getByteFrequencyData(bins);
    const bass = band(1, 4); // ~40–170 Hz

    // Where we are in the beat, from what's actually reaching the speakers.
    const heard = audio.currentTime - (ctx.outputLatency || ctx.baseLatency || 0);
    const span = (60 / BPM) * PULSE_EVERY;
    const since = (((heard - FIRST_BEAT) % span) + span) % span;

    // Scale by how loud the bass is now, so the pulse softens in quiet passages.
    bassPeak = Math.max(bass, bassPeak * 0.999);
    const presence = Math.min(1, (bass / bassPeak) ** 3);
    const pulse = Math.exp(-since / 0.16) * presence;

    emit(pulse, [bass, band(4, 24), band(24, 96), band(96, 256)]);
    raf = requestAnimationFrame(tick);
  };

  const stopLoop = () => {
    cancelAnimationFrame(raf);
    raf = 0;
    emit(0, SILENT);
  };

  return {
    /*
      Call this synchronously from a click, tap or key handler: some browsers
      (Safari, Firefox) only allow sound when play() and resume() run inside
      the gesture itself, not after an await. Resolves true once sound is
      actually coming out.
    */
    play() {
      if (!ctx) {
        ctx = new (window.AudioContext || window.webkitAudioContext)();
        gain = ctx.createGain();
        gain.gain.value = 0;
        analyser = ctx.createAnalyser();
        analyser.fftSize = 1024;
        analyser.smoothingTimeConstant = 0.6;
        bins = new Uint8Array(analyser.frequencyBinCount);
        ctx.createMediaElementSource(audio).connect(analyser);
        analyser.connect(gain).connect(ctx.destination);
      }
      clearTimeout(stopTimer);
      const resumed = ctx.resume();
      const playing = audio.play();
      fade(VOLUME, 2.5);
      return Promise.all([resumed, playing]).then(() => {
        const ok = ctx.state === "running" && !audio.paused;
        if (ok && !raf) raf = requestAnimationFrame(tick);
        return ok;
      });
    },
    pause() {
      if (!ctx) return;
      fade(0, 0.8);
      clearTimeout(stopTimer);
      stopTimer = setTimeout(() => {
        audio.pause();
        stopLoop();
      }, 850);
    },
  };
}

let instance = null;
// The one shared player; pass false to look it up without creating it.
export const getMusic = (create = true) => (create ? (instance ??= createMusic()) : instance);
