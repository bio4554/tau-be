import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../db/data-source";
import { Post } from "../db/entity/Post";
import { User } from "../db/entity/User";
import { CustomRequest } from "../middleware/auth";
import * as postService from "../services/posts.service";

export const postNew = async (req: Request, res: Response, next: NextFunction) => {
    const { title, body } = req.body
    try {
        const token = (req as CustomRequest).token;
        if(!token)
            throw new Error();
        const post = new Post();
        post.body = body;
        post.title = title;
        const result = await postService.createPost(post, token.id)
        result.user = undefined;
        res.status(200).send(result);
    } catch (err) {
        console.log(err)
        res.status(500).send();
    }
}

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = (req as CustomRequest).token;
        if(!token)
            throw new Error();
        const posts = await postService.getPosts(token.id)
        if(!posts)
            throw new Error();
        res.status(200).send(posts);
    } catch (err) {
        console.log(err)
        res.status(500).send();
    }
}