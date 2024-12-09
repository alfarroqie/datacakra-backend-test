import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Category } from './category.entity';

@Entity({ name: 'Products' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column()
  sku: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  weight: number;

  @Column()
  width: number;

  @Column()
  length: number;

  @Column()
  height: number;

  @Column()
  image: string;

  @Column()
  price: number;
}
