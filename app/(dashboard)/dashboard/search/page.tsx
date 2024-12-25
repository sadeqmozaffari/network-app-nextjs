import { PrismaClient } from '@prisma/client';
import UserTable from '../../../../components/user-table';

const prisma = new PrismaClient();

async function searchUsers(query: string) {
  const users = await prisma.user.findMany({
    where: {
      OR: [
        { email: { contains: query, mode: 'insensitive' } },
        { firstName: { contains: query, mode: 'insensitive' } },
        { lastName: { contains: query, mode: 'insensitive' } },
        { name: { contains: query, mode: 'insensitive' } },
        { jobTitle: { contains: query, mode: 'insensitive' } },
      ],
    },
    orderBy: { createdAt: 'desc' },
  });

  return users;
}

interface Props {
  searchParams: { query: string };
}

export default async function Search({ searchParams }: Props) {
  const { query } = searchParams;
  console.log(query);
  const users = await searchUsers(query);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Search Results</h1>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <UserTable users={users} />
      )}
    </div>
  );
}
