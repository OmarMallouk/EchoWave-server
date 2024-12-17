import { Request, Response } from "express";
import { Users } from "./users.model.js";

export const getUser = async (req: Request,res: Response): Promise<Response> =>{
    const id = req.params.id;

    try{
        if(id){
        const user = await Users.findById(id);

        if(!id){
            res.status(404).send({message:"User not found!"});
        }
        return res.json(user);
        }

        const users = await Users.find()

        return res.json(users)


    }catch(error){
        console.log(error.message);

        return res.status(500).send({message:"Something went wrong :(("});
        
    }
}

export const createUser = async (req: Request,res: Response): Promise<Response> =>{
    const {username,password,email} = req.body;

    try{
        const user = await Users.create({
            username,password,email
        });

        return res.json(user);

    }catch(error){
        console.log(error.message);
      
    }
}

export const deleteUser = async (req: Request, res: Response): Promise<Response> =>{
    const id = req.params.id;

    try{
        const deleted = await Users.findByIdAndDelete(id);

        if (!deleted){
            return res.status(404).send({message:"User not found"});
        }

        return res.json(deleted);
        
    }catch(error){
        console.log(error.message);

        return res.status(500).send({message:"Something went wrong"});
        
    }
}