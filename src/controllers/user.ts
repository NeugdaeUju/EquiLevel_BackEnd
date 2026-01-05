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

