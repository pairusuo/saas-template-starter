import React from 'react';
import Link from 'next/link';
import { BookOpen, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BlogLinkProps {
  href?: string;
  showIcon?: boolean;
  showNewBadge?: boolean;
  hasNewPosts?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function BlogLink({
  href = '/blog',
  showIcon = false,
  showNewBadge = false,
  hasNewPosts = false,
  className,
  children = '博客'
}: BlogLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        'inline-flex items-center gap-2 text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors duration-200',
        className
      )}
    >
      {showIcon && <BookOpen className="w-4 h-4" />}
      {children}
      {showNewBadge && hasNewPosts && (
        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30 rounded-full">
          <Sparkles className="w-3 h-3" />
          新文章
        </span>
      )}
    </Link>
  );
}