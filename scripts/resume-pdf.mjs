// Prints the link-free résumé (/resume?pdf) to public/resume.pdf.
// Usage: npm run resume:pdf   (needs Chromium/Chrome on PATH or CHROME=path)
import { spawn } from "node:child_process";
import { writeFileSync } from "node:fs";

const PORT = 4321;
const CHROME = process.env.CHROME || "chromium";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const server = spawn("npx", ["vite", "preview", "--port", String(PORT), "--strictPort"], { stdio: "ignore" });
const debugPort = 9333;
const chrome = spawn(CHROME, ["--headless=new", `--remote-debugging-port=${debugPort}`, "--no-first-run", "--user-data-dir=/tmp/resume-pdf-profile", "about:blank"], { stdio: "ignore" });

const cleanup = () => {
  chrome.kill();
  server.kill();
};

try {
  // Wait for both processes to come up.
  for (let i = 0; i < 60; i++) {
    try {
      await fetch(`http://localhost:${PORT}/`);
      break;
    } catch {
      await sleep(250);
    }
  }
  let targets;
  for (let i = 0; i < 60; i++) {
    try {
      targets = await (await fetch(`http://127.0.0.1:${debugPort}/json`)).json();
      break;
    } catch {
      await sleep(250);
    }
  }

  const ws = new WebSocket(targets.find((t) => t.type === "page").webSocketDebuggerUrl);
  await new Promise((r) => (ws.onopen = r));
  let id = 0;
  const pending = new Map();
  ws.onmessage = (m) => {
    const d = JSON.parse(m.data);
    pending.get(d.id)?.(d);
  };
  const send = (method, params = {}) =>
    new Promise((r) => {
      const i = ++id;
      pending.set(i, r);
      ws.send(JSON.stringify({ id: i, method, params }));
    });

  await send("Page.enable");
  await send("Page.navigate", { url: `http://localhost:${PORT}/resume?pdf` });
  await sleep(1500);
  await send("Runtime.evaluate", { expression: "document.fonts.ready.then(() => true)", awaitPromise: true });
  await sleep(300);

  const res = await send("Page.printToPDF", { printBackground: true, preferCSSPageSize: true });
  writeFileSync("public/resume.pdf", Buffer.from(res.result.data, "base64"));
  console.log("✓ wrote public/resume.pdf");
  ws.close();
} finally {
  cleanup();
}
