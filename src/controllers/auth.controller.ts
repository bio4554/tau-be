import { NextFunction, Request, Response } from 'express';
import { AppDataSource } from '../db/data-source';
import { User } from '../db/entity/User';
import * as userService from '../services/users.service';
import * as authService from '../services/auth.service';
import * as tokenService from '../services/token.service';

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;
  try {
    const result = await userService.login(username, password);
    if (result) {
      const response = { user: result.user, accessToken: result.accessToken };
      res.cookie('refreshToken', result.refreshToken);
      res.status(200).send(response);
      return;
    }

    res.status(401).send();
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
};

export const refresh = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cookie = req.cookies.refreshToken;
  console.log(cookie);
  try {
    const token = await tokenService.verifyJwt(cookie, 'refresh');
    const newToken = await authService.refreshToken(token.id);
    if (!newToken) {
      res.status(401).send();
      return;
    }

    res.status(200).send({ accessToken: newToken });
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
};
