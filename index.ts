const express = require('express');
const app = express();
const bodyParser = require('body-parser')
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.urlencoded({ extended: false }));

const cors = require('cors');
app.use(cors());

const dotenv = require('dotenv');
dotenv.config('./.env');

const server = require('http').createServer(app);

server.listen(process.env.PORT, async () => {
  console.log(`Server started on port ${process.env.PORT}`);
});

const Pool = require('pg').Pool;

const pool = new Pool({
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DB,
    user: process.env.PG_USER,
    password: process.env.PG_PW,
});



pool.query('SELECT * FROM users ORDER BY id ASC', (error: Error, results: any) => {
    if (error) {
        throw error;
    }
    console.log(results.rows);
});