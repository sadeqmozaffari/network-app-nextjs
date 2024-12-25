import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const data = [
  'Nextjs',
  'React',
  'PostgreSQL',
  'TailwindCss',
  'Mantine',
  'Vercel',
  '.Net',
];

async function main() {
  for (const item of data) {
    // Insert the new user into the database
    await prisma.skill.create({
      data: {
        id: crypto.randomUUID(),
        name: item,
      },
    });
  }

  console.log(' successfully added!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
// npx tsx scripts/seed-users.ts
