
const { apiUrl, sharedData } = require('./shared');

test("Criação de relação client_dream", async () => {
  const { clientId, dreamId, access_token } = sharedData;
  const newClientDreamData = { clientId, dreamId };
  const response = await fetch(apiUrl('client_dream'), {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${access_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newClientDreamData),
  });

  expect(response.status).toBe(201);
  const newClientDream = await response.json();
  expect(newClientDream).toHaveProperty('id');
  expect(newClientDream.clientId).toBe(clientId);
  expect(newClientDream.dreamId).toBe(dreamId);
});

test("Exclusão de relação client_dream", async () => {
  const { clientId, dreamId, access_token } = sharedData;
  const response = await fetch(apiUrl(`client_dream/${clientId}/${dreamId}`), {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${access_token}`,
    },
  });

  expect(response.status).toBe(200);
  const result = await response.json();
  expect(result).toEqual({ message: 'Client-Dream relationship deleted successfully.' });
});

test("Buscar relação client_dream por ID", async () => {
  const { clientId, dreamId, access_token } = sharedData;
  const response = await fetch(apiUrl(`client_dream/${clientId}/${dreamId}`), {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${access_token}`,
    },
  });

  expect(response.status).toBe(200);
  const clientDream = await response.json();
  expect(clientDream).toHaveProperty('id');
  expect(clientDream.clientId).toBe(clientId);
  expect(clientDream.dreamId).toBe(dreamId);
});
