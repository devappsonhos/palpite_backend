
const bankRouter = require('./api/v1/bank') 
const clientRouter = require('./api/v1/client') 
const clientDreamRouter = require('./api/v1/clientDream') 
const dreamRouter = require('./api/v1/dream') 
const guessRouter = require('./api/v1/guess') 
const guessNumberRouter = require('./api/v1/guessNumber') 
const loginRouter = require('./api/v1/login')
const numberRouter = require('./api/v1/number') 
const permissionRouter = require('./api/v1/permission')
const postRouter = require('./api/v1/post')
const statusRouter = require('./api/v1/status')
const userRouter = require('./api/v1/user');

const express = require('express')

require('dotenv').config();


const app = express();
app.use(express.json());

app.use(process.env.API_PREFIX, [
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

const PORT = process.env.PORT || 3000;

function showRoutes() {
  console.log('Rotas disponíveis:');
  app._router.stack.forEach((middleware) => {
    if (middleware.route) {
      const { methods, path } = middleware.route;
      console.log(`${Object.keys(methods).join(', ').toUpperCase()}: ${process.env.API_PREFIX}${path}`);
    } else if (middleware.name === 'router') {
      middleware.handle.stack.forEach((handler) => {
        const { methods, path } = handler.route;
        console.log(`${Object.keys(methods).join(', ').toUpperCase()}: ${process.env.API_PREFIX}${path}`);
      });
    }
  });
}

app.listen(PORT, () => {
  console.log(`Servidor está rodando na porta ${PORT}`);
  showRoutes()
  console.log(`_____ Resultado de Requisições _____`);
});
