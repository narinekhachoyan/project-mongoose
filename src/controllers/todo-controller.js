import JWT from 'jsonwebtoken';
import { Todo } from '../models/todo-model.js'

const secret = 'bubu'

export const getTodo = async (req, res) => {
    try {
        const filter= req.query
        const { authorization } = req.headers;

        const user = JWT.verify(authorization,'bubu');
        const  todo = await Todo.find(filter);

        if(user.id !== todo[0].contributor){
          throw new Error("You are no allow to read  others todos")
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

        const user = JWT.verify(authorization,'bubu');
        const deadline = moment().add(Number(storyPoints),'days').format('YYYY-MM-DD');
        await Todo.create({ title,description,contributor:user._id, storyPoints,deadline})
        const todo = await Todo.find({title})
        res.status(201).send({ data:todo })
    } catch (e) {
        res.status(404).send({data:e.message})
    }
}
export const deleteTodo= async (req, res) => {
    try{
        const { title } = req.body;
        const { authorization } = req.headers;
        const todo = JWT.verify(authorization, 'bubu' )

        if(!todo.title){
            throw new Error("No such todo")
        }
        const deletedTodo = await Todo.findOneAndDelete({ title });
        
        res.status(201).send({data: deletedTodo})
    } catch (e) {
        res.status(404).send({data:e.message})
    }
}

export const updateTodo = async (req, res) => {
    try {
        const filter = req.query
        await Todo.find(filter)

        const updateData = req.body;
        const { authorization } = req.headers;
        const todo = JWT.verify(authorization, 'bubu' )

        if(!todo.title){
            throw new Error("No such todo")
        }
        const updateTodo = await User.updateOne({}, {$set:updateData})
        res.status(201).send({data:updateTodo})
    } catch (e) {
        res.status(404).send({data:e.message})
    }
}