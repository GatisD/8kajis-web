import { useReducedMotion } from "framer-motion";

interface Props {
  size?: number;
  variant?: "landing" | "mini" | "happy";
  className?: string;
}

/**
 * 8kajis.lv astoņkājis mascot — SVG ar CSS animācijām
 * Tentakuļi ar wiggle, ķermenis ar float
 * prefers-reduced-motion: tikai opacity fade
 */
export default function OctopusMascot({
  size = 280,
  variant = "landing",
  className = "",
}: Props) {
  const reduced = useReducedMotion();
  const animClass = reduced ? "" : "octopus-float";

  const bodyColor =
    variant === "landing" ? "#5BA3E0" : variant === "mini" ? "#7BA3D9" : "#4CAF82";
  const eyeColor = "#00E5CC";
  const pupilColor = "#0A0A0F";

  if (variant === "mini") {
    return (
      <svg
        width={32}
        height={32}
        viewBox="0 0 100 100"
        className={className}
        aria-label="8kajis.lv astoņkājis"
        role="img"
      >
        <ellipse cx="50" cy="40" rx="32" ry="30" fill={bodyColor} />
        <circle cx="38" cy="36" r="7" fill="white" />
        <circle cx="62" cy="36" r="7" fill="white" />
        <circle cx="38" cy="36" r="3.5" fill={eyeColor} />
        <circle cx="62" cy="36" r="3.5" fill={eyeColor} />
        <circle cx="39" cy="35" r="1.5" fill={pupilColor} />
        <circle cx="63" cy="35" r="1.5" fill={pupilColor} />
        {/* Simple tentacles */}
        <path d="M30 65 Q25 80 20 85" stroke={bodyColor} strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M40 68 Q38 82 35 88" stroke={bodyColor} strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M50 70 Q50 84 50 90" stroke={bodyColor} strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M60 68 Q62 82 65 88" stroke={bodyColor} strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M70 65 Q75 80 80 85" stroke={bodyColor} strokeWidth="5" fill="none" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 280 280"
      className={`${animClass} ${className}`}
      aria-label="8kajis.lv astoņkājis — zīmola maskots"
      role="img"
      style={{ overflow: "visible" }}
    >
      {/* Mesh wireframe background glow */}
      <defs>
        <radialGradient id="octopus-glow" cx="50%" cy="45%" r="50%">
          <stop offset="0%" stopColor={bodyColor} stopOpacity="0.3" />
          <stop offset="100%" stopColor={bodyColor} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="body-gradient" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#8BC4F0" />
          <stop offset="100%" stopColor={bodyColor} />
        </radialGradient>
        {/* Mesh pattern */}
        <pattern id="mesh" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
          <path d="M 12 0 L 0 0 0 12" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" />
        </pattern>
      </defs>

      {/* Glow circle */}
      <ellipse cx="140" cy="145" rx="120" ry="110" fill="url(#octopus-glow)" />

      {/* Tentacles — 8 tentakuļi ar wiggle animācijām */}
      {/* Left outer */}
      <path
        className={reduced ? "" : "tentacle tentacle-1"}
        d="M80 170 Q55 195 40 230 Q35 245 45 250"
        stroke={bodyColor}
        strokeWidth="14"
        fill="none"
        strokeLinecap="round"
        opacity="0.9"
      />
      {/* Left mid-outer */}
      <path
        className={reduced ? "" : "tentacle tentacle-2"}
        d="M100 185 Q85 215 80 245 Q78 258 90 260"
        stroke={bodyColor}
        strokeWidth="14"
        fill="none"
        strokeLinecap="round"
        opacity="0.9"
      />
      {/* Left mid */}
      <path
        className={reduced ? "" : "tentacle tentacle-3"}
        d="M120 192 Q115 225 118 258 Q120 270 130 268"
        stroke={bodyColor}
        strokeWidth="13"
        fill="none"
        strokeLinecap="round"
        opacity="0.9"
      />
      {/* Left center */}
      <path
        className={reduced ? "" : "tentacle tentacle-4"}
        d="M138 195 Q135 228 140 262 Q141 274 148 272"
        stroke={bodyColor}
        strokeWidth="13"
        fill="none"
        strokeLinecap="round"
        opacity="0.9"
      />
      {/* Right center */}
      <path
        className={reduced ? "" : "tentacle tentacle-5"}
        d="M155 193 Q158 226 162 260 Q163 273 155 272"
        stroke={bodyColor}
        strokeWidth="13"
        fill="none"
        strokeLinecap="round"
        opacity="0.9"
      />
      {/* Right mid */}
      <path
        className={reduced ? "" : "tentacle tentacle-6"}
        d="M170 188 Q178 220 182 254 Q184 267 175 268"
        stroke={bodyColor}
        strokeWidth="13"
        fill="none"
        strokeLinecap="round"
        opacity="0.9"
      />
      {/* Right mid-outer */}
      <path
        className={reduced ? "" : "tentacle tentacle-7"}
        d="M188 178 Q200 208 206 240 Q209 254 200 256"
        stroke={bodyColor}
        strokeWidth="14"
        fill="none"
        strokeLinecap="round"
        opacity="0.9"
      />
      {/* Right outer */}
      <path
        className={reduced ? "" : "tentacle tentacle-8"}
        d="M200 165 Q220 192 232 225 Q238 240 228 246"
        stroke={bodyColor}
        strokeWidth="14"
        fill="none"
        strokeLinecap="round"
        opacity="0.9"
      />

      {/* Body */}
      <ellipse cx="140" cy="130" rx="75" ry="70" fill="url(#body-gradient)" />

      {/* Mesh overlay on body */}
      <ellipse cx="140" cy="130" rx="75" ry="70" fill="url(#mesh)" opacity="0.6" />

      {/* Body highlight */}
      <ellipse cx="120" cy="105" rx="28" ry="20" fill="rgba(255,255,255,0.18)" />

      {/* Suction cups on body edges */}
      <circle cx="68" cy="148" r="5" fill="rgba(255,255,255,0.25)" />
      <circle cx="72" cy="162" r="4" fill="rgba(255,255,255,0.2)" />
      <circle cx="210" cy="148" r="5" fill="rgba(255,255,255,0.25)" />
      <circle cx="207" cy="162" r="4" fill="rgba(255,255,255,0.2)" />

      {/* Eyes — white sclera */}
      <ellipse cx="115" cy="125" rx="22" ry="24" fill="white" />
      <ellipse cx="165" cy="125" rx="22" ry="24" fill="white" />

      {/* Iris — teal/mint glow */}
      <circle cx="115" cy="126" r="15" fill={eyeColor} />
      <circle cx="165" cy="126" r="15" fill={eyeColor} />

      {/* Pupils */}
      <circle cx="117" cy="124" r="8" fill={pupilColor} />
      <circle cx="167" cy="124" r="8" fill={pupilColor} />

      {/* Eye sparkle highlights */}
      <circle cx="120" cy="120" r="3.5" fill="white" opacity="0.9" />
      <circle cx="170" cy="120" r="3.5" fill="white" opacity="0.9" />
      <circle cx="113" cy="130" r="1.5" fill="white" opacity="0.6" />
      <circle cx="163" cy="130" r="1.5" fill="white" opacity="0.6" />

      {/* Happy mouth smile */}
      {variant === "happy" ? (
        <path
          d="M118 154 Q140 170 162 154"
          stroke={pupilColor}
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
      ) : (
        <path
          d="M122 154 Q140 164 158 154"
          stroke={pupilColor}
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
        />
      )}

      {/* Cheek blush */}
      <ellipse cx="100" cy="148" rx="12" ry="7" fill="rgba(255,180,160,0.35)" />
      <ellipse cx="180" cy="148" rx="12" ry="7" fill="rgba(255,180,160,0.35)" />

      {/* Top of head texture dots */}
      <circle cx="140" cy="70" r="4" fill="rgba(255,255,255,0.2)" />
      <circle cx="158" cy="62" r="3" fill="rgba(255,255,255,0.15)" />
      <circle cx="122" cy="62" r="3" fill="rgba(255,255,255,0.15)" />
      <circle cx="175" cy="80" r="3" fill="rgba(255,255,255,0.15)" />
      <circle cx="105" cy="80" r="3" fill="rgba(255,255,255,0.15)" />
    </svg>
  );
}
