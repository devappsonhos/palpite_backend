const apiUrl = (endpoint) => `http://localhost:3000/api/v1/${endpoint}`;
const { sharedData } = require("./shared")

test("Criação de número", async () => {
  const response = await fetch(apiUrl('number'), {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${sharedData.access_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ number: 1234, hundreds: '123,234', tens: '12,23,34' }),
  });

  expect(response.status).toBe(201);
  const newNumber = await response.json();
  expect(newNumber).toHaveProperty('id');
  sharedData.newNumberId = newNumber.id;
});

test("Buscar número por ID", async () => {
  const response = await fetch(apiUrl(`number/${sharedData.newNumberId}`), {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${sharedData.access_token}`,
    },
  });

  expect(response.status).toBe(200);
  const numberData = await response.json();
  expect(numberData).toHaveProperty('number', 123);
});

test("Atualizar número", async () => {
  const response = await fetch(apiUrl(`number/${sharedData.newNumberId}`), {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${sharedData.access_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ hundreds: '234,123', tens: '34,23,12' }),
  });

  expect(response.status).toBe(200);
  const updatedNumber = await response.json();
  expect(updatedNumber).toHaveProperty('number', 1234);
});

test("Excluir número", async () => {
  const response = await fetch(apiUrl(`number/${sharedData.newNumberId}`), {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${sharedData.access_token}`,
    },
  });

  expect(response.status).toBe(200);
  const result = await response.json();
  expect(result).toEqual({ message: 'Number deleted successfully' });
});
