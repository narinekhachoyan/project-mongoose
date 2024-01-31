import { Router } from 'express';
const router = Router();

import { getTodo, createTodo, deleteTodo, updateTodo } from '../controllers/todo-controller.js'

router.get('/', getTodo)

router.post('/', createTodo)

router.delete('/', deleteTodo)

router.put('/', updateTodo)


export default router

