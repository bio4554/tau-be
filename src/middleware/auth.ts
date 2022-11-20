import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import config from '../app.config';

export interface CustomRequest extends Request {
  token: JwtPayload;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new Error('no token in request');
    }

    const decoded = jwt.verify(token, config.JwtAccessKey) as JwtPayload;
    (req as CustomRequest).token = decoded;

    next();
  } catch (err) {
    res.status(401).send('TOKEN INVALID');
  }
};
