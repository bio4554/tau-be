import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../db/data-source";
import { User } from "../db/entity/User";
import * as userService from "../services/users.service";

export const login = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body
    try {
        const response = await userService.login(username, password);
        if(response)
            res.status(200).send(response)
        res.status(401).send()
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
}