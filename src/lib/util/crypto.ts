// WebCrypto-based symmetric encryption for storing OAuth tokens
// AES-GCM with key derived from AUTH_SECRET

import { getEnvVar } from './env';

async function getKey(): Promise<CryptoKey> {
  const secret = (await getEnvVar('AUTH_SECRET')) || '';
  if (!secret) throw new Error('AUTH_SECRET missing');
  const salt = new TextEncoder().encode('gh_token_salt_v1');
  const base = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), 'PBKDF2', false, ['deriveKey']);
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' },
    base,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

function b64(input: ArrayBuffer | Uint8Array): string {
  const bytes = input instanceof Uint8Array ? input : new Uint8Array(input);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

function b64decode(str: string): Uint8Array {
  const bin = atob(str);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

export async function encryptText(plain: string): Promise<string> {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await getKey();
  const msg = new TextEncoder().encode(plain);
  const ab = msg.buffer.slice(msg.byteOffset, msg.byteOffset + msg.byteLength);
  const ct = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, ab);
  return `${b64(iv)}:${b64(new Uint8Array(ct))}`;
}

export async function decryptText(enc: string): Promise<string> {
  const [ivB64, dataB64] = enc.split(':');
  if (!ivB64 || !dataB64) throw new Error('invalid_ciphertext');
  const ivArr = b64decode(ivB64);
  const data = b64decode(dataB64);
  const key = await getKey();
  const ab = data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength);
  const ivAb = ivArr.buffer.slice(ivArr.byteOffset, ivArr.byteOffset + ivArr.byteLength);
  const pt = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: ivAb as any }, key, ab as any);
  return new TextDecoder().decode(pt);
}
