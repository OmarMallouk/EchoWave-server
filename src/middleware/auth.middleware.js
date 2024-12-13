import jwt from "jsonwebtoken";
import { Users } from "../models/users.model.js";


export const authMiddleware = async (req,res) =>{
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).send({message:"Unauthorized!"});
    }
}

