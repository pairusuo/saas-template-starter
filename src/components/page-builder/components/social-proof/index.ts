/**
 * 社会证明组件导出
 */

export { SocialProofAvatars } from './SocialProofAvatars';
export { SocialProofLogos } from './SocialProofLogos';

// 导出该分类的组件列表
export const SOCIAL_PROOF_COMPONENT_IDS = [
  'social-proof-avatars',
  'social-proof-logos',
] as const;

export type SocialProofComponentId = typeof SOCIAL_PROOF_COMPONENT_IDS[number];