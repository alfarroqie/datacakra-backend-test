import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'AuditLogs' })
export class AuditLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  action: string; // 'CREATE', 'UPDATE', 'DELETE'

  @Column()
  entity: string; // Entity name, e.g., 'Product'

  @Column()
  details: string;

  @Column({ name: 'created_at' })
  createdAt: Date;
}
