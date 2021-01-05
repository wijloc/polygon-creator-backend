import { ConnectionOptions, createConnection } from 'typeorm';

const getOptions = async () => {
  const connectionOptions: ConnectionOptions = {
    type: 'postgres',
    entities: ['./src/models/*.ts'],
    migrations: ['./src/database/migrations/*.ts'],
    synchronize: false,
    logging: false,
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'polygoncreator',
  };
  if (process.env.DATABASE_URL) {
    Object.assign(connectionOptions, { url: process.env.DATABASE_URL });
  }

  return connectionOptions;
};

const connectDatabase = async (): Promise<void> => {
  const typeormconfig = await getOptions();
  createConnection(typeormconfig);
};

connectDatabase().then(async () => {
  console.log('Connected to database');
});
