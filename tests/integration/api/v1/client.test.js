const fetch = require('node-fetch');
const { apiURL, sharedData } = require('./shared');

test("Criação de cliente", async () => {
    const clientData = {
        name: 'Novo Cliente',
        email: 'novo.cliente@example.com',
        phone: '135846872'
    };
    const response = await fetch(apiUrl('client'), {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${sharedData.access_token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(clientData),
    });
    expect(response.status).toBe(201);
    const newClient = await response.json();
    sharedData.newClientId = newClient.id;
});

test("Buscar cliente por ID", async () => {
    const response = await fetch(apiUrl(`client/${sharedData.newClientId}`), {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${sharedData.access_token}`,
        },
    });
    expect(response.status).toBe(200);
    const clientData = await response.json();
    expect(clientData).toHaveProperty('id');
    expect(clientData.id).toBe(sharedData.newClientId);
});

test("Atualizar cliente", async () => {
    const updatedClientData = {
        name: 'Novo Nome do Cliente',
        email: 'novo.email.cliente@example.com',
        phone: '987654321'
    };
    const response = await fetch(apiUrl(`client/${sharedData.newClientId}`), {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${sharedData.access_token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedClientData),
    });
    expect(response.status).toBe(200);
    const updatedClient = await response.json();
    expect(updatedClient).toHaveProperty('id');
    expect(updatedClient.id).toBe(sharedData.newClientId);
    expect(updatedClient.name).toBe(updatedClientData.name);
    expect(updatedClient.email).toBe(updatedClientData.email);
    expect(updatedClient.phone).toBe(updatedClientData.phone);
});

test("Excluir cliente", async () => {
    const response = await fetch(apiUrl(`client/${sharedData.newClientId}`), {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${sharedData.access_token}`,
        },
    });
    expect(response.status).toBe(200);
    const result = await response.json();
    expect(result).toEqual({ message: 'Client deleted successfully.' });
});
