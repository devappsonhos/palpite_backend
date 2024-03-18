const express = require('express');
const router = express.Router();
const { createClientDream, deleteClientDream, getClientDreamById } = require('../../model/clientDreamModel');

// Rota para criar uma nova relação client_dream
router.post('/client_dream', async (req, res) => {
  try {
    const { clientId, dreamId } = req.body;
    const newClientDream = await createClientDream(clientId, dreamId);
    res.status(201).json(newClientDream);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Rota para excluir uma relação client_dream
router.delete('/client_dream/:clientId/:dreamId', async (req, res) => {
  try {
    const { clientId, dreamId } = req.params;
    await deleteClientDream(parseInt(clientId), parseInt(dreamId));
    res.status(200).json({ message: 'Client-Dream relationship deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Rota para buscar uma relação client_dream por ID
router.get('/client_dream/:clientId/:dreamId', async (req, res) => {
  try {
    const { clientId, dreamId } = req.params;
    const clientDream = await getClientDreamById(parseInt(clientId), parseInt(dreamId));
    if (!clientDream) {
      res.status(404).json({ error: 'Client-Dream relationship not found.' });
    } else {
      res.status(200).json(clientDream);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
