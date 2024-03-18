const { apiUrl, sharedData } = require("./shared");

test("Criação de guess_number", async () => {
  const { guessId, numberId, access_token } = sharedData;
  const guessNumberData = {
    guessId: guessId,
    numberId: numberId
  };
  const response = await fetch(apiUrl('guess_number'), {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${access_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(guessNumberData),
  });

  expect(response.status).toBe(201);
});

test("Buscar guess_number por ID", async () => {
  const { guessNumberId, access_token } = sharedData;
  const response = await fetch(apiUrl(`guess_number/${guessNumberId}`), {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${access_token}`,
    },
  });

  expect(response.status).toBe(200);
  const guessNumberData = await response.json();
  expect(guessNumberData).toHaveProperty('id');
  expect(guessNumberData.id).toBe(guessNumberId);
});

test("Atualizar guess_number", async () => {
  const { guessNumberId, guessId, numberId, access_token } = sharedData;
  const updatedGuessNumberData = {
    guessId: guessId,
    numberId: numberId
  };
  const response = await fetch(apiUrl(`guess_number/${guessNumberId}`), {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${access_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedGuessNumberData),
  });

  expect(response.status).toBe(200);
  const updatedGuessNumber = await response.json();
  expect(updatedGuessNumber).toHaveProperty('id');
  expect(updatedGuessNumber.id).toBe(guessNumberId);
  // Verifique outras propriedades atualizadas, se aplicável
});

test("Excluir guess_number", async () => {
  const { guessNumberId, access_token } = sharedData;
  const response = await fetch(apiUrl(`guess_number/${guessNumberId}`), {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${access_token}`,
    },
  });

  expect(response.status).toBe(200);
  const result = await response.json();
  expect(result).toEqual({ message: 'guess_number excluído com sucesso.' });
});
