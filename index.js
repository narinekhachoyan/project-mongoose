import 'dotenv/config';

import express from "express";
const app = express();
import { connection } from './src/storages/db.js';
const { PORT } = process.env;

connection()

import userRouter from './src/routers/user-router.js';
import todoRouter from './src/routers/todo-router.js';
import authRouter from './src/routers/auth-router.js';


app.use(express.json());
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/todos', todoRouter);


app.listen(PORT, ()=>{
    console.log("Server started at port 3000");
})