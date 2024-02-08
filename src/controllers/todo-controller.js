import JWT from 'jsonwebtoken';
import moment from 'moment';
import { Todo } from '../models/todo-model.js'
import { verify } from '../libs/jwt-lib.js';
import { User } from '../models/user-model.js'

const secret = 'bubu'

export const getTodo = async (req, res) => {
    try {
        const filter= req.query
        const { authorization } = req.headers;

        const user = verify(authorization);
        const  todo = await Todo.find(filter);

        if(user.id !== todo[0].contributor){
            console.log(todo[0]);
          throw new Error("You are not allowed to read  others todos")
        }

        res.status(201).send({data:todo})

    } catch(e){
        res.status(404).send({data:e.message})
    }
}

export const createTodo = async(req, res) => {
    try {
        const { authorization } = req.headers;
        const { title,description,storyPoints } = req.body

        const user = verify(authorization);
        const deadline = moment().add(Number(storyPoints),'days').format('YYYY-MM-DD');
        await Todo.create({ title,description,contributor:user._id, storyPoints,deadline})
        const todo = await Todo.find({title})
        res.status(201).send({ data:todo })
    } catch (e) {
        res.status(404).send({data:e.message})
    }
}
export const deleteTodo = async (req, res) => {
    try {
        const { title } = req.body;
        const { authorization } = req.headers;
        const user = verify(authorization)
        const todos = title ? await Todo.find({ title }) : Todo.find({});
        if (!todos.length) {
            throw new Error("Todo not found")
        }
        for (const el of todos) {
            if (user._id !== el.contributor) {
                throw new Error("This is not your Todo")
            }
            const deletedTodo = title ? await Todo.deleteOne({ title }) : await Todo.deleteMany({});
            res.status(201).send({ data: deletedTodo })
        }
    } catch (e) {
        res.status(404).send({ data: e.message })
    }
}

export const updateTodo = async (req, res) => {
    try {
        const filter = req.query
        const { authorization } = req.headers;
        const user = JWT.verify(authorization, 'bubu')
        const [firstTodo] = await Todo.find(filter)
        const updateData = req.body;
        if (!firstTodo) {
            throw new Error("Todo not found")
        }
        if (!filter) {
            if (user._id === firstTodo.contributor) {
                const updatedTodo = await Todo.updateMany({ contributor: firstTodo.contributor }, { $set: updateData })
                res.status(201).send({ data: updateTodo })
            } else {
                throw new Error("Not your todo")
            }
        } else {
            const updatedTodo = await Todo.updateOne(filter, { $set: updateData })
        }

        res.status(201).send({ data: updateTodo })
    } catch (e) {
        res.status(404).send({ data: e.message })
    }
}