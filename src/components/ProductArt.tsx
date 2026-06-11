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
      {/* neckband */}
      <path d="M55 70 C70 52 130 52 145 70" />
      {/* left & right collar panels with scalloped hems */}
      <path d="M55 70 C52 96 60 120 84 134 C70 138 58 136 50 128 C40 114 42 88 55 70 Z" />
      <path d="M145 70 C148 96 140 120 116 134 C130 138 142 136 150 128 C160 114 158 88 145 70 Z" />
      {/* scallops */}
      <path d="M58 122 q6 -7 12 0 q6 -7 12 0" strokeWidth="1" />
      <path d="M118 122 q6 -7 12 0 q6 -7 12 0" strokeWidth="1" />
      {/* lace eyelets */}
      <circle cx="70" cy="96" r="3" strokeWidth="1" />
      <circle cx="82" cy="110" r="3" strokeWidth="1" />
      <circle cx="130" cy="96" r="3" strokeWidth="1" />
      <circle cx="118" cy="110" r="3" strokeWidth="1" />
      {/* ribbon tie */}
      <path d="M96 136 q4 5 8 0" stroke={accent} strokeWidth="2" />
      <path d="M100 138 C92 146 88 152 90 158 M100 138 C108 146 112 152 110 158" stroke={accent} strokeWidth="1.5" />
    </g>
  );
}

function Bow({ accent }: { accent: string }) {
  return (
    <g fill="none" stroke={INK} strokeWidth="1.5" strokeLinecap="round">
      {/* loops */}
      <path d="M100 96 C70 70 44 72 40 92 C36 112 64 118 100 102" />
      <path d="M100 96 C130 70 156 72 160 92 C164 112 136 118 100 102" />
      {/* inner loop creases */}
      <path d="M96 97 C76 84 58 84 52 92" strokeWidth="0.9" />
      <path d="M104 97 C124 84 142 84 148 92" strokeWidth="0.9" />
      {/* knot */}
      <rect x="91" y="89" width="18" height="18" rx="5" stroke={accent} strokeWidth="2" />
      {/* tails */}
      <path d="M96 106 C88 124 84 138 90 154 L98 144" />
      <path d="M104 106 C112 124 116 138 110 154 L102 144" />
    </g>
  );
}

function Ribbon({ accent }: { accent: string }) {
  return (
    <g fill="none" strokeLinecap="round">
      {/* three flowing ribbons */}
      <path d="M40 56 C90 40 110 76 70 92 C30 108 90 140 150 120" stroke={INK} strokeWidth="1.5" />
      <path d="M48 70 C92 58 104 82 72 98 C44 112 92 146 148 132" stroke={accent} strokeWidth="1.5" />
      <path d="M56 84 C94 76 98 90 76 104 C58 118 96 152 146 144" stroke={INK} strokeWidth="0.9" />
      {/* spool */}
      <rect x="128" y="48" width="34" height="26" rx="3" stroke={INK} strokeWidth="1.5" />
      <line x1="128" y1="56" x2="162" y2="56" stroke={INK} strokeWidth="0.9" />
      <line x1="128" y1="64" x2="162" y2="64" stroke={INK} strokeWidth="0.9" />
    </g>
  );
}

function Cuff({ accent }: { accent: string }) {
  return (
    <g fill="none" stroke={INK} strokeWidth="1.5" strokeLinecap="round">
      {/* pair of cuffs */}
      <ellipse cx="72" cy="92" rx="26" ry="34" />
      <ellipse cx="72" cy="92" rx="26" ry="34" strokeWidth="0.8" transform="translate(0,6)" />
      <path d="M50 116 q7 -8 11 0 q7 -8 11 0 q7 -8 11 0 q7 -8 11 0" strokeWidth="1" stroke={accent} />
      <ellipse cx="130" cy="104" rx="26" ry="34" />
      <ellipse cx="130" cy="104" rx="26" ry="34" strokeWidth="0.8" transform="translate(0,6)" />
      <path d="M108 128 q7 -8 11 0 q7 -8 11 0 q7 -8 11 0 q7 -8 11 0" strokeWidth="1" stroke={accent} />
      {/* eyelets */}
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
      {/* rosette */}
      <circle cx="100" cy="84" r="26" />
      <circle cx="100" cy="84" r="17" strokeWidth="1" />
      <circle cx="100" cy="84" r="7" stroke={accent} strokeWidth="2" />
      {/* pleats */}
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i * Math.PI) / 6;
        const x1 = 100 + Math.cos(a) * 17;
        const y1 = 84 + Math.sin(a) * 17;
        const x2 = 100 + Math.cos(a) * 26;
        const y2 = 84 + Math.sin(a) * 26;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth="0.8" />;
      })}
      {/* tails */}
      <path d="M92 108 C86 128 84 142 92 158 L99 147" />
      <path d="M108 108 C114 128 116 142 108 158 L101 147" />
    </g>
  );
}

function Sash({ accent }: { accent: string }) {
  return (
    <g fill="none" stroke={INK} strokeWidth="1.5" strokeLinecap="round">
      {/* waistband sweep */}
      <path d="M36 84 C70 70 130 70 164 84" />
      <path d="M36 96 C70 82 130 82 164 96" />
      <path d="M44 90 l0 -10 M60 85 l0 -10 M78 82 l0 -10 M100 81 l0 -10 M122 82 l0 -10 M140 85 l0 -10 M156 90 l0 -10" strokeWidth="0.7" />
      {/* bow at back */}
      <path d="M100 96 C86 88 74 90 73 98 C72 107 88 109 100 101" stroke={accent} />
      <path d="M100 96 C114 88 126 90 127 98 C128 107 112 109 100 101" stroke={accent} />
      <path d="M97 104 C92 124 90 140 96 156 L101 146" stroke={accent} />
      <path d="M103 104 C108 124 110 140 104 156 L99 146" stroke={accent} />
    </g>
  );
}

const ART: Record<ArtKind, (p: { accent: string }) => React.ReactNode> = {
  collar: (p) => <Collar {...p} />,
  bow: (p) => <Bow {...p} />,
  ribbon: (p) => <Ribbon {...p} />,
  cuff: (p) => <Cuff {...p} />,
  brooch: (p) => <Brooch {...p} />,
  sash: (p) => <Sash {...p} />,
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
      {/* faint framing ring, echoing the emblem */}
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
      {ART[kind]({ accent })}
    </svg>
  );
}
