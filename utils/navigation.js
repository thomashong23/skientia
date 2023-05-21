import { useRouter } from 'next/router';

export function navigateToPage() {
  const router = useRouter();
  router.push('/page');
}