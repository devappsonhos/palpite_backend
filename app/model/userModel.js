const { queryDatabase } = require('./db');
const { createHash } = require('./common');

async function findUsers(options) {
  try {
    const users = await queryDatabase('user', 'findMany', options);
    return users;
  } catch (error) {
    throw error;
  }
}

async function findUserById(id) {
  try {
    const user = await queryDatabase('user', 'findUnique', { where: { id } });
    return user;
  } catch (error) {
    throw error;
  }
}

async function createUser(data) {
  try {
    const { name, email, phone, password, inactive, permissionId } = data;
    const hashedPassword = await createHash(password);
    const newUser = await queryDatabase('user', 'create', {
      data: {
        name,
        email,
        phone,
        password: hashedPassword,
        inactive,
        permissionId,
      },
    });
    return newUser;
  } catch (error) {
    throw error;
  }
}

async function updateUser(id, data) {
  try {
    const { password } = data;
    if ( password ) {
      const hashedPassword = await createHash(password);
      data.password = hashedPassword
    }
    const updatedUser = await queryDatabase('user', 'update', {
      where: { id },
      data: data,
    });
    return updatedUser;
  } catch (error) {
    throw error;
  }
}

async function deleteUser(id) {
  try {
    await queryDatabase('user', 'delete', { where: { id } });
  } catch (error) {
    throw error;
  }
}

module.exports = {
  findUsers,
  findUserById,
  createUser,
  updateUser,
  deleteUser,
};
