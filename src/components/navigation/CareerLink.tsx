import React from 'react';
import Link from 'next/link';
import { Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CareerLinkProps {
  href?: string;
  showIcon?: boolean;
  showJobCount?: boolean;
  jobCount?: number;
  className?: string;
  children?: React.ReactNode;
}

export function CareerLink({
  href = '/careers',
  showIcon = false,
  showJobCount = false,
  jobCount = 0,
  className,
  children = '招聘信息'
}: CareerLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        'inline-flex items-center gap-2 text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors duration-200',
        className
      )}
    >
      {showIcon && <Briefcase className="w-4 h-4" />}
      {children}
      {showJobCount && jobCount > 0 && (
        <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
          {jobCount}
        </span>
      )}
    </Link>
  );
}