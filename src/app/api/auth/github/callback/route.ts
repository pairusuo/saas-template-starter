import { NextRequest, NextResponse } from 'next/server';
import { getEnvVar } from '@/lib/util/env';
import { exec, queryOne } from '@/lib/db';
import { encryptText } from '@/lib/util/crypto';
import { signJWT } from '@/lib/auth/jwt';

export const runtime = 'edge';

interface GitHubUser { id: number; login: string; name?: string; avatar_url?: string; }

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const stateCookie = req.cookies.get('gh_oauth_state')?.value;
  if (!code || !state || !stateCookie || state !== stateCookie) {
    return NextResponse.json({ error: 'Invalid OAuth state' }, { status: 400 });
  }

  const clientId = await getEnvVar('GITHUB_CLIENT_ID');
  const clientSecret = await getEnvVar('GITHUB_CLIENT_SECRET');
  const appUrl = (await getEnvVar('NEXT_PUBLIC_APP_URL')) || '';
  if (!clientId || !clientSecret || !appUrl) {
    return NextResponse.json({ error: 'Missing GitHub OAuth config' }, { status: 500 });
  }

  // Exchange code for access_token
  const tokenResp = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code, redirect_uri: `${appUrl}/api/auth/github/callback` })
  });
  const tokenJson = await tokenResp.json();
  const accessToken: string | undefined = tokenJson?.access_token;
  if (!accessToken) {
    return NextResponse.json({ error: 'OAuth token exchange failed' }, { status: 400 });
  }

  // Fetch user
  const uResp = await fetch('https://api.github.com/user', { headers: { Authorization: `Bearer ${accessToken}`, Accept: 'application/vnd.github+json' } });
  const user: GitHubUser = await uResp.json();
  // Fetch primary email
  let email = '';
  try {
    const eResp = await fetch('https://api.github.com/user/emails', { headers: { Authorization: `Bearer ${accessToken}`, Accept: 'application/vnd.github+json' } });
    const emails = await eResp.json();
    const primary = Array.isArray(emails) ? emails.find((e: any) => e.primary) : null;
    email = primary?.email || '';
  } catch {}

  if (!user?.id) {
    return NextResponse.json({ error: 'Failed to fetch GitHub user' }, { status: 400 });
  }

  // Upsert user
  const uid = `gh_${user.id}`;
  const exists = await queryOne<{ id: string }>('SELECT id FROM users WHERE id = ?;', [uid]);
  if (exists?.id) {
    await exec('UPDATE users SET github_id = ?, email = ?, name = ?, avatar = ?, updated_at = datetime("now") WHERE id = ?;', [String(user.id), email, user.name || user.login, user.avatar_url || '', uid]);
  } else {
    await exec('INSERT INTO users (id, github_id, email, name, avatar) VALUES (?, ?, ?, ?, ?);', [uid, String(user.id), email, user.name || user.login, user.avatar_url || '']);
  }

  // Optional: store account link (without saving raw token here)
  try {
    // Store encrypted token if present; scope best-effort from response
    const scope = typeof tokenJson?.scope === 'string' && tokenJson.scope ? tokenJson.scope : 'read:user user:email';
    const enc = await encryptText(accessToken);
    await exec('INSERT OR REPLACE INTO accounts(user_id, provider, provider_account_id, access_token_enc, token_scope) VALUES(?, ?, ?, ?, ?);', [uid, 'github', String(user.id), enc, scope]);
  } catch {
    // fallback without token persistence
    await exec('INSERT OR REPLACE INTO accounts(user_id, provider, provider_account_id, token_scope) VALUES(?, ?, ?, ?);', [uid, 'github', String(user.id), 'read:user user:email']);
  }

  // Create JWT session
  const now = Math.floor(Date.now() / 1000);
  const token = await signJWT({ sub: uid, iat: now, exp: now + 60 * 60 * 24 * 30 });

  // Redirect to builder or home
  const locale = 'en'; // could be improved by reading from URL/session
  const redirectTo = `${appUrl}/${locale}/page-builder`;
  const res = NextResponse.redirect(redirectTo);
  res.cookies.set('session', token, { httpOnly: true, secure: true, sameSite: 'lax', path: '/', maxAge: 60 * 60 * 24 * 30 });
  res.cookies.delete('gh_oauth_state');
  return res;
}
