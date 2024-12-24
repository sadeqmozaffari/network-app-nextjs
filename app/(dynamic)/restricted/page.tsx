'use client';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function Page() {
  const { data: session } = useSession();
  if (!session) {
    redirect('/');
  }

  return (
    <div>
      <h1>Restricted Page</h1>
    </div>
  );
}
