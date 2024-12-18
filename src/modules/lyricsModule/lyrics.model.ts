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
    created_at: Date;
    updated_at: Date;
}

const lyricSchema = new Schema<ILyrics>({
    title:{
        type: String,
        required: true,
    },
    content:{
        type: String,
        required: true,
        user:{
            type: Schema.Types.ObjectId, ref: 'Users',
            required: true,
        },
        
        mood:{
            name:{
                type: String,
                required: false
            },
            description:{
                type: String,
                required: false
            },
        }

        

        
    }
})