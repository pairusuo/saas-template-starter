# Landing Page Configuration

This template provides a highly configurable and modular landing page system. You can easily enable/disable sections and customize their appearance through configuration files.

## Available Sections

- **Hero Section**: Main banner with call-to-action
- **Social Proof Section**: Company logos, stats, and testimonials (disabled by default)
- **Tech Stack Section**: Display technologies used
- **Features Section**: Product features grid/list
- **Testimonials Section**: Customer testimonials
- **Pricing Section**: Pricing plans and comparison
- **FAQ Section**: Frequently asked questions (disabled by default)
- **CTA Section**: Final call-to-action

## Configuration File

The main configuration is located at `src/config/landing.ts`. Each section can be enabled/disabled using the `enabled` property:

```typescript
export const defaultLandingConfig: LandingConfig = {
  hero: {
    enabled: true, // Show hero section
    variant: 'centered',
    // ... other options
  },
  features: {
    enabled: true, // Show features section
    variant: 'grid',
    columns: 4,
    // ... other options
  },
  pricing: {
    enabled: false, // Hide pricing section
    // ... other options
  },
  // ... other sections
};
```

## Quick Setup Examples

### 1. Minimal Landing Page (Hero + CTA only)

```typescript
import { landingConfigPresets } from '@/config/landing';

// Use the minimal preset
export function getLandingConfig() {
  return landingConfigPresets.minimal;
}
```

### 2. Product-focused Page (Hero + Features + Pricing + CTA)

```typescript
export function getLandingConfig() {
  return landingConfigPresets.product;
}
```

### 3. Enable Social Proof and FAQ

```typescript
export function getLandingConfig() {
  return {
    ...defaultLandingConfig,
    // Enable social proof with stats variant
    socialProof: {
      ...defaultLandingConfig.socialProof,
      enabled: true,
      variant: 'stats',
    },
    // Enable FAQ with search functionality
    faq: {
      ...defaultLandingConfig.faq,
      enabled: true,
      variant: 'accordion',
      showSearch: true,
    },
  };
}
```

## New Components

### Social Proof Section

- **Variants**: `stats` (numbers), `logos` (company logos), `testimonials` (quick reviews), `avatars` (user avatars with rating)
- **Configuration**: Show company logos, user count, rating display

### FAQ Section

- **Variants**: `accordion` (expandable items), `grid` (static grid), `tabs` (categorized tabs)
- **Features**: Search functionality, category filtering, two-column layout option

## Environment Variable Control

You can also control sections via environment variables:

```bash
# .env.local
DISABLE_PRICING=true
DISABLE_TESTIMONIALS=true
DISABLE_TECH_STACK=true
```

Then uncomment the environment variable checks in `getLandingConfig()`:

```typescript
export function getLandingConfig(): LandingConfig {
  const configOverrides: Partial<LandingConfig> = {};

  if (process.env.DISABLE_PRICING === 'true') {
    configOverrides.pricing = { ...defaultLandingConfig.pricing, enabled: false };
  }

  if (process.env.DISABLE_TESTIMONIALS === 'true') {
    configOverrides.testimonials = { ...defaultLandingConfig.testimonials, enabled: false };
  }

  return {
    ...defaultLandingConfig,
    ...configOverrides,
  };
}
```

## Section Customization

Each section also supports various display options:

```typescript
features: {
  enabled: true,
  variant: 'grid',           // 'grid' | 'list' | 'tabs' | 'carousel'
  columns: 3,                // 2 | 3 | 4
  showIcons: true,
  iconStyle: 'outline',      // 'outline' | 'filled' | 'duotone'
  layout: 'card',            // 'card' | 'minimal' | 'detailed'
}
```

## Benefits

- **Easy Customization**: Enable/disable sections with a single boolean
- **Flexible Layouts**: Multiple variants for each section
- **Environment Control**: Different configurations for different environments
- **Preset Configurations**: Quick setup for common use cases
- **Type Safety**: Full TypeScript support with proper types
- **Performance**: Only enabled sections are rendered
