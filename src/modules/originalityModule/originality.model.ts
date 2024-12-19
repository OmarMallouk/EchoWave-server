import { Schema, model, Document, Types } from "mongoose";

interface IOriginality extends Document{
    lyrics: String,
    file_url: String,
    originality_score: Number,
    userId: Types.ObjectId,
    suggestions:[String],
    risk_level: String,
    created_at: Date
}