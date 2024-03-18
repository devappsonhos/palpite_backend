const express = require('express');
const { queryDatabase } = require('../../model/db');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();

async function compareHash(hashedWord, compareWord) {
  try {
    return await bcrypt.compare(compareWord, hashedWord);
  } catch (error) {
    throw error;
  }
}

function generateToken(payload) {
  return jwt.sign(payload, process.env.ACCESS_TOKEN, { expiresIn: '1h' });
}

async function updateRefreshToken(user, refreshToken) {
  try {
    const userAuth = await queryDatabase('userAuth', 'findUnique', {
      where: { userId: user.id }
    });
    const hashToken = await bcrypt.hash(refreshToken, 10);
    if (userAuth) {
      await queryDatabase('userAuth', 'update', {
        where: { userId: user.id },
        data: { refreshToken: hashToken }
      });
    } else {
      await queryDatabase('userAuth', 'create', {
        data: { userId: user.id, refreshToken: hashToken }
      });
    }
  } catch (error) {
    throw error;
  }
}

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await queryDatabase('user', 'findUnique', { where: { email } });
    if (!user) {
      return res.status(400).json('Wrong user or password.');
    }
    const isCorrectPassword = await compareHash(user.password, password);
    if (!isCorrectPassword) {
      return res.status(400).json('Wrong user or password.');
    }
    const tokenUser = { id: user.id, permissionId: user.permissionId };
    const accessToken = generateToken(tokenUser);
    const refreshToken = jwt.sign(tokenUser, process.env.REFRESH_TOKEN);
    await updateRefreshToken(tokenUser, refreshToken);

    res.status(200).json({ "access_token": accessToken, "refresh_token": refreshToken });
  } catch (error) {
    res.status(500).json("Server error");
  }
});

router.post('/token', async (req, res) => {
  try {
    const { token } = req.body;
    if ( token == null ) return res.status(401).json("Need to send a token")
    const user = jwt.verify(token, process.env.REFRESH_TOKEN)
    const userAuth = user && await queryDatabase('userAuth', 'findUnique', { 
      where: { userId: user.id}
    })
    if ( userAuth == null ) return res.status(403).json("Not allowed.")
    const isValidToken = await bcrypt.compare(token, userAuth.refreshToken)
    if ( !isValidToken ) return res.status(403).json("Invalid Token")
    const accessToken = generateToken({ id: user.id, permissionId: user.permissionId })
    return res.status(200).json({ "access_token": accessToken })
  } catch (error) {
    res.status(500).json("Server error");
  }
});

router.post('/logout', async (req, res) => {
  try {
    const { token } = req.body;
    if ( token == null ) return res.status(401).json("Need to send a token")
    const user = jwt.verify(token, process.env.REFRESH_TOKEN)
    await queryDatabase('userAuth', 'delete', { where: { userId: user.id}})
    res.status(200).json("Logout sucessful.");
  } catch (error) {
    res.status(500).json("Server error");
  }
});

module.exports = router;
