import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ContactLinkProps {
  href?: string;
  variant?: 'link' | 'modal' | 'dropdown';
  showIcon?: boolean;
  iconType?: 'mail' | 'phone' | 'message';
  className?: string;
  children?: React.ReactNode;
  onContactClick?: () => void;
}

export function ContactLink({
  href = '/contact',
  variant = 'link',
  showIcon = false,
  iconType = 'mail',
  className,
  children = '联系我们',
  onContactClick
}: ContactLinkProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const icons = {
    mail: Mail,
    phone: Phone,
    message: MessageCircle
  };

  const Icon = icons[iconType];

  const handleClick = (e: React.MouseEvent) => {
    if (variant === 'modal') {
      e.preventDefault();
      onContactClick?.();
    } else if (variant === 'dropdown') {
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
          {showIcon && <Icon className="w-4 h-4" />}
          {children}
        </button>
        
        {isDropdownOpen && (
          <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
            <Link
              href="/contact"
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <Mail className="w-4 h-4" />
              发送邮件
            </Link>
            <Link
              href="tel:+86-400-123-4567"
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <Phone className="w-4 h-4" />
              电话咨询
            </Link>
            <Link
              href="/chat"
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <MessageCircle className="w-4 h-4" />
              在线客服
            </Link>
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={cn(
        'inline-flex items-center gap-2 text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors duration-200',
        className
      )}
    >
      {showIcon && <Icon className="w-4 h-4" />}
      {children}
    </Link>
  );
}