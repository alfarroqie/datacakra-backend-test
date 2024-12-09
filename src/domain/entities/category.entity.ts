import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'Categories' })
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
