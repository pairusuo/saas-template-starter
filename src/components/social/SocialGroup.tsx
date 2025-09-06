import React from 'react';
import { cn } from '@/lib/utils';
import { GitHubSocial } from './GitHubSocial';
import { TwitterSocial } from './TwitterSocial';
import { LinkedInSocial } from './LinkedInSocial';
import { InstagramSocial } from './InstagramSocial';
import { YouTubeSocial } from './YouTubeSocial';
import { RedditSocial } from './RedditSocial';

export type SocialPlatform = 'github' | 'twitter' | 'linkedin' | 'instagram' | 'youtube' | 'reddit';

export interface SocialConfig {
  platform: SocialPlatform;
  href: string;
  showStats?: boolean;
  statCount?: number;
}

interface SocialGroupProps {
  socials: SocialConfig[];
  variant?: 'default' | 'colored' | 'minimal';
  size?: 'sm' | 'md' | 'lg';
  spacing?: 'tight' | 'normal' | 'loose';
  className?: string;
  onSocialClick?: (platform: SocialPlatform) => void;
}

export function SocialGroup({
  socials,
  variant = 'default',
  size = 'md',
  spacing = 'normal',
  className,
  onSocialClick
}: SocialGroupProps) {
  const spacingClasses = {
    tight: 'gap-2',
    normal: 'gap-4',
    loose: 'gap-6'
  };

  const renderSocial = (social: SocialConfig) => {
    const commonProps = {
      href: social.href,
      size,
      onClick: () => onSocialClick?.(social.platform)
    };

    const getVariant = () => {
      if (variant === 'colored') {
        switch (social.platform) {
          case 'github': return 'dark';
          case 'twitter': return 'blue';
          case 'linkedin': return 'business';
          case 'instagram': return 'gradient';
          case 'youtube': return 'red';
          case 'reddit': return 'orange';
          default: return 'default';
        }
      }
      return variant;
    };

    switch (social.platform) {
      case 'github':
        return (
          <GitHubSocial
            key={social.platform}
            {...commonProps}
            variant={getVariant() as any}
            showStars={social.showStats}
            starCount={social.statCount}
          />
        );
      case 'twitter':
        return (
          <TwitterSocial
            key={social.platform}
            {...commonProps}
            variant={getVariant() as any}
            showFollowers={social.showStats}
            followerCount={social.statCount}
          />
        );
      case 'linkedin':
        return (
          <LinkedInSocial
            key={social.platform}
            {...commonProps}
            variant={getVariant() as any}
          />
        );
      case 'instagram':
        return (
          <InstagramSocial
            key={social.platform}
            {...commonProps}
            variant={getVariant() as any}
          />
        );
      case 'youtube':
        return (
          <YouTubeSocial
            key={social.platform}
            {...commonProps}
            variant={getVariant() as any}
            showSubscribers={social.showStats}
            subscriberCount={social.statCount}
          />
        );
      case 'reddit':
        return (
          <RedditSocial
            key={social.platform}
            {...commonProps}
            variant={getVariant() as any}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={cn('flex items-center', spacingClasses[spacing], className)}>
      {socials.map(renderSocial)}
    </div>
  );
}