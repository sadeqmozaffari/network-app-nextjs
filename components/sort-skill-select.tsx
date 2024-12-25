'use client';
import { Select } from '@mantine/core';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function SortSkillSelect({ value }: { value: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleChange(selectedValue: string | null) {
    if (!selectedValue) {
      return;
    }

    const params = new URLSearchParams(searchParams);
    params.set('sort', selectedValue);
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <Select
      label="Sort"
      data={[
        { value: 'name_asc', label: 'Name A to Z' },
        { value: 'name_desc', label: 'Name Z to A' },
        { value: 'rating_asc', label: 'Rating Low to High' },
        { value: 'rating_desc', label: 'Rating High to Low' },
      ]}
      onChange={handleChange}
      value={value}
      placeholder="Sort by Name and Rating"
    />
  );
}
