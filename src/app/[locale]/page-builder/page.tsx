import { Builder } from '@/components/page-builder/Builder';
import { cookies } from 'next/headers';
import { verifyJWT } from '@/lib/auth/jwt';
import { hasBuilderAccess } from '@/lib/auth/entitlements';

interface PageBuilderPageProps {
  params: { locale: string };
}

export default async function PageBuilderPage({ params: { locale } }: PageBuilderPageProps) {
  const token = cookies().get('session')?.value || '';
  const payload = token ? await verifyJWT(token) : null;
  const userId = payload?.sub || '';
  const allowed = userId ? await hasBuilderAccess(userId) : false;

  if (!userId || !allowed) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="max-w-md text-center space-y-4">
          <h1 className="text-xl font-semibold">{userId ? '需要购买后使用构建器' : '请先登录 GitHub'}</h1>
          <div className="flex items-center justify-center gap-3">
            {!userId ? (
              <a className="underline" href="/api/auth/github/authorize">使用 GitHub 登录</a>
            ) : (
              <form action="/api/billing/checkout" method="post">
                <button className="underline" type="submit">前往一次性购买</button>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen">
      <Builder />
    </div>
  );
}
