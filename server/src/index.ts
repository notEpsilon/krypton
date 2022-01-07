import express from 'express';
import professorRouter from './routes/Proffessor.route';
import studentRouter from './routes/Student.route';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

/** Routing Middlewares */
app.use('/users/students', studentRouter);
app.use('/users/professors', professorRouter)

app.listen(PORT, () => console.log(`listening on port ${PORT}...`));
