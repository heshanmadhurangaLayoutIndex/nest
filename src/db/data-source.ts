import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

/**
 *checks what environment used to deploy
 */
const env = process.env.NODE_ENV || 'development';
const path =
  env === 'local'
    ? '.env.local'
    : env === 'production'
      ? '.env.production'
      : env === 'stage'
        ? '.env.stage'
        : '.env.development';

dotenv.config({ path });



export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: "localhost",
  port: 5432,
  username: "root",
  password: "i8WVpC6NIq9E",
  database: "iesc-e-library-development",
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/db/migrations/*.js'],
  synchronize: true,
  logging: false,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
