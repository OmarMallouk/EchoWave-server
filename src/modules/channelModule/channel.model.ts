import { Schema, model, Document, Types, ObjectId } from "mongoose";

interface IChannel extends Document{
    name: String,
    description: String,
    lyrics: Types.ObjectId,
    producerId: Types.ObjectId,
    created_at: Date
}

const channelSchema = new Schema<IChannel>({
    name:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    lyrics:{
        type: Schema.Types.ObjectId,
        ref: "Originality",
        required: true,
    },
    producerId:{
        type: Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    },
    created_at:{
        type: Date,
        default: Date.now,
    },

});
export const Channel = model<IChannel>("Channel", channelSchema);