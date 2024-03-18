const express = require('express');
const { createPermission, getPermissions, getPermissionById } = require('../../model/permissionModel');
const authenticateToken = require("./auth");

const router = express.Router();


router.post('/permission', authenticateToken, async (req, res) => {
  try {
    const { name, id } = req.body;
    const permission = await createPermission(id, name);
    res.status(201).json(permission);
  } catch (error) {
    console.error('Erro ao criar permissão:', error);
    res.status(500).json({ error: 'Erro ao criar permissão.' });
  }
});


router.get('/permissions', authenticateToken, async (req, res) => {
  try {
    const permissions = await getPermissions();
    res.status(200).json(permissions);
  } catch (error) {
    console.error('Erro ao obter permissões:', error);
    res.status(500).json({ error: 'Erro ao obter permissões.' });
  }
});

router.get('/permission/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const permission = await getPermissionById(id);
    if (!permission) {
      return res.status(404).json({ error: 'Permissão não encontrada.' });
    }
    res.status(200).json(permission);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar a permissão.' });
  }
});

module.exports = router;
