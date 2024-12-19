import { Request, Response } from "express";
import { Originality } from "./originality.model";


export const getOriginality = async (req: Request, res: Response): Promise<any> =>{
    const id = req.params.id;
    try{
         if(id){
            const originality = await Originality.findById(id);
         

        if (!id){
            return res.status(404).send({
            message: "Lyric originality not found :("
            });
            }
            return res.json(originality);
        }   
        const originalitys = await Originality.find();

        return res.json(originalitys);

    } catch (error: unknown) {
        if (error instanceof Error) {
          console.log(error.message);
        } else {
          console.log("An unknown error occurred.");
        }
        return res.status(500).send({ message: "Something went wrong :(" });
      }
    };
