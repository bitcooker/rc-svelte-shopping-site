import express from 'express';
const app = express();
app.use(express.urlencoded({ extended: false }));

import bodyParser from 'body-parser';
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

import cors from 'cors';
app.use(cors());

import userController from './controller/userController.js';
app.use('/api/user', userController);

import { handler } from '../../client/build/handler.js'; // render client
app.use(handler);

import http from 'http';
const server = http.createServer(app);

import config from './config/config.js';
server.listen(config.PORT, async () => {
  return console.log(`Server started on port ${config.PORT}`);
});