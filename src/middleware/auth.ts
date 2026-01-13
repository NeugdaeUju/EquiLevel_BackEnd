import jwt, {JwtPayload} from 'jsonwebtoken';
import { RequestHandler } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
}

interface DecodedToken extends JwtPayload {
    userId: string
}

export const auth: RequestHandler = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw new Error('Authorization header missing')
        };

        const token = authHeader.split(' ')[1];
        const decodedToken = jwt.verify(token, jwtSecret) as DecodedToken;

        req.auth = { userId: decodedToken.userId };
        
        next();
    } catch (error) {
        res.status(401).json({
            message: 'Authentification failed',
            error
        })
    }
};