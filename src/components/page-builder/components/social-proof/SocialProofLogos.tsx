'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface SocialProofLogosProps {
  className?: string;
}

export function SocialProofLogos({ className }: SocialProofLogosProps) {
  const t = useTranslations('social-proof');

  const companies = [
    { name: 'TechCorp', logo: '/imgs/companies/logo.svg' },
    { name: 'StartupXYZ', logo: '/imgs/companies/logo.svg' },
    { name: 'InnovateAI', logo: '/imgs/companies/logo.svg' },
    { name: 'CloudFirst', logo: '/imgs/companies/logo.svg' },
  ];

  return (
    <div className={cn('text-center', className)}>
      <p className="text-sm uppercase tracking-wide text-muted-foreground mb-8">
        {t('trustedByCompanies')}
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
        {companies.map((company, idx) => (
          <div key={idx} className="flex flex-col items-center justify-center">
            <Image
              src={company.logo}
              alt={company.name}
              width={128}
              height={48}
              className="object-contain"
            />
            <p className="text-sm text-muted-foreground mt-2">{company.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}