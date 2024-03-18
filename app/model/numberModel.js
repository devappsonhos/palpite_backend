const { queryDatabase } = require('./db');

async function createNumber(data) {
  try {
    const newNumber = await queryDatabase('number', 'create', { data });
    return newNumber;
  } catch (error) {
    throw error;
  }
}

async function getNumberById(number) {
  try {
    const numberData = await queryDatabase('number', 'findUnique', { where: { number } });
    return numberData;
  } catch (error) {
    throw error;
  }
}

async function updateNumber(number, data) {
  try {
    const updatedNumber = await queryDatabase('number', 'update', {
      where: { number },
      data,
    });
    return updatedNumber;
  } catch (error) {
    throw error;
  }
}

async function deleteNumber(number) {
  try {
    await queryDatabase('number', 'delete', { where: { number } });
  } catch (error) {
    throw error;
  }
}


async function getNumbers(filter) {
  try {
    const numbers = await queryDatabase('number', 'findMany', { where: filter });
    return numbers;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createNumber,
  getNumberById,
  updateNumber,
  deleteNumber,
  getNumbers,
};
