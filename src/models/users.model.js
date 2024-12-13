import { Schema, model} from "mongoose";

const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    role:{
        type: String,
        enum: ["admin","user","advertiser"],
        default: "user"
    }, 
    
},{ timestamps: true });

export const Users = model("Users", userSchema);