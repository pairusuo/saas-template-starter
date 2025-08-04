import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

// Can be imported from a shared config
export const locales = ['en', 'zh'] as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();

  // Load core translation files and component translations
  const [
    common,
    navigation,
    topbar,
    footer,
    errors,
    hero,
    features,
    stats,
    howItWorks,
    whyChooseUs,
    integrations,
    pricing,
    testimonials,
    cta,
    socialProof,
    faq,
    techStack,
    about,
    contact,
    docs,
    examples,
    guides,
    blog,
    careers,
    privacy,
    terms,
    cookies,
  ] = await Promise.all([
    import(`../messages/${locale}/common.json`),
    import(`../messages/${locale}/navigation.json`).catch(() => ({ default: {} })),
    import(`../messages/${locale}/topbar.json`).catch(() => ({ default: {} })),
    import(`../messages/${locale}/footer.json`).catch(() => ({ default: {} })),
    import(`../messages/${locale}/errors.json`).catch(() => ({ default: {} })),
    import(`../messages/${locale}/hero.json`).catch(() => ({ default: {} })),
    import(`../messages/${locale}/features.json`).catch(() => ({ default: {} })),
    import(`../messages/${locale}/stats.json`).catch(() => ({ default: {} })),
    import(`../messages/${locale}/how-it-works.json`).catch(() => ({ default: {} })),
    import(`../messages/${locale}/why-choose-us.json`).catch(() => ({ default: {} })),
    import(`../messages/${locale}/integrations.json`).catch(() => ({ default: {} })),
    import(`../messages/${locale}/pricing.json`).catch(() => ({ default: {} })),
    import(`../messages/${locale}/testimonials.json`).catch(() => ({ default: {} })),
    import(`../messages/${locale}/cta.json`).catch(() => ({ default: {} })),
    import(`../messages/${locale}/social-proof.json`).catch(() => ({ default: {} })),
    import(`../messages/${locale}/faq.json`).catch(() => ({ default: {} })),
    import(`../messages/${locale}/tech-stack.json`).catch(() => ({ default: {} })),
    import(`../messages/${locale}/about.json`).catch(() => ({ default: {} })),
    import(`../messages/${locale}/contact.json`).catch(() => ({ default: {} })),
    import(`../messages/${locale}/docs.json`).catch(() => ({ default: {} })),
    import(`../messages/${locale}/examples.json`).catch(() => ({ default: {} })),
    import(`../messages/${locale}/guides.json`).catch(() => ({ default: {} })),
    import(`../messages/${locale}/blog.json`).catch(() => ({ default: {} })),
    import(`../messages/${locale}/careers.json`).catch(() => ({ default: {} })),
    import(`../messages/${locale}/privacy.json`).catch(() => ({ default: {} })),
    import(`../messages/${locale}/terms.json`).catch(() => ({ default: {} })),
    import(`../messages/${locale}/cookies.json`).catch(() => ({ default: {} })),
  ]);

  return {
    messages: {
      ...common.default,
      navigation: navigation.default,
      topbar: topbar.default,
      footer: footer.default,
      errors: errors.default,
      hero: hero.default,
      features: features.default,
      stats: stats.default,
      'how-it-works': howItWorks.default,
      'why-choose-us': whyChooseUs.default,
      integrations: integrations.default,
      pricing: pricing.default,
      testimonials: testimonials.default,
      cta: cta.default,
      'social-proof': socialProof.default,
      faq: faq.default,
      'tech-stack': techStack.default,
      about: about.default,
      contact: contact.default,
      docs: docs.default,
      examples: examples.default,
      guides: guides.default,
      blog: blog.default,
      careers: careers.default,
      privacy: privacy.default,
      terms: terms.default,
      cookies: cookies.default,
    },
  };
});