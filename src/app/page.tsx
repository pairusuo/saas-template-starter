import { redirect } from 'next/navigation';

export default function RootPage() {
  // Redirect to English page
  redirect('/en');
}
