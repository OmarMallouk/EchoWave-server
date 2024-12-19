import { Request, Response } from "express";
import { Channel } from "./channel.model";


export const getChannel = async (req: Request, res: Response): Promise<any> =>{
    const id = req.params.id;
    try{
         if(id){
            const channel = await Channel.findById(id);
         

        if (!id){
            return res.status(404).send({
            message: "Channel not found :("
            });
            }
            return res.json(channel);
        }   
     
    };
