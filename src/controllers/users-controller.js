import JWT from 'jsonwebtoken';
import { User } from '../models/user-model.js'

const secret = 'bubu'

export const getUser = async (req, res) => {
    try {
        const filter = req.query
        const users = filter ? await User.find(filter) : await User.find({})
        res.status(201).send({data:users})
    } catch (e) {
        res.status(404).send({data:e.message})
    }
}


export const deleteUser = async (req, res) => {
    try{
        const { email } = req.body;
        // const { authorization } = req.headers;
        // const user = JWT.verify(authorization, 'bubu' )

        // if(!user.email){
        //     throw new Error("No such user")
        // }
        const deletedUser = await User.deleteOne({ email });
        
        res.status(201).send({data: deletedUser})
    } catch (e) {
        res.status(404).send({data:e.message})
    }
}

export const updateUser = async (req, res) => {
    try {
        // const filter = req.query
        // const user = await User.find(filter);

        // const updateData = req.body;
        // const { authorization } = req.headers;
        // const user = JWT.verify(authorization, 'bubu' )

        // if(!user){
        //     throw new Error("No such user")
        // }
        await User.updateMany({},{$set:{city: "Yerevan"}})
        await User.save()
    
        
        res.status(201).send({data:"OK"})
    } catch (e) {
        res.status(404).send({data:e.message})
    }
}