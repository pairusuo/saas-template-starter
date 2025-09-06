import { getEnvVar } from '@/lib/util/env';

async function authHeader() {
  const sk = await getEnvVar('STRIPE_SECRET_KEY');
  if (!sk) throw new Error('STRIPE_SECRET_KEY missing');
  return 'Basic ' + btoa(sk + ':');
}

function formEncode(params: Record<string, any>): string {
  const body = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === null) continue;
    if (typeof v === 'object') {
      // Stripe expects nested objects using bracket notation
      // e.g., metadata[userId]=...
      const stack: Array<{ p: string; val: any }> = [];
      stack.push({ p: k, val: v });
      while (stack.length) {
        const { p, val } = stack.pop()!;
        if (val && typeof val === 'object' && !Array.isArray(val)) {
          for (const [ck, cv] of Object.entries(val)) stack.push({ p: `${p}[${ck}]`, val: cv });
        } else if (Array.isArray(val)) {
          val.forEach((cv, i) => stack.push({ p: `${p}[${i}]`, val: cv }));
        } else {
          body.append(p, String(val));
        }
      }
    } else {
      body.append(k, String(v));
    }
  }
  return body.toString();
}

export async function stripeCreateCheckoutSession(params: Record<string, any>) {
  const body = formEncode(params);
  const resp = await fetch('https://api.stripe.com/v1/checkout/sessions', {
    method: 'POST',
    headers: {
      Authorization: await authHeader(),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  });
  if (!resp.ok) {
    const txt = await resp.text();
    throw new Error(`Stripe error ${resp.status}: ${txt}`);
  }
  return resp.json();
}

