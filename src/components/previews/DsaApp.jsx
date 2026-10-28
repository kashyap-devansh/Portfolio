/*
  A miniature of the DSA/Animator Selection Sort page — bars, synced C++
  source, transport controls and live counters. The cover shows one paused
  frame; the hover recording steps through all of them.
*/

const INPUT = [3, 2, 9, 6, 5, 11, 12, 14, 13, 4, 8, 12.6, 13.4, 3.2, 10];

// Line numbers below match CODE (1-based).
export function selectionSortFrames() {
  const a = [...INPUT];
  const frames = [];
  let comparisons = 0;
  let swaps = 0;
  const push = (line, i, j, min, note) =>
    frames.push({ bars: [...a], line, i, j, min, note, comparisons, swaps });

  push(1, 0, -1, -1, "Ready — press play");
  for (let i = 0; i < a.length - 1; i++) {
    let min = i;
    push(4, i, -1, min, `Assume ${fmt(a[i])} is the minimum`);
    for (let j = i + 1; j < a.length; j++) {
      comparisons++;
      push(6, i, j, min, `Compare ${fmt(a[j])} and ${fmt(a[min])}`);
      if (a[j] < a[min]) {
        min = j;
        push(7, i, j, min, `New minimum ${fmt(a[min])}`);
      }
    }
    if (min !== i) {
      [a[i], a[min]] = [a[min], a[i]];
      swaps++;
    }
    push(9, i + 1, -1, -1, `Swap into position ${i}`);
  }
  push(11, a.length, -1, -1, "Sorted ✓");
  return frames;
}

const fmt = (v) => Math.round(v);

// Syntax-highlighted source: [text, class] tokens per line.
const CODE = [
  [["void", "ty"], [" selectionSort("], ["vector<int>", "ty"], ["& arr) {"]],
  [["  "], ["int", "ty"], [" n = arr.size();"]],
  [["  "], ["for", "kw"], [" ("], ["int", "ty"], [" i = "], ["0", "num"], ["; i < n - "], ["1", "num"], ["; i++) {"]],
  [["    "], ["int", "ty"], [" min = i;"]],
  [["    "], ["for", "kw"], [" ("], ["int", "ty"], [" j = i + "], ["1", "num"], ["; j < n; j++) {"]],
  [["      "], ["if", "kw"], [" (arr[j] < arr[min]) {"]],
  [["        min = j;"]],
  [["      }"]],
  [["    swap(arr[i], arr[min]);"]],
  [["  }"]],
  [["  "], ["return", "kw"], [";"]],
  [["}"]],
];

const Icon = {
  reset: <path d="M4 10a6 6 0 1 0 2-4.5M4 3v3h3" />,
  back: <path d="M6 4v12M15 4l-7 6 7 6V4Z" />,
  fwd: <path d="M14 4v12M5 4l7 6-7 6V4Z" />,
  play: <path d="M7 4.5v11l9-5.5-9-5.5Z" />,
  pause: <path d="M7 4.5v11M13 4.5v11" />,
  shuffle: <path d="M3 6h3l7 8h4M3 14h3l2-2.3M12 8.3 13 6h4M15 4l2 2-2 2M15 12l2 2-2 2" />,
};

function Btn({ name, primary }) {
  return (
    <span className={`dsa__btn ${primary ? "dsa__btn--primary" : ""}`}>
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
        {Icon[name]}
      </svg>
    </span>
  );
}

export default function DsaApp({ frame, step, total, playing = false }) {
  const max = Math.max(...frame.bars);
  return (
    <div className="dsa">
      <div className="dsa__head">
        <div>
          <span className="dsa__eyebrow">Sorting</span>
          <span className="dsa__title">Selection Sort</span>
          <span className="dsa__sub">Repeatedly selects the minimum of the unsorted tail.</span>
        </div>
        <div className="dsa__cx">
          <span>
            <i>Time</i>
            <b className="dsa__o">O(n²)</b>
          </span>
          <span>
            <i>Space</i>
            <b className="dsa__blue">O(1)</b>
          </span>
        </div>
      </div>

      <div className="dsa__main">
        <div className="dsa__panel dsa__viz">
          <div className="dsa__bars">
            {frame.bars.map((v, k) => {
              const state =
                k < frame.i ? "done" : k === frame.j || k === frame.min ? "hot" : "";
              return <span key={k} className={`dsa__bar ${state}`} style={{ height: `${(v / max) * 100}%` }} />;
            })}
          </div>
          <div className="dsa__note">{frame.note}</div>
        </div>

        <div className="dsa__panel dsa__code">
          <div className="dsa__code-bar">
            <span className="dsa__lights">
              <i />
              <i />
              <i />
            </span>
            <span className="dsa__file">selection_sort.cpp</span>
            <span className="dsa__o">O(n²)</span>
          </div>
          <div className="dsa__lines">
            {CODE.map((tokens, n) => (
              <div key={n} className={`dsa__line ${frame.line === n + 1 ? "is-active" : ""}`}>
                <span className="dsa__ln">{n + 1}</span>
                <span>
                  {tokens.map(([t, c], k) => (
                    <span key={k} className={c ? `dsa__${c}` : undefined}>
                      {t}
                    </span>
                  ))}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="dsa__controls">
        <div className="dsa__transport">
          <Btn name="reset" />
          <Btn name="back" />
          <Btn name={playing ? "pause" : "play"} primary />
          <Btn name="fwd" />
          <span className="dsa__shuffle">
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6">
              {Icon.shuffle}
            </svg>
            Shuffle
          </span>
        </div>
        <div className="dsa__speed">
          <span>Speed</span>
          <span className="dsa__track">
            <span className="dsa__fill" />
            <span className="dsa__knob" />
          </span>
          <span className="dsa__count">
            {step} / {total}
          </span>
        </div>
      </div>

      <div className="dsa__stats">
        comparisons: <b>{frame.comparisons}</b>
        <span /> swaps: <b>{frame.swaps}</b>
      </div>
    </div>
  );
}
