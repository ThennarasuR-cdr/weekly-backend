import express from 'express';
import bodyParser from 'body-parser';

import login from './routes/login';
import ping from './routes/ping';

const app = express();

app.use(bodyParser.json());

app.use(ping);
app.use(login);

export default app;