const apiUrl = (endpoint) => `http://localhost:3000/api/v1/${endpoint}`;
const { sharedData } = require("./shared")


test("Atualizar access_token usando o refresh_token", async () => {
  
  const { refresh_token } = sharedData
  const tokenResponse = await fetch(apiUrl('token'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token: refresh_token }),
  });

  expect(tokenResponse.status).toBe(200);
  const tokenResult = await tokenResponse.json();
  expect(tokenResult).toHaveProperty('access_token');
});

test("Logout de usuário", async () => {
 
  const { refresh_token } = sharedData;

  // Faça logout usando o token de acesso
  const logoutResponse = await fetch(apiUrl('logout'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token: refresh_token }),
  });

  expect(logoutResponse.status).toBe(200);
  const logoutResult = await logoutResponse.json();
  expect(logoutResult).toBe('Logout sucessful.');
});


test("Login com credenciais corretas", async () => {
  const credentials = { email: sharedData.email, password: sharedData.password };
  const response = await fetch(apiUrl('login'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  expect(response.status).toBe(200);

  const data = await response.json();
  expect(data).toHaveProperty('access_token');
  expect(data).toHaveProperty('refresh_token');
  sharedData.access_token = data.access_token;
  sharedData.refresh_token = data.refresh_token;
});
