import { motion } from "framer-motion";

/*
  Static project artwork drawn in code. Every cover shares one frame —
  dotted grid, a glow in the project's hue, HUD corners — and a motif
  that says what the program actually is.
*/

function ArkMotif() {
  // Three stacked database cylinders with query chips wired into them.
  const cyl = (x, y, w, h, key) => (
    <g key={key}>
      {[0, 1, 2].map((r) => (
        <path
          key={r}
          d={`M${x} ${y + r * h} a${w / 2} ${w / 7} 0 0 0 ${w} 0`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      ))}
      <ellipse cx={x + w / 2} cy={y} rx={w / 2} ry={w / 7} fill="var(--cover-bg)" stroke="currentColor" strokeWidth="1.5" />
      <path d={`M${x} ${y}v${h * 2} M${x + w} ${y}v${h * 2}`} stroke="currentColor" strokeWidth="1.5" />
      <path d={`M${x} ${y + h * 2} a${w / 2} ${w / 7} 0 0 0 ${w} 0`} fill="none" stroke="currentColor" strokeWidth="1.5" />
    </g>
  );
  return (
    <svg viewBox="0 0 600 400" className="cover__svg">
      <g opacity="0.55" stroke="currentColor" strokeWidth="1" strokeDasharray="3 5">
        <path d="M150 120 H230 V170" fill="none" />
        <path d="M450 110 H380 V160" fill="none" />
        <path d="M140 300 H230 V260" fill="none" />
        <path d="M465 290 H380 V255" fill="none" />
      </g>
      {cyl(225, 165, 70, 34, "a")}
      {cyl(305, 150, 70, 40, "b")}
      {cyl(265, 205, 70, 30, "c")}
      {[
        [150, 120],
        [450, 110],
        [140, 300],
        [465, 290],
      ].map(([x, y]) => (
        <circle key={`${x}${y}`} cx={x} cy={y} r="3" fill="currentColor" />
      ))}
    </svg>
  );
}

function UnoMotif() {
  const card = (rot, dx, filled, label) => (
    <g transform={`translate(${300 + dx} 205) rotate(${rot})`}>
      <rect x="-58" y="-86" width="116" height="172" rx="12" fill={filled ? "currentColor" : "var(--cover-bg)"} stroke="currentColor" strokeWidth="1.5" />
      <ellipse cx="0" cy="0" rx="40" ry="62" transform="rotate(28)" fill="none" stroke={filled ? "var(--cover-bg)" : "currentColor"} strokeWidth="1.5" />
      {label && (
        <text x="0" y="12" textAnchor="middle" fontFamily="var(--font-display)" fontWeight="800" fontSize="40" fill="var(--cover-bg)">
          {label}
        </text>
      )}
    </g>
  );
  return (
    <svg viewBox="0 0 600 400" className="cover__svg">
      {card(-22, -70, false)}
      {card(-6, -24, false)}
      {card(10, 24, false)}
      {card(24, 70, true, "+2")}
    </svg>
  );
}

const covers = {
  ark: {
    motif: <ArkMotif />,
    chips: [
      { t: "SELECT *", x: 8, y: 22 },
      { t: "INSERT INTO", x: 70, y: 18 },
      { t: "CREATE TABLE", x: 6, y: 72 },
      { t: "WHERE id = 1", x: 72, y: 70 },
    ],
  },
  curio: {
    glyph: (
      <div className="cover__glyph cover__glyph--serif">
        {"{"}
        <span className="cover__diamond" />
        {"}"}
      </div>
    ),
    stream: ["SET", "IDENT a", "=", "NUM 0", "WHILE", "PRINT"],
  },
  scrive: {
    glyph: (
      <div className="cover__editor">
        <div className="cover__gutter">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <span key={n}>{n}</span>
          ))}
        </div>
        <div className="cover__glyph cover__glyph--mono">
          S<span className="cover__block" />
        </div>
        <span className="cover__pill">-- INSERT --</span>
      </div>
    ),
  },
  uno: {
    motif: <UnoMotif />,
    chips: [
      { t: "2–10 PLAYERS", x: 6, y: 24 },
      { t: "108 CARDS", x: 74, y: 22 },
    ],
  },
  ledger: {
    glyph: (
      <div className="cover__ledger">
        <div className="cover__glyph cover__glyph--mono cover__glyph--sm">
          &gt;_
        </div>
        <div className="cover__table">
          {["ID   NAME       QTY", "01   Keyboard    12", "02   Monitor      4", "03   Mouse       31"].map((r, i) => (
            <span key={i} className={i === 1 ? "is-active" : ""}>
              {r}
            </span>
          ))}
        </div>
      </div>
    ),
  },
};

// `artY` (optional motion value) drifts the motif while the HUD frame stays put.
export default function Cover({ project, index, artY }) {
  const c = covers[project.id] ?? {};
  return (
    <div className="cover" style={{ "--hue": project.hue }}>
      <div className="cover__glow" />
      <motion.div className="cover__art" style={{ y: artY }}>
        {c.motif}
        {c.glyph}
        {c.chips?.map((ch) => (
          <span key={ch.t} className="cover__chip" style={{ left: `${ch.x}%`, top: `${ch.y}%` }}>
            {ch.t}
          </span>
        ))}
        {c.stream && (
          <div className="cover__stream">
            {c.stream.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        )}
      </motion.div>

      <div className="cover__hud cover__hud--tl">
        {String(index + 1).padStart(2, "0")} / {project.title}
      </div>
      <div className="cover__hud cover__hud--tr">{project.lang}</div>
      <div className="cover__hud cover__hud--bl">
        {project.tags.slice(0, 2).map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>
      <div className="cover__hud cover__hud--br">
        <span className="cover__play" />
        <span className="cover__hint--hover">Hover to play</span>
        <span className="cover__hint--touch">Live preview</span>
      </div>
    </div>
  );
}
