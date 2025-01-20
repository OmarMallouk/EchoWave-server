import mongoose from "mongoose";
import 'dotenv/config'; 

const connectToDatabase = async (): Promise<void> =>{
    try{
        const uri = process.env.MONGO_URI;
        if(!uri) throw Error("MONGO_URI is not defined in the environment");

        await mongoose.connect(uri);

        console.log("Connected to MongoDB Atlas");
        
    } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("Error connecting to the database:", error.message);
        } else {
          console.error("An unknown error occurred while connecting to the database.");
        }
        process.exit(1);
      }
    };

export default connectToDatabase;