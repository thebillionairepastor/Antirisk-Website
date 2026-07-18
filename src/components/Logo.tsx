import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
  onClick?: () => void;
}

export default function Logo({ className = '', variant = 'dark', onClick }: LogoProps) {
  const textColor = variant === 'dark' ? 'text-gray-900' : 'text-white';
  const subtitleColor = variant === 'dark' ? 'text-gray-600' : 'text-gray-300';
  const lineColor = variant === 'dark' ? 'border-gray-300' : 'border-gray-700';

  return (
    <div className={`flex items-center gap-3 select-none ${className}`} id="brand-logo" onClick={onClick}>
      {/* SVG Icon Emblem */}
      <div className="relative flex-shrink-0 w-16 h-16 bg-white border border-gray-100 shadow-sm flex items-center justify-center p-1 rounded-sm">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Black circle container */}
          <circle cx="50" cy="50" r="45" fill="none" stroke="#121212" strokeWidth="3" />
          
          {/* Red/Black inner emblem stylized triangle "AR" */}
          <g transform="translate(15, 15)">
            {/* Base Triangle */}
            <polygon
              points="35,5 68,62 2,62"
              fill="#c22026" /* Deep safety red */
              stroke="#121212"
              strokeWidth="2.5"
            />
            {/* Stylized letter 'A' horizontal bar */}
            <line x1="22" y1="42" x2="48" y2="42" stroke="white" strokeWidth="4.5" strokeLinecap="round" />
            
            {/* The white outline representing 'A' */}
            <polyline
              points="15,55 35,15 55,55"
              fill="none"
              stroke="white"
              strokeWidth="4.5"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            
            {/* Black stylized R nested inside */}
            <path
              d="M 35 15 L 35 42 M 35 15 C 44 15, 48 24, 35 28 C 44 32, 46 55, 48 55"
              fill="none"
              stroke="#121212"
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>
      </div>

      {/* Brand Text */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1">
          <span className={`font-display font-extrabold tracking-tight text-xl leading-none ${textColor}`}>
            ANTI-RISK
          </span>
          <span className="font-display font-bold tracking-wider text-[10px] bg-brand-lime text-white px-1.5 py-0.5 rounded-sm leading-none">
            SECURITY
          </span>
        </div>
        <div className={`w-full border-t my-1 ${lineColor}`}></div>
        <span className={`font-sans text-[10px] font-medium tracking-normal leading-none uppercase ${subtitleColor}`}>
          Security & Safety Services
        </span>
        <span className={`font-sans text-[9px] font-semibold tracking-wider leading-none uppercase ${subtitleColor} mt-0.5`}>
          Provider
        </span>
      </div>
    </div>
  );
}
