import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyJWT } from '@/lib/auth/jwt';
import { stripeCreateCheckoutSession } from '@/lib/stripe/api';
import { getEnvVar } from '@/lib/util/env';

export const runtime = 'edge';

export async function POST() {
  const token = cookies().get('session')?.value;
  const payload = token ? await verifyJWT(token) : null;
  if (!payload) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });

  const price = await getEnvVar('STRIPE_PRICE_ID');
  const appUrl = (await getEnvVar('NEXT_PUBLIC_APP_URL')) || '';
  if (!price || !appUrl) return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 });

  const successUrl = `${appUrl}/success?session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${appUrl}/`;

  const session = await stripeCreateCheckoutSession({
    mode: 'payment',
    'line_items[0][price]': price,
    'line_items[0][quantity]': 1,
    success_url: successUrl,
    cancel_url: cancelUrl,
    'metadata[userId]': payload.sub,
    allow_promotion_codes: true,
  });

  // Browser form posts expect navigation; redirect to Stripe checkout
  if (session?.url) {
    return NextResponse.redirect(session.url, 303);
  }
  return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
}
