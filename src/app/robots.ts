import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.APP_URL || 'http://localhost:3000';

  return {
    rules: {
      userAgent: '*',
      allow: [
        '/',
        '/en',
        '/zh',
        '/about',
        '/contact',
        '/auth/signin',
        '/auth/signup',
        '/privacy',
        '/terms',
      ],
      disallow: ['/api/', '/dashboard/', '/admin/', '/auth/error'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
