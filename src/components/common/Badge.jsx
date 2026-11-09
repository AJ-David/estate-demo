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
    primary: 'bg-navy text-white shadow-sm',
    emerald: 'bg-emerald-50 text-emerald-800 border border-emerald-200',
    verified: 'bg-emerald-600 text-white shadow-xs',
    rent: 'bg-blue-50 text-blue-700 border border-blue-200',
    sale: 'bg-purple-50 text-purple-700 border border-purple-200',
    shortlet: 'bg-amber-50 text-amber-800 border border-amber-200',
    warning: 'bg-amber-100 text-amber-800 border border-amber-200',
    danger: 'bg-rose-50 text-rose-700 border border-rose-200',
  }[variant] || 'bg-estate-100 text-estate-800';

  return (
    <span className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`}>
      {children}
    </span>
  );
}
