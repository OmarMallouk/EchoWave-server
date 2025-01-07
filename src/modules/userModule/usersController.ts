import { Request, Response } from "express";
import { Users } from "./users.model.js";

export const getUser = async (req: Request,res: Response): Promise<any> =>{
    const id = req.params.id;

    try{
        if(id){
        const user = await Users.findById(id).populate({
          path: 'lyrics', strictPopulate: false
      });

        if(!id){
            res.status(404).send({message:"User not found!"});
        }
        return res.json(user);
        };

        const users = await Users.find().populate({
          path: 'lyrics', strictPopulate: false
      });

        return res.json(users);


    } catch (error: unknown) {
        if (error instanceof Error) {
          console.log(error.message);
        } else {
          console.log("An unknown error occurred.");
        }
        return res.status(500).send({ message: "Something went wrong :(" });
      }
    };


export const createUser = async (req: Request, res: Response): Promise<any> => {
    const { username, password, role, email, channelName  } = req.body;
  
    try {

      if (role === "song_producer" && !channelName) {
        return res.status(400).json({ message: "Channel name is required for song producers." });
    }

    const user = await Users.create({
      username,
      password,
      email,
      role: role || "user",
      channelName: role === "song_producer" ? channelName : undefined,
    });
  
    return res.status(201).json({
      message: "User created successfully.",
      user,
  });

    } catch (error: unknown) {
        if(error instanceof Error){
            console.error(error.message);
        } else {
            console.log("An unknown error occurred.");
          }
      
      return res.status(500).send({ message: "Failed to create user" });
    }
  };

export const deleteUser = async (req: Request,res: Response): Promise<any> =>{
    const id = req.params.id;

    try{
        const deleted = await Users.findByIdAndDelete(id);

        if (!deleted){
            return res.status(404).send({message:"User not found"});
        }

        return res.json(deleted);
        
    }catch(error: unknown){
        if(error instanceof Error){
            console.log(error.message);
        }else{
            console.log("An unknown error occurred.");
        }
        return res.status(500).send({message:"Something went wrong"});
        
    }
};