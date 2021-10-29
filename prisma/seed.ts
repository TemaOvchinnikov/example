import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

//import faker from 'faker';
const faker = require('faker');

async function main() {
  console.log(`Start seeding ...`);
  for (let i = 0; i < 7; i++) {
    const user = await prisma.user.create({
      data: {
        email: faker.unique(faker.internet.email),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        avatar: faker.image.avatar(),
        posts: {
          create: [
            {
              title: faker.name.title(),
              content: faker.lorem.text(),
            },
          ],
        },
        images: {
          create: [
            {
              imagePuth: faker.image.image(),
              postId: faker.datatype.number({ min: 1, max: 7 }),
            },
          ],
        },
      },
    });
    console.log(`Created user with id: ${user.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
