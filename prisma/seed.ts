import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getRandomInt = (max: number) => Math.floor(Math.random() * max) + 1;

function addDays(date: Date, days: number): Date {
  const newDate = new Date(date);
  newDate.setDate(date.getDate() + days);
  return newDate;
}

const seedData = async () => {
  // Excluir todos os registros existentes
  await prisma.result.deleteMany({});
  await prisma.client_lucky_number.deleteMany({});
  await prisma.lucky_number.deleteMany({});
  await prisma.client_dream.deleteMany({});
  await prisma.dream.deleteMany({});
  await prisma.client.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.permission.deleteMany({});

  // Populando a tabela 'permission'
  await prisma.permission.createMany({
    data: [
      { name: 'Admin' },
      { name: 'User' },
    ],
  });

  const adminPermission = await prisma.permission.findFirst({ where: { name: 'Admin' } });
  const userPermission = await prisma.permission.findFirst({ where: { name: 'User' } });

  if (!adminPermission || !userPermission) {
    throw new Error('Permissões não encontradas.');
  }

  // Populando a tabela 'user'
  const adminUser = await prisma.user.create({
    data: {
      permissionId: adminPermission.id,
      name: 'Admin User',
      email: 'admin@example.com',
      phone: '123456789',
      password: 'hashedPassword',
    },
  });
  const regularUser = await prisma.user.create({
    data: {
      permissionId: userPermission.id,
      name: 'Regular User',
      email: 'user@example.com',
      phone: '987654321',
      password: 'hashedPassword',
    },
  });
  const otherRegularUser = await prisma.user.create({
    data: {
      permissionId: userPermission.id,
      name: 'Other Regular User',
      email: 'otheruser@example.com',
      phone: '987613421',
      password: 'hashedPassword',
    },
  });

  const users = [adminUser, regularUser, otherRegularUser];

  for (const user of users) {

    for (let i = 0; i < 5; i++) {
      const clientId = getRandomInt(99999)

      // Populando a tabela 'lucky_number'
      const quantLuckyNumbers = 5
      await prisma.lucky_number.createMany({
        data: Array.from({ length: quantLuckyNumbers }, (_, index) => ({
          id: getRandomInt(9999999),
          numbers: `${getRandomInt(9999)}`,
        })),
      });
      const luckyNumbers = await prisma.lucky_number.findMany({
        take: quantLuckyNumbers,
        orderBy: { 
          createdAt: 'desc'
        }
      })
      // Populando a tabela 'dream'
      const quantDreams = 5
      await prisma.dream.createMany({
        data: Array.from({ length: quantDreams }, (_, index) => ({
          dream: `Dream ${getRandomInt(100)}`,
          terms: 'Terms',
          numbers: `${getRandomInt(9999)}`,
        })),
      });
      const dreams = await prisma.dream.findMany({
        take: quantDreams,
        orderBy: { 
          createdAt: 'desc'
        }
      })

      // Populando a tabela 'client'
      await prisma.client.create({
        data: {
          userId: user.id,
          name: `Client ${clientId}`,
          email: `client${clientId}@example.com`,
          phone: `9876${clientId}`,
          client_lucky_number: {
            create: luckyNumbers.map((ln) => ({
              luckyNumberId: ln.id,
              description: `Description ${ln.id}`,
            })),
          },
          client_dream: {
            create: dreams.map((dream) => ({
              dreamId: dream.id,
            })),
          },
        }
      });
    }
  }

  // Populando a tabela 'result'
  const initialRandomDate = new Date(2023, getRandomInt(11), getRandomInt(28));

  await prisma.result.createMany({
    data: Array.from({ length: 20 }, (_, index) => ({
      date: addDays(initialRandomDate, index),
      title: `Result ${index + 1}`,
      result: `${getRandomInt(9999)}`,
    })),
  });

  console.log('Dados mockados inseridos com sucesso!');
};

seedData()
  .catch((error) => {
    throw error;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

