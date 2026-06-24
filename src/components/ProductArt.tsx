import type { ArtKind } from "@/data/products";

/*
  Hand-drawn-style line illustrations used as product imagery until
  photography exists. All drawn in the brand's espresso ink with one
  accent colour per product.
*/

const INK = "#43342a";

function Collar({ accent }: { accent: string }) {
  return (
    <g fill="none" stroke={INK} strokeWidth="1.5" strokeLinecap="round">
      <path d="M55 70 C70 52 130 52 145 70" />
      <path d="M55 70 C52 96 60 120 84 134 C70 138 58 136 50 128 C40 114 42 88 55 70 Z" />
      <path d="M145 70 C148 96 140 120 116 134 C130 138 142 136 150 128 C160 114 158 88 145 70 Z" />
      <path d="M58 122 q6 -7 12 0 q6 -7 12 0" strokeWidth="1" />
      <path d="M118 122 q6 -7 12 0 q6 -7 12 0" strokeWidth="1" />
      <circle cx="70" cy="96" r="3" strokeWidth="1" />
      <circle cx="82" cy="110" r="3" strokeWidth="1" />
      <circle cx="130" cy="96" r="3" strokeWidth="1" />
      <circle cx="118" cy="110" r="3" strokeWidth="1" />
      <path d="M96 136 q4 5 8 0" stroke={accent} strokeWidth="2" />
      <path d="M100 138 C92 146 88 152 90 158 M100 138 C108 146 112 152 110 158" stroke={accent} strokeWidth="1.5" />
    </g>
  );
}

function Bow({ accent }: { accent: string }) {
  return (
    <g fill="none" stroke={INK} strokeWidth="1.5" strokeLinecap="round">
      <path d="M100 96 C70 70 44 72 40 92 C36 112 64 118 100 102" />
      <path d="M100 96 C130 70 156 72 160 92 C164 112 136 118 100 102" />
      <path d="M96 97 C76 84 58 84 52 92" strokeWidth="0.9" />
      <path d="M104 97 C124 84 142 84 148 92" strokeWidth="0.9" />
      <rect x="91" y="89" width="18" height="18" rx="5" stroke={accent} strokeWidth="2" />
      <path d="M96 106 C88 124 84 138 90 154 L98 144" />
      <path d="M104 106 C112 124 116 138 110 154 L102 144" />
    </g>
  );
}

function Ribbon({ accent }: { accent: string }) {
  return (
    <g fill="none" strokeLinecap="round">
      <path d="M40 56 C90 40 110 76 70 92 C30 108 90 140 150 120" stroke={INK} strokeWidth="1.5" />
      <path d="M48 70 C92 58 104 82 72 98 C44 112 92 146 148 132" stroke={accent} strokeWidth="1.5" />
      <path d="M56 84 C94 76 98 90 76 104 C58 118 96 152 146 144" stroke={INK} strokeWidth="0.9" />
      <rect x="128" y="48" width="34" height="26" rx="3" stroke={INK} strokeWidth="1.5" />
      <line x1="128" y1="56" x2="162" y2="56" stroke={INK} strokeWidth="0.9" />
      <line x1="128" y1="64" x2="162" y2="64" stroke={INK} strokeWidth="0.9" />
    </g>
  );
}

function Cuff({ accent }: { accent: string }) {
  return (
    <g fill="none" stroke={INK} strokeWidth="1.5" strokeLinecap="round">
      <ellipse cx="72" cy="92" rx="26" ry="34" />
      <ellipse cx="72" cy="92" rx="26" ry="34" strokeWidth="0.8" transform="translate(0,6)" />
      <path d="M50 116 q7 -8 11 0 q7 -8 11 0 q7 -8 11 0 q7 -8 11 0" strokeWidth="1" stroke={accent} />
      <ellipse cx="130" cy="104" rx="26" ry="34" />
      <ellipse cx="130" cy="104" rx="26" ry="34" strokeWidth="0.8" transform="translate(0,6)" />
      <path d="M108 128 q7 -8 11 0 q7 -8 11 0 q7 -8 11 0 q7 -8 11 0" strokeWidth="1" stroke={accent} />
      <circle cx="64" cy="86" r="2.5" strokeWidth="1" />
      <circle cx="80" cy="86" r="2.5" strokeWidth="1" />
      <circle cx="122" cy="98" r="2.5" strokeWidth="1" />
      <circle cx="138" cy="98" r="2.5" strokeWidth="1" />
    </g>
  );
}

