import Express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import userRoutes from './routes/user';
import raceRoutes from './routes/race';
import horseRoutes from './routes/horse';

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

if (!process.env.CORS_ORIGIN) {
    throw new Error('CORS_ORIGIN is not defined in environment variables');
}

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));

app.use(Express.json());

app.use('/api/auth', userRoutes);
app.use('/api/races', raceRoutes);
app.use('/api/horses', horseRoutes);

app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

export default app;