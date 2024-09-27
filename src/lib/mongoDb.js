import mongoose from "mongoose";

export const connectMongoDb = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('connected to mongoDb');
        
    } catch (error) {
        console.log('Error connecting to database: ', error);
        
    }
}