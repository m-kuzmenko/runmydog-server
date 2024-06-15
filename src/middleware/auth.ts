import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config'

const secret = process.env.token;

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, secret, (err, user) => {
      if (err) {
        return res.status(403).json({ error: 'Invalid token' });
      }
      // req.user = user;
      next();
    });
  } else {
    res.status(401).json({error: 'Authentication token required'});
  }
}
