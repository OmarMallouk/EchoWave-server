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
        
                    return res.status(200).send({
                        message: "Lyric Originality created successfully",
                        channel: newChannel,
                    });
        
                }catch(error: unknown){
                    if(error instanceof Error){
                        console.error("Error creating channel",error.message);
                    }else{
                        console.log("An unknown error occurred.");
                    }
                    return res.status(500).send({ message: "Something went wrong while creating the channel :(" });
                }
            }
        
    

         export const deleteChannel = async (req: Request, res: Response): Promise<any> => {
                const  id  = req.params;
              
                try {
                  const channel = await Channel.findById(id);
              
                  if (!channel) {
                    return res.status(404).send({
                      message: "Channel not found :(",
                    });
                  }
            
                  await Channel.findByIdAndDelete(id);
              
                  return res.status(200).json({
                    message: "Channel deleted successfully!",
                  });
                } catch (error: unknown) {
                  if (error instanceof Error) {
                    console.error("Error deleting the Channel",error.message);
                  } else {
                    console.log("An unknown error occurred.");
                  }
                  return res.status(500).send({ message: "Something went wrong while deleting the Channel :(" });
                }
              };      
