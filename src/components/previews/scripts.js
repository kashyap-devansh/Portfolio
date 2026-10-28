/*
  Scripted "screen recordings" played on hover. Each step is one of:
    { cmd, prompt }          typed out character by character, then committed
    { out, wait }            output appended to the log ([[R5]] renders a UNO card)
    { screen, data, wait }   full-screen TUI frame (replaces the log)
    { clear: true }          wipe the log
    { wait }                 pause
  These are illustrative sessions — edit freely to match real program output.
*/

const editorFrames = () => {
  const file = "notes.txt";
  const base = ["# notes.txt", "", "todo:"];
  const frames = [
    { screen: "editor", data: { file, lines: base, cur: 2, mode: "NORMAL", cmd: "" }, wait: 700 },
    { screen: "editor", data: { file, lines: [...base, ""], cur: 3, mode: "INSERT", cmd: "" }, wait: 300 },
  ];
  const typeLine = (prev, text) => {
    for (let i = 1; i <= text.length; i++) {
      frames.push({
        screen: "editor",
        data: { file, lines: [...prev, text.slice(0, i)], cur: prev.length, mode: "INSERT", cmd: "" },
        wait: 34 + (i % 3) * 14,
      });
    }
    return [...prev, text];
  };
  let lines = typeLine(base, "- write the parser by hand");
  lines = typeLine(lines, "- understand every layer");
  frames.push({ screen: "editor", data: { file, lines, cur: lines.length - 1, mode: "NORMAL", cmd: "" }, wait: 500 });
  for (const c of [":", ":w", ":wq"]) {
    frames.push({ screen: "editor", data: { file, lines, cur: lines.length - 1, mode: "NORMAL", cmd: c }, wait: 160 });
  }
  frames.push({ wait: 350 });
  return { frames, lines: lines.length };
};

const scrive = editorFrames();

const ledgerMenu = (active) => ({
  screen: "tui",
  data: {
    title: "LEDGER — Inventory",
    sub: "logged in as admin",
    rows: ["Products", "Suppliers", "Cart", "Orders", "Logout"],
    active,
    footer: "↑↓ move   ⏎ select   esc back",
  },
  wait: 420,
});

export const scripts = {
  ark: [
    { cmd: "./ark" },
    { out: "Ark SQL engine — type .exit to quit", wait: 300 },
    { cmd: "CREATE TABLE users (id INT, name TEXT, age INT);", prompt: "ark>" },
    { out: "Table 'users' created." },
    { cmd: "INSERT INTO users VALUES (1, 'Devansh', 19);", prompt: "ark>" },
    { out: "1 row inserted." },
    { cmd: "INSERT INTO users VALUES (2, 'Ada', 36);", prompt: "ark>" },
    { out: "1 row inserted." },
    { cmd: "SELECT name, age FROM users WHERE age < 30;", prompt: "ark>" },
    { out: "+---------+-----+\n| name    | age |\n+---------+-----+\n| Devansh |  19 |\n+---------+-----+", wait: 900 },
    { cmd: "UPDATE users SET age = 20 WHERE id = 1;", prompt: "ark>" },
    { out: "1 row updated." },
  ],

  curio: [
    { cmd: "cat fib.cu" },
    { out: "set a = 0\nset b = 1\nset i = 0\nwhile i < 8\n  print a\n  set t = a + b\n  set a = b\n  set b = t\n  set i = i + 1\nendwhile", wait: 1100 },
    { cmd: "./curio fib.cu" },
    ...[0, 1, 1, 2, 3, 5, 8, 13].map((n) => ({ out: String(n), wait: 150 })),
    { out: "— exited 0", wait: 400 },
  ],

  scrive: [
    { cmd: `./scrive ${"notes.txt"}` },
    ...scrive.frames,
    { clear: true },
    { out: `"notes.txt" ${scrive.lines}L written` },
  ],

  uno: [
    { cmd: "./uno --players 3" },
    { out: "Shuffling 108 cards… dealing 7 to each player." },
    { out: "Top card: [[G7]]", wait: 400 },
    { out: "Your hand: [[R5]] [[G2]] [[B+2]] [[Y9]] [[W]] [[G+2]] [[R1]]", wait: 700 },
    { cmd: "play G2", prompt: "p1>" },
    { out: "P1 plays [[G2]]" },
    { out: "P2 plays [[G+2]] → P3 draws 2" },
    { out: "P3 plays [[Y2]]", wait: 400 },
    { cmd: "play W blue", prompt: "p1>" },
    { out: "P1 plays [[W]] → colour is now BLUE" },
    { out: "P2 plays [[B4]]" },
    { out: "P3 plays [[B+2]] → P1 draws 2", wait: 500 },
  ],

  ledger: [
    { cmd: "./ledger" },
    { out: "username: admin" },
    { out: "password: ••••••" },
    { out: "✓ login successful (role: admin)", wait: 500 },
    ledgerMenu(0),
    ledgerMenu(1),
    ledgerMenu(2),
    ledgerMenu(0),
    {
      screen: "tui",
      data: {
        title: "PRODUCTS",
        sub: "4 items",
        rows: [
          "ID  NAME        QTY   PRICE",
          "01  Keyboard     12   1,499",
          "02  Monitor       4   8,999",
          "03  Mouse        31     699",
          "04  Headset       9   2,199",
        ],
        active: 1,
        header: true,
        footer: "a add to cart   e edit   d delete",
      },
      wait: 900,
    },
    {
      screen: "tui",
      data: {
        title: "PRODUCTS",
        sub: "4 items",
        rows: [
          "ID  NAME        QTY   PRICE",
          "01  Keyboard     11   1,499",
          "02  Monitor       4   8,999",
          "03  Mouse        31     699",
          "04  Headset       9   2,199",
        ],
        active: 1,
        header: true,
        footer: "✓ added 1 × Keyboard to cart",
      },
      wait: 1200,
    },
  ],
};
