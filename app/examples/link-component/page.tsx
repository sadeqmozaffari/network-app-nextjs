import Link from 'next/link';

export const revalidate = 0;
export default function Page() {
  return (
    <div>
      <h1>Welcome to the Network App</h1>
      <p>
        The react server component payload is prefetched when link is in
        viewport
      </p>
      <div>
        <Link href="/examples/cached-page"> Cached Page</Link>
      </div>
      <div>
        <Link href="/examples/not-cached-page">Not Cached Page</Link>
      </div>
      <div>
        <Link href="/examples/time-based-revalidation">
          Time Based Revalidation
        </Link>
      </div>
    </div>
  );
}
