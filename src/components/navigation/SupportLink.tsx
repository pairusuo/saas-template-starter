import React from 'react';
import Link from 'next/link';
import { HelpCircle, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SupportLinkProps {
  href?: string;
  showIcon?: boolean;
  showOnlineStatus?: boolean;
  isOnline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function SupportLink({
  href = '/support',
  showIcon = false,
  showOnlineStatus = false,
  isOnline = true,
  className,
  children = '客服支持'
}: SupportLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        'inline-flex items-center gap-2 text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors duration-200',
        className
      )}
    >
      {showIcon && <HelpCircle className="w-4 h-4" />}
      {children}
      {showOnlineStatus && (
        <span className="inline-flex items-center gap-1">
          <Circle 
            className={cn(
              'w-2 h-2 fill-current',
              isOnline ? 'text-green-500' : 'text-gray-400'
            )} 
          />
          <span className="text-xs text-gray-500">
            {isOnline ? '在线' : '离线'}
          </span>
        </span>
      )}
    </Link>
  );
}