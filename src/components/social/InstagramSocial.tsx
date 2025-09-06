import React from 'react';
import Link from 'next/link';
import { Instagram } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InstagramSocialProps {
  href: string;
  variant?: 'default' | 'gradient' | 'minimal';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

export function InstagramSocial({
  href,
  variant = 'default',
  size = 'md',
  className,
  onClick
}: InstagramSocialProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const variantClasses = {
    default: 'text-gray-600 hover:text-pink-500 dark:text-gray-400 dark:hover:text-pink-400',
    gradient: 'text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text hover:from-purple-600 hover:via-pink-600 hover:to-orange-600',
    minimal: 'text-gray-500 hover:text-pink-500'
  };

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'inline-flex items-center gap-2 transition-all duration-200',
        variantClasses[variant],
        className
      )}
      onClick={onClick}
    >
      <Instagram className={sizeClasses[size]} />
    </Link>
  );
}