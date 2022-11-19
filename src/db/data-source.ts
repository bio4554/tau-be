import config from "../app.config"
import { DataSource } from "typeorm";
import { User } from "./entity/User";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: config.PostgresServer,
    port: parseInt(config.PostgresPort),
    username: config.PostgresUser,
    password: config.PostgresPassword,
    database: config.PostgresDatabase,
    synchronize: true,
    logging: false,
    entities: [User],
    subscribers: [],
    migrations: [],
})