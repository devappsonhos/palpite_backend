const apiUrl = (endpoint) => `http://localhost:3000/api/v1/${endpoint}`;
const { sharedData } = require("./shared")


test("Criação de usuário", async () => {
  const { adminPermissionId, access_token } = sharedData;
  const userData = {
    name: 'Novo Usuário',
    email: 'novo.usuario@example.com',
    phone: '135846872',
    password: 'senha123',
    permissionId: adminPermissionId
  };
  const response = await fetch(apiUrl('user'), {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${access_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  expect(response.status).toBe(201);
  const newUser = await response.json()
  sharedData.newUserId = newUser.id
});

test("Buscar usuário por ID", async () => {
  const { userId, access_token } = sharedData;
  const response = await fetch(apiUrl(`user/${userId}`), {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${access_token}`,
    },
  });

  expect(response.status).toBe(200);
  const userData = await response.json();
  expect(userData).toHaveProperty('id');
  expect(userData.id).toBe(userId);
});

test("Atualizar usuário", async () => {
  const { userId, access_token, userPermissionId } = sharedData;
  const updatedUserData = {
    name: 'Novo Nome',
    email: 'novo.email@example.com',
    phone: '987654321',
    permissionId: userPermissionId 
  };
  const response = await fetch(apiUrl(`user/${userId}`), {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${access_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedUserData),
  });

  expect(response.status).toBe(200);
  const updatedUser = await response.json();
  expect(updatedUser).toHaveProperty('id');
  expect(updatedUser.id).toBe(userId);
  expect(updatedUser.name).toBe(updatedUserData.name);
  expect(updatedUser.email).toBe(updatedUserData.email);
  expect(updatedUser.phone).toBe(updatedUserData.phone);
});

test("Atualizar senha", async () => {
  const { userId, access_token } = sharedData;
  const updatedUserData = {
    password: 'novaSenhaForte'
  };
  const response = await fetch(apiUrl(`user/${userId}`), {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${access_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedUserData),
  });

  expect(response.status).toBe(200);
  const updatedUser = await response.json();
  expect(updatedUser).toHaveProperty('id');
  expect(updatedUser.id).toBe(userId);
});

test("Excluir usuário", async () => {
  const { userId, access_token } = sharedData;
  const response = await fetch(apiUrl(`user/${userId}`), {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${access_token}`,
    },
  });

  expect(response.status).toBe(200);
  const result = await response.json();
  expect(result).toEqual({ message: 'Usuário excluído com sucesso.' });
});
