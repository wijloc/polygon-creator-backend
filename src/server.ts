import 'reflect-metadata';

import express from 'express';
import cors from 'cors';
import 'express-async-errors';

import routes from './routes';

import './database/index';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.listen(process.env.PORT || 3333, () => {
  console.log(`Server started on port ${process.env.PORT || 3333} !`);
});
