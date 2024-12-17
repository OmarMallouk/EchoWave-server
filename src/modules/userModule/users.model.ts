import { Schema, model, Document} from "mongoose";

interface IUser extends Document{
username: String;
password: String;
email: String;
role: "admin" | "user" | "song_producer";
profile_picture?: String;
}

const userSchema = new Schema<IUser>({
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

export const Users = model<IUser>("Users", userSchema);