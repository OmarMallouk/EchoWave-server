import { Schema, model, Document, Types } from "mongoose";

const moodSchema = new Schema(
    {
        name: { type: String, required: true },
    },
    { _id: false } 
);

const genreSchema = new Schema(
    {
        name: { type: String, required: true },
    },
    { _id: false } 
);

interface ILyric extends Document {
    title: string;
    content: string;
    user: Types.ObjectId;
    mood?: { name: string }[];
    genre?: { name: string }[];
    created_at: Date;
    updated_at: Date;
}

const lyricSchema = new Schema<ILyric>(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "Users",
            required: true,
        },
        mood: [moodSchema], 
        genre: [genreSchema],
       
    },
    { timestamps: true } 
);

export const Lyrics = model<ILyric>("Lyrics", lyricSchema);