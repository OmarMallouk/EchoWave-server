import { Schema, model, Document, Types} from "mongoose";
import bcrypt from "bcrypt";

interface IComment {
    user: Types.ObjectId; 
    content: string; 
    created_at: Date;
}

const commentSchema = new Schema<IComment>({
    user: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    content: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
});


interface ISong {
    _id: Types.ObjectId;
    title: string;
    content: string;
    comments?: Types.DocumentArray<IComment>;
    created_at: Date;
}

interface IUser extends Document{
username: String;
password: String;
lyrics: Types.ObjectId[],
email: String;
role: "admin" | "user" | "song_producer";
profile_picture?: String;
channelName?: String;
songs?: ISong[];
bookmarkedChannels?: Types.ObjectId[];
}

const songSchema = new Schema<ISong>(
    {
        title: { type: String, required: true },
        content: { type: String, required: true },
        comments: { type: [commentSchema], default: [] },
        created_at: { type: Date, default: Date.now },
    },
    { _id: true }
);

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
    songs: {
        type: [songSchema],
        default: [],
    },
    bookmarkedChannels: [{ 
        type: Schema.Types.ObjectId, 
        ref: "Users", default: [] 
    }],
}, { timestamps: true });


userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password as string, 10);
    }
    next();
});

export const Users = model<IUser>("Users", userSchema);