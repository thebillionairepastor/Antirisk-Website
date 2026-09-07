import React from 'react';
import logoImage from '../assets/images/logo.png';

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
      {/* Logo Emblem */}
      <div className="relative flex-shrink-0 w-16 h-16 bg-white border border-gray-100 shadow-sm flex items-center justify-center p-1 rounded-sm">
        <img src={logoImage} alt="Anti-Risk Security Logo" className="w-full h-full object-contain" />
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
