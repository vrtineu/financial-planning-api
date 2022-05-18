import dotenv from 'dotenv';
import express from 'express';

import { connect } from './database';
import { router } from './routes';

dotenv.config();

const app = express();

connect();

app.use(express.json());
app.use('/api', router);

export { app };
