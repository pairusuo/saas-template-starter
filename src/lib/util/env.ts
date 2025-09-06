// Unified way to access environment variables across
// Cloudflare Pages Functions (via getRequestContext) and Node dev

export async function getEnvVar(name: string): Promise<string | undefined> {
  try {
    const mod = await import('@cloudflare/next-on-pages');
    const ctx = (mod as any)?.getRequestContext?.();
    const v = ctx?.env?.[name];
    if (typeof v === 'string') return v;
  } catch {}
  // Fallback for local dev
  // eslint-disable-next-line no-process-env
  return process.env?.[name];
}

