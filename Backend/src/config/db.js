import mongoose from "mongoose"

export const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        
        console.log("MongoDB Connected Successfully!")
    } catch (error) {
        console.error("Error Occured connecting to MongoDB!!!",error);
        process.exit(1); //exit with failure
    }
}