import {Request, Response, NextFunction } from "express";
import { Users } from "../modules/userModule/users.model";
// import jwt from "jsonwebtoken"
interface JwtPayLoad{
    userId: string;
}


export const authMiddleware = async (req: Request, res:Response, next:NextFunction): Promise<any> =>{
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).send({message:"Unauthorized!"});
    }


const splitted = authHeader.split(" ");

if (splitted.length !== 2 || splitted[0] !== "Bearer"){
    return res.status(401).send({message:"Unauthorized"});
}

const token = splitted[1];

try{
    const payload = await jwt.verify(token, "secret");

    const id = payload.userId;

    const user = await Users.findById(id);

    if (!user) {
        return res.status(404).send({ message: "User not found" });
      }

    req.user = user;

    next();


} catch (error: unknown) {
    return res.status(401).send({
      message: "Unauthorized",
    });
  }
};