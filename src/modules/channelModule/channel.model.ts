import { Schema, model, Document, Types, ObjectId } from "mongoose";

interface IChannel extends Document{
    name: String,
    description: String,
    lyrics: Types.ObjectId,
    producerId: Types.ObjectId,
    created_at: Date
}