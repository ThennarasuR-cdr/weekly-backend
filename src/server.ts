import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './app';

dotenv.config();

const dbUrl = process.env.DB_URL;
const port = process.env.PORT;

mongoose.connect(dbUrl, () => console.log('connected to DB'));

app.listen(port, () => {
	console.log(`Backend running on port :${port}`);
});