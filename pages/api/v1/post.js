// post.js
const express = require('express');
const router = express.Router();
const { createPost, updatePost, deletePost, getPosts, getPostById } = require('../../model/postModel');

// Rota para criar um novo post
router.post('/post', async (req, res) => {
  try {
    const postData = req.body;
    const newPost = await createPost(postData);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar o post.' });
  }
});

// Rota para atualizar um post existente
router.put('/post/:id', async (req, res) => {
  try {
    const postId = parseInt(req.params.id);
    const postData = req.body;
    const updatedPost = await updatePost(postId, postData);
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar o post.' });
  }
});

// Rota para excluir um post
router.delete('/post/:id', async (req, res) => {
  try {
    const postId = parseInt(req.params.id);
    await deletePost(postId);
    res.status(200).json({ message: 'Post excluído com sucesso.' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir o post.' });
  }
});

// Rota para buscar todos os post
router.get('/post', async (req, res) => {
  try {
    const post = await getPosts(req.query.filter || {});
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter os post.' });
  }
});

// Rota para buscar um post por ID
router.get('/post/:id', async (req, res) => {
  try {
    const postId = parseInt(req.params.id);
    const post = await getPostById(postId);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter o post.' });
  }
});

module.exports = router;
