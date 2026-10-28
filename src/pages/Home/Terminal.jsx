import { useEffect, useState } from "react";

// Each session shows one project being run; the terminal cycles through them.
const sessions = [
  {
    title: "curio",
    lines: [
      { cmd: "./curio examples/hello.cu" },
      { out: "Hello from Curio!" },
      { cmd: "cat examples/loop.cu" },
      { out: "set i = 0\nwhile i < 3\n  print i\n  set i = i + 1\nendwhile" },
    ],
  },
  {
    title: "ark",
    lines: [
      { cmd: "./ark" },
      { cmd: "CREATE TABLE users (id INT, name TEXT);", prompt: "ark>" },
      { out: "Table 'users' created." },
      { cmd: "SELECT name FROM users WHERE id = 1;", prompt: "ark>" },
      { out: "+---------+\n| name    |\n+---------+\n| Devansh |\n+---------+" },
    ],
  },
  {
    title: "scrive",
    lines: [
      { cmd: "./scrive notes.txt" },
      { out: "-- NORMAL --   notes.txt   1:1" },
      { cmd: "i", prompt: ":" },
      { out: "-- INSERT --   build it from scratch." },
      { cmd: "wq", prompt: ":" },
    ],
  },
];

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

export default function Terminal() {
  const [sessionIdx, setSessionIdx] = useState(0);
  const [shown, setShown] = useState([]);
  const [typing, setTyping] = useState("");

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let cancelled = false;

    (async () => {
      let s = 0;
      while (!cancelled) {
        const session = sessions[s];
        setSessionIdx(s);
        setShown([]);
        await wait(500);
        for (const line of session.lines) {
          if (cancelled) return;
          if (line.cmd && !reduced) {
            for (let i = 1; i <= line.cmd.length; i++) {
              if (cancelled) return;
              setTyping(line.cmd.slice(0, i));
              await wait(28 + Math.random() * 45);
            }
            await wait(260);
            setTyping("");
          }
          setShown((prev) => [...prev, line]);
          await wait(line.out ? 420 : 160);
        }
        await wait(2800);
        s = (s + 1) % sessions.length;
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const current = sessions[sessionIdx];
  const nextLine = current.lines[shown.length];

  return (
    <div className="term" role="img" aria-label="Animated terminal running Devansh's projects">
      <div className="term__bar">
        <span className="term__dots">
          <i />
          <i />
          <i />
        </span>
        <span className="hud-label faint">~/projects/{current.title}</span>
        <span className="hud-label faint">zsh</span>
      </div>
      <pre className="term__body" aria-hidden="true">
        {shown.map((l, i) =>
          l.cmd ? (
            <div key={i}>
              <span className="term__prompt">{l.prompt ?? "$"}</span> {l.cmd}
            </div>
          ) : (
            <div key={i} className="term__out">
              {l.out}
            </div>
          ),
        )}
        <div>
          <span className="term__prompt">{nextLine?.prompt ?? "$"}</span> {typing}
          <span className="term__cursor" />
        </div>
      </pre>
    </div>
  );
}
