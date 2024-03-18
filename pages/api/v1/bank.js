const express = require('express');
const { createBank, getBankById, getAllBanks, deleteBank } = require('../../model/bankModel');

const router = express.Router();

router.post('/bank', async (req, res) => {
  try {
    const bankData = req.body;
    const createdBank = await createBank(bankData);
    res.status(201).json(createdBank);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar o banco.' });
  }
});

router.get('/bank/:id', async (req, res) => {
  try {
    const bankId = parseInt(req.params.id);
    const bank = await getBankById(bankId);
    if (!bank) {
      return res.status(404).json({ error: 'Banco não encontrado.' });
    }
    res.status(200).json(bank);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter o banco.' });
  }
});

router.get('/bank', async (req, res) => {
  try {
    const { filter } = req.query;
    const banks = await getAllBanks(filter);
    res.status(200).json(banks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao obter as bancas.' });
  }
});

router.delete('/bank/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await deleteBank(id);
    res.status(200).json({ message: 'Banca excluída com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao deletar a banca.' });
  }
});


module.exports = router;
