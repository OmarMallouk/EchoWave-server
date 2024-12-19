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


     export const createOriginality = async (req: Request, res:Response): Promise<any> =>{
            const {lyrics, file_url, lyricId, originality_score, userId, suggestions, risk_level} = req.body;
    
            try{
    
                if (!lyrics && !file_url && !lyricId) {
                    return res.status(400).send({
                      message: "Please provide either lyrics, a file URL, or an existing lyric ID.",
                    });
                  }

                  if(!originality_score || !userId || !risk_level){
                    return res.status(400).send({message:"originality, userId, and risk_level are required :)"})
                  }
                const newOriginality = await Originality.create({
                    lyrics,
                    file_url,
                    lyricId,
                    originality_score,
                    userId,
                    suggestions: suggestions || [], //if not provided just return empty arra
                    risk_level
                })
    
                await newOriginality.save();
    
                return res.status(200).send({
                    message: "Lyric Originality created successfully",
                    orginality: newOriginality,
                });
    
            }catch(error: unknown){
                if(error instanceof Error){
                    console.error("Error creating originality",error.message);
                }else{
                    console.log("An unknown error occurred.");
                }
                return res.status(500).send({ message: "Something went wrong while creating originality :(" });
            }
        }
    


         export const deleteOriginality = async (req: Request, res: Response): Promise<any> => {
                const  id  = req.params;
              
                try {
                  const originality = await Originality.findById(id);
              
                  if (!originality) {
                    return res.status(404).send({
                      message: "Lyric Originality not found :(",
                    });
                  }
            
                 
              };