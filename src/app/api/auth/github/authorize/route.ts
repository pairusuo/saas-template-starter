import { NextResponse } from 'next/server';
import { getEnvVar } from '@/lib/util/env';

export const runtime = 'edge';

export async function GET() {
  const clientId = await getEnvVar('GITHUB_CLIENT_ID');
  const appUrl = (await getEnvVar('NEXT_PUBLIC_APP_URL')) || '';
  if (!clientId || !appUrl) {
    return NextResponse.json({ error: 'Missing GitHub OAuth config' }, { status: 500 });
  }
  const redirectUri = `${appUrl}/api/auth/github/callback`;
  const scope = ['read:user', 'user:email'].join(' ');
  const state = crypto.getRandomValues(new Uint8Array(16)).reduce((s, b) => s + b.toString(16).padStart(2, '0'), '');
  const url = new URL('https://github.com/login/oauth/authorize');
  url.searchParams.set('client_id', clientId);
  url.searchParams.set('redirect_uri', redirectUri);
  url.searchParams.set('scope', scope);
  url.searchParams.set('state', state);
  const res = NextResponse.redirect(url.toString());
  res.cookies.set('gh_oauth_state', state, { httpOnly: true, secure: true, sameSite: 'lax', path: '/', maxAge: 300 });
  return res;
}
