import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import pgarray from 'pg-array';
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

router.route('/').post(
    body('name').trim().not().isEmpty().escape(),
    body('price').trim().not().isEmpty().isNumeric(),
    body('categories').not().isEmpty(),
    body('sizes').not().isEmpty(),
    body('image_url').trim().not().isEmpty().isURL(),
    async (req: Request, res: Response) => {
    try {
        const queryResult: QueryResult = await pool.query(`SELECT * FROM products WHERE name = '${req.body.name as string}'`);
        
        if (queryResult.rowCount !== 0) return res.status(400).json(`A product with that name already exists.`);
        
        await pool.query(`INSERT INTO products(name, price, categories, sizes, image_url) VALUES('${req.body.name as string}', ${req.body.price as number}, '${pgarray(req.body.categories)}', '${pgarray(req.body.sizes)}', ${req.body.image_url ? `${req.body.image_url}` : null})`);
        return res.status(201).send();

    } catch (err) {
        return res.status(500).json(`Failed to create product. ${err}`);
    }
});

router.route('/').get(async (req: Request, res: Response) => {
    try {
        const queryResult: QueryResult = await pool.query(`SELECT * FROM products WHERE id = ${Number(req.query.id)}`);
        if (queryResult.rowCount === 0) return res.status(404).json(`No product found with that id.`);

        const { password, ...productBody } = queryResult.rows[0];
        return res.status(200).json(productBody);

    } catch (err) {
        return res.status(500).json(`Failed to get product. ${err}`);
    }
});

router.route('/').patch(
    body('name').trim().escape(),
    body('price').trim().isNumeric(),
    body('categories').trim(),
    body('sizes'),
    body('image_url').trim().isURL(),
    async (req: Request, res: Response) => {
    try {
        const queryResult: QueryResult = await pool.query(`SELECT * FROM products WHERE id = ${Number(req.query.id)}`);
        if (queryResult.rowCount === 0) return res.status(404).json(`No product found with that id.`);

        const foundUser = queryResult.rows[0];

        for await (const [key, value] of Object.entries(req.body)) {
            if (foundUser[key] !== req.body[key]) {
                if (typeof value === "string") {
                    await pool.query(`UPDATE products SET ${key} = '${value}' WHERE id = ${Number(req.query.id)}`); // include quotes
                } else {
                    await pool.query(`UPDATE products SET ${key} = ${value} WHERE id = ${Number(req.query.id)}`);
                }
            }
        }

        return res.status(204).send();

    } catch (err) {
        return res.status(500).json(`Failed to update product. ${err}`);
    }
});

router.route('/').delete(async (req: Request, res: Response) => {
    try {
        const queryResult: QueryResult = await pool.query(`SELECT * FROM products WHERE id = ${Number(req.query.id)}`);
        if (queryResult.rowCount === 0) return res.status(404).json(`No product found with that id.`);

        await pool.query(`DELETE FROM products WHERE id = ${Number(req.query.id)}`);

        return res.status(204).send();

    } catch (err) {
        return res.status(500).json(`Failed to delete product. ${err}`);
    }
});

export default router;