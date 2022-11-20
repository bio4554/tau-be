import config from '../app.config';
import { User } from '../db/entity/User';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { RefreshAuth } from '../db/entity/RefreshAuth';
import { AppDataSource } from '../db/data-source';
import { auth } from '../middleware/auth';

export const signJwt = async (user: User, jwtType: 'refresh' | 'access') => {
  if (jwtType == 'access') {
    const token = jwt.sign(
      { id: user.id!.toString(), username: user.name },
      config.JwtAccessKey,
      {
        expiresIn: '30 minutes'
      }
    );
    return token;
  } else {
    if (!user.id) throw new Error('bad user id');
    const authRepository = AppDataSource.getRepository(RefreshAuth);
    const refreshAuth = new RefreshAuth();
    refreshAuth.userId = user.id;
    refreshAuth.valid = true;
    const result = await authRepository.save(refreshAuth);
    const token = jwt.sign({ id: result.id }, config.JwtRefreshKey, {
      expiresIn: '20 days'
    });
    return token;
  }
};

export const verifyJwt = async (token: string, jwtType: 'refresh' | 'access') => {
  if (jwtType == 'access') {
    const decoded = jwt.verify(token, config.JwtAccessKey) as JwtPayload;
    return decoded;
  } else {
    const decoded = jwt.verify(token, config.JwtRefreshKey) as JwtPayload;
    return decoded;
  }
};
