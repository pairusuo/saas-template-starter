import { NextRequest, NextResponse } from 'next/server';
import { getEnvVar } from '@/lib/util/env';
import { exec } from '@/lib/db';

export const runtime = 'edge';

function textEncoder() { return new TextEncoder(); }

async function verifyStripeSignature(payload: string, signature: string, secret: string): Promise<boolean> {
  // signature format: t=timestamp,v1=signature[,v0=...]
  const parts = Object.fromEntries(signature.split(',').map((p) => p.split('=')) as any);
  const t = parts['t'];
  const v1 = parts['v1'];
  if (!t || !v1) return false;
  const data = `${t}.${payload}`;
  const key = await crypto.subtle.importKey('raw', textEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = await crypto.subtle.sign('HMAC', key, textEncoder().encode(data));
  const hex = Array.from(new Uint8Array(sig)).map((b) => b.toString(16).padStart(2, '0')).join('');
  // timing-safe compare
  if (hex.length !== v1.length) return false;
  let ok = 0;
  for (let i = 0; i < hex.length; i++) ok |= hex.charCodeAt(i) ^ v1.charCodeAt(i);
  return ok === 0;
}

export async function POST(req: NextRequest) {
  const sig = req.headers.get('stripe-signature') || '';
  const secret = (await getEnvVar('STRIPE_WEBHOOK_SECRET')) || '';
  if (!secret) return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 });
  const body = await req.text();
  const valid = await verifyStripeSignature(body, sig, secret);
  if (!valid) return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });

  let event: any;
  try { event = JSON.parse(body); } catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }); }

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const sessionId: string = session.id;
      const amount: number = session.amount_total || 0;
      const currency: string = session.currency || 'usd';
      const userId: string = session.metadata?.userId || '';

      // record purchase
      if (userId) {
        await exec('INSERT OR REPLACE INTO purchases (id, user_id, stripe_checkout_session_id, amount, currency, status) VALUES (?, ?, ?, ?, ?, ?);', [
          sessionId,
          userId,
          sessionId,
          amount,
          currency,
          'paid',
        ]);
        // grant entitlement
        await exec('INSERT OR REPLACE INTO entitlements (user_id, feature_key, source) VALUES (?, ?, ?);', [userId, 'builder_access', 'stripe']);
      }
    }
  } catch (e) {
    console.error('Webhook handler error', e);
    return NextResponse.json({ error: 'handler_failed' }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

