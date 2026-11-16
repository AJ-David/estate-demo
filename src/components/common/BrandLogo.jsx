import React from 'react';
import { Link } from 'react-router-dom';

/**
 * VettedHomes Signature Brand Logo
 * 
 * Features an architectural roofline fused with an authoritative vetting shield
 * and an optical precision verification core.
 */
export function BrandLogo({ 
  size = 'md', 
  variant = 'dark', 
  showTagline = false,
  to = '/',
  className = '' 
}) {
  const sizeMap = {
    sm: {
      mark: 'w-8 h-8 rounded-lg',
      iconSize: 20,
      title: 'text-lg',
      tagline: 'text-[9px]',
    },
    md: {
      mark: 'w-11 h-11 rounded-xl',
      iconSize: 26,
      title: 'text-2xl',
      tagline: 'text-[10px]',
    },
    lg: {
      mark: 'w-14 h-14 rounded-2xl',
      iconSize: 32,
      title: 'text-3xl',
      tagline: 'text-xs',
    },
    xl: {
      mark: 'w-16 h-16 rounded-2xl',
      iconSize: 40,
      title: 'text-4xl',
      tagline: 'text-xs',
    }
  };

  const currentSize = sizeMap[size] || sizeMap.md;
  const isLight = variant === 'light';
  const isIconOnly = variant === 'icon-only';

  const markElement = (
    <div 
      className={`${currentSize.mark} flex items-center justify-center shrink-0 shadow-md transition-transform duration-300 group-hover:scale-105 ${
        isLight 
          ? 'bg-navy-surface border border-navy-border text-gold-light' 
          : 'bg-navy text-gold border border-navy-border'
      }`}
    >
      <svg 
        width={currentSize.iconSize} 
        height={currentSize.iconSize} 
        viewBox="0 0 32 32" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="transition-all"
      >
        {/* House / Shield Gable Structure */}
        <path 
          d="M16 4L5 12V25C5 26.1046 5.89543 27 7 27H25C26.1046 27 27 26.1046 27 25V12L16 4Z" 
          fill={isLight ? '#11141C' : '#050608'} 
          stroke={isLight ? '#283042' : '#191E2B'} 
          strokeWidth="1.2"
        />
        {/* Dynamic Sovereign Gold Roofline */}
        <path 
          d="M3.5 13.5L16 4L28.5 13.5" 
          stroke="#C5A059" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        {/* Vetting Shield Core with Verification Check */}
        <circle 
          cx="16" 
          cy="18" 
          r="5.5" 
          fill={isLight ? '#050608' : '#0A0C10'} 
          stroke="#C5A059" 
          strokeWidth="1.6"
        />
        <path 
          d="M13.8 18L15.3 19.5L18.5 16.5" 
          stroke="#C5A059" 
          strokeWidth="1.8" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );

  if (isIconOnly) {
    return to ? (
      <Link to={to} className={`inline-block group ${className}`} aria-label="VettedHomes Home">
        {markElement}
      </Link>
    ) : (
      <div className={`inline-block ${className}`}>
        {markElement}
      </div>
    );
  }

  const content = (
    <div className={`flex items-center gap-3 group ${className}`}>
      {markElement}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-none">
          <span className={`${currentSize.title} font-black tracking-tight font-display ${
            isLight ? 'text-white' : 'text-navy'
          }`}>
            Vetted<span className={isLight ? 'text-gold-light' : 'text-gold'}>Homes</span>
          </span>
          <span className="inline-block w-2 h-2 rounded-full bg-gold"></span>
        </div>
        {showTagline && (
          <p className={`${currentSize.tagline} uppercase font-bold tracking-widest mt-1 ${
            isLight ? 'text-estate-300' : 'text-estate-500'
          } font-sans`}>
            Verified Properties & Intel
          </p>
        )}
      </div>
    </div>
  );

  return to ? (
    <Link to={to} className="inline-block focus:outline-none" aria-label="VettedHomes">
      {content}
    </Link>
  ) : (
    content
  );
}

export default BrandLogo;

