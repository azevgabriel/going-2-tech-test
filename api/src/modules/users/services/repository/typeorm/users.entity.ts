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
}

export { Users };
