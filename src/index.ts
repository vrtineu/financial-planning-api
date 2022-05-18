import dotenv from 'dotenv';
import express from 'express';

import { connect } from '@database/index';
import { errorHandler } from '@routes/error.routes';
import { router } from '@routes/index';

dotenv.config();

const app = express();

connect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', router);
app.use(errorHandler);

export default app;
