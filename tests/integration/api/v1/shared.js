const sharedData = {
  adminPermissionId: 1,
  userPermissionId: 2,
  userId: null,
};

const getRandomInt = (max, min = 1) => Math.floor(Math.random() * (max - min + 1)) + min;

const apiUrl = (endpoint) => `http://localhost:3000/api/v1/${endpoint}`;

module.exports = { 
  sharedData, 
  getRandomInt, 
  apiUrl
}
