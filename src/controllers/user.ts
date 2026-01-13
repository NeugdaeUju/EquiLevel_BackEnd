import { RequestHandler } from 'express';
import User from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signUp: RequestHandler = async (req, res) => {
    try {
        const hash = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            email : req.body.email,
            password : hash,
        });
        try {
            user.save();
            res.status(201).json({
                message: 'User created',
            })
        } catch (error) {
            res.status(400).json({
                message: 'Error creating user',
                error,
            });
        };
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            error,
        })
    }
}

export const logIn: RequestHandler = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({
                message: 'Email ans password required',
            })
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: 'Authentification failed',
            });
        };
        
        const valid = await bcrypt.compare( req.body.password, user.password);
        if (!valid) {
            return res.status(401).json({
                message : 'Authentification failed',
            });
        };

        res.status(200).json({
            userId: user._id,
            token: jwt.sign(
                { userId: user._id },
                'RAMDOM_TOKEN_SECRET',
                { expiresIn: '24h'},
            ),
        });
        
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            error,
        });
    };
};