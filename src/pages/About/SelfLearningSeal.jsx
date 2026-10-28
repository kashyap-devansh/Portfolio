/*
  Crest for "Self Learning", drawn to sit beside the school and university
  emblems: a ringed seal with a motto, like theirs, but the symbol is a
  terminal prompt rising out of an open book. Colours follow the theme.
*/
export default function SelfLearningSeal() {
  return (
    <svg viewBox="0 0 200 200" role="img" aria-label="Self Learning seal">
      <defs>
        <path id="seal-ring" d="M100 100 m-74 0 a74 74 0 1 1 148 0 a74 74 0 1 1 -148 0" />
      </defs>
      <circle cx="100" cy="100" r="95" fill="none" stroke="var(--accent)" strokeWidth="2.5" />
      <circle cx="100" cy="100" r="61" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
      <text fontFamily="Geist Mono, monospace" fontSize="12.5" fontWeight="700" letterSpacing="3.2" fill="var(--ink-strong)">
        <textPath href="#seal-ring" startOffset="0" textLength="458" lengthAdjust="spacing">
          SELF LEARNING · PERSONAL PROJECTS ·
        </textPath>
      </text>
      <circle cx="100" cy="100" r="55" fill="var(--accent)" />
      {/* open book */}
      <path d="M62 126c13-6 26-6 38 2 12-8 25-8 38-2v-46c-13-6-26-6-38 2-12-8-25-8-38-2z" fill="#f7f6f3" />
      <path d="M100 82v46" stroke="var(--accent)" strokeWidth="2" />
      {/* prompt on the pages */}
      <path d="M72 96l9 7-9 7" fill="none" stroke="#101014" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M108 110h20" stroke="#101014" strokeWidth="4" strokeLinecap="round" />
      <text x="100" y="149" textAnchor="middle" fontFamily="serif" fontSize="14" fill="#f7f6f3">
        स्वाध्यायः
      </text>
    </svg>
  );
}
