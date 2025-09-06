import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { 
  ContactLink, 
  AboutLink, 
  CareerLink, 
  BlogLink, 
  PricingLink, 
  SupportLink 
} from '@/components/navigation';
import { SocialGroup, type SocialConfig } from '@/components/social';

interface FooterEnhancedProps {
  showSocialStats?: boolean;
  socialConfigs?: SocialConfig[];
  showJobCount?: boolean;
  jobCount?: number;
}

export function FooterEnhanced({
  showSocialStats = false,
  socialConfigs = [
    { platform: 'github', href: 'https://github.com/your-org', showStats: true, statCount: 1200 },
    { platform: 'twitter', href: 'https://twitter.com/your-handle', showStats: true, statCount: 5600 },
    { platform: 'linkedin', href: 'https://linkedin.com/company/your-company' },
    { platform: 'youtube', href: 'https://youtube.com/@your-channel', showStats: true, statCount: 8900 }
  ],
  showJobCount = false,
  jobCount = 0
}: FooterEnhancedProps) {
  const t = useTranslations('footer');

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 公司信息 */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600" />
              <span className="font-bold text-xl">SaaS Template</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              现代化的 SaaS 应用模板，帮助开发者快速构建高质量的产品。
            </p>
            
            {/* 社交媒体链接 */}
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100">关注我们</h4>
              <SocialGroup 
                socials={socialConfigs.map(config => ({
                  ...config,
                  showStats: showSocialStats && config.showStats
                }))}
                variant="colored"
                size="md"
                spacing="normal"
              />
            </div>
          </div>

          {/* 产品链接 */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900 dark:text-gray-100">产品</h4>
            <div className="space-y-3 text-sm">
              <div className="block">
                <PricingLink showPromoBadge={true} promoText="限时优惠" />
              </div>
              <Link href="/features" className="block text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                功能特性
              </Link>
              <Link href="/integrations" className="block text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                集成服务
              </Link>
              <Link href="/api" className="block text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                API 文档
              </Link>
            </div>
          </div>

          {/* 公司链接 */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900 dark:text-gray-100">公司</h4>
            <div className="space-y-3 text-sm">
              <div className="block">
                <AboutLink />
              </div>
              <div className="block">
                <CareerLink 
                  showJobCount={showJobCount}
                  jobCount={jobCount}
                />
              </div>
              <div className="block">
                <BlogLink showNewBadge={true} hasNewPosts={true} />
              </div>
              <Link href="/press" className="block text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                媒体报道
              </Link>
            </div>
          </div>

          {/* 支持链接 */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900 dark:text-gray-100">支持</h4>
            <div className="space-y-3 text-sm">
              <div className="block">
                <SupportLink showOnlineStatus={true} isOnline={true} />
              </div>
              <div className="block">
                <ContactLink variant="modal" />
              </div>
              <Link href="/help" className="block text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                帮助中心
              </Link>
              <Link href="/status" className="block text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                服务状态
              </Link>
            </div>
          </div>
        </div>

        {/* 底部版权信息 */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              © 2024 SaaS Template. 保留所有权利。
            </div>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                隐私政策
              </Link>
              <Link href="/terms" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                服务条款
              </Link>
              <Link href="/cookies" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                Cookie 政策
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}