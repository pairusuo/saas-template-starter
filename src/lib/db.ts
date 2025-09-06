// D1 helper for Cloudflare Pages (Workers runtime)
// Avoids Node-only APIs; does not modify config. Binding name expected: DB

type D1Database = any;

async function getRequestContextSafe(): Promise<any | null> {
  try {
    // This import is only available in Cloudflare Pages Functions runtime
    const mod = await import('@cloudflare/next-on-pages');
    return (mod as any)?.getRequestContext?.();
  } catch {
    return null;
  }
}

export async function getD1(): Promise<D1Database> {
  const ctx = await getRequestContextSafe();
  const db = (ctx as any)?.env?.DB;
  if (!db) {
    throw new Error('D1 binding "DB" is not available in this environment');
  }
  return db as D1Database;
}

export async function queryOne<T = any>(sql: string, bindings: any[] = []): Promise<T | null> {
  const db = await getD1();
  const stmt = db.prepare(sql);
  const result: any = await stmt.bind(...bindings).first();
  return (result as T) ?? null;
}

export async function queryAll<T = any>(sql: string, bindings: any[] = []): Promise<T[]> {
  const db = await getD1();
  const stmt = db.prepare(sql);
  const result: any = await stmt.bind(...bindings).all();
  return (result?.results as T[]) || [];
}

export async function exec(sql: string, bindings: any[] = []): Promise<void> {
  const db = await getD1();
  const stmt = db.prepare(sql);
  await stmt.bind(...bindings).run();
}
