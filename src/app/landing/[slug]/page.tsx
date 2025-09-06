/**
 * 动态 Landing Page 路由
 * 根据 slug 渲染对应的 landing page
 */

import { notFound } from 'next/navigation';
export const runtime = 'edge';
import { LandingPagePublisher, LandingPageAnalytics } from '@/lib/landing-page-publisher';
import { ComponentRenderer } from '@/components/page-builder/ComponentRenderer';
import { headers } from 'next/headers';

interface LandingPageProps {
  params: {
    slug: string;
  };
  searchParams: {
    preview?: string;
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
  };
}

export default async function LandingPage({
  params: { slug },
  searchParams
}: LandingPageProps) {
  // 1. 获取页面配置
  const landingPage = await LandingPagePublisher.getLandingPage(slug);
  
  if (!landingPage) {
    notFound();
  }

  // 2. 检查是否已发布（除非是预览模式）
  const isPreview = searchParams.preview === 'true';
  if (!landingPage.isPublished && !isPreview) {
    notFound();
  }

  // 3. 记录页面访问（非预览模式）
  if (!isPreview) {
    const headersList = headers();
    const userAgent = headersList.get('user-agent') || '';
    const referer = headersList.get('referer') || '';
    
    await LandingPageAnalytics.recordPageView(slug, {
      userAgent,
      referer,
      utmSource: searchParams.utm_source,
      utmMedium: searchParams.utm_medium,
      utmCampaign: searchParams.utm_campaign
    });
  }

  // 4. 渲染页面
  return (
    <div className="min-h-screen">
      {/* 预览模式提示 */}
      {isPreview && (
        <div className="bg-yellow-500 text-white px-4 py-2 text-center text-sm">
          预览模式 - 此页面尚未发布
        </div>
      )}

      {/* 动态渲染组件 */}
      {landingPage.config.components.map((component) => (
        <ComponentRenderer
          key={component.id}
          component={component}
          isPreview={isPreview}
        />
      ))}

      {/* 页面底部的分析代码（可选） */}
      {!isPreview && process.env.GOOGLE_ANALYTICS_ID && (
        <script
          dangerouslySetInnerHTML={{
            __html: `
              gtag('config', '${process.env.GOOGLE_ANALYTICS_ID}', {
                page_title: '${landingPage.title}',
                page_location: window.location.href,
                custom_map: {
                  'landing_page_slug': '${slug}'
                }
              });
            `
          }}
        />
      )}
    </div>
  );
}

// 为SEO生成元数据
export async function generateMetadata({
  params: { slug }
}: LandingPageProps) {
  const landingPage = await LandingPagePublisher.getLandingPage(slug);
  
  if (!landingPage) {
    return {
      title: 'Page Not Found',
      description: 'The requested page was not found.'
    };
  }

  return {
    title: landingPage.title,
    description: landingPage.description || `${landingPage.title} - Landing Page`,
    openGraph: {
      title: landingPage.title,
      description: landingPage.description,
      type: 'website',
      url: `${process.env.NEXT_PUBLIC_APP_URL}/landing/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: landingPage.title,
      description: landingPage.description,
    },
    robots: landingPage.isPublished ? 'index,follow' : 'noindex,nofollow'
  };
}
