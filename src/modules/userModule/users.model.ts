import { Schema, model, Document} from "mongoose";
import bcrypt from "bcrypt";

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

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password as string, 10);
    }
    next();
});

export const Users = model<IUser>("Users", userSchema);