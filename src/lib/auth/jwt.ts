// Minimal JWT (HS256) using Web Crypto; no Node-only APIs
// Payload shape kept small: { sub: string, iat: number, exp: number }

import { getEnvVar } from '../util/env';

function base64url(input: ArrayBuffer | Uint8Array | string): string {
  let bytes: Uint8Array;
  if (typeof input === 'string') {
    bytes = new TextEncoder().encode(input);
  } else {
    bytes = input instanceof Uint8Array ? input : new Uint8Array(input);
  }
  const bin = String.fromCharCode(...bytes);
  const b64 = btoa(bin);
  return b64.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

async function importKey(secret: string): Promise<CryptoKey> {
  const keyData = new TextEncoder().encode(secret);
  return crypto.subtle.importKey('raw', keyData, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign', 'verify']);
}

export interface JWTPayload {
  sub: string; // user id
  iat: number;
  exp: number;
}

export async function signJWT(payload: JWTPayload): Promise<string> {
  const header = { alg: 'HS256', typ: 'JWT' };
  const secret = (await getEnvVar('AUTH_SECRET')) || '';
  if (!secret) throw new Error('AUTH_SECRET missing');
  const key = await importKey(secret);
  const enc = new TextEncoder();
  const headerPart = base64url(JSON.stringify(header));
  const payloadPart = base64url(JSON.stringify(payload));
  const data = `${headerPart}.${payloadPart}`;
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(data));
  const sigPart = base64url(new Uint8Array(sig));
  return `${data}.${sigPart}`;
}

export async function verifyJWT(token: string): Promise<JWTPayload | null> {
  const [h, p, s] = token.split('.');
  if (!h || !p || !s) return null;
  const secret = (await getEnvVar('AUTH_SECRET')) || '';
  if (!secret) return null;
  const key = await importKey(secret);
  const enc = new TextEncoder();
  const data = `${h}.${p}`;
  const sigBytes = Uint8Array.from(atob(s.replace(/-/g, '+').replace(/_/g, '/')), (c) => c.charCodeAt(0));
  const ok = await crypto.subtle.verify('HMAC', key, sigBytes, enc.encode(data));
  if (!ok) return null;
  try {
    const json = JSON.parse(new TextDecoder().decode(Uint8Array.from(atob(p.replace(/-/g, '+').replace(/_/g, '/')), (c) => c.charCodeAt(0))));
    if (!json || typeof json !== 'object') return null;
    const now = Math.floor(Date.now() / 1000);
    if (json.exp && now > json.exp) return null;
    return json as JWTPayload;
  } catch {
    return null;
  }
}

