import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization; // format attendu : "Bearer <token>"
  const token = authHeader?.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: 'Authentification requise.' });
    return;
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    req.userId = payload.userId;
    next(); // passe la main au handler de la route
  } catch {
    res.status(401).json({ error: 'Token invalide ou expiré.' });
  }
}