function Brooch({ accent }: { accent: string }) {
  return (
    <g fill="none" stroke={INK} strokeWidth="1.5" strokeLinecap="round">
      <circle cx="100" cy="84" r="26" />
      <circle cx="100" cy="84" r="17" strokeWidth="1" />
      <circle cx="100" cy="84" r="7" stroke={accent} strokeWidth="2" />
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i * Math.PI) / 6;
        const x1 = 100 + Math.cos(a) * 17;
        const y1 = 84 + Math.sin(a) * 17;
        const x2 = 100 + Math.cos(a) * 26;
        const y2 = 84 + Math.sin(a) * 26;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth="0.8" />;
      })}
      <path d="M92 108 C86 128 84 142 92 158 L99 147" />
      <path d="M108 108 C114 128 116 142 108 158 L101 147" />
    </g>
  );
}

function Bandana({ accent }: { accent: string }) {
  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* Folded square triangle body */}
      <path d="M50 145 L100 52 L150 145 Z" stroke={INK} strokeWidth="1.5" />
      {/* Folded top edge — shows the fold */}
      <path d="M50 145 C70 135 90 130 100 128 C110 130 130 135 150 145" stroke={INK} strokeWidth="0.9" />
      {/* Knot at top */}
      <ellipse cx="100" cy="52" rx="9" ry="6" stroke={accent} strokeWidth="1.8" />
      {/* Knot tails */}
      <path d="M100 58 C94 70 90 82 93 94" stroke={accent} strokeWidth="1.5" />
      <path d="M100 58 C106 70 110 82 107 94" stroke={accent} strokeWidth="1.5" />
      {/* Subtle floral pattern suggestion */}
      <circle cx="85" cy="105" r="3.5" stroke={INK} strokeWidth="0.8" />
      <path d="M85 101 C87 98 89 98 85 101 M85 101 C83 98 81 98 85 101" stroke={INK} strokeWidth="0.7" />
      <circle cx="115" cy="118" r="3.5" stroke={INK} strokeWidth="0.8" />
      <path d="M115 114 C117 111 119 111 115 114 M115 114 C113 111 111 111 115 114" stroke={INK} strokeWidth="0.7" />
      <circle cx="100" cy="135" r="3" stroke={accent} strokeWidth="0.8" />
      {/* Hemline accent */}
      <path d="M55 143 q8 -4 10 2 q8 -4 10 2 q8 -4 10 2 q8 -4 10 2 q8 -4 10 2 q8 -4 10 2 q8 -4 10 2 q8 -4 10 2" stroke={INK} strokeWidth="0.7" />
    </g>
  );
}

const ART: Record<ArtKind, (p: { accent: string }) => React.ReactNode> = {
  collar:  (p) => <Collar  {...p} />,
  bow:     (p) => <Bow     {...p} />,
  ribbon:  (p) => <Ribbon  {...p} />,
  cuff:    (p) => <Cuff    {...p} />,
  brooch:  (p) => <Brooch  {...p} />,
  bandana: (p) => <Bandana {...p} />,
};

export default function ProductArt({
  kind,
  accent,
  className,
}: {
  kind: ArtKind;
  accent: string;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <ellipse
        cx="100"
        cy="102"
        rx="82"
        ry="78"
        fill="none"
        stroke={INK}
        strokeOpacity="0.18"
        strokeWidth="0.8"
      />
      {/* Scale the motif up a touch so it fills the card with more presence */}
      <g transform="translate(100 100) scale(1.18) translate(-100 -100)">
        {ART[kind]({ accent })}
      </g>
    </svg>
  );
}
