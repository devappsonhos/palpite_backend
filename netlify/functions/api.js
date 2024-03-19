
import express, { Router } from "express";
import serverless from "serverless-http";
const app = require('../../app/app')

const serverlessApp = express();

serverlessApp.use(express.json());
serverlessApp.use('/',app)


const router = Router();
router.get("/hello", (req, res) => res.send("Hello World!"));

serverlessApp.use("/api", router);

export const handler = serverless(serverlessApp);
