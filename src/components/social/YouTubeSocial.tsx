import React from 'react';
import Link from 'next/link';
import { Youtube } from 'lucide-react';
import { cn } from '@/lib/utils';

interface YouTubeSocialProps {
  href: string;
  showSubscribers?: boolean;
  subscriberCount?: number;
  variant?: 'default' | 'red' | 'minimal';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

export function YouTubeSocial({
  href,
  showSubscribers = false,
  subscriberCount,
  variant = 'default',
  size = 'md',
  className,
  onClick
}: YouTubeSocialProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const variantClasses = {
    default: 'text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-500',
    red: 'text-red-600 hover:text-red-700',
    minimal: 'text-gray-500 hover:text-red-600'
  };

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'inline-flex items-center gap-2 transition-colors duration-200',
        variantClasses[variant],
        className
      )}
      onClick={onClick}
    >
      <Youtube className={sizeClasses[size]} />
      {showSubscribers && subscriberCount && (
        <span className="text-sm font-medium">
          {subscriberCount.toLocaleString()}
        </span>
      )}
    </Link>
  );
}