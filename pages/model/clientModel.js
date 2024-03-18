const { queryDatabase } = require('./db');

async function createClient(clientData) {
    try {
        const newClient = await queryDatabase('client','create', {
            data: clientData
        });
        return newClient;
    } catch (error) {
        throw error;
    }
}

async function getClientById(clientId) {
    try {
        const client = await queryDatabase('client', 'findUnique', {
            where: { id: clientId }
        });
        return client;
    } catch (error) {
        throw error;
    }
}

async function updateClient(clientId, clientData) {
    try {
        const updatedClient = await queryDatabase('client','update',{
            where: { id: clientId },
            data: clientData
        });
        return updatedClient;
    } catch (error) {
        throw error;
    }
}

async function deleteClient(clientId) {
    try {
        await queryDatabase('client','delete',{
            where: { id: clientId }
        });
        return { message: 'Client deleted successfully.' };
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createClient,
    getClientById,
    updateClient,
    deleteClient
};
