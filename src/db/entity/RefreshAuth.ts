import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RefreshAuth {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  userId?: number;

  @Column()
  valid?: boolean;
}
