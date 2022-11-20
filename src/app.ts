import * as dotenv from 'dotenv';
dotenv.config();
import config from './app.config';
import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import 'reflect-metadata';
import { AppDataSource } from './db/data-source';
import { User } from './db/entity/User';
import routes from './routes';
import cookieParser from 'cookie-parser';

AppDataSource.initialize()
    .then(() => {
        console.log('init db success');
    })
    .catch((error) => console.log(error));

function loggerMiddleware(req: Request, res: Response, next: NextFunction): void {
    console.log(`${req.method} ${req.url}`);
    console.log(req.cookies);
    next();
}

const app = express();
const port = parseInt(config.Port);
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(loggerMiddleware);

app.use('/', routes);

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
