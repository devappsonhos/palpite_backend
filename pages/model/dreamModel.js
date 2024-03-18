const { queryDatabase } = require('./db');

async function createDream(data) {
  try {
    const newDream = await queryDatabase('dream', 'create', { data });
    return newDream;
  } catch (error) {
    throw error;
  }
}

async function getDreamById(id) {
  try {
    const dream = await queryDatabase('dream', 'findUnique', { where: { id } });
    return dream;
  } catch (error) {
    throw error;
  }
}

async function updateDream(id, data) {
  try {
    const updatedDream = await queryDatabase('dream', 'update', {
      where: { id },
      data,
    });
    return updatedDream;
  } catch (error) {
    throw error;
  }
}

async function deleteDream(id) {
  try {
    await queryDatabase('dream', 'delete', { where: { id } });
  } catch (error) {
    throw error;
  }
}

async function getDreams(filter) {
  try {
    const dreams = await queryDatabase('dream', 'findMany', { where: filter });
    return dreams;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createDream,
  getDreamById,
  updateDream,
  deleteDream,
  getDreams,
};
