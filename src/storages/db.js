import mongoose from 'mongoose';

export async function connection(){
    try {
        await mongoose
        .connect('mongodb+srv://agbu:cX7hVLBaWgOckIrq@cluster0.w5tklqg.mongodb.net/todo')
        .then(() => console.log("Connected to MongoDB"));
    } catch (e) {
        console.log((e.message));
    }
}