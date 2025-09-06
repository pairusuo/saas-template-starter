import React, { useState } from 'react';
import Link from 'next/link';
import { Info, Users, Target, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AboutLinkProps {
  href?: string;
  variant?: 'link' | 'dropdown';
  showIcon?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function AboutLink({
  href = '/about',
  variant = 'link',
  showIcon = false,
  className,
  children = '关于我们'
}: AboutLinkProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    if (variant === 'dropdown') {
      e.preventDefault();
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  if (variant === 'dropdown') {
    return (
      <div className="relative">
        <button
          onClick={handleClick}
          className={cn(
            'inline-flex items-center gap-2 text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors duration-200',
            className
          )}
        >
          {showIcon && <Info className="w-4 h-4" />}
          {children}
        </button>
        
        {isDropdownOpen && (
          <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
            <Link
              href="/about/company"
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <Info className="w-4 h-4" />
              公司简介
            </Link>
            <Link
              href="/about/team"
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <Users className="w-4 h-4" />
              团队介绍
            </Link>
            <Link
              href="/about/mission"
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <Target className="w-4 h-4" />
              使命愿景
            </Link>
            <Link
              href="/about/awards"
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <Award className="w-4 h-4" />
              荣誉资质
            </Link>
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={href}
      className={cn(
        'inline-flex items-center gap-2 text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors duration-200',
        className
      )}
    >
      {showIcon && <Info className="w-4 h-4" />}
      {children}
    </Link>
  );
}