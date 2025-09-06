import React from 'react';
import Link from 'next/link';
import { Twitter } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TwitterSocialProps {
  href: string;
  showFollowers?: boolean;
  followerCount?: number;
  variant?: 'default' | 'blue' | 'minimal';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

export function TwitterSocial({
  href,
  showFollowers = false,
  followerCount,
  variant = 'default',
  size = 'md',
  className,
  onClick
}: TwitterSocialProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const variantClasses = {
    default: 'text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400',
    blue: 'text-blue-500 hover:text-blue-600',
    minimal: 'text-gray-500 hover:text-blue-500'
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
      <Twitter className={sizeClasses[size]} />
      {showFollowers && followerCount && (
        <span className="text-sm font-medium">
          {followerCount.toLocaleString()}
        </span>
      )}
    </Link>
  );
}