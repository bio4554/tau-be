import config from '../app.config';
import { DataSource } from 'typeorm';
import { User } from './entity/User';
import { Post } from './entity/Post';
import { RefreshAuth } from './entity/RefreshAuth';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: config.PostgresServer,
  port: parseInt(config.PostgresPort),
  username: config.PostgresUser,
  password: config.PostgresPassword,
  database: config.PostgresDatabase,
  synchronize: true,
  logging: false,
  entities: [User, Post, RefreshAuth],
  subscribers: [],
  migrations: [],
});
