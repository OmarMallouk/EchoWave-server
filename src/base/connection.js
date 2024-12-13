import mongoose from "mongoose";
import 'dotenv/config'; 

const connectToDatabase = async () =>{
    try{
        const uri = process.env.MONGO_URI;
        if(!uri) throw Error("MONGO_URI is not defined in the environment");

        await mongoose.connect(uri);

        console.log("Connected to MongoDB Atlas");
        
    }catch(error){
        console.error("Error connecting to the database:", error.message);
        process.exit(1);
    }
};

export default connectToDatabase;