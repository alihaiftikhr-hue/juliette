/*
  Brand emblem recreated from juliette_logo.svg using the site's loaded
  webfonts (Allura / Italianno / Cinzel) so it renders crisply at any size
  without shipping embedded font data.
*/

type EmblemProps = {
  className?: string;
  /** Stroke/text colour — defaults to currentColor so it inherits. */
  tone?: string;
};

export function JulietteEmblem({ className, tone = "currentColor" }: EmblemProps) {
  return (
    <svg
      viewBox="0 0 1120 660"
      className={className}
      role="img"
      aria-label="Juliette — Wear Your Fairytale, established MMXXVI"
    >
      <g fill={tone} stroke={tone}>
        <ellipse cx="560" cy="330" rx="385" ry="232" fill="none" strokeWidth="1.6" />
        <ellipse cx="560" cy="330" rx="368" ry="216" fill="none" strokeWidth="0.8" />
        <text
          x="560"
          y="196"
          textAnchor="middle"
          fontSize="19"
          letterSpacing="7"
          stroke="none"
          style={{ fontFamily: "var(--font-cinzel), serif" }}
        >
          · EST · MMXXVI ·
        </text>
        <text
          x="560"
          y="368"
          textAnchor="middle"
          fontSize="172"
          stroke="none"
          style={{ fontFamily: "var(--font-allura), cursive" }}
        >
          Juliette
        </text>
        <g
          fill="none"
          strokeWidth="1"
          strokeLinecap="round"
          transform="translate(560,404)"
        >
          <line x1="-105" y1="0" x2="-13" y2="0" />
          <line x1="105" y1="0" x2="13" y2="0" />
          <path
            d="M0,-9 C3,-4 3,4 0,9 C-3,4 -3,-4 0,-9 Z"
            fill={tone}
            stroke="none"
          />
        </g>
        <text
          x="560"
          y="462"
          textAnchor="middle"
          fontSize="62"
          stroke="none"
          style={{ fontFamily: "var(--font-italianno), cursive" }}
        >
          Wear Your Fairytale
        </text>
      </g>
    </svg>
  );
}

/** Small ornamental divider — line · leaf · line, as in the emblem. */
export function LeafDivider({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 20"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
    >
      <g strokeWidth="1" strokeLinecap="round" transform="translate(110,10)">
        <line x1="-100" y1="0" x2="-13" y2="0" />
        <line x1="100" y1="0" x2="13" y2="0" />
        <path
          d="M0,-8 C2.7,-3.5 2.7,3.5 0,8 C-2.7,3.5 -2.7,-3.5 0,-8 Z"
          fill="currentColor"
          stroke="none"
        />
      </g>
    </svg>
  );
}

/** Simple script wordmark for the header. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={`font-logo leading-none ${className ?? ""}`}>Juliette</span>
  );
}
