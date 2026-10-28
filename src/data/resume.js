// Single source for the résumé — the /resume page and the downloadable PDF
// both render from this. Regenerate the PDF after editing: `npm run resume:pdf`.

export const resume = {
  name: "Devansh Kashyap",
  headline: "Software Developer — Systems · Languages · Web",
  contact: {
    email: "devansh14007@gmail.com",
    // Shown in the downloaded PDF only, never on the public web page.
    phone: "9315858470",
    github: "github.com/kashyap-devansh",
    portfolio: "devanshkashyap.vercel.app",
  },
  summary:
    "Computer Science undergraduate who builds software from the ground up — interpreters, database engines and terminal tools in C and C++, and interactive web apps in React.",

  education: [
    {
      school: "Jaypee University of Information Technology (JUIT)",
      place: "Solan, Himachal Pradesh",
      rows: [["B.Tech in Computer Science Engineering", "Expected 2029"]],
    },
    {
      school: "Maharishi Markandeshwar International School",
      place: "Sadopur, Ambala",
      rows: [
        ["Higher Secondary Education — 83.2%", "2025"],
        ["Secondary Education — 81.2%", "2023"],
      ],
    },
  ],

  skills: [
    ["Languages", "C, C++, JavaScript"],
    ["Web", "React, HTML, CSS, Framer Motion, Vite"],
    ["Systems", "Linux (Omarchy), Windows, Bash"],
    ["Tools", "Git, GitHub, Neovim, VS Code"],
    ["Core Interests", "Systems Programming, Compiler Design, Data Structures & Algorithms"],
  ],

  projects: [
    {
      name: "DSA/Animator",
      kind: "Algorithm Visualizer",
      stack: "React · JavaScript",
      repo: "https://github.com/kashyap-devansh/dsa-animator",
      live: "https://dsa-animator-kappa.vercel.app",
      points: [
        "Built an interactive, code-synced visualizer that runs real algorithms step by step beside syntax-highlighted source, highlighting the executing line.",
        "Designed a shared playback engine (play, pause, step back/forward, speed) with live comparison and swap counters across sorting, searching, linked list, stack, queue and recursion visualizers.",
      ],
    },
    {
      name: "Ark",
      kind: "SQL-like Database Engine",
      stack: "C++",
      repo: "https://github.com/kashyap-devansh/Ark",
      points: [
        "Built a lightweight SQL-like database engine from scratch with a hand-written tokenizer and recursive descent parser.",
        "Implemented typed tables, full CRUD operations and file persistence with no external dependencies.",
      ],
    },
    {
      name: "Curio",
      kind: "Custom Interpreted Programming Language",
      stack: "C",
      repo: "https://github.com/kashyap-devansh/Curio",
      points: [
        "Designed and built a custom interpreted language from scratch with its own tokenizer and symbol table.",
        "Implemented control flow handling and a modular interpreter architecture.",
      ],
    },
    {
      name: "Scrive",
      kind: "Vim-inspired Terminal Text Editor",
      stack: "C++",
      repo: "https://github.com/kashyap-devansh/Scrive",
      points: [
        "Built a terminal text editor with modal editing and custom screen rendering.",
        "Added configurable keymaps and persistent file handling.",
      ],
    },
    {
      name: "UNO-Engine",
      kind: "Terminal-Based Card Game",
      stack: "C++",
      repo: "https://github.com/kashyap-devansh/uno-engine",
      points: [
        "Developed a terminal UNO game with a polymorphic card system and game state management.",
        "Implemented the complete 108-card deck with all standard UNO rules and turn logic.",
      ],
    },
    {
      name: "Ledger",
      kind: "Inventory Management System",
      stack: "C",
      repo: "https://github.com/kashyap-devansh/Ledger",
      points: [
        "Built a terminal inventory system with role-based login and product & supplier management.",
        "Implemented a cart system and order tracking using file-based persistent storage.",
      ],
    },
  ],

  experience: [
    {
      role: "Member, ACM Student Chapter",
      org: "JUIT",
      points: ["Actively participating in technical events, coding contests and workshops run by the ACM chapter."],
    },
    {
      role: "Hackathon Team Leader",
      org: "MURIOUS",
      points: [
        "Led a team at the MURIOUS hackathon, coordinating development tasks and driving problem-solving strategy.",
        "Managed team collaboration and delivered the project under tight time constraints.",
      ],
    },
  ],

  softSkills: ["Leadership", "Teamwork", "Communication", "Pattern Recognition", "Pressure Handling"],
};
