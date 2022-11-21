import config from '../app.config';
import { AppDataSource } from '../db/data-source';
import { User } from '../db/entity/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as tokenService from './token.service';
import { RefreshAuth } from '../db/entity/RefreshAuth';

export const createUser = async (user: User) => {
    const userRepository = AppDataSource.getRepository(User);
    if (await userRepository.findOneBy({ username: user.username }))
        throw new Error('username taken');
    if (user.password) user.password = await hashPassword(user.password);
    else throw new Error('Password was empty');

    const newUser = await userRepository.save(user);
    newUser.password = undefined;
    return newUser;
};

export const login = async (username: string, password: string) => {
    if (!username || !password) {
        throw new Error('arguments were null for login');
    }
    const userRepository = AppDataSource.getRepository(User);
    const refreshAuthRepository = AppDataSource.getRepository(RefreshAuth);
    const user = await userRepository.findOneBy({
        username: username,
    });
    if (!user || !user.password) return undefined;
    const matched = await checkPassword(user.password, password);
    if (matched) {
        // invalidate all current refresh tokens

        await AppDataSource.createQueryBuilder()
            .update(RefreshAuth)
            .set({ valid: false })
            .where('userId = :id', { id: user.id })
            .execute();

        const accessToken = await tokenService.signJwt(user, 'access');
        const refreshToken = await tokenService.signJwt(user, 'refresh');
        user.password = undefined;
        return { user: user, accessToken: accessToken, refreshToken: refreshToken };
    }
    return undefined;
};

export const usernameTaken = async (username: string) => {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ username: username });
    if (user) {
        return true;
    }
    return false;
};

export const getUser = async (userId: number) => {
    const userRepository = AppDataSource.getRepository(User);
    return await userRepository.findOneBy({ id: userId });
};

const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    return hashed;
};

const checkPassword = async (hashedPassword: string, password: string) => {
    const result = await bcrypt.compare(password, hashedPassword);
    return result;
};
