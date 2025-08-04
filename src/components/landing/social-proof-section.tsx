import fs from 'fs';
import path from 'path';
import { SocialProofConfig } from '@/config/landing';
import SocialProofSectionClient from './social-proof-section.client';

interface SocialProofSectionProps {
  config: SocialProofConfig & { enabled: boolean };
}

export async function SocialProofSection({ config }: SocialProofSectionProps) {
  if (!config.enabled) return null;

  // Read all image files from the public/imgs/users directory
  const dir = path.join(process.cwd(), 'public', 'imgs', 'users');
  let files: string[] = [];
  try {
    files = fs
      .readdirSync(dir)
      .filter((f) => /\.(png|jpe?g|svg)$/i.test(f))
      .sort();
  } catch {
    files = [];
  }

  // Build a list of URLs, prefer config.avatars, otherwise use the directory scan results
  const avatarsFromFs = files.map((f) => `/imgs/users/${f}`);
  const userImages = config.avatars && config.avatars.length > 0 ? config.avatars : avatarsFromFs;

  return <SocialProofSectionClient config={config} userImages={userImages} />;
}
