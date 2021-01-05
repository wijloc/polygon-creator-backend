import { ConnectionOptions, createConnection } from 'typeorm';

const getOptions = async () => {
  const connectionOptions: ConnectionOptions = {
    type: 'postgres',
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
    Object.assign(connectionOptions, {
      migrations: ['./dist/database/migrations/*.js'],
    });
    Object.assign(connectionOptions, { entities: ['./dist/models/*.js'] });
  } else {
    Object.assign(connectionOptions, {
      migrations: ['./src/database/migrations/*.ts'],
    });
    Object.assign(connectionOptions, { entities: ['./src/models/*.ts'] });
  }

  return connectionOptions;
};

const connectDatabase = async (): Promise<void> => {
  const typeormconfig = await getOptions();
  console.log(typeormconfig);
  createConnection(typeormconfig);
};

connectDatabase().then(async () => {
  console.log('Connected to database');
});
