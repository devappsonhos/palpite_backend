// number.js

const express = require('express');
const { createNumber, getNumberById, updateNumber, deleteNumber, getNumbers } = require('../../model/numberModel');

const router = express.Router();

// Endpoint para criar um número
router.post('/number', async (req, res) => {
  try {
    const { number, hundreds, tens } = req.body;
    const newNumber = await createNumber({ number, hundreds, tens });
    res.status(201).json(newNumber);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint para buscar um número por ID
router.get('/number/:id', async (req, res) => {
  try {
    const numberId = parseInt(req.params.id);
    const number = await getNumberById(numberId);
    if (number) {
      res.status(200).json(number);
    } else {
      res.status(404).json({ message: 'Number not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/number', async (req, res) => {
  try {
      const filter = req.query;
      const dreams = await getNumbers(filter);
      res.status(200).json(dreams);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

// Endpoint para atualizar um número por ID
router.put('/number/:id', async (req, res) => {
  try {
    const numberId = parseInt(req.params.id);
    const { number, hundreds, tens } = req.body;
    const updatedNumber = await updateNumber(numberId, { number, hundreds, tens });
    res.status(200).json(updatedNumber);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint para excluir um número por ID
router.delete('/number/:id', async (req, res) => {
  try {
    const numberId = parseInt(req.params.id);
    await deleteNumber(numberId);
    res.status(200).json({ message: 'Number deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
