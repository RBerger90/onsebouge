import cors from 'cors';
import express from 'express';
import { authRouter } from './routes/auth.js';
import { goalsRouter } from './routes/goals.js';
import { progressRouter } from './routes/progress.js';

export const app = express();

app.use(cors()); // autorise le front (autre origine) à appeler cette API
app.use(express.json()); // parse le corps JSON des requêtes entrantes dans req.body

app.use('/api/auth', authRouter);
app.use('/api/goals', goalsRouter);
app.use('/api/progress', progressRouter);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});
