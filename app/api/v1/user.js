const express = require('express');
const { findUsers, findUserById, createUser, updateUser, deleteUser } = require('../../model/userModel');
const authenticateToken = require("./auth");

const router = express.Router();

router.get('/user', authenticateToken, async (req, res) => {
  try {
    const users = await findUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao obter os usuários.' });
  }
});

router.get('/user/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await findUserById(parseInt(id));
    if (!user) {
      res.status(404).json({ error: 'Usuário não encontrado.' });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao obter o usuário.' });
  }
});

router.post('/user', authenticateToken, async (req, res) => {
  try {
    const userData = req.body;
    const newUser = await createUser(userData);
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar o usuário.' });
  }
});

router.put('/user/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userData = req.body;
    const updatedUser = await updateUser(parseInt(id), userData);
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar o usuário.' });
  }
});

router.delete('/user/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    await deleteUser(parseInt(id));
    res.status(200).json({ message: 'Usuário excluído com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao excluir o usuário.' });
  }
});

module.exports = router;
