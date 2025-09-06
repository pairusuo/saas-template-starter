import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { locales } from '@/lib/i18n-config';

export default getRequestConfig(async ({ requestLocale }) => {
  // Use the new API to get locale without recursion
  const currentLocale = (await requestLocale) as string;

  // Validate locale
  if (!locales.includes(currentLocale as any)) notFound();
  
  // Define all namespaces, makes it easier to add new ones
  const namespaces = [
    'navigation', 'topbar', 'footer', 'errors', 'hero', 'pricing',
    'how-it-works', 'why-choose-us', 'integrations', 'tech-stack', 'homepage', 'about',
    'docs', 'examples', 'guides', 'blog', 'careers', 'privacy', 'terms', 'cookies', 'contact',
    // Additional UI namespaces
    'language', 'header'
  ];

  // Define page-builder namespaces (files moved to page-builder subdirectory)
  const pageBuilderNamespaces = [
    'header-basic', 'footer-basic', 'footer-advanced', 'hero-simple', 'hero-centered', 'components-showcase', 
    'basic-components', 'advanced-components', 'custom-components', 'page-builder', 'pricing-cards',
    'cta', 'features', 'testimonials', 'faq', 'stats', 'social-proof', 'contact'
  ];

  // Load core translation file and all namespace files
  const [common, ...namespaceMessages] = await Promise.all([
    import(`../messages/${currentLocale}/common.json`),
    ...namespaces.map(ns => 
      import(`../messages/${currentLocale}/${ns}.json`).catch(() => ({ default: {} }))
    ),
    ...pageBuilderNamespaces.map(ns => 
      import(`../messages/page-builder/${currentLocale}/${ns}.json`).catch(() => ({ default: {} }))
    )
  ]);

  // Construct the messages object dynamically
  const messages = namespaceMessages.reduce((acc, module, index) => {
    let namespace;
    if (index < namespaces.length) {
      namespace = namespaces[index];
    } else {
      const ns = pageBuilderNamespaces[index - namespaces.length];
      // Avoid namespace collision with core 'contact'
      namespace = ns === 'contact' ? 'pb-contact' : ns;
    }
    if (namespace) {
      acc[namespace] = module.default;
    }
    return acc;
  }, {} as Record<string, any>);

  return {
    locale: currentLocale,
    messages: {
      ...common.default,
      ...messages,
    },
  };
});
