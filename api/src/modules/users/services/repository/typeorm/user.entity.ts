import { v4 as uuidv4 } from 'uuid';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column('enum', {
    enum: ['manager', 'user', 'admin'],
  })
  role: 'manager' | 'user' | 'admin';

  @CreateDateColumn()
  created_at: Date;

  @Column()
  created_by_user_id: string;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  updated_by_user_id: string;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export { User };
