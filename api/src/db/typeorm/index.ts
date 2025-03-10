import { DataSource, DataSourceOptions } from 'typeorm';

const TYPE_ORM_CONFIG: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || '1234',
  database: process.env.DB_DATABASE || 'postgres',
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
};

export const TypeORMDataSource = new DataSource(TYPE_ORM_CONFIG);
