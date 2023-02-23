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
        const queryResult: QueryResult = await pool.query(`SELECT * FROM users WHERE email = '${req.body.email as string}'`);
        
        if (queryResult.rowCount !== 0) return res.status(400).json(`A user with that email already exists.`);
        
        const salt = await bcrypt.genSalt(Number(config.SALT_ROUNDS));
        
        const hashedPw: string = await bcrypt.hash(req.body.password as string, salt);

        await pool.query(`INSERT INTO users(email, password, name) VALUES('${req.body.email as string}', '${hashedPw}', '${req.body.name as string}')`);
        return res.status(201).send();

    } catch (err) {
        return res.status(500).json(`Failed to create user. ${err}`);
    }
});

router.route('/').get(async (req: Request, res: Response) => {
    try {
        const queryResult: QueryResult = await pool.query(`SELECT * FROM users WHERE id = ${Number(req.query.id)}`);
        if (queryResult.rowCount === 0) return res.status(404).json(`No user found with that id.`);

        const { password, ...userBody } = queryResult.rows[0];
        return res.status(200).json(userBody);

    } catch (err) {
        return res.status(500).json(`Failed to get user. ${err}`);
    }
});

router.route('/').patch(async (req: Request, res: Response) => {
    try {
        const queryResult: QueryResult = await pool.query(`SELECT * FROM users WHERE id = ${Number(req.query.id)}`);
        if (queryResult.rowCount === 0) return res.status(404).json(`No user found with that id.`);

        const foundUser = queryResult.rows[0];

        for await (const [key, value] of Object.entries(req.body)) {
            if (foundUser[key] !== req.body[key]) {
                if (typeof value === "string") {
                    await pool.query(`UPDATE users SET ${key} = '${value}' WHERE id = ${Number(req.query.id)}`); // include quotes
                } else {
                    await pool.query(`UPDATE users SET ${key} = ${value} WHERE id = ${Number(req.query.id)}`);
                }
            }
        }

        return res.status(204).send();

    } catch (err) {
        return res.status(500).json(`Failed to update user. ${err}`);
    }
});

router.route('/').delete(async (req: Request, res: Response) => {
    try {
        const queryResult: QueryResult = await pool.query(`SELECT * FROM users WHERE id = ${Number(req.query.id)}`);
        if (queryResult.rowCount === 0) return res.status(404).json(`No user found with that id.`);

        await pool.query(`DELETE FROM users WHERE id = ${Number(req.query.id)}`);

        return res.status(204).send();

    } catch (err) {
        return res.status(500).json(`Failed to delete user. ${err}`);
    }
});

export default router;