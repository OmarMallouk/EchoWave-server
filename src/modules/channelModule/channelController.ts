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
        const channels = await Channel.find();

        return res.json(channels);

    } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("Something went wrong while fetching the channel",error.message);
        } else {
          console.log("An unknown error occurred.");
        }
        return res.status(500).send({ message: "Something went wrong :(" });
      }
    };


     export const createChannel = async (req: Request, res:Response): Promise<any> =>{
                const {name,description,lyrics,producerId} = req.body;
        
                try{           
    
                      if(!name || !description || !lyrics || !producerId){
                        return res.status(400).send({message:"all fields are required :)"})
                      }
                    const newChannel = await Channel.create({
                        name,
                        description,
                        lyrics,
                        producerId
                    })
        
                    await newChannel.save();
        
            }
        
    
