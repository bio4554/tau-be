import config from "../app.config"
import { AppDataSource } from "../db/data-source";
import { User } from "../db/entity/User";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const createUser = async (user: User) => {
    const userRepository = AppDataSource.getRepository(User);
    if(await userRepository.findOneBy({name:user.name}))
        throw new Error("username taken")
    if (user.password)
        user.password = await hashPassword(user.password);
    else
        throw new Error('Password was empty');
    
    const newUser = await userRepository.save(user);
    newUser.password = undefined;
    return newUser;
}

export const login = async (username: string, password: string) => {
    if (!username || !password) {
        throw new Error('arguments were null for login')
    }
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({
        name: username
    });
    if (!user || !user.password)
        return undefined
    const matched = await checkPassword(user.password, password);
    if(matched){
        const token = jwt.sign({id:user.id!.toString(), username: user.name}, config.JwtKey, {
            expiresIn: '2 days',
        });
        user.password = undefined;
        return {user:user, token:token};
    }
    return undefined;
}

const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    return hashed;
}

const checkPassword = async (hashedPassword: string, password: string) => {
    const result = await bcrypt.compare(password, hashedPassword);
    return result;
}