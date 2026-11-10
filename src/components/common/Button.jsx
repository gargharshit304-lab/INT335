import React from 'react';

export default function Button({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size = 'md', // 'sm' | 'md' | 'lg'
  icon: Icon,
  iconPosition = 'left',
  className = '',
  disabled = false,
  onClick,
  type = 'button',
  ...props
}) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/30 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]';

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-5 py-2.5 text-base gap-2.5 rounded-2xl font-semibold',
  };

  const variantStyles = {
    primary:
      'bg-[#8B5CF6] text-white hover:bg-[#7C3AED] shadow-sm shadow-[#8B5CF6]/25 border border-transparent',
    secondary:
      'bg-[#F0EBFF] text-[#6D28D9] hover:bg-[#E7DEFF] border border-purple-100',
    outline:
      'bg-white text-[#242039] hover:bg-[#FAF9FC] border border-[#ECE9F2] hover:border-[#DDD8E8]',
    ghost:
      'bg-transparent text-[#858197] hover:text-[#242039] hover:bg-[#F0EBFF]/50',
    danger:
      'bg-red-50 text-red-600 hover:bg-red-100 border border-red-200',
    mint:
      'bg-[#E8F8F0] text-[#059669] hover:bg-[#D1F3E1] border border-emerald-100',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0" />}
    </button>
  );
}

