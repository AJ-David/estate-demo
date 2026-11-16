import React from 'react';

export function Badge({ children, variant = 'default', size = 'sm', className = '' }) {
  const baseClasses = 'inline-flex items-center font-medium rounded-full transition-colors';

  const sizeClasses = {
    xs: 'px-2 py-0.5 text-xs',
    sm: 'px-2.5 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
  }[size] || 'px-2.5 py-1 text-xs';

  const variantClasses = {
    default: 'bg-navy-surface text-estate-200 border border-navy-border font-medium',
    primary: 'bg-navy-card text-gold-light border border-gold/40 shadow-gold font-semibold',
    emerald: 'bg-emerald-950/70 text-emerald-300 border border-emerald-500/40 font-semibold',
    verified: 'bg-gradient-to-r from-gold to-gold-dark text-navy-deep font-black shadow-gold tracking-wide',
    rent: 'bg-navy-surface text-gold-light border border-gold/40 font-semibold',
    sale: 'bg-gold-500/20 text-gold-300 border border-gold/50 font-bold',
    shortlet: 'bg-navy-surface text-estate-100 border border-navy-border font-semibold',
    warning: 'bg-amber-950/70 text-amber-300 border border-amber-500/40 font-semibold',
    danger: 'bg-crimson-dark/70 text-rose-300 border border-crimson/50 font-semibold',
  }[variant] || 'bg-navy-surface text-estate-200 border border-navy-border';

  return (
    <span className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`}>
      {children}
    </span>
  );
}
