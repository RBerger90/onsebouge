import { Router } from 'express';
import { createGoal, findGoalsById, findGoalsByUserId } from '../goals.js';
import { requireAuth } from '../middleware/require-auth.js';

export const goalsRouter = Router();

goalsRouter.get('/', requireAuth, async (req, res) => {
  if (!req.userId) {
    res.status(401).json({ error: 'Authentification requise.' });
    return;
  }
  const goals = await findGoalsByUserId(req.userId);
  res.json({ goals });
});

goalsRouter.post('/', requireAuth, async (req, res) => {
  if (!req.userId) {
    res.status(401).json({ error: 'Authentification requise.' });
    return;
  }

  const { goal } = req.body;
  await createGoal({ ...goal, userId: req.userId, id: crypto.randomUUID() });

  res.json({ message: 'Objectif créé.' });
});

goalsRouter.get('/:id', requireAuth, async (req, res) => {
  if (!req.userId) {
    res.status(401).json({ error: 'Authentification requise.' });
    return;
  }

  const goal = await findGoalsById(req.params.id as string);
  if (!goal) {
    res.status(404).json({ error: 'Objectif non trouvé.' });
    return;
  }
  if (goal.userId !== req.userId) {
    res.status(403).json({ error: 'Accès interdit à cet objectif.' });
    return;
  }
  res.json({ goal });
});
