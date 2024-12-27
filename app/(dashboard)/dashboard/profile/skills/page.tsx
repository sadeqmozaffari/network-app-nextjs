import AddUserToSkillBtn from '../../../../../components/add-user-to-skill-btn';
import DeleteUserToSkillBtn from '../../../../../components/delete-user-to-skill-btn';
import { SkillRatingForm } from '../../../../../components/skill-rating-form';
import { auth } from '../../../../../lib/auth';
import { prisma } from '../../../../../lib/prisma';

async function getUsersToSkillsByUserId(userId: string) {
  return await prisma.user.findFirst({
    where: { id: userId },
    include: {
      usersToSkills: {
        include: {
          skill: true,
        },
      },
    },
  });
}
async function getAllSkills() {
  return await prisma.skill.findMany();
}

export default async function Page() {
  const session = await auth();
  const data = await getUsersToSkillsByUserId(session?.user.id);
  const skills = await getAllSkills();
  return (
    <div className="flex flex-col gap-5 max-w-xl">
      <h1 className="font-bold text-xl">Manage Skills</h1>

      <table className="border-collapse border-0">
        <thead>
          <tr>
            <th className="border-slate-600 border-b text-left p-2 ">Name</th>
            <th className="border-slate-600 border-b text-left p-2 ">Rating</th>
            <th className="border-slate-600 border-b text-left p-2 ">Delete</th>
          </tr>
        </thead>
        <tbody>
          {data?.usersToSkills.map((userToSkill) => (
            <tr key={userToSkill.id}>
              <td className="border-slate-600 p-2 border-t ">
                {userToSkill.skill.name}
              </td>
              <td className="border-slate-600 p-2 border-t ">
                <SkillRatingForm
                  rating={userToSkill.rating}
                  skillId={userToSkill.skillId}
                />
              </td>
              <td className="border-slate-600 p-2 border-t ">
                <DeleteUserToSkillBtn skillId={userToSkill.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <AddUserToSkillBtn allSkills={skills} />
      </div>
    </div>
  );
}
