const apiUrl = (endpoint) => `http://localhost:3000/api/v1/${endpoint}`;
const { sharedData } = require("./shared");

test("Criação de post", async () => {
  const newPostData = {
    title: 'Novo Post',
    content: { "key": "value" }
  };
  const response = await fetch(apiUrl('post'), {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${sharedData.access_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newPostData),
  });

  expect(response.status).toBe(201);
  const newPost = await response.json();
  sharedData.newPostId = newPost.id;
});

test("Buscar post por ID", async () => {
  const { newPostId, access_token } = sharedData;
  const response = await fetch(apiUrl(`post/${newPostId}`), {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${access_token}`,
    },
  });

  expect(response.status).toBe(200);
  const post = await response.json();
  expect(post).toHaveProperty('id', newPostId);
});

test("Atualizar post", async () => {
  const { newPostId, access_token } = sharedData;
  const updatedPostData = {
    title: 'Post atualizado',
    content: { "key": "new value" }
  };
  const response = await fetch(apiUrl(`post/${newPostId}`), {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${access_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedPostData),
  });

  expect(response.status).toBe(200);
  const updatedPost = await response.json();
  expect(updatedPost).toHaveProperty('id', newPostId);
  expect(updatedPost.title).toBe(updatedPostData.title);
  expect(updatedPost.content).toBe(updatedPostData.content);
});

test("Excluir post", async () => {
  const { newPostId, access_token } = sharedData;
  const response = await fetch(apiUrl(`post/${newPostId}`), {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${access_token}`,
    },
  });

  expect(response.status).toBe(204);
});
