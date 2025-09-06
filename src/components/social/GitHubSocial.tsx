import React from 'react';
import Link from 'next/link';
import { Github } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GitHubSocialProps {
  href: string;
  showStars?: boolean;
  starCount?: number;
  variant?: 'default' | 'dark' | 'minimal';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

export function GitHubSocial({
  href,
  showStars = false,
  starCount,
  variant = 'default',
  size = 'md',
  className,
  onClick
}: GitHubSocialProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const variantClasses = {
    default: 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100',
    dark: 'text-gray-900 hover:text-gray-700 dark:text-white dark:hover:text-gray-300',
    minimal: 'text-gray-500 hover:text-gray-700'
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
      <Github className={sizeClasses[size]} />
      {showStars && starCount && (
        <span className="text-sm font-medium">
          {starCount.toLocaleString()}
        </span>
      )}
    </Link>
  );
}