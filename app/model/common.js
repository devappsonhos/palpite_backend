const bcrypt = require("bcrypt");


async function createHash(word) {
  try {
    return await bcrypt.hash(word, 10);
  } catch (error) {
    throw error;
  }
}


module.exports = {
  createHash
}
