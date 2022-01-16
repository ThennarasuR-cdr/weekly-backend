import express from 'express';
import bodyParser from 'body-parser';

import login from './routes/login';
import ping from './routes/ping';
import registration from './routes/registration';
import task from './routes/task';
import authenticate from './middleware/authenticate';

const app = express();

app.use(bodyParser.json());

app.use(ping);
app.use(login);
app.use(registration);
app.use(authenticate);
app.use(task);

export default app;