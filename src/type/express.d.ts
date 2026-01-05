import 'express';
import {Multer} from 'multer';

declare module 'express-serve-static-core' {
    interface Request {
        auth?: {
            userId: string;
        };
        file?: Express.Multer.File;
    }
}