import Express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import userRoutes from './routes/user';
import especesRoutes from './routes/especes'
import racesRoutes from './routes/races'
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

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

app.use(Express.json());

app.use('/api/auth', userRoutes);
app.use('/api/especes', especesRoutes)
app.use('/api/races', racesRoutes);

app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

export default app;