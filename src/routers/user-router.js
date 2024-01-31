import Router from 'express';
const router = Router();

import { getUser, deleteUser, updateUser } from '../controllers/users-controller.js'

router.get('/', getUser)

router.delete('/', deleteUser)

router.put('/', updateUser)


export default router