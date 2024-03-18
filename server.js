
const bankRouter = require('./pages/api/v1/bank') 
const clientRouter = require('./pages/api/v1/client') 
const clientDreamRouter = require('./pages/api/v1/clientDream') 
const dreamRouter = require('./pages/api/v1/dream') 
const guessRouter = require('./pages/api/v1/guess') 
const guessNumberRouter = require('./pages/api/v1/guessNumber') 
const loginRouter = require('./pages/api/v1/login')
const numberRouter = require('./pages/api/v1/number') 
const permissionRouter = require('./pages/api/v1/permission')
const postRouter = require('./pages/api/v1/post')
const statusRouter = require('./pages/api/v1/status')
const userRouter = require('./pages/api/v1/user');


const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const appNext = next({ dev });
const handleNext = appNext.getRequestHandler();

appNext.prepare().then(() => {
  const appExpress = express();

  // Configurar o middleware do Express aqui
  appExpress.use(express.json());
  appExpress.use(express.urlencoded({ extended: true }));

  appExpress.use(process.env.API_PREFIX, [
    bankRouter,
    clientRouter,
    clientDreamRouter, 
    dreamRouter,
    guessRouter, 
    guessNumberRouter, 
    loginRouter, 
    numberRouter, 
    permissionRouter, 
    postRouter, 
    statusRouter,
    userRouter
  ]); 

  // Definir rotas do Express aqui, se necessário
  appExpress.get(process.env.API_PREFIX, (req, res) => {
    // Lógica para lidar com a rota do Express
    res.json({ message: 'API endpoint reached' });
  });

  // Encaminhar todas as outras solicitações para o Next.js
  appExpress.all('*', (req, res) => {
    return handleNext(req, res);
  });

  // Iniciar o servidor Express
  const PORT = process.env.PORT || 3000;
  appExpress.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});
