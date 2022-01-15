import express from 'express';
import ping from './routes/ping';

const app = express();

app.use(ping);

export default app;