import { prisma } from '@/lib/prisma';
import SortSkillSelect from '../../../../../components/sort-skill-select';
import Link from 'next/link';
import { Avatar } from '@mantine/core';
import { IconStar } from '@tabler/icons-react';

// Function to handle sorting based on the provided sort string
function getSortCriteria(sort: string) {
  switch (sort) {
    case 'name_asc':
      return { user: { name: 'asc' } }; // Sort by user name (ascending)
    case 'name_desc':
      return { user: { name: 'desc' } }; // Sort by user name (descending)
    case 'rating_asc':
      return { rating: 'asc' }; // Sort by rating (ascending)
    case 'rating_desc':
      return { rating: 'desc' }; // Sort by rating (descending)
    default:
      return { user: { name: 'asc' } }; // Default sort (by user name ascending)
  }
}

// Function to get skill by ID and include users with sorting
async function getSkillById(id: string, sort: string) {
  const skill = await prisma.skill.findUnique({
    where: { id },
    include: {
      usersToSkills: {
        include: {
          user: true, // Include user information
        },
        orderBy: getSortCriteria(sort), // Apply sorting
      },
    },
  });

  if (!skill) {
    throw new Error('Skill not found');
  }

  return skill;
}

interface Props {
  params: { id: string };
  searchParams: { sort: string };
}

export default async function usersSkillById({ params, searchParams }: Props) {
  const { id } = params;
  const { sort } = searchParams;

  try {
    const skill = await getSkillById(id, sort);

    return (
      <div className="flex flex-col gap-5 max-w-md">
        <h1 className="font-bold text-xl">Users with {skill.name} Skill</h1>
        <SortSkillSelect value={sort} /> {/* Sort selection component */}
        {skill.usersToSkills.length === 0 ? (
          <p>No users found with this skill.</p>
        ) : (
          <ul className="flex flex-col gap-0.5">
            {skill.usersToSkills.map((userToSkill) => (
              <li key={userToSkill.user.id}>
                <Link
                  href={`/dashboard/people/${userToSkill.user.id}`}
                  className="p-2 border-blue-400 border-b flex flex-row justify-between "
                >
                  <div className="flex flex-row gap-5 items-center">
                    <Avatar src={userToSkill.user.image} />
                    {userToSkill.user.name}
                  </div>
                  <div className="flex flex-row gap-2 ">
                    {userToSkill.rating}
                    <IconStar color="orange" />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  } catch (error) {
    return <div>Error: {error.message}</div>;
  }
}
