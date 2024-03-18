const { queryDatabase } = require('./db');

async function createClientDream(clientId, dreamId) {
  try {
    const newClientDream = await queryDatabase('client_dream', 'create', {
      data: {
        clientId,
        dreamId,
      },
    });
    return newClientDream;
  } catch (error) {
    throw error;
  }
}

async function deleteClientDream(clientId, dreamId) {
  try {
    const deletedClientDream = await queryDatabase('client_dream', 'delete', {
      where: {
        clientId_dreamId: {
          clientId,
          dreamId,
        },
      },
    });
    return deletedClientDream;
  } catch (error) {
    throw error;
  }
}

async function getClientDreamById(clientId, dreamId) {
  try {
    const clientDream = await queryDatabase('client_dream', 'findUnique', {
      where: {
        clientId_dreamId: {
          clientId,
          dreamId,
        },
      },
    });
    return clientDream;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createClientDream,
  deleteClientDream,
  getClientDreamById,
};
