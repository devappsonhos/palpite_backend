const apiUrl = (endpoint) => `http://localhost:3000/api/v1/${endpoint}`;
const { sharedData } = require("./shared")



test('Criação de banco', async () => {
  const { userId, access_token } = sharedData;
  const bankData = {
    adminId: userId,
    name: 'Meu Banco',
    city: 'Minha Cidade',
    state: 'Meu Estado',
    group: 'Meu Grupo',
  };

  const response = await fetch(apiUrl('bank'), {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${access_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bankData),
  });

  expect(response.status).toBe(201);
  const createdBank = await response.json()
  expect(createdBank).toHaveProperty('id');
  sharedData.newBankId = createdBank.id
});

test('Obter banco por ID', async () => {
  const { newBankId, access_token } = sharedData;
  const response = await fetch(apiUrl(`bank/${newBankId}`), {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${access_token}`,
    },
  });

  expect(response.status).toBe(200);
  const bankData = await response.json();
  expect(bankData).toHaveProperty('id');
  expect(bankData.id).toBe(newBankId);

});
