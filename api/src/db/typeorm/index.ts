import { DataSource, DataSourceOptions } from 'typeorm';

export const TYPE_ORM_CONFIG: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || '1234',
  database: process.env.DB_DATABASE || 'postgres',
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  entities: ['dist/**/*.entity.js'],
  synchronize: true, // Caso false, usar migrations
};

export const TypeORMDataSource = new DataSource(TYPE_ORM_CONFIG);
