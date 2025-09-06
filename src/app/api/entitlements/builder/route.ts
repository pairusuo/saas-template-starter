import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { verifyJWT } from '@/lib/auth/jwt';
import { hasBuilderAccess } from '@/lib/auth/entitlements';

export const runtime = 'edge';

export async function GET() {
  const token = cookies().get('session')?.value;
  if (!token) return NextResponse.json({ ok: false, reason: 'unauthenticated' }, { status: 401 });
  const payload = await verifyJWT(token);
  if (!payload) return NextResponse.json({ ok: false, reason: 'invalid_session' }, { status: 401 });
  const ok = await hasBuilderAccess(payload.sub);
  return NextResponse.json({ ok });
}

