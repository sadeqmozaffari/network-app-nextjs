import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany();
  const skills = await prisma.skill.findMany();

  if (skills.length === 0) {
    console.error('No skills found in the database!');
    return;
  }

  for (const user of users) {
    // Select a random skillId from the skills array
    const randomSkill = skills[Math.floor(Math.random() * skills.length)];

    // Insert the new user-skill relationship into the database
    await prisma.usersToSkills.create({
      data: {
        id: crypto.randomUUID(),
        userId: user.id,
        rating: Math.floor(Math.random() * 5) + 1, // Random rating between 1 and 5
        skillId: randomSkill.id,
      },
    });
  }

  console.log('Data successfully added!');
}

// Execute the main function
main()
  .then(() => {
    console.log('Seeding completed successfully.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error seeding data:', error);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
