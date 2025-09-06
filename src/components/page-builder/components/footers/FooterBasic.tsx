'use client';

import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

interface LinkItem {
  label: string;
  href: string;
}

interface SocialLink {
  platform: string;
  href: string;
}

interface FooterBasicProps {
  companyName?: string;
  description?: string;
  links?: LinkItem[];
  socialLinks?: SocialLink[];
  copyright?: string;
  className?: string;
}

export function FooterBasic({ 
  companyName,
  description,
  links,
  socialLinks,
  copyright,
  className 
}: FooterBasicProps) {
  const t = useTranslations('footer-basic');
  
  // 从翻译文件中获取嵌套的数据
  const footerData = t.raw('footer-basic') as any;
  
  // 临时默认数据，以防翻译无法访问
  const defaultLinks = [
    { label: 'Product', href: '#product' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' }
  ];
  
  // 使用传入的props或从翻译文件获取默认值
  const finalCompanyName = companyName || footerData?.companyName || 'SaaS Template';
  const finalDescription = description || footerData?.description || 'Build modern SaaS applications';
  const linksFromI18n = footerData?.links || defaultLinks;
  const finalLinks = links || (Array.isArray(linksFromI18n) ? linksFromI18n : defaultLinks);
  const socialLinksFromI18n = footerData?.socialLinks || [];
  const finalSocialLinks = socialLinks || (Array.isArray(socialLinksFromI18n) ? socialLinksFromI18n : []);
  const finalCopyright = copyright || footerData?.copyright || `© ${new Date().getFullYear()} SaaS Template. All rights reserved.`;
  const finalQuickLinksTitle = footerData?.quickLinksTitle || 'Quick Links';
  const finalContactTitle = footerData?.contactTitle || 'Contact Us';
  const finalContactEmail = footerData?.contactEmail || 'Email: hello@saastemplate.com';
  const finalContactPhone = footerData?.contactPhone || 'Phone: +1 (555) 123-4567';
  const finalContactAddress = footerData?.contactAddress || 'Address: San Francisco, CA';
  
  return (
    <footer className={cn('bg-muted/30 border-t', className)}>
      {/* 移动端：垂直堆叠布局 */}
      <div className="md:hidden">
        {/* 移动端公司信息 */}
        <div className="px-4 py-8 text-center border-b border-muted/50">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">S</span>
            </div>
            <span className="font-bold text-2xl">{finalCompanyName}</span>
          </div>
          <p className="text-base text-muted-foreground leading-relaxed max-w-sm mx-auto">
            {finalDescription}
          </p>
        </div>

        {/* 移动端社交媒体 */}
        {finalSocialLinks.length > 0 && (
          <div className="px-4 py-6 border-b border-muted/50">
            <div className="flex justify-center space-x-8">
              {finalSocialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="text-base text-muted-foreground hover:text-foreground transition-colors font-medium"
                >
                  {social.platform}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* 移动端快速链接 */}
        <div className="px-4 py-6 border-b border-muted/50">
          <h3 className="font-semibold text-lg text-center mb-4">{finalQuickLinksTitle}</h3>
          <div className="grid grid-cols-2 gap-3">
            {finalLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="text-center py-3 px-4 rounded-lg bg-background/50 hover:bg-background/80 transition-colors text-base font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* 移动端联系信息 */}
        <div className="px-4 py-6 border-b border-muted/50">
          <h3 className="font-semibold text-lg text-center mb-4">{finalContactTitle}</h3>
          <div className="space-y-3">
            <div className="py-3 px-4 rounded-lg bg-background/50 text-center">
              <p className="text-base text-muted-foreground break-all">{finalContactEmail}</p>
            </div>
            <div className="py-3 px-4 rounded-lg bg-background/50 text-center">
              <p className="text-base text-muted-foreground">{finalContactPhone}</p>
            </div>
            <div className="py-3 px-4 rounded-lg bg-background/50 text-center">
              <p className="text-base text-muted-foreground break-words">{finalContactAddress}</p>
            </div>
          </div>
        </div>

        {/* 移动端版权信息 */}
        <div className="px-4 py-6 text-center">
          <p className="text-sm text-muted-foreground">{finalCopyright}</p>
        </div>
      </div>

      {/* 桌面端：网格布局 */}
      <div className="hidden md:block">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {/* 公司信息：在平板占满一行，桌面占两列 */}
            <div className="md:col-span-2 lg:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">S</span>
                </div>
                <span className="font-bold text-xl">{finalCompanyName}</span>
              </div>
              <p className="text-muted-foreground mb-4 max-w-2xl md:max-w-full">
                {finalDescription}
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                {finalSocialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {social.platform}
                  </a>
                ))}
              </div>
            </div>

            {/* 快速链接 */}
            <div className="md:mt-2">
              <h3 className="font-semibold mb-4">{finalQuickLinksTitle}</h3>
              <ul className="space-y-2">
                {finalLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* 联系信息 */}
            <div className="md:mt-2">
              <h3 className="font-semibold mb-4">{finalContactTitle}</h3>
              <div className="space-y-2 text-muted-foreground">
                <p className="break-all">{finalContactEmail}</p>
                <p>{finalContactPhone}</p>
                <p className="break-words">{finalContactAddress}</p>
              </div>
            </div>
          </div>

          {/* 桌面端版权信息 */}
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p className="text-sm">{finalCopyright}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}