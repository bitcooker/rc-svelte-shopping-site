import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import pg, { QueryResult } from 'pg';
import config from '../config/config.js';
const { Pool } = pg;

const pool = new Pool({
    host: config.PG_HOST,
    port: config.PG_PORT,
    database: config.PG_DB,
    user: config.PG_USER,
    password: config.PG_PW
});


const router = express.Router();
router.use(express.json());

router.route('/').post(async (req: Request, res: Response) => {
    try {
        const foundUser: QueryResult = await pool.query(`SELECT * FROM users WHERE email = '${req.body.email as string}'`);
        
        if (foundUser.rowCount !== 0) return res.status(400).json(`An account with that email already exists.`);
        
        const salt = await bcrypt.genSalt(Number(config.SALT_ROUNDS));
        
        const hashedPw: string = await bcrypt.hash(req.body.password as string, salt);

        await pool.query(`INSERT INTO users(email, password, name) VALUES('${req.body.email as string}', '${hashedPw}', '${req.body.name as string}')`);
        return res.status(201).send();

    } catch (err) {
        return res.status(500).json(`Failed to create user. ${err}`);
    }
});

export default router;