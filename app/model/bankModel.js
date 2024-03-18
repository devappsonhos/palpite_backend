const { queryDatabase } = require('./db');

async function createBank(data) {
  try {
    const result = await queryDatabase('bank', 'create', { data });
    return result;
  } catch (error) {
    throw error;
  }
}

async function getBankById(id) {
  try {
    const result = await queryDatabase('bank', 'findUnique', { where: { id } });
    return result;
  } catch (error) {
    throw error;
  }
}

async function getAllBanks(filter = {}) {
  try {
    const banks = await queryDatabase('bank', 'findMany', { where: filter });
    return banks;
  } catch (error) {
    throw error;
  }
}

async function deleteBank(id) {
  try {
    const result = await queryDatabase('bank', 'delete', { where: { id } });
    return result;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createBank,
  getBankById,
  getAllBanks,
  deleteBank,
};


module.exports = {
  createBank,
  getBankById,
};
