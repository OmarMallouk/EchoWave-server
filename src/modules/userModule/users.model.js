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
        enum: ["admin","user","song_producer"],
        default: "user"
    },
    profile_picture:{
        type: String,
        default: null,
    } ,
    
    
},{ timestamps: true });

export const Users = model("Users", userSchema);