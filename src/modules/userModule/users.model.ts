import { Schema, model, Document, Types} from "mongoose";
import bcrypt from "bcrypt";

interface IUser extends Document{
username: String;
password: String;
lyrics: Types.ObjectId[],
email: String;
role: "admin" | "user" | "song_producer";
profile_picture?: String;
channelName?: String;
}

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        enum: ["admin", "user", "song_producer"],
        default: "user",
    },
    profile_picture: {
        type: String,
        default: null,
    },
    channelName: {
        type: String,
        required: function () {
            return this.role === "song_producer";
        },
        default: null,
    },
    lyrics: [
        {
            type: Schema.Types.ObjectId,
            ref: "Lyrics",
        },
    ],
}, { timestamps: true });


userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password as string, 10);
    }
    next();
});

export const Users = model<IUser>("Users", userSchema);