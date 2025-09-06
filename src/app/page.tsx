import { redirect } from 'next/navigation';
import { defaultLocale } from '@/lib/i18n-config';

export default function RootRedirect() {
  // Ensure the app routes through the [locale] segment
  const target = `/${defaultLocale}`;
  redirect(target);
}

