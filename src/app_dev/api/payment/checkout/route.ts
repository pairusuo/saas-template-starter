import { NextRequest, NextResponse } from 'next/server';
import { PaymentService } from '@/lib/payment/providers';
import { LandingPageConfig } from '@/types/payment';
import { z } from 'zod';

export const runtime = 'nodejs';

const createCheckoutSchema = z.object({
  pageSlug: z.string(),
  planId: z.string(),
  isAnnual: z.boolean(),
  customerEmail: z.string().email().optional(),
  customerName: z.string().optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { pageSlug, planId, isAnnual, customerEmail, customerName, metadata } = createCheckoutSchema.parse(body);
    const pageConfig = await getLandingPageConfig(pageSlug);
    if (!pageConfig || !pageConfig.isPublished) return NextResponse.json({ error: 'Page not available' }, { status: 400 });
    const plan = pageConfig.plans?.find((p) => p.id === planId);
    if (!plan) return NextResponse.json({ error: 'Plan not found' }, { status: 404 });
    if (!pageConfig.paymentConfig) return NextResponse.json({ error: 'Payment not configured' }, { status: 400 });
    const session = await PaymentService.createCheckoutUrl(pageConfig.paymentConfig, plan, isAnnual, pageSlug, { customerEmail, customerName, ...metadata });
    await recordCheckoutSession({ sessionId: session.sessionId, planId, isAnnual, amount: isAnnual ? plan.annualPrice : plan.monthlyPrice, currency: pageConfig.paymentConfig.currency, customerEmail, customerName, pageSlug, metadata });
    return NextResponse.json({ checkoutUrl: session.url, sessionId: session.sessionId });
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: 'Invalid request data', details: error.issues }, { status: 400 });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

async function getLandingPageConfig(slug: string): Promise<LandingPageConfig | null> {
  try {
    const fs = await import('fs/promises');
    const path = await import('path');
    const configPath = path.join(process.cwd(), 'public/generated-pages', `${slug}.json`);
    const configData = await fs.readFile(configPath, 'utf-8');
    return JSON.parse(configData);
  } catch {
    return null;
  }
}

async function recordCheckoutSession(session: any) {
  try {
    const fs = await import('fs/promises');
    const path = await import('path');
    const sessionsDir = path.join(process.cwd(), 'data/checkout-sessions');
    await fs.mkdir(sessionsDir, { recursive: true });
    const sessionFile = path.join(sessionsDir, `${session.sessionId}.json`);
    await fs.writeFile(sessionFile, JSON.stringify({ ...session, createdAt: new Date().toISOString(), status: 'pending' }, null, 2));
  } catch {}
}

