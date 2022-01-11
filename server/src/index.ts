import cors from 'cors';
import studentRouter from './routes/Student.route';
import clientKeys from './firebase/clientKeys.util';
import express, { Request, Response } from 'express';

const app = express();

const PORT = process.env.PORT || 4000;

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

app.get('/routes/private/client_keys', (req: Request, res: Response) => { res.status(200).send(clientKeys); });

/** Routing Middlewares */
app.use('/users/students', studentRouter);

app.listen(PORT, () => console.log(`listening on port ${PORT}...`));
