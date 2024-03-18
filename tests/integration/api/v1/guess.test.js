const { apiUrl, sharedData } = require('./shared');

test("Criação de guess", async () => {
  const { clientId, access_token } = sharedData;
  const newGuessData = { clientId, type: 'some_type', guess: 'some_guess' };
  const response = await fetch(apiUrl('guess'), {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${access_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newGuessData),
  });

  expect(response.status).toBe(201);
  const newGuess = await response.json();
  expect(newGuess).toHaveProperty('id');
  expect(newGuess.clientId).toBe(clientId);
  expect(newGuess.type).toBe(newGuessData.type);
  expect(newGuess.guess).toBe(newGuessData.guess);
});

test("Exclusão de guess", async () => {
  const { guessId, access_token } = sharedData;
  const response = await fetch(apiUrl(`guess/${guessId}`), {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${access_token}`,
    },
  });

  expect(response.status).toBe(200);
  const result = await response.json();
  expect(result).toEqual({ message: 'Guess deleted successfully.' });
});

test("Buscar guess por ID", async () => {
  const { guessId, access_token } = sharedData;
  const response = await fetch(apiUrl(`guess/${guessId}`), {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${access_token}`,
    },
  });

  expect(response.status).toBe(200);
  const guess = await response.json();
  expect(guess).toHaveProperty('id');
  expect(guess.id).toBe(guessId);
});


test("Atualização de guess", async () => {
  const { guessId, access_token } = sharedData;
  const updatedGuessData = { type: 'updated_type', guess: 'updated_guess' };
  const response = await fetch(apiUrl(`guess/${guessId}`), {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${access_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedGuessData),
  });

  expect(response.status).toBe(200);
  const updatedGuess = await response.json();
  expect(updatedGuess).toHaveProperty('id');
  expect(updatedGuess.type).toBe(updatedGuessData.type);
  expect(updatedGuess.guess).toBe(updatedGuessData.guess);
});

