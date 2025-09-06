import { NextRequest, NextResponse } from 'next/server';
import { verifyJWT } from '@/lib/auth/jwt';
import { hasBuilderAccess } from '@/lib/auth/entitlements';

export interface GuardResult {
  ok: boolean;
  res?: NextResponse;
  userId?: string;
}

/**
 * Guard for routes that require builder access entitlement.
 * Works in Edge runtime. In case D1 is not available, returns 503.
 */
export async function requireBuilderAccess(req: NextRequest): Promise<GuardResult> {
  try {
    const token = req.cookies.get('session')?.value || '';
    const payload = token ? await verifyJWT(token) : null;
    const userId = payload?.sub || '';
    if (!userId) {
      return {
        ok: false,
        res: NextResponse.json({ error: 'unauthenticated' }, { status: 401 })
      };
    }
    const allowed = await hasBuilderAccess(userId);
    if (!allowed) {
      return {
        ok: false,
        res: NextResponse.json({ error: 'forbidden' }, { status: 403 })
      };
    }
    return { ok: true, userId };
  } catch (e: any) {
    return {
      ok: false,
      res: NextResponse.json({ error: 'service_unavailable', detail: e?.message || '' }, { status: 503 })
    };
  }
}

