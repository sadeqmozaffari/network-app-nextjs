import { notFound } from 'next/navigation';
import UserForm from '../../../../components/user-form';
import { auth } from '../../../../lib/auth';
import { prisma } from '../../../../lib/prisma';

export default async function Page() {
  const session = await auth();

  if (!session?.user?.id) {
    return notFound();
  }

  const user = await prisma.user.findFirst({
    where: {
      id: session.user.id,
    },
  });

  if (!user) {
    return notFound();
  }

  return (
    <div>
      <UserForm user={user} />
    </div>
  );
}
