import { PrismaClient } from '@prisma/client';
import PaginationContainer from '../../../../components/pagination-container';
import UserCard from '../../../../components/user-card';
import Link from 'next/link';

const prisma = new PrismaClient();

const PER_PAGE = 20;

async function getusers(page: number) {
  const offset = (page - 1) * PER_PAGE;
  const data = await prisma.user.findMany({
    take: PER_PAGE,
    skip: offset,
    orderBy: { createdAt: 'desc' },
    // select: { name: true, jobTitle: true, },
  });
  const userCount = await prisma.user.count();
  const numPages = Math.ceil(userCount / PER_PAGE);
  return {
    data: data,
    count: userCount,
    pages: numPages,
  };
}

prisma.$disconnect();
interface Props {
  searchParams: {
    page: number;
  };
}
export default async function Page({ searchParams }: Props) {
  const page = (await searchParams.page) || 1;
  const res = await getusers(page);
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return (
    <div className="flex flex-col gap-5">
      <h1 className="font-bold text-xl">People</h1>
      <div className="grid grid-col-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {res.data.map((user) => (
          <div key={user.id}>
            <Link href={`/dashboard/people/${user.id}`}>
              <UserCard user={user} />
            </Link>
          </div>
        ))}
      </div>
      <PaginationContainer total={res.pages} value={page} />
    </div>
  );
}
