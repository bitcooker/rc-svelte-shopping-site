import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import pg, { QueryResult } from 'pg';
const { Pool } = pg;

const pool = new Pool({
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DB,
    user: process.env.PG_USER,
    password: process.env.PG_PW
});

console.log(process.env.PG_PW);


const router = express.Router();
router.use(express.json());

router.route('/').post(async (req: Request, res: Response) => {
    try {
        const foundUser: QueryResult = await pool.query(`SELECT * FROM users WHERE email = ${req.body.email as string}`);
        if (foundUser) return res.status(400).json(`An account with that email already exists.`);
        
        const salt: string = await bcrypt.genSalt(process.env.SALT_ROUNDS);
        const hashedPw: string = await bcrypt.hash(req.body.password as string, salt);

    } catch (err) {
        return res.status(500).json(`Failed to create user. ${err}`);
    }
});

export default router;