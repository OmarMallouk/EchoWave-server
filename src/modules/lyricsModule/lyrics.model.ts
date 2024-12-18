import { Schema, model, Document, Types} from "mongoose";


interface ILyrics extends Document{
    title: String,
    content: String,
    user: Types.ObjectId;
    mood?:{
        name: string;
        description?:string;
    };
    genre?:{
        name: string;
        description?: string;
    };
}