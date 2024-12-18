import { Request, Response } from "express";
import { Lyrics } from "./lyrics.model";


export const getLyrics = async (req: Request, res: Response): Promise<any> =>{
    const id = req.params.id;
    try{
         if(id){
            const lyric = await Lyrics.findById(id);
         

        if (!id){
            return res.status(404).send({
            message: "Lyric not found :("
            });
            }
            return res.json(lyric);
        }   
       
    };