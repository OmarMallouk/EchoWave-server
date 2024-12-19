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
    
    };
