import { HeroSection } from '@/components/landing/hero-section';
import { SocialProofSection } from '@/components/landing/social-proof-section';
import { TechStackSection } from '@/components/landing/tech-stack-section';
import { FeaturesSection } from '@/components/landing/features-section';
import { PricingSection } from '@/components/landing/pricing-section';
import { TestimonialsSection } from '@/components/landing/testimonials-section';
import { CTASection } from '@/components/landing/cta-section';
import { FAQSection } from '@/components/landing/faq-section';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { getLandingConfig } from '@/config/landing';

export default function HomePage() {
  const landingConfig = getLandingConfig();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {landingConfig.hero.enabled && <HeroSection config={landingConfig.hero} />}
        {landingConfig.socialProof.enabled && (
          <SocialProofSection config={landingConfig.socialProof} />
        )}
        {landingConfig.techStack.enabled && <TechStackSection config={landingConfig.techStack} />}
        {landingConfig.features.enabled && <FeaturesSection config={landingConfig.features} />}
        {landingConfig.testimonials.enabled && (
          <TestimonialsSection config={landingConfig.testimonials} />
        )}
        {landingConfig.pricing.enabled && <PricingSection config={landingConfig.pricing} />}
        {landingConfig.faq.enabled && <FAQSection config={landingConfig.faq} />}
        {landingConfig.cta.enabled && <CTASection config={landingConfig.cta} />}
      </main>
      <Footer />
    </div>
  );
}
