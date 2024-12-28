import { BarChart } from '@mantine/charts';
import { prisma } from '../../../lib/prisma';

async function getCountOfJobTitles() {
  const jobtitles = await prisma.user.findMany({
    include: {
      usersToSkills: true,
    },
  });
  return jobtitles
    .map((jobs) => ({
      jobTitle: jobs.jobTitle,
      count: jobs.jobTitle!.length,
    }))
    .sort((a, b) => b.count - a.count);
}

async function getCountOfSkills() {
  const skills = await prisma.skill.findMany({
    include: {
      usersToSkills: true,
    },
  });

  return skills
    .map((skill) => ({
      name: skill.name,
      count: skill.usersToSkills.length,
    }))
    .sort((a, b) => b.count - a.count);
}

export default async function Page() {
  const data = await getCountOfJobTitles();
  const data2 = await getCountOfSkills();

  console.log(data2);
  return (
    <div className="flex flex-col gap-5 my-3">
      <h1>Dashboard</h1>
      <h2 className="font-bold text-xl">Skills</h2>
      <BarChart
        h={300}
        data={data2}
        dataKey="name"
        type="stacked"
        orientation="vertical"
        yAxisProps={{ width: 80 }}
        series={[{ name: 'count', color: 'orange.6' }]}
      />
      <h2 className="font-bold text-xl">Job Titles</h2>
      <BarChart
        h={2300}
        data={data}
        dataKey="jobTitle"
        type="stacked"
        orientation="vertical"
        yAxisProps={{ width: 80 }}
        series={[{ name: 'count', color: 'blue.6' }]}
      />
    </div>
  );
}
