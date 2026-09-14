import bcrypt from 'bcrypt';
import cors from 'cors';
import express from 'express';
import jwt from 'jsonwebtoken';
import { createUser, findUserByEmail } from './users.js';

export const app = express();

app.use(cors()); // autorise le front (autre origine) à appeler cette API
app.use(express.json()); // parse le corps JSON des requêtes entrantes dans req.body

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/auth/register', async (req, res) => {
  const { email, password } = req.body;

  if (findUserByEmail(email)) {
    res.status(409).json({ error: 'Un compte existe déjà avec cet email.' });
    return;
  }

  const passwordHash = await bcrypt.hash(password, 10); // 10 = coût du calcul (plus haut = plus lent = plus sûr)
  createUser({ id: crypto.randomUUID(), email, passwordHash });

  res.status(201).json({ message: 'Compte créé.' });
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  const user = findUserByEmail(email);
  if (!user) {
    res.status(401).json({ error: 'Email ou mot de passe incorrect.' });
    return;
  }

  const isValid = await bcrypt.compare(password, user.passwordHash); // compare le mot de passe reçu au hash stocké
  if (!isValid) {
    res.status(401).json({ error: 'Email ou mot de passe incorrect.' });
    return;
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '7d' });
  res.json({ token });
});
