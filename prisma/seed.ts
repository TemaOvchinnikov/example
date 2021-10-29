import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

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
    email: 'email2@gmail.com',
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

async function main() {
  console.log(`Start seeding ...`);
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
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
