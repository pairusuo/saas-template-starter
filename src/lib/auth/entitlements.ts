import { queryOne } from '@/lib/db';

export async function hasBuilderAccess(userId: string): Promise<boolean> {
  if (!userId) return false;
  const row = await queryOne<{ user_id: string }>(
    'SELECT user_id FROM entitlements WHERE user_id = ? AND feature_key = ? LIMIT 1;',
    [userId, 'builder_access']
  );
  return !!row;
}

