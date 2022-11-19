import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../db/data-source";
import { User } from "../db/entity/User";

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