import express from 'express'
import connectDB from './db/connect_db.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(express.json());

const port = process.env.PORT || 5000;

app.listen(port, () => {
    connectDB();
    console.log('Server is running on port 3000');
});