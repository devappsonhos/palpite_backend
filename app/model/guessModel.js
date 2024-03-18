const { queryDatabase } = require('./db');

async function createGuess(data) {
  try {
    const newGuess = await queryDatabase('guess', 'create', { data });
    return newGuess;
  } catch (error) {
    throw error;
  }
}

async function getGuessById(id) {
  try {
    const guess = await queryDatabase('guess', 'findUnique', { where: { id } });
    return guess;
  } catch (error) {
    throw error;
  }
}

async function updateGuess(id, data) {
  try {
    const updatedGuess = await queryDatabase('guess', 'update', {
      where: { id },
      data,
    });
    return updatedGuess;
  } catch (error) {
    throw error;
  }
}

async function deleteGuess(id) {
  try {
    await queryDatabase('guess', 'delete', { where: { id } });
  } catch (error) {
    throw error;
  }
}

async function getGuesses(filter) {
  try {
    const guesses = await queryDatabase('guess', 'findMany', { where: filter });
    return guesses;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createGuess,
  getGuessById,
  updateGuess,
  deleteGuess,
  getGuesses,
};
