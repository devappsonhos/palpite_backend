const { queryDatabase } = require('./db');

async function createPermission(id, name) {
  try {
    const permission = await queryDatabase('permission', 'create', { 
      data: { 
        id: parseInt(id), 
        name 
      } 
    });
    return permission;
  } catch (error) {
    throw error;
  }
}

async function getPermissions() {
  try {
    const permissions = await queryDatabase('permission', 'findMany');
    return permissions;
  } catch (error) {
    throw error;
  }
}

async function getPermissionById(id) {
  try {
    const permission = await queryDatabase('permission', 'findUnique', { where: { id: parseInt(id) } });
    return permission;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createPermission,
  getPermissions,
  getPermissionById,
};
