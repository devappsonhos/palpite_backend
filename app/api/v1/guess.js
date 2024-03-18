const express = require('express');
const router = express.Router();
const { createGuess, deleteGuess, getGuessById, getGuesses } = require('../../model/guessModel');

// Rota para criar uma nova guess
router.post('/guess', async (req, res) => {
  try {
    const { clientId, type, guess } = req.body;
    const newGuess = await createGuess(clientId, type, guess);
    res.status(201).json(newGuess);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/guess/:id', async (req, res) => {
  const guessId = parseInt(req.params.id);
  const { type, guess } = req.body;
  try {
    const updatedGuess = await updateGuess(guessId, { type, guess });
    res.status(200).json(updatedGuess);
  } catch (error) {
    console.error("Erro ao atualizar a guess:", error);
    res.status(500).json({ message: "Erro ao atualizar a guess" });
  }
});

// Rota para excluir uma guess por ID
router.delete('/guess/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await deleteGuess(parseInt(id));
    res.status(200).json({ message: 'Guess deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Rota para buscar uma guess por ID
router.get('/guess/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const guess = await getGuessById(parseInt(id));
    if (!guess) {
      res.status(404).json({ error: 'Guess not found.' });
    } else {
      res.status(200).json(guess);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/guess', async (req, res) => {
  try {
      const filter = req.query;
      const dreams = await getGuesses(filter);
      res.status(200).json(dreams);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

module.exports = router;
