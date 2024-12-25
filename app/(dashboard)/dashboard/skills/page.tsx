import { Card } from '@mantine/core';
import { prisma } from '@/lib/prisma';
import { IconUsersGroup } from '@tabler/icons-react';
import Link from 'next/link';

async function getSkills() {
  const data = await prisma.skill.findMany({
    select: {
      id: true,
      name: true,
      _count: {
        select: {
          usersToSkills: true,
        },
      },
    },
  });

  return data.map((skill) => ({
    id: skill.id,
    name: skill.name,
    count: skill._count.usersToSkills,
  }));
}

export default async function Page() {
  const skills = await getSkills();

  return (
    <div className="flex flex-col gap-5">
      <h1 className="font-bold text-xl">Skills</h1>
      <ul className="flex flex-col gap-5">
        {skills.map((skill) => (
          <li key={skill.id}>
            <Link href={`/dashboard/skills/${skill.id}`}>
              <Card className="" withBorder shadow="md">
                <div className="flex flex-row justify-between">
                  {skill.name}
                  <span className="flex flex-row gap-2">
                    <IconUsersGroup />
                    {skill.count}
                  </span>
                </div>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
