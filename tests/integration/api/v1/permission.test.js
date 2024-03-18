const { getRandomInt, sharedData } = require("./shared")

const apiUrl = (endpoint) => `http://localhost:3000/api/v1/${endpoint}`;


test("Cria nova permissão", async () => {
  sharedData.newPermissionId = getRandomInt(9999)
  const new_permission = {name: 'permissionTest', id: sharedData.newPermissionId}
  const response = await fetch(apiUrl('permission'), {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${sharedData.access_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(new_permission),
  });
  expect(response.status).toBe(201);
});

test('Buscar todas as permissões', async () => {
  const response = await fetch(apiUrl('permissions'), {
    headers: {
      'Authorization': `Bearer ${sharedData.access_token}`,
      'Content-Type': 'application/json',
    }, 
});
  const permissions = await response.json();
  expect(response.status).toBe(200);
  expect(Array.isArray(permissions)).toBe(true);
  expect(permissions.length).toBeGreaterThan(0);
});


test('Buscar uma permissão pelo ID', async () => {
  const permissionId = sharedData.newPermissionId;
  const response = await fetch(apiUrl(`permission/${permissionId}`), {
    headers: {
      'Authorization': `Bearer ${sharedData.access_token}`,
      'Content-Type': 'application/json',
    }, 
});
  const permission = await response.json();
  expect(response.status).toBe(200);
  expect(permission.id).toBe(permissionId);
});


test('Buscar uma permissão inexistente pelo ID', async () => {
  const permissionId = sharedData.newPermissionId + 5;
  const response = await fetch(apiUrl(`permission/${permissionId}`), {
    headers: {
      'Authorization': `Bearer ${sharedData.access_token}`,
      'Content-Type': 'application/json',
    }, 
});
  const permission = await response.json();
  expect(response.status).toBe(404);
  expect(permission.error).toBe('Permissão não encontrada.');
});
