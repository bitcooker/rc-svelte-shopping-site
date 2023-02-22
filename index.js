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

import { handler } from './client/build/handler.js'; // render client
app.use(handler);

import dotenv from 'dotenv';
dotenv.config('./.env');

import http from 'http';
const server = http.createServer(app);

server.listen(process.env.PORT, async () => {
  console.log(`Server started on port ${process.env.PORT}`);
});