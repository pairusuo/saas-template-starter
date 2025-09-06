import React from 'react';
import Link from 'next/link';
import { DollarSign, Percent } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PricingLinkProps {
  href?: string;
  showIcon?: boolean;
  showPromoBadge?: boolean;
  promoText?: string;
  className?: string;
  children?: React.ReactNode;
}

export function PricingLink({
  href = '/pricing',
  showIcon = false,
  showPromoBadge = false,
  promoText = '限时优惠',
  className,
  children = '价格'
}: PricingLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        'inline-flex items-center gap-2 text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors duration-200',
        className
      )}
    >
      {showIcon && <DollarSign className="w-4 h-4" />}
      {children}
      {showPromoBadge && (
        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-orange-600 bg-orange-100 dark:text-orange-400 dark:bg-orange-900/30 rounded-full animate-pulse">
          <Percent className="w-3 h-3" />
          {promoText}
        </span>
      )}
    </Link>
  );
}