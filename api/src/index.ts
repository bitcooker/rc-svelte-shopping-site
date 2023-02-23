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

import { handler } from '../../client/build/handler.js'; // render client
app.use('/client', handler);

import dotenv, { DotenvConfigOptions } from 'dotenv';
dotenv.config('./.env' as DotenvConfigOptions);

import http from 'http';
const server = http.createServer(app);

const port = process.env.PORT || 3000;

server.listen(port, async () => {
  return console.log(`Server started on port ${port}`);
});

import userController from './controller/userController.js';
app.use('/api/user', userController);