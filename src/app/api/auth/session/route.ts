import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { verifyJWT } from '@/lib/auth/jwt';

export const runtime = 'edge';

export async function GET() {
  const token = cookies().get('session')?.value;
  if (!token) return NextResponse.json({ user: null });
  const payload = await verifyJWT(token);
  if (!payload) return NextResponse.json({ user: null });
  return NextResponse.json({ user: { id: payload.sub } });
}

