import Express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import userRoutes from './routes/user';
dotenv.config();

if (!process.env.MONGODB_URL) {
    throw new Error('MONGODB_URL is not defined in environment variables')
}

const mongoUrl = process.env.MONGODB_URL;

if (!mongoUrl) {
    throw new Error('MONGODB_URL is not defined');
}

const app = Express();
// const mongoUrl: string = '';
mongoose.connect(mongoUrl)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => {
        console.error('Failed to connect to MongoDB', error);
        process.exit(1);});

app.use(Express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('AccesS-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/api/auth', userRoutes);

export default app;