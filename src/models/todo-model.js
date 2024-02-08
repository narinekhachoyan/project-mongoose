import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const todoSchema = new Schema({

    title:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:true
    },
    storyPoints:{
        type:String,
        required:true
    },
    contributor:{
        type:String,
        required:true
    },
    deadline:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:new Date()
    }
});

const Todo = mongoose.model('Todo', todoSchema);

export { Todo }