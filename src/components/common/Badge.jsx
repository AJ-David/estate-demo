import React from 'react';

export function Badge({ children, variant = 'default', size = 'sm', className = '' }) {
  const baseClasses = 'inline-flex items-center font-medium rounded-full transition-colors';

  const sizeClasses = {
    xs: 'px-2 py-0.5 text-xs',
    sm: 'px-2.5 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
  }[size] || 'px-2.5 py-1 text-xs';

  const variantClasses = {
    default: 'bg-estate-100 text-estate-800 border border-estate-200',
    primary: 'bg-navy text-gold border border-navy-border shadow-sm',
    emerald: 'bg-gold-50 text-gold-900 border border-gold-200 font-semibold',
    verified: 'bg-gradient-to-r from-gold to-gold-dark text-navy-deep font-black shadow-gold',
    rent: 'bg-navy-card text-gold-light border border-gold/30 font-semibold',
    sale: 'bg-gold-50 text-gold-900 border border-gold/40 font-bold',
    shortlet: 'bg-estate-100 text-estate-800 border border-estate-200 font-semibold',
    warning: 'bg-amber-50 text-amber-900 border border-amber-200',
    danger: 'bg-crimson-soft text-crimson border border-crimson-border font-semibold',
  }[variant] || 'bg-estate-100 text-estate-800';

  return (
    <span className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`}>
      {children}
    </span>
  );
}
