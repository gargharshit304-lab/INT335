import React from 'react';
import { motion } from 'framer-motion';

export default function ProgressRing({
  radius = 48,
  stroke = 8,
  progress = 0, // 0 - 100
  color = '#8B5CF6',
  trackColor = '#F0EBFF',
  children,
  className = '',
}) {
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (Math.min(progress, 100) / 100) * circumference;

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg
        height={radius * 2}
        width={radius * 2}
        className="transform -rotate-90 overflow-visible"
      >
        {/* Background Track */}
        <circle
          stroke={trackColor}
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        {/* Animated Progress Circle */}
        <motion.circle
          stroke={color}
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={`${circumference} ${circumference}`}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
      {/* Centered content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
        {children ? (
          children
        ) : (
          <span className="text-xl font-bold font-heading text-[#242039]">
            {Math.round(progress)}%
          </span>
        )}
      </div>
    </div>
  );
}

