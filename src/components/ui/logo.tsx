import React from 'react';
import { Package } from 'lucide-react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  showText = true, 
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-3xl'
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="hero-gradient p-2 rounded-xl shadow-lg">
        <Package className={`${sizeClasses[size]} text-white`} />
      </div>
      {showText && (
        <span className={`font-bold text-gradient ${textSizeClasses[size]}`}>
          InvenTrak
        </span>
      )}
    </div>
  );
};