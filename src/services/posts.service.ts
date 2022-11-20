import config from '../app.config';
import { AppDataSource } from '../db/data-source';
import { User } from '../db/entity/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Post } from '../db/entity/Post';

export const createPost = async (post: Post, userId: number) => {
    const userRepository = AppDataSource.getRepository(User);
    const postRepository = AppDataSource.getRepository(Post);
    const user = await userRepository.findOneBy({ id: userId });
    if (!user) throw new Error('user not found');
    post.user = user;
    const newPost = await postRepository.save(post);
    return newPost;
};

export const getPosts = async (userId: number) => {
    const userRepository = AppDataSource.getRepository(User);
    const postsRepository = AppDataSource.getRepository(Post);
    const user = await userRepository.findOneBy({ id: userId });
    if (!user) throw new Error('user not found');
    const posts = await postsRepository.findBy({ user: user });
    return posts;
};
