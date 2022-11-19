import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../db/data-source";
import { User } from "../db/entity/User";
import * as userService from "../services/users.service"

export const getById = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);

    const userRepository = AppDataSource.getRepository(User);
    try {
        const user = await userRepository.findOneBy({
            id: id,
        })
        if (!user) {
            res.status(404).send(`could not find user id: ${id}`)
        }
        res.status(200).send(user);
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
}

export const postNew = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = new User();
        const body = req.body;
        user.name = req.body.name;
        user.password = req.body.password;
        const response = await userService.createUser(user);
        res.status(201).send(response)
    } catch (err) {
        console.log(err)
        res.status(500).send()
    }
}