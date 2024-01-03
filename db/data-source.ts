import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { DatabaseLogger } from 'src/common/database.logger';

dotenv.config();

export const dataSourceOptions: any = {
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: ['dist/**/*.entity.js'], // This is used for yarn migration:generate
  migrations: ['dist/db/migrations/*.js'],
  autoLoadEntities: true, // This is used for loading entities while running the app in dev, test and production
  timezone: 'Z',
  logging: true,
  logger: new DatabaseLogger(),
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
