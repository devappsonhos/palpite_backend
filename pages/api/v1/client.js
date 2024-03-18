const express = require('express');
const router = express.Router();
const {createClient, getClientById, updateClient, deleteClient } = require('../../model/clientModel');

router.post('/client', async (req, res) => {
    try {
        const clientData = req.body;
        const newClient = await createClient(clientData);
        res.status(201).json(newClient);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/client/:id', async (req, res) => {
    try {
        const clientId = parseInt(req.params.id);
        const client = await getClientById(clientId);
        res.status(200).json(client);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.put('/client/:id', async (req, res) => {
    try {
        const clientId = parseInt(req.params.id);
        const clientData = req.body;
        const updatedClient = await updateClient(clientId, clientData);
        res.status(200).json(updatedClient);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.delete('/client/:id', async (req, res) => {
    try {
        const clientId = parseInt(req.params.id);
        await deleteClient(clientId);
        res.status(200).json({ message: 'Client deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
