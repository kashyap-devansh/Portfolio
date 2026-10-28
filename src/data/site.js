import ark from "../assets/img/ark.webp";
import curio from "../assets/img/curio.webp";
import scrive from "../assets/img/scrive.webp";
import uno from "../assets/img/uno.webp";
import ledger from "../assets/img/ledger.webp";

import C from "../assets/c.svg";
import Cpp from "../assets/cplusplus.svg";
import Arch from "../assets/archlinux.svg";
import CSS from "../assets/css.svg";
import Git from "../assets/git.svg";
import GitHub from "../assets/github.svg";
import Neovim from "../assets/neovim.svg";
import Codium from "../assets/vscodium.svg";
import HTML from "../assets/html5.svg";
import JavaScript from "../assets/javascript.svg";
import ReactLogo from "../assets/react.svg";
import Bash from "../assets/systems.svg";

export const profile = {
  name: "Devansh Kashyap",
  role: "Software Developer",
  email: "devansh14007@gmail.com",
  github: "https://github.com/kashyap-devansh",
  // Add your LinkedIn URL here and it will appear everywhere automatically.
  linkedin: "",
  location: "India",
  timeZone: "Asia/Kolkata",
};

// `hue` is lifted from each project's artwork and only shows on hover.
export const projects = [
  {
    id: "ark",
    title: "Ark",
    kind: "SQL Engine",
    category: "Systems",
    lang: "C++",
    year: "2026",
    image: ark,
    hue: "#d9a94a",
    tags: ["Database", "Parser", "C++"],
    summary:
      "A lightweight SQL-like database engine with a hand-written tokenizer, recursive descent parser, typed tables, full CRUD and file persistence — no third-party libraries.",
    link: "https://github.com/kashyap-devansh/Ark",
    featured: true,
  },
  {
    id: "curio",
    title: "Curio",
    kind: "Interpreted Language",
    category: "Languages",
    lang: "C",
    year: "2026",
    image: curio,
    hue: "#e0485a",
    tags: ["Interpreter", "Tokenizer", "C"],
    summary:
      "A custom interpreted programming language with its own tokenizer, symbol table, control flow handling and a modular interpreter architecture.",
    link: "https://github.com/kashyap-devansh/Curio",
    featured: true,
  },
  {
    id: "scrive",
    title: "Scrive",
    kind: "Terminal Editor",
    category: "Tools",
    lang: "C++",
    year: "2026",
    image: scrive,
    hue: "#b57be8",
    tags: ["Vim-like", "TUI", "C++"],
    summary:
      "A Vim-inspired terminal text editor with modal editing, custom rendering, configurable keymaps and persistent file handling.",
    link: "https://github.com/kashyap-devansh/Scrive",
    featured: true,
  },
  {
    id: "uno",
    title: "UNO Engine",
    kind: "Card Game",
    category: "Games",
    lang: "C++",
    year: "2026",
    image: uno,
    hue: "#5b84ff",
    tags: ["OOP", "Game State", "C++"],
    summary:
      "A terminal card game for 2–10 players with a polymorphic card system, game state management and the full 108-card deck.",
    link: "https://github.com/kashyap-devansh/uno-engine",
    featured: true,
  },
  {
    id: "ledger",
    title: "Ledger",
    kind: "Inventory System",
    category: "Systems",
    lang: "C",
    year: "2026",
    image: ledger,
    hue: "#3fc1d4",
    tags: ["CRUD", "File Storage", "C"],
    summary:
      "A terminal inventory management system with role-based login, product and supplier management, a cart system and order tracking on file-based storage.",
    link: "https://github.com/kashyap-devansh/Ledger",
    featured: false,
  },
];

export const capabilities = [
  {
    title: "Programming Languages",
    body: "Designing grammars, writing tokenizers and parsers, and turning source text into something a machine can run.",
  },
  {
    title: "Systems Programming",
    body: "Memory, files and processes in C and C++ — software that is fast because it knows what it is doing.",
  },
  {
    title: "Backend Development",
    body: "Storage engines, query execution and the data structures that sit underneath every application.",
  },
  {
    title: "Compiler Design",
    body: "Recursive descent, symbol tables and evaluation strategies — the theory, put to work in real projects.",
  },
  {
    title: "Linux & Open Source",
    body: "Daily-driving Arch, living in Neovim and the terminal, and publishing everything I build in the open.",
  },
];

export const stack = [
  { group: "Languages", items: ["C", "C++", "JavaScript"] },
  { group: "Frontend", items: ["HTML", "CSS", "React"] },
  { group: "Systems", items: ["Linux", "Git", "Neovim"] },
  { group: "Interests", items: ["Interpreters", "Databases", "Backend"] },
];

export const tools = [
  { name: "C", icon: C },
  { name: "C++", icon: Cpp },
  { name: "JavaScript", icon: JavaScript },
  { name: "HTML5", icon: HTML },
  { name: "CSS3", icon: CSS },
  { name: "React", icon: ReactLogo },
  { name: "Arch Linux", icon: Arch },
  { name: "Bash", icon: Bash },
  { name: "Git", icon: Git },
  { name: "GitHub", icon: GitHub },
  { name: "Neovim", icon: Neovim },
  { name: "VSCodium", icon: Codium },
];

export const principles = [
  {
    key: "A",
    title: "From scratch.",
    body: "Every project here starts from an empty file. No frameworks hiding the interesting parts — the tokenizer, the parser and the storage layer are all written by hand.",
  },
  {
    key: "B",
    title: "Close to the metal.",
    body: "C and C++ first. Understanding what the machine is actually doing is what makes software fast, predictable and easy to reason about.",
  },
  {
    key: "C",
    title: "Open by default.",
    body: "All of it lives on GitHub. Read the code, open an issue, fork it and make it better — that is the whole point.",
  },
];

export const backstory = [
  ["Race", "Human"],
  ["Age", "19"],
  ["Languages", "Hindi / English"],
  ["Financial", "Broke"],
  ["Height", "Classified"],
];

export const education = [
  {
    period: "Then",
    title: "Higher Secondary Education",
    place: "M.M. International School",
    body: "Built a strong foundation in mathematics, science and problem solving — and an early interest in computers that led straight to Computer Science.",
  },
  {
    period: "Now",
    title: "B.Tech Computer Science",
    place: "Jaypee University of Information Technology",
    body: "Building a foundation in software engineering, systems programming and backend development through coursework and personal projects.",
  },
  {
    period: "Always",
    title: "Self Learning",
    place: "Personal Projects",
    body: "Learning by building real software — an interpreted language, a SQL-like database engine, a terminal editor and Linux-based tools.",
  },
];

export const skills = [
  { label: "Coding", value: 98 },
  { label: "Linux", value: 80 },
  { label: "Curiosity", value: 95 },
  { label: "Teamwork", value: 88 },
  { label: "Yapping nonsense", value: 100, hot: true },
];

export const hobbies = [
  { label: "Music", value: 87 },
  { label: "Movies", value: 70 },
  { label: "Anime", value: 70 },
  { label: "Gaming", value: 64 },
];

export const journey = [
  {
    title: "Engineering",
    items: ["Curio — Interpreted Language", "Ark — SQL Database Engine", "Ledger — Inventory System"],
  },
  {
    title: "Learning",
    items: ["Started with C / C++", "Switched to Linux", "Found my passion for systems"],
  },
  {
    title: "Achievements",
    items: ["Projects built from scratch", "Thousands of lines of code", "Open source enthusiast"],
  },
];
