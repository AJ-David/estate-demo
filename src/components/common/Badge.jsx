import React from 'react';

export function Badge({ children, variant = 'default', size = 'sm', className = '' }) {
  const baseClasses = 'inline-flex items-center font-medium rounded-full transition-colors';

  const sizeClasses = {
    xs: 'px-2 py-0.5 text-xs',
    sm: 'px-2.5 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
  }[size] || 'px-2.5 py-1 text-xs';

  const variantClasses = {
    default: 'bg-zinc-100 text-zinc-900 border border-zinc-200 font-medium',
    primary: 'bg-black text-white font-semibold',
    emerald: 'bg-zinc-100 text-zinc-900 border border-zinc-200 font-semibold',
    verified: 'bg-black text-white font-bold tracking-wide',
    rent: 'bg-zinc-100 text-zinc-900 border border-zinc-200 font-semibold',
    sale: 'bg-black text-white font-bold',
    shortlet: 'bg-zinc-100 text-zinc-900 border border-zinc-200 font-semibold',
    warning: 'bg-zinc-100 text-zinc-900 border border-zinc-200 font-semibold',
    danger: 'bg-zinc-100 text-zinc-900 border border-zinc-200 font-semibold',
  }[variant] || 'bg-zinc-100 text-zinc-900 border border-zinc-200';

  return (
    <span className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`}>
      {children}
    </span>
  );
}
