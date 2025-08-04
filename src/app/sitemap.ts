import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.APP_URL || 'http://localhost:3000';

  // Get current date for lastModified
  const currentDate = new Date();

  // Define supported locales
  const locales = ['en', 'zh'];

  // Core pages that should be included in sitemap
  const corePages = [
    {
      path: '',
      priority: 1.0,
      changeFreq: 'weekly' as const,
    },
    {
      path: '/about',
      priority: 0.8,
      changeFreq: 'monthly' as const,
    },
    {
      path: '/contact',
      priority: 0.7,
      changeFreq: 'monthly' as const,
    },
    {
      path: '/privacy',
      priority: 0.5,
      changeFreq: 'yearly' as const,
    },
    {
      path: '/terms',
      priority: 0.5,
      changeFreq: 'yearly' as const,
    },
    {
      path: '/auth/signin',
      priority: 0.6,
      changeFreq: 'monthly' as const,
    },
    {
      path: '/auth/signup',
      priority: 0.6,
      changeFreq: 'monthly' as const,
    },
  ];

  // Generate sitemap entries for all locale combinations
  const sitemapEntries: MetadataRoute.Sitemap = [];

  locales.forEach((locale) => {
    corePages.forEach((page) => {
      const url = locale === 'en' ? `${baseUrl}${page.path}` : `${baseUrl}/${locale}${page.path}`;

      sitemapEntries.push({
        url: url,
        lastModified: currentDate,
        changeFrequency: page.changeFreq,
        priority: page.priority,
      });
    });
  });

  return sitemapEntries;
}
