import Link from 'next/link';
import { cn } from '@/lib/utils';

interface LogoProps {
  /** Preset size: header/footer */
  size?: 'header' | 'footer';
  /** Custom width, higher priority than size */
  width?: number;
  /** Custom height, higher priority than size */
  height?: number;
  /** Whether to show text */
  showText?: boolean;
  /** Custom CSS class */
  className?: string;
  /** Click redirect path */
  href?: string;
  /** Whether this is being used for favicon generation */
  asFavicon?: boolean;
}

/**
 * Shared SVG path definitions - ensures React component and string version are completely consistent
 */
const SVG_PATHS = {
  body: '#9333EA', // Purple rocket body
  head: '#EC4899', // Pink rocket head
  windowOuter: 'white', // White window outer ring
  windowInner: '#3B82F6', // Blue window inner ring
  leftWing: '#10B981', // Green left wing
  rightWing: '#F59E0B', // Orange right wing
  flameOuter: '#EF4444', // Red flame outer layer
  flameInner: '#F97316', // Orange flame inner layer
};

/**
 * Logo SVG content - shared between Logo component and favicon
 */
export function LogoSVG({
  width = 32,
  height = 32,
  className,
}: {
  width?: number;
  height?: number;
  className?: string;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="SaaS Template Logo"
    >
      {/* Rainbow rocket with colorful design */}
      <rect x="14" y="4" width="4" height="16" fill={SVG_PATHS.body} />
      <polygon points="16,2 12,8 20,8" fill={SVG_PATHS.head} />
      <circle cx="16" cy="10" r="2" fill={SVG_PATHS.windowOuter} />
      <circle cx="16" cy="10" r="1" fill={SVG_PATHS.windowInner} />
      <polygon points="12,16 8,20 10,22 12,20" fill={SVG_PATHS.leftWing} />
      <polygon points="20,16 20,20 22,22 24,20" fill={SVG_PATHS.rightWing} />
      <polygon points="13,20 14,26 16,24 18,26 19,20" fill={SVG_PATHS.flameOuter} />
      <polygon points="14,24 15,28 16,26 17,28 18,24" fill={SVG_PATHS.flameInner} />
    </svg>
  );
}

/**
 * Get SVG string for favicon generation
 * Uses the same constants to ensure complete consistency with React component
 */
export function getLogoSvgString(): string {
  return `<svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
  <rect x="14" y="4" width="4" height="16" fill="${SVG_PATHS.body}" />
  <polygon points="16,2 12,8 20,8" fill="${SVG_PATHS.head}" />
  <circle cx="16" cy="10" r="2" fill="${SVG_PATHS.windowOuter}" />
  <circle cx="16" cy="10" r="1" fill="${SVG_PATHS.windowInner}" />
  <polygon points="12,16 8,20 10,22 12,20" fill="${SVG_PATHS.leftWing}" />
  <polygon points="20,16 20,20 22,22 24,20" fill="${SVG_PATHS.rightWing}" />
  <polygon points="13,20 14,26 16,24 18,26 19,20" fill="${SVG_PATHS.flameOuter}" />
  <polygon points="14,24 15,28 16,26 17,28 18,24" fill="${SVG_PATHS.flameInner}" />
</svg>`;
}

/**
 * Logo component with rainbow rocket design
 */
export function Logo({
  size = 'header',
  width,
  height,
  showText = true,
  className,
  href = '/',
  ...props
}: LogoProps) {
  // Calculate logo size
  const defaultSize = size === 'header' ? 32 : 64;
  const logoWidth = width || defaultSize;
  const logoHeight = height || defaultSize;

  return (
    <Link
      href={href}
      className={cn('flex items-center space-x-2 hover:opacity-80 transition-opacity', className)}
      {...props}
    >
      <LogoSVG width={logoWidth} height={logoHeight} className="object-contain" />
      {showText && <span className="font-bold text-xl text-foreground">SaaS Template</span>}
    </Link>
  );
}
