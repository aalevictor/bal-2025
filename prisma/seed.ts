import { saltAndHashPassword } from '../lib/utils';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const root = await prisma.user.upsert({
    where: { username: 'aalevictor' },
    create: {
        username: 'aalevictor',
        email: 'aalevictor@gmail.com',
        firstName: 'Victor Alexander',
        lastName: 'Menezes de Abreu',
        password: await saltAndHashPassword('1234'),
        active: true
    },
    update: {
        username: 'aalevictor',
        email: 'aalevictor@gmail.com',
        firstName: 'Victor Alexander',
        lastName: 'Menezes de Abreu',
        password: await saltAndHashPassword('1234'),
        active: true
    },
  });
  console.log(root);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  });
