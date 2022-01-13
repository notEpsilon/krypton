import cors from 'cors';
import studentRouter from './routes/Student.route';
import clientKeys from './firebase/clientKeys.util';
import express, { Request, Response } from 'express';
import { randomBytes } from 'crypto';

const app = express();

const PORT = process.env.PORT || 4000;

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

app.get('/routes/private/client_keys', (req: Request, res: Response) => { res.status(200).send(clientKeys); });
app.get('/rand', (req: Request, res: Response) => { res.status(200).send(randomBytes(10).toString('hex')); });

/** Routing Middlewares */
app.use('/users/students', studentRouter);

app.listen(PORT, () => console.log(`listening on port ${PORT}...`));
