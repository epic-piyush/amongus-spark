import React from 'react';

/**
 * Custom Vector Crewmate Illustration
 * Supports customizable primary suits, highlights, and visor reflections.
 */
export const CrewmateIllustration = ({
  color = '#F45858',
  shadowColor = '#B82828',
  visorColor = '#67C9F5',
  size = 320,
  animated = true,
  className = '',
  hasShadow = true,
  withBackpack = true,
  glow = true
}) => {
  return (
    <div
      className={`crewmate-svg-wrapper ${animated ? 'floating-crewmate' : ''} ${className}`}
      style={{
        width: typeof size === 'number' ? `${size}px` : size,
        maxWidth: '100%',
        aspectRatio: '1/1',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        filter: glow ? `drop-shadow(0 15px 35px ${color}44)` : 'none'
      }}
      aria-label="Among Us Crewmate Astronaut"
      role="img"
    >
      <svg
        viewBox="0 0 280 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%', overflow: 'visible' }}
      >
        <defs>
          {/* Visor Gradient */}
          <linearGradient id={`visor-grad-${color.replace('#', '')}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="25%" stopColor={visorColor} stopOpacity="1" />
            <stop offset="70%" stopColor="#256E94" stopOpacity="1" />
            <stop offset="100%" stopColor="#10364C" stopOpacity="1" />
          </linearGradient>

          {/* Visor Glare */}
          <linearGradient id="visor-glare" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.05" />
          </linearGradient>

          {/* Body Highlight */}
          <radialGradient id={`body-highlight-${color.replace('#', '')}`} cx="40%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.25" />
            <stop offset="50%" stopColor={color} stopOpacity="1" />
            <stop offset="100%" stopColor={shadowColor} stopOpacity="1" />
          </radialGradient>

          {/* Shadow Filter */}
          <filter id="soft-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="12" stdDeviation="10" floodColor="#000000" floodOpacity="0.5" />
          </filter>
        </defs>

        {/* Ambient Ground Shadow */}
        {hasShadow && (
          <ellipse
            cx="140"
            cy="300"
            rx="85"
            ry="14"
            fill="#050811"
            opacity="0.6"
            className="crewmate-shadow-ellipse"
          />
        )}

        {/* Oxygen Tank / Backpack */}
        {withBackpack && (
          <g className="crewmate-backpack">
            {/* Outline */}
            <rect
              x="30"
              y="110"
              width="60"
              height="115"
              rx="30"
              fill={shadowColor}
              stroke="#080B14"
              strokeWidth="11"
              strokeLinejoin="round"
            />
            {/* Inner fill */}
            <rect
              x="36"
              y="116"
              width="48"
              height="103"
              rx="24"
              fill={color}
            />
          </g>
        )}

        {/* Main Body + Legs (Single cohesive path) */}
        <g className="crewmate-body" filter="url(#soft-shadow)">
          {/* Main Suit Contour */}
          <path
            d="
              M 80 180
              V 110
              C 80 45, 195 45, 195 110
              V 245
              C 195 260, 185 270, 170 270
              C 155 270, 150 260, 150 245
              V 225
              C 150 220, 140 220, 140 225
              V 245
              C 140 260, 130 270, 115 270
              C 100 270, 92 260, 92 245
              V 180
              Z
            "
            fill={`url(#body-highlight-${color.replace('#', '')})`}
            stroke="#080B14"
            strokeWidth="12"
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {/* Suit Shadow details (Leg folds and under-torso) */}
          <path
            d="
              M 150 225
              V 245
              C 150 260, 155 270, 170 270
              C 185 270, 195 260, 195 245
              V 190
              C 175 205, 155 215, 150 225
              Z
            "
            fill={shadowColor}
            opacity="0.4"
          />
        </g>

        {/* Visor Assembly */}
        <g className="crewmate-visor">
          {/* Visor Outer Frame / Gasket */}
          <rect
            x="122"
            y="92"
            width="104"
            height="62"
            rx="31"
            fill="#080B14"
            stroke="#080B14"
            strokeWidth="11"
            strokeLinejoin="round"
          />

          {/* Visor Glass Gradient */}
          <rect
            x="125"
            y="95"
            width="98"
            height="56"
            rx="28"
            fill={`url(#visor-grad-${color.replace('#', '')})`}
          />

          {/* Top Glare Reflection */}
          <ellipse
            cx="170"
            cy="110"
            rx="34"
            ry="11"
            transform="rotate(-8 170 110)"
            fill="url(#visor-glare)"
          />

          {/* Secondary Subtler Rim Glare */}
          <ellipse
            cx="148"
            cy="132"
            rx="12"
            ry="4"
            transform="rotate(-5 148 132)"
            fill="#FFFFFF"
            opacity="0.3"
          />
        </g>

        {/* Floating Space Dust / Orbit Particles */}
        <circle cx="230" cy="50" r="3" fill="#67C9F5" opacity="0.8" />
        <circle cx="50" cy="80" r="2" fill="#FFD166" opacity="0.7" />
        <circle cx="240" cy="220" r="2.5" fill="#FFF5E8" opacity="0.5" />
      </svg>
    </div>
  );
};
