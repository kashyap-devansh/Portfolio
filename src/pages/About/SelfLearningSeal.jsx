/*
  Crest for "Self Learning", drawn to sit beside the school and university
  emblems: a ringed seal with a motto, like theirs, but the symbol is a
  terminal prompt rising out of an open book.
*/
export default function SelfLearningSeal() {
  return (
    <svg viewBox="0 0 200 200" role="img" aria-label="Self Learning seal">
      <defs>
        <path id="seal-ring" d="M100 100 m-74 0 a74 74 0 1 1 148 0 a74 74 0 1 1 -148 0" />
      </defs>
      <circle cx="100" cy="100" r="94" fill="#101014" />
      <circle cx="100" cy="100" r="88" fill="none" stroke="#ff5b1f" strokeWidth="2" />
      <circle cx="100" cy="100" r="60" fill="#ff5b1f" />
      <text fontFamily="Geist Mono, monospace" fontSize="12.5" fontWeight="700" letterSpacing="3.2" fill="#f2f1ee">
        <textPath href="#seal-ring" startOffset="0" textLength="458" lengthAdjust="spacing">
          SELF LEARNING · PERSONAL PROJECTS ·
        </textPath>
      </text>
      {/* open book */}
      <path d="M62 128c13-6 26-6 38 2 12-8 25-8 38-2v-46c-13-6-26-6-38 2-12-8-25-8-38-2z" fill="#f2f1ee" />
      <path d="M100 84v46" stroke="#ff5b1f" strokeWidth="2" />
      {/* prompt on the pages */}
      <path d="M72 98l9 7-9 7" fill="none" stroke="#101014" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M108 112h20" stroke="#101014" strokeWidth="4" strokeLinecap="round" />
      <text x="100" y="157" textAnchor="middle" fontFamily="serif" fontSize="15" fill="#f2f1ee">
        स्वाध्यायः
      </text>
    </svg>
  );
}
