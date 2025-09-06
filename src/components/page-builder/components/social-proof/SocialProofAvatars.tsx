'use client';

import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

interface SocialProofAvatarsProps {
  showRating?: boolean;
  showUserCount?: boolean;
  className?: string;
}

export function SocialProofAvatars({ 
  showRating = true, 
  showUserCount = true, 
  className 
}: SocialProofAvatarsProps) {
  const t = useTranslations('social-proof');

  const users = [
    { name: 'Sarah', avatar: '/imgs/users/1.png' },
    { name: 'David', avatar: '/imgs/users/2.png' },
    { name: 'Emily', avatar: '/imgs/users/3.png' },
    { name: 'Mike', avatar: '/imgs/users/4.png' },
  ];

  return (
    <section className={cn('py-8 sm:py-12', className)}>
      <div className="container mx-auto px-4">
        <div className="text-center">
          {/* 用户头像 */}
          <div className="flex justify-center items-center mb-4 sm:mb-6">
            <div className="flex -space-x-2 sm:-space-x-3">
              {users.map((user, index) => (
                <div
                  key={index}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-background bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground"
                  title={user.name}
                >
                  {user.name.charAt(0)}
                </div>
              ))}
            </div>
          </div>

          {/* 文本内容 */}
          <div className="space-y-2 sm:space-y-3">
            {showRating && (
              <div className="flex items-center justify-center gap-1 text-sm sm:text-base">
                <span className="text-yellow-400">★★★★★</span>
                <span className="text-muted-foreground font-medium">
                  {t('rating.text')}
                </span>
              </div>
            )}
            
            {showUserCount && (
              <p className="text-sm sm:text-base text-muted-foreground">
                {t('userCount.text')}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}