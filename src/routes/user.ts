import express from 'express';
import * as userCrtl from '../controllers/user';

const router = express.Router();
router.post('/signup', userCrtl.signUp);
router.post('/login', userCrtl.logIn);

export default router;