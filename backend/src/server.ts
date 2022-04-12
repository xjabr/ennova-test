import express from 'express';
import bodyparser from 'body-parser';
import fileUpload from 'express-fileupload';
import mongoose from 'mongoose';
import cors from 'cors';
// import helmet from 'helmet';
import logger from 'morgan';

import { routerAuth, routerCollectible } from './routes';
import { MONGO_URL } from '@src/constants';

require('dotenv').config();

const app: express.Application = express();

app.use(logger('dev'));
// app.use(helmet());
app.use(fileUpload());
app.use(bodyparser.json());

mongoose.connect(MONGO_URL, {});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
	console.log('DB Connected');

  app.use(cors());

  app.use('/storage', express.static(__dirname + '/storage'));
  
  app.get('/', (_req, res) => res.send(`API WORK`));
  app.use('/api/auth', routerAuth);
  app.use('/api/collectible', routerCollectible);
});

export default app;