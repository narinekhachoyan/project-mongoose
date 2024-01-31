import Router from 'express';
const router = Router();

import { loginUser, registerUser } from '../controllers/auth-controller.js'

router.post('/login', loginUser)

router.post('/registration', registerUser)

export default router