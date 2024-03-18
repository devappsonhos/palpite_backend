const { queryDatabase } = require('../../../../app/model/db');
const { createHash } = require('../../../../app/model/common');

const { sharedData }  = require('./shared');

const apiUrl = (endpoint) => `http://localhost:3000/api/v1/${endpoint}`;

async function cleanTables() {
  const tables = [
    "number",
    "post",
    "bank",
    "dream",
    "client",
    "guess",
    "client_dream",
    "guess_number",
    "userAuth",
    "user",
    "permission",
  ];

  for (const table of tables) {
    await queryDatabase(table, 'deleteMany', {});
  }

}

async function createTestPermission() {
  const adminPermission = {
    name: 'Admin Teste',
    id: sharedData.adminPermissionId,
  };
  
  await queryDatabase('permission', 'create', {
    data: adminPermission
  });
  
  const userPermission = {
    name: 'User Teste',
    id: sharedData.userPermissionId,
  };

  await queryDatabase('permission', 'create', {
    data: userPermission
  });
}

async function createTestUser() {
  const hashedPassword = await createHash('senha123');
  const newUser = {
    name: 'Admin Teste',
    email: 'admin@admin.com',
    phone: '111225468',
    password: hashedPassword,
    inactive: false,
    permissionId: sharedData.adminPermissionId,
  };
  
  const user = await queryDatabase('user', 'create', {
    data: newUser
  });
  sharedData.userId = user.id;
  sharedData.email = 'admin@admin.com'
  sharedData.password = 'senha123'
}

async function createTestToken() {
  const newUser = {
    email: sharedData.email,
    password: sharedData.password
  };

  
  const response = await fetch(apiUrl('login'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUser),
  });
  const tokens = await response.json();
  
  sharedData.access_token = tokens.access_token;
  sharedData.refresh_token = tokens.refresh_token;
}


beforeAll(async () => {
  await cleanTables();
  await createTestPermission();
  await createTestUser();
  await createTestToken();
});

// Executa após todos os testes
afterAll(async () => {
  
});
