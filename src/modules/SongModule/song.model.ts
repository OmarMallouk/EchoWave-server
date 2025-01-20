import { Schema, model, Types, Document } from "mongoose";

interface ISong extends Document {
    title: string;
    lyrics: string; 
    originalLyrics: Types.ObjectId[]; 
    producerId: Types.ObjectId; 
    created_at: Date;
}

const songSchema = new Schema<ISong>({
    title: { type: String, required: true },
    lyrics: { type: String, required: true },
    originalLyrics: [{ type: Schema.Types.ObjectId, ref: "Lyrics", required: true }],
    producerId: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    created_at: { type: Date, default: Date.now },
});

export const Song = model<ISong>("Song", songSchema);
