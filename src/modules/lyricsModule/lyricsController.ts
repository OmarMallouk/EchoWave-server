import { Request, Response } from "express";
import { Lyrics } from "./lyrics.model";
import { log } from "console";


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


    const createLyric = async (req: Request, res:Response): Promise<any> =>{
        const {title, content, user, mood, genre} = req.body;

        try{

            if(!title || !content || !user){
                return res.status(400).send({
                    message: "All fields are required!"
                });
            }
            const newlyric = await Lyrics.create({
                title,
                content,
                user,
                mood,
                genre
            })

            await newlyric.save();

            return res.status(200).send({
                message: "Lyric created successfully",
                lyric: newlyric,
            });

        }catch(error: unknown){
            if(error instanceof Error){
                console.log(error.message);
            }else{
                console.log("An unknown error occurred.");
            }
            return res.status(500).send({ message: "Something went wrong :(" });
        }
    }


    export const deleteLyric = async (req: Request, res: Response): Promise<any> => {
        const  id  = req.params;
      
        try {
          const lyric = await Lyrics.findById(id);
      
          if (!lyric) {
            return res.status(404).send({
              message: "Lyric not found :(",
            });
          }
    
          await Lyrics.findByIdAndDelete(id);
      
          return res.status(200).json({
            message: "Lyric deleted successfully!",
          });
        } catch (error: unknown) {
          if (error instanceof Error) {
            console.log(error.message);
          } else {
            console.log("An unknown error occurred.");
          }
          return res.status(500).send({ message: "Something went wrong :(" });
        }
      };