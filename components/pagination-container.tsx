'use client';
import { Pagination } from '@mantine/core';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PaginationContainer({
  total,
  value,
}: {
  total: number;
  value: number;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const initialPage = parseInt(searchParams.get('page') || `${value}`, 10);
  const [activePage, setPage] = useState(initialPage);

  useEffect(() => {
    const page = searchParams.get('page');
    if (page) {
      const num = parseInt(page, 10);
      if (num !== activePage) {
        setPage(num);
      }
    }
  }, []);

  function handleChange(page: number) {
    setPage(page);
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <Pagination total={total} value={activePage} onChange={handleChange} />
  );
}
