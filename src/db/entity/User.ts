import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Post } from './Post';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({
        length: 100,
    })
    username?: string;

    @Column()
    password?: string;

    @OneToMany(() => Post, (post) => post.user)
    posts?: Post[];
}
