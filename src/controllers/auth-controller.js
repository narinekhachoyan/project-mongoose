import JWT from 'jsonwebtoken';
import { User } from '../models/user-model.js'

import { makeHash, compare } from '../libs/crypto-lib.js'
import { sign } from '../libs/jwt-lib.js'
const { SECRET } = process.env;

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userInfo = await User.find({ email });

        const [userParams] = userInfo;

        const user = await compare(password, userParams)

        if (!user) {
            throw new Error("You are not registered!!!")
        }

        const token = sign({ _id: userParams._id, email: userParams.email, username: userParams.username })
        res.status(201).send({ data: { email: userParams.email, username: userParams.username }, token })
    } catch (e) {
        res.status(404).send({ data: e.message })
    }
}

export const registerUser = async (req, res) => {
    try {
        const { username, email, password, repeatPassword } = req.body

        if (password !== repeatPassword) {
            throw new Error('Passwords does not match')
        }
        const passwordHash = await makeHash(password);
        const newUser = new User({
            username,
            email,
            password: passwordHash
        })

        await newUser.save();
        const user = await User.findOne({ username: newUser.username, })
        // const response = await User.create({ username, email, password });
        res.status(201).send({ data: newUser });
    } catch (e) {
        res.status(401).send({ data: e.message })
    }
}