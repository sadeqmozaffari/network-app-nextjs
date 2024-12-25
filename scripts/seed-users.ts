import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  for (let i = 0; i < 100; i++) {
    const username = faker.internet.username();
    const email = faker.internet.email();
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const jobTitle = faker.person.jobTitle();
    const image = faker.image.avatarGitHub();

    // Insert the new user into the database
    await prisma.user.create({
      data: {
        id: crypto.randomUUID(),
        name: username,
        email: email,
        firstName: firstName,
        lastName: lastName,
        jobTitle: jobTitle,
        image: image,
      },
    });
  }

  console.log('100 users successfully created!');
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