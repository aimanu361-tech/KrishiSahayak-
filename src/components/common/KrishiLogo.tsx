import React, { useState } from 'react';

interface KrishiLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const KrishiLogo: React.FC<KrishiLogoProps> = ({ size = 'md', className = '' }) => {
  const [imageError, setImageError] = useState(false);

  // Responsive, compact dimensions preserving original proportions
  const dimensions = {
    sm: {
      box: 'w-7 h-7 sm:w-8 sm:h-8',
      text: 'text-lg sm:text-xl',
    },
    md: {
      box: 'w-8 h-8 sm:w-9 sm:h-9',
      text: 'text-xl sm:text-2xl',
    },
    lg: {
      box: 'w-10 h-10 sm:w-12 sm:h-12',
      text: 'text-2xl sm:text-3xl',
    },
  }[size];

  return (
    <div className={`inline-flex items-center gap-2.5 shrink-0 select-none ${className}`}>
      {/* Three-Green-Leaf Sprout Icon Container */}
      <div className={`relative ${dimensions.box} flex items-center justify-center shrink-0`}>
        {!imageError ? (
          <img
            src="/assets/aistudio/image_bab9d082.png"
            alt="KrishiSahayak Logo"
            className="w-full h-full object-contain mix-blend-multiply"
            onError={() => setImageError(true)}
          />
        ) : (
          /* High-fidelity 3-leaf green sprout SVG fallback */
          <svg
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
            aria-hidden="true"
          >
            {/* Ground Arc */}
            <path
              d="M48 156C80 142 120 142 152 156C122 147 78 147 48 156Z"
              fill="#365314"
            />
            {/* Central Stem */}
            <path
              d="M96 142V124C86 112 76 96 70 82C84 84 94 94 97 106C100 102 102 96 103 82C103 82 103 142 103 142H96Z"
              fill="#365314"
            />
            {/* Center Leaf */}
            <path
              d="M100 38C82 66 84 100 100 120C116 100 118 66 100 38Z"
              fill="#4d6b1d"
            />
            <path
              d="M100 60V104"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Left Leaf */}
            <path
              d="M93 118C62 118 35 96 35 80C55 78 82 92 93 118Z"
              fill="#4d6b1d"
            />
            <path
              d="M54 88C68 90 78 98 84 108"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Right Leaf */}
            <path
              d="M107 118C138 118 165 96 165 80C145 78 118 92 107 118Z"
              fill="#4d6b1d"
            />
            <path
              d="M146 88C132 90 122 98 116 108"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        )}
      </div>

      {/* Readable Brand Name beside the logo */}
      <span className={`font-bold tracking-tight text-slate-900 leading-none whitespace-nowrap ${dimensions.text}`}>
        <span className="text-[#166534]">Krishi</span>
        <span className="text-[#16A34A]">Sahayak</span>
      </span>
    </div>
  );
};
