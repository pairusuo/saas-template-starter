import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

// Landing Page
export interface LandingConfig {
  hero: HeroConfig & { enabled: boolean };
  features: FeaturesConfig & { enabled: boolean };
  techStack: TechStackConfig & { enabled: boolean };
  socialProof: SocialProofConfig & { enabled: boolean };
  stats: StatsConfig & { enabled: boolean };
  howItWorks: HowItWorksConfig & { enabled: boolean };
  whyChooseUs: WhyChooseUsConfig & { enabled: boolean };
  integrations: IntegrationsConfig & { enabled: boolean };
  pricing: PricingConfig & { enabled: boolean };
  testimonials: TestimonialsConfig & { enabled: boolean };
  faq: FAQConfig & { enabled: boolean };
  cta: CTAConfig & { enabled: boolean };
}

// Hero
export interface HeroConfig {
  variant: 'default' | 'centered' | 'split' | 'video';
  showStats: boolean;
  showSocialProof: boolean;
  backgroundVariant: 'default' | 'gradient' | 'pattern' | 'video';
  ctaButtons: {
    primary: boolean;
    secondary: boolean;
    tertiary?: boolean;
  };
}

// Features
export interface FeaturesConfig {
  variant: 'grid' | 'list' | 'tabs' | 'carousel';
  columns: 2 | 3 | 4;
  showIcons: boolean;
  iconStyle: 'outline' | 'filled' | 'duotone';
  layout: 'card' | 'minimal' | 'detailed';
}

// Tech Stack
export interface TechStackConfig {
  variant: 'grid' | 'carousel' | 'logos' | 'detailed';
  showDescriptions: boolean;
  animateOnHover: boolean;
  layout: 'compact' | 'expanded';
}

// Social Proof Config
export interface SocialProofConfig {
  variant: 'logos' | 'testimonials' | 'stats' | 'avatars';
  showCompanyLogos: boolean;
  showUserCount: boolean;
  showRating: boolean;
  /** Controls whether to show the title */
  showTitle?: boolean;
  /** Controls whether to show the subtitle */
  showSubtitle?: boolean;
  /** Controls whether to show the stats module */
  showStats?: boolean;
  // showLogos is deprecated; use showCompanyLogos instead
  /** Controls whether to show the testimonials module */
  showTestimonials?: boolean;
  /** Controls whether to show the avatars module */
  showAvatars?: boolean;
  // Custom avatars array, used if provided
  avatars?: string[];
  // Number of avatars to generate when avatars is not provided
  avatarCount?: number;
}

// Pricing Config
export interface PricingConfig {
  variant: 'cards' | 'table' | 'toggle' | 'comparison';
  showFeatureComparison: boolean;
  highlightPopular: boolean;
  showAnnualDiscount: boolean;
  layout: 'horizontal' | 'vertical';
}

// Testimonials Config
export interface TestimonialsConfig {
  variant: 'grid' | 'carousel' | 'wall' | 'featured';
  showAvatars: boolean;
  showCompany: boolean;
  showRating: boolean;
  autoplay: boolean;
}

// FAQ Config
export interface FAQConfig {
  variant: 'accordion' | 'grid' | 'tabs';
  showSearch: boolean;
  showCategories: boolean;
  layout: 'single-column' | 'two-column';
}

// Stats Config
export interface StatsConfig {
  variant: 'default' | 'compact' | 'detailed';
  showBadge: boolean;
}

// How It Works Config
export interface HowItWorksConfig {
  variant: 'steps' | 'timeline' | 'cards';
  showCTA: boolean;
}

// Why Choose Us Config
export interface WhyChooseUsConfig {
  variant: 'grid' | 'list' | 'featured';
  columns: 2 | 3 | 4;
  showIcons: boolean;
}

// Integrations Config
export interface IntegrationsConfig {
  variant: 'logos' | 'grid' | 'carousel';
  showDescriptions: boolean;
}

// CTA Config
export interface CTAConfig {
  variant: 'simple' | 'split' | 'banner' | 'modal';
  showSecondaryAction: boolean;
  backgroundVariant: 'default' | 'gradient' | 'image';
  position: 'section' | 'floating' | 'sticky';
}

// Feature Config
export interface FeatureItem {
  icon: LucideIcon | string;
  titleKey: string;
  descriptionKey: string;
  href?: string;
  badge?: string;
}

// Tech Stack Config
export interface TechStackItem {
  name: string;
  icon: string | ReactNode;
  descriptionKey: string;
  href?: string;
  category?: string;
}

// Default Landing Config
export const defaultLandingConfig: LandingConfig = {
  hero: {
    enabled: true,
    variant: 'centered',
    showStats: true,
    showSocialProof: true,
    backgroundVariant: 'gradient',
    ctaButtons: {
      primary: true,
      secondary: true,
    },
  },
  features: {
    enabled: true,
    variant: 'grid',
    columns: 4,
    showIcons: true,
    iconStyle: 'outline',
    layout: 'card',
  },
  techStack: {
    enabled: true,
    variant: 'grid',
    showDescriptions: true,
    animateOnHover: true,
    layout: 'compact',
  },
  socialProof: {
    enabled: true,
    variant: 'avatars',
    showCompanyLogos: true,
    showUserCount: true,
    showRating: true,
    showTitle: true,
    showSubtitle: true,
    showStats: true,
    showTestimonials: true,
    showAvatars: true,
    avatarCount: 8,
  },
  stats: {
    enabled: true,
    variant: 'default',
    showBadge: true,
  },
  howItWorks: {
    enabled: true,
    variant: 'steps',
    showCTA: true,
  },
  whyChooseUs: {
    enabled: true,
    variant: 'grid',
    columns: 4,
    showIcons: true,
  },
  integrations: {
    enabled: true,
    variant: 'logos',
    showDescriptions: false,
  },
  pricing: {
    enabled: true,
    variant: 'cards',
    showFeatureComparison: true,
    highlightPopular: true,
    showAnnualDiscount: false,
    layout: 'horizontal',
  },
  testimonials: {
    enabled: true,
    variant: 'grid',
    showAvatars: true,
    showCompany: true,
    showRating: true,
    autoplay: false,
  },
  faq: {
    enabled: true,
    variant: 'accordion',
    showSearch: true,
    showCategories: false,
    layout: 'single-column',
  },
  cta: {
    enabled: true,
    variant: 'simple',
    showSecondaryAction: true,
    backgroundVariant: 'default',
    position: 'section',
  },
};

// Obtain the actual configuration (which can be dynamically overridden from the environment, database, etc.)
export function getLandingConfig(): LandingConfig {
  const configOverrides: Partial<LandingConfig> = {};
  return {
    ...defaultLandingConfig,
    ...configOverrides,
  };
}

// Preset Config
export const landingConfigPresets = {
  minimal: {
    ...defaultLandingConfig,
    techStack: { ...defaultLandingConfig.techStack, enabled: false },
    features: { ...defaultLandingConfig.features, enabled: false },
    testimonials: { ...defaultLandingConfig.testimonials, enabled: false },
    pricing: { ...defaultLandingConfig.pricing, enabled: false },
  },
  product: {
    ...defaultLandingConfig,
    techStack: { ...defaultLandingConfig.techStack, enabled: false },
    testimonials: { ...defaultLandingConfig.testimonials, enabled: false },
  },
  full: {
    ...defaultLandingConfig,
    socialProof: { ...defaultLandingConfig.socialProof, enabled: true, variant: 'stats' },
    faq: { ...defaultLandingConfig.faq, enabled: true, variant: 'accordion', showSearch: true },
  },
} as const;
