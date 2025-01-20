import { Schema, model, Document, Types } from "mongoose";

interface IOriginality extends Document{
    lyrics?: String,
    file_url?: String,
    lyricId?: Types.ObjectId,
    originality_score: Number,
    userId: Types.ObjectId,
    suggestions: String[],
    risk_level: String,
    created_at: Date
}


const originalitySchema = new Schema<IOriginality>({
    lyrics:{
        type: String,
        required: false,
    },
    file_url:{
        type: String,
        required: false,
    },
    lyricId:{
        type: Schema.Types.ObjectId,
        ref: "Lyrics",
        required: false,
    },
    originality_score:{
        type: Number,
        required: true,
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    suggestions:{
        type: [String],
        default: [],
    },
    risk_level:{
        type: String,
        enum: ["Low", "Medium", "High"],
        required: true,
    },
    created_at:{
        type: Date,
        default: Date.now,
    },
});


export const Originality = model<IOriginality>("Originality", originalitySchema);