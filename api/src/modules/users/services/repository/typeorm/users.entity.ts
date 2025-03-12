import { v4 as uuidv4 } from 'uuid';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
class Users {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column('enum', {
    enum: ['manager', 'user', 'admin'],
  })
  role: 'manager' | 'user' | 'admin';

  @CreateDateColumn()
  created_at: Date;

  @Column({ nullable: true })
  created_by_user_id: string;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: true })
  updated_by_user_id: string;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export { Users };
