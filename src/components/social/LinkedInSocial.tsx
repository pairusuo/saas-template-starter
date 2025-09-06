import React from 'react';
import Link from 'next/link';
import { Linkedin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LinkedInSocialProps {
  href: string;
  variant?: 'default' | 'business' | 'minimal';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

export function LinkedInSocial({
  href,
  variant = 'default',
  size = 'md',
  className,
  onClick
}: LinkedInSocialProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const variantClasses = {
    default: 'text-gray-600 hover:text-blue-700 dark:text-gray-400 dark:hover:text-blue-500',
    business: 'text-blue-700 hover:text-blue-800',
    minimal: 'text-gray-500 hover:text-blue-700'
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
      <Linkedin className={sizeClasses[size]} />
    </Link>
  );
}