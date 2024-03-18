const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function queryDatabase(model, operation, options) {
  let result;
  try {
    switch (operation) {
      case 'findMany':
        result = await prisma[model].findMany(options);
        break;
      case 'findUnique':
        result = await prisma[model].findUnique(options);
        break;
      case 'findFirst':
        result = await prisma[model].findFirst(options);
        break;
      case 'create':
        result = await prisma[model].create(options);
        break;
      case 'update':
        result = await prisma[model].update(options);
        break;
      case 'delete':
        result = await prisma[model].delete(options);
        break;
      case 'deleteMany':
        result = await prisma[model].deleteMany(options);
        break;
      default:
        throw new Error('Operation not supported.');
    }
    return result;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

module.exports = {
  queryDatabase,
};
