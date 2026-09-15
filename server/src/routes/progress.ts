import { Router } from 'express';
import { findGoalsById } from '../goals.js';
import { requireAuth } from '../middleware/require-auth.js';
import { createProgressEntry, findProgressEntriesByGoalId } from '../progress.js';

export const progressRouter = Router();

progressRouter.post('/', requireAuth, async (req, res) => {
  if (!req.userId) {
    res.status(401).json({ error: 'Authentification requise.' });
    return;
  }
  const { entry } = req.body;
  const goal = await findGoalsById(entry.goalId);

  if (!goal || goal.userId !== req.userId) {
    res.status(403).json({ error: 'Accès interdit à cet objectif.' });
    return;
  }
  await createProgressEntry({ ...entry, id: crypto.randomUUID() });

  res.json({ message: 'Entrée de progression créée.' });
});

progressRouter.get('/', requireAuth, async (req, res) => {
  if (!req.userId) {
    res.status(401).json({ error: 'Authentification requise.' });
    return;
  }

  const progresses = findProgressEntriesByGoalId(req.query.goalId as string);
  res.json({ progresses });
});
