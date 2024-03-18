const { queryDatabase } = require('./db');

async function createGuessNumber(data) {
  try {
    const newGuessNumber = await queryDatabase('guess_number', 'create', { data });
    return newGuessNumber;
  } catch (error) {
    throw error;
  }
}

async function getGuessNumberById(id) {
  try {
    const guessNumberData = await queryDatabase('guess_number', 'findUnique', { where: { id } });
    return guessNumberData;
  } catch (error) {
    throw error;
  }
}

async function updateGuessNumber(id, data) {
  try {
    const updatedGuessNumber = await queryDatabase('guess_number', 'update', {
      where: { id },
      data,
    });
    return updatedGuessNumber;
  } catch (error) {
    throw error;
  }
}

async function deleteGuessNumber(id) {
  try {
    await queryDatabase('guess_number', 'delete', { where: { id } });
  } catch (error) {
    throw error;
  }
}

async function getGuessNumbers(filter) {
  try {
    const guessNumbers = await queryDatabase('guess_number', 'findMany', { where: filter });
    return guessNumbers;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createGuessNumber,
  getGuessNumberById,
  updateGuessNumber,
  deleteGuessNumber,
  getGuessNumbers
}
