'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { locales } from '@/lib/i18n-config';
import { Home, ArrowRight } from 'lucide-react';

export default function NotFound() {
  const [countdown, setCountdown] = useState(5);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // 检测URL中的语言信息
  const detectLocaleFromPath = () => {
    for (const locale of locales) {
      if (pathname.startsWith(`/${locale}`)) {
        return locale;
      }
    }
    return 'en'; // 默认返回英文
  };

  const getHomePath = () => {
    const detectedLocale = detectLocaleFromPath();
    return detectedLocale === 'en' ? '/' : `/${detectedLocale}`;
  };

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push(getHomePath());
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router, pathname]);

  const handleRedirectNow = () => {
    router.push(getHomePath());
  };

  if (!mounted) {
    return null;
  }

  const detectedLocale = detectLocaleFromPath();
  const isZh = detectedLocale === 'zh';

  // 本地化文本
  const texts = {
    pageNotFoundTitle: isZh ? '页面未找到' : 'Page Not Found',
    pageNotFoundDescription: isZh
      ? '抱歉，您访问的页面不存在或已被移动。'
      : 'Sorry, the page you are looking for does not exist or has been moved.',
    autoRedirectCountdown: isZh ? '自动跳转倒计时' : 'Auto redirect countdown',
    secondsUntilRedirect: isZh ? '秒后自动跳转到首页' : 'seconds until redirect to homepage',
    redirectNow: isZh ? '立即跳转' : 'Go to Homepage',
    goHome: isZh ? '返回首页' : 'Back to Home',
    errorContactSupport: isZh
      ? '如果您认为这是一个错误，请联系我们的技术支持。'
      : 'If you believe this is an error, please contact our support team.',
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#f8fafc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      <div
        style={{
          maxWidth: '28rem',
          width: '100%',
          textAlign: 'center',
        }}
      >
        {/* 404 数字 */}
        <div style={{ marginBottom: '2rem' }}>
          <h1
            style={{
              fontSize: '8rem',
              fontWeight: 'bold',
              color: '#e2e8f0',
              marginBottom: '1rem',
              lineHeight: '1',
            }}
          >
            404
          </h1>
          <h2
            style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: '#1f2937',
              marginBottom: '0.75rem',
            }}
          >
            {texts.pageNotFoundTitle}
          </h2>
          <p
            style={{
              color: '#6b7280',
              lineHeight: '1.6',
            }}
          >
            {texts.pageNotFoundDescription}
          </p>
        </div>

        {/* 倒计时卡片 */}
        <div style={{ marginBottom: '2rem' }}>
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '0.5rem',
              padding: '1.5rem',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
              border: '1px solid #e5e7eb',
            }}
          >
            <p
              style={{
                fontSize: '0.875rem',
                color: '#6b7280',
                marginBottom: '0.75rem',
              }}
            >
              {texts.autoRedirectCountdown}
            </p>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                marginBottom: '1rem',
              }}
            >
              <div
                style={{
                  width: '3rem',
                  height: '3rem',
                  backgroundColor: '#dbeafe',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 'bold',
                    color: '#2563eb',
                  }}
                >
                  {countdown}
                </span>
              </div>
              <span
                style={{
                  color: '#6b7280',
                  fontSize: '0.875rem',
                }}
              >
                {texts.secondsUntilRedirect}
              </span>
            </div>

            {/* 进度条 */}
            <div
              style={{
                width: '100%',
                backgroundColor: '#e5e7eb',
                borderRadius: '9999px',
                height: '0.5rem',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  backgroundColor: '#2563eb',
                  height: '100%',
                  borderRadius: '9999px',
                  width: `${((5 - countdown) / 5) * 100}%`,
                  transition: 'width 1s ease-out',
                }}
              />
            </div>
          </div>
        </div>

        {/* 按钮区域 */}
        <div style={{ marginBottom: '2rem' }}>
          <button
            onClick={handleRedirectNow}
            style={{
              width: '100%',
              height: '3rem',
              backgroundColor: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '0.375rem',
              fontSize: '1rem',
              fontWeight: '500',
              cursor: 'pointer',
              marginBottom: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              transition: 'background-color 0.2s',
            }}
            onMouseOver={(e) => ((e.target as HTMLButtonElement).style.backgroundColor = '#1d4ed8')}
            onMouseOut={(e) => ((e.target as HTMLButtonElement).style.backgroundColor = '#2563eb')}
          >
            <ArrowRight style={{ width: '1rem', height: '1rem' }} />
            {texts.redirectNow}
          </button>

          <a
            href={getHomePath()}
            style={{
              width: '100%',
              height: '3rem',
              border: '1px solid #d1d5db',
              color: '#374151',
              backgroundColor: 'white',
              borderRadius: '0.375rem',
              fontSize: '1rem',
              fontWeight: '500',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              transition: 'background-color 0.2s',
            }}
            onMouseOver={(e) => ((e.target as HTMLAnchorElement).style.backgroundColor = '#f9fafb')}
            onMouseOut={(e) => ((e.target as HTMLAnchorElement).style.backgroundColor = 'white')}
          >
            <Home style={{ width: '1rem', height: '1rem' }} />
            {texts.goHome}
          </a>
        </div>

        {/* 帮助文本 */}
        <div
          style={{
            paddingTop: '1.5rem',
            borderTop: '1px solid #e5e7eb',
          }}
        >
          <p
            style={{
              fontSize: '0.75rem',
              color: '#6b7280',
            }}
          >
            {texts.errorContactSupport}
          </p>
        </div>
      </div>
    </div>
  );
}
