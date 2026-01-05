import Express from 'express';
import mongoose from 'mongoose';
import path from 'path';

import userRoutes from './routes/user';

const app = Express();
const mongoUrl: string = 'mongodb+srv://leilaplltr_db_user:PUDNlotcidLn7xJA@cluster0.rva7ps5.mongodb.net/?appName=Cluster0';
mongoose.connect(mongoUrl)
    .then(() => console.log('Connected to MongoDB'))
    .catch(() => console.log('Failed to connect to MongoDB'));

app.use(Express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Accces-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/api/auth', userRoutes);

export default app;