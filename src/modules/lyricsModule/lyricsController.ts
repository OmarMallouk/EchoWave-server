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
        const lyrics = await Lyrics.find();

        return res.json(lyrics);

    } catch (error: unknown) {
        if (error instanceof Error) {
          console.log(error.message);
        } else {
          console.log("An unknown error occurred.");
        }
        return res.status(500).send({ message: "Something went wrong :(" });
      }
    };