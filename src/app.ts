import * as dotenv from 'dotenv'
dotenv.config();
import express from 'express';
import helmet from 'helmet'
import "reflect-metadata"
import { AppDataSource } from './data-source';
import { User } from './entity/User';

console.log(process.env)
AppDataSource.initialize()
    .then(() => {
        console.log("init db success");
    })
    .catch((error) => console.log(error))


const app = express();
const port = 3000;
app.use(helmet())
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/', async (req, res) => {
    const user = new User();
    const body = req.body;
    user.name = req.body.name;
    await AppDataSource.manager.save(user)
    res.send('created user')
});

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
