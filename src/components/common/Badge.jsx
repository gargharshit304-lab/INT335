import React from 'react';

export default function Badge({
  children,
  variant = 'default', // 'default' | 'primary' | 'success' | 'warning' | 'info' | 'purple'
  size = 'md', // 'sm' | 'md'
  icon: Icon,
  className = '',
}) {
  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
  };

  const variantStyles = {
    default: 'bg-[#FAF9FC] text-[#858197] border border-[#ECE9F2]',
    primary: 'bg-[#F0EBFF] text-[#6D28D9] border border-purple-200/60 font-medium',
    success: 'bg-[#E8F8F0] text-[#059669] border border-emerald-200/60 font-medium',
    warning: 'bg-amber-50 text-amber-700 border border-amber-200/60 font-medium',
    info: 'bg-sky-50 text-sky-700 border border-sky-200/60 font-medium',
    purple: 'bg-[#8B5CF6] text-white font-medium',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {Icon && <Icon className="w-3 h-3 shrink-0" />}
      <span>{children}</span>
    </span>
  );
}

