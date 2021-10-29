import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();
//import faker from 'faker';

const faker = require('faker');
//import faker from 'faker';

//faker.locale = 'en';

/*
const userData: Prisma.UserCreateInput[] = [
  {
    email: 'email1@gmail.com',
    firstname: 'firstname1',
    lastname: 'lastname1',
    avatar: 'avatar1',
  },
  {
    email: 'email2@gmail.com',
    firstname: 'firstname2',
    lastname: 'lastname2',
    avatar: 'avatar2',
  },
];*/
/*
const userData: Prisma.UserCreateInput[] = [
  {
    email: 'email1@gmail.com',
    firstName: 'firstname1',
    lastName: 'lastname1',
    avatar: 'avatar1',
    posts: {
      create: [
        {
          title: 'title1',
          content: 'content1',
        },
      ],
    },
  },
  {
    email: faker.internet.email(),
    firstName: 'firstname2',
    lastName: 'lastname2',
     avatar: 'avatar2',
    posts: {
      create: [
        {
          title: 'title2',
          content: 'content2',
        },
      ],
    },
  },
];


const userData: Prisma.UserCreateInput[] = [
  {
    email: faker.unique(faker.internet.email),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    avatar: faker.image.avatar(),
  },
];*/

async function main() {
  console.log(`Start seeding ...`);
  //for (const u of userData) {
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
              content: faker.random.word(),
            },
          ],
        },
      },
    });
    console.log(`Created user with id: ${user.id}`);
  }
  //}
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
