import { usePage } from '@/store/page/hooks';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

export function usePageKey() {
  const page = usePage();

  const { pathname } = useRouter();

  const pageKey = useMemo(
    () => pathname + JSON.stringify(page),
    [page, pathname],
  );

  return pageKey;
}
