const express = require('express');
const router = express.Router();
const {
  createGuessNumber,
  getGuessNumberById,
  updateGuessNumber,
  deleteGuessNumber, 
  getGuessNumbers
} = require('../../model/guessNumberModel');

// Rota para criar um novo guess_number
router.post('/guess_number', async (req, res) => {
  const { guessId, numberId } = req.body;
  try {
    const newGuessNumber = await createGuessNumber(guessId, numberId);
    res.status(201).json(newGuessNumber);
  } catch (error) {
    console.error("Erro ao criar guess_number:", error);
    res.status(500).json({ message: "Erro ao criar guess_number" });
  }
});

// Rota para buscar um guess_number por ID
router.get('/guess_number/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const guessNumber = await getGuessNumberById(id);
    res.status(200).json(guessNumber);
  } catch (error) {
    console.error("Erro ao buscar guess_number por ID:", error);
    res.status(500).json({ message: "Erro ao buscar guess_number por ID" });
  }
});

router.get('/guess_number', async (req, res) => {
  try {
      const filter = req.query;
      const dreams = await getGuessNumbers(filter);
      res.status(200).json(dreams);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

// Rota para atualizar um guess_number por ID
router.put('/guess_number/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const { guessId, numberId } = req.body;
  try {
    const updatedGuessNumber = await updateGuessNumber(id, { guessId, numberId });
    res.status(200).json(updatedGuessNumber);
  } catch (error) {
    console.error("Erro ao atualizar guess_number:", error);
    res.status(500).json({ message: "Erro ao atualizar guess_number" });
  }
});

// Rota para excluir um guess_number por ID
router.delete('/guess_number/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await deleteGuessNumber(id);
    res.status(200).json({ message: "guess_number excluído com sucesso." });
  } catch (error) {
    console.error("Erro ao excluir guess_number:", error);
    res.status(500).json({ message: "Erro ao excluir guess_number" });
  }
});

module.exports = router;
