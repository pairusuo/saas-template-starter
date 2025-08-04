import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, defaultLocale } from '@/lib/i18n-config';

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Validate that the incoming `locale` parameter is valid
  if (!locale || !locales.includes(locale as any)) {
    // Use the default locale if no valid locale is provided
    locale = defaultLocale;
  }

  // Load core translation files for landing page
  const [
    common,
    navigation,
    footer,
    errors,
    landing,
    pricing,
    about,
    contact,
    docs,
    examples,
    guides,
    careers,
    privacy,
    terms,
    cookies,
    blog,
  ] = await Promise.all([
    import(`../messages/${locale}/common.json`),
    import(`../messages/${locale}/navigation.json`).catch(() => ({ default: {} })),
    import(`../messages/${locale}/footer.json`).catch(() => ({ default: {} })),
    import(`../messages/${locale}/errors.json`).catch(() => ({ default: {} })),
    import(`../messages/${locale}/landing.json`).catch(() => ({ default: {} })),
    import(`../messages/${locale}/pricing.json`).catch(() => ({ default: {} })),
    import(`../messages/${locale}/about.json`).catch(() => ({ default: {} })),
    import(`../messages/${locale}/contact.json`).catch(() => ({ default: {} })),
    import(`../messages/${locale}/docs.json`).catch(() => ({ default: {} })),
    import(`../messages/${locale}/examples.json`).catch(() => ({ default: {} })),
    import(`../messages/${locale}/guides.json`).catch(() => ({ default: {} })),
    import(`../messages/${locale}/careers.json`).catch(() => ({ default: {} })),
    import(`../messages/${locale}/privacy.json`).catch(() => ({ default: {} })),
    import(`../messages/${locale}/terms.json`).catch(() => ({ default: {} })),
    import(`../messages/${locale}/cookies.json`).catch(() => ({ default: {} })),
    import(`../messages/${locale}/blog.json`).catch(() => ({ default: {} })),
  ]);

  // Create a single dictionary of all messages
  const coreMessages = {
    ...common.default,
    navigation: navigation.default,
    footer: footer.default,
    errors: errors.default,
    landing: landing.default,
    pricing: pricing.default,
    about: about.default,
    contact: contact.default,
    docs: docs.default,
    examples: examples.default,
    guides: guides.default,
    careers: careers.default,
    privacy: privacy.default,
    terms: terms.default,
    cookies: cookies.default,
    blog: blog.default,
  };

  return {
    locale,
    messages: coreMessages,
  };
});
