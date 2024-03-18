const express = require('express');
const router = express.Router();
const {createDream, updateDream, deleteDream, getDreamById, getDreams } = require('../../model/dreamModel');

router.post('/dream', async (req, res) => {
    try {
        const newDream = req.body;
        const createdDream = await createDream(newDream);
        res.status(201).json(createdDream);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.put('/dream/:id', async (req, res) => {
    try {
        const dreamId = parseInt(req.params.id);
        const updatedDream = req.body;
        const result = await updateDream(dreamId, updatedDream);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.delete('/dream/:id', async (req, res) => {
    try {
        const dreamId = parseInt(req.params.id);
        const result = await deleteDream(dreamId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get('/dream/:id', async (req, res) => {
    try {
        const dreamId = parseInt(req.params.id);
        const dream = await getDreamById(dreamId);
        res.status(200).json(dream);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get('/dream', async (req, res) => {
    try {
        const filter = req.query;
        const dreams = await getAllDreams(filter);
        res.status(200).json(dreams);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
