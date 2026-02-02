interface WeaselLogoProps {
  className?: string;
}

export function WeaselLogo({ className = "w-12 h-12" }: WeaselLogoProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background circle */}
      <circle
        cx="50"
        cy="50"
        r="48"
        className="fill-violet-600"
      />

      {/* Weasel body - elongated shape */}
      <ellipse
        cx="50"
        cy="58"
        rx="28"
        ry="20"
        className="fill-amber-200"
      />

      {/* Weasel head */}
      <circle
        cx="50"
        cy="35"
        r="18"
        className="fill-amber-200"
      />

      {/* Snout */}
      <ellipse
        cx="50"
        cy="42"
        rx="8"
        ry="6"
        className="fill-amber-100"
      />

      {/* Nose */}
      <ellipse
        cx="50"
        cy="40"
        rx="3"
        ry="2.5"
        className="fill-zinc-800"
      />

      {/* Left eye */}
      <ellipse
        cx="42"
        cy="32"
        rx="4"
        ry="5"
        className="fill-zinc-800"
      />
      {/* Left eye shine */}
      <circle
        cx="41"
        cy="31"
        r="1.5"
        className="fill-white"
      />

      {/* Right eye */}
      <ellipse
        cx="58"
        cy="32"
        rx="4"
        ry="5"
        className="fill-zinc-800"
      />
      {/* Right eye shine */}
      <circle
        cx="57"
        cy="31"
        r="1.5"
        className="fill-white"
      />

      {/* Left ear */}
      <ellipse
        cx="36"
        cy="22"
        rx="6"
        ry="8"
        className="fill-amber-200"
        transform="rotate(-15 36 22)"
      />
      <ellipse
        cx="36"
        cy="23"
        rx="3"
        ry="5"
        className="fill-pink-300"
        transform="rotate(-15 36 23)"
      />

      {/* Right ear */}
      <ellipse
        cx="64"
        cy="22"
        rx="6"
        ry="8"
        className="fill-amber-200"
        transform="rotate(15 64 22)"
      />
      <ellipse
        cx="64"
        cy="23"
        rx="3"
        ry="5"
        className="fill-pink-300"
        transform="rotate(15 64 23)"
      />

      {/* Mischievous eyebrows */}
      <path
        d="M37 27 Q42 25 47 28"
        stroke="#52525b"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M53 28 Q58 25 63 27"
        stroke="#52525b"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />

      {/* Smirk */}
      <path
        d="M44 46 Q50 50 56 46"
        stroke="#52525b"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />

      {/* Belly patch */}
      <ellipse
        cx="50"
        cy="62"
        rx="12"
        ry="10"
        className="fill-amber-100"
      />

      {/* Tail */}
      <path
        d="M78 58 Q88 50 82 40 Q78 35 74 42 Q72 52 78 58"
        className="fill-amber-200"
      />
      <path
        d="M80 42 Q78 38 76 44"
        className="fill-amber-800"
        opacity="0.3"
      />
    </svg>
  );
}
