import React from 'react';

export default function Card({
  children,
  className = '',
  hover = true,
  padding = 'p-6',
  onClick,
  ...props
}) {
  return (
    <div
      onClick={onClick}
      className={`bg-white border border-[#ECE9F2] rounded-2xl ${
        hover
          ? 'hover:border-[#DDD8E8] hover:shadow-md hover:shadow-purple-900/5 transition-all duration-200'
          : ''
      } ${padding} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

