import { notFound } from 'next/navigation';
import { prisma } from '../../../../../lib/prisma';
import UserCard from '../../../../../components/user-card';
import { Rating } from '@mantine/core';

async function getUserById(id: string) {
  return await prisma.user.findFirst({
    where: { id: id },
    include: {
      usersToSkills: {
        include: {
          skill: true,
        },
      },
    },
  });
}
export default async function UserDetails({
  params,
}: {
  params: { id: string };
}) {
  const user = await getUserById(params.id);

  if (!user) {
    notFound();
  }

  // await new Promise((resolve) => setTimeout(resolve, 2000));

  return (
    <div className="flex flex-row gap-5">
      <div>
        <UserCard user={user} />
      </div>
      <div className="flex flex-col gap-5">
        <h2 className="font-bold text-xl">Bio</h2>
        <div
          className="prose dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: user.bio ?? '' }}
        />
        <h2 className="font-bold text-xl">Skills</h2>
        <div>
          {user.usersToSkills.map((userToUserSkill) => (
            <div
              key={userToUserSkill.skillId}
              className="max-w-sm justify-between flex flex-row"
            >
              <div>{userToUserSkill.skill.name}</div>
              <Rating value={userToUserSkill.rating || undefined} readOnly />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
