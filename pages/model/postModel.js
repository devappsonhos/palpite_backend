// postModel.js
const { queryDatabase } = require('./db');

async function createPost(data) {
  try {
    const post = await queryDatabase('post', 'create', { data });
    return post;
  } catch (error) {
    throw error;
  }
}

async function updatePost(id, data) {
  try {
    const post = await queryDatabase('post', 'update', { where: { id }, data });
    return post;
  } catch (error) {
    throw error;
  }
}

async function deletePost(id) {
  try {
    await queryDatabase('post', 'delete', { where: { id } });
  } catch (error) {
    throw error;
  }
}

async function getPosts(filter) {
  try {
    const posts = await queryDatabase('post', 'findMany', { where: filter });
    return posts;
  } catch (error) {
    throw error;
  }
}

async function getPostById(id) {
  try {
    const post = await queryDatabase('post', 'findUnique', { where: { id } });
    return post;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createPost,
  updatePost,
  deletePost,
  getPosts,
  getPostById,
};
