import express from 'express';
import bodyParser from 'body-parser';

import login from './routes/login';
import ping from './routes/ping';
import registration from './routes/registration';
import authenticate from './middleware/authenticate';
import validate from './middleware/validator';

const app = express();

app.use(bodyParser.json());

app.use(ping);
app.use(validate({ required: ['email', 'password'] }), login);
app.use(validate({ required: ['email', 'password'] }), registration);
app.use(authenticate);

export default app;