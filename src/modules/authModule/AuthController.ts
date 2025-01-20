import {Request, Response} from "express";
import { Users } from "../userModule/users.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req: Request,res: Response): Promise<any> =>{
    const { username, password }: { username: string; password: string } = req.body;

    try{
        const user = await Users.findOne({
            username,
        });

        if(!user){
            return res.status(401).send({message:"Invalid Credentials"});
        }

        const check = await bcrypt.compare(password, user.password as string);

        if (!check){
            return res.status(401).send({message:"Invalid Credentials"});
        }

        const token = await jwt.sign({userId: user.id},"secret");
        
        
        return res.status(200).send({user,token});

    } catch (error: unknown) {
        console.error((error as Error).message); 
    
        return res.status(500).send({ message: "Something went wrong bro :(" });
      }
    };


export const register = async (req: Request, res: Response): Promise<any> =>{
    const {username,password,email} = req.body;

    try{
        if (!username || !password || !email){
            return res.status(400).send({message:"Fill all fields"});
        }

        const hashed = await bcrypt.hash(password, 10);
        console.log("Hashed Password:", hashed);

        const userPayload = {
            username,
            password: hashed,
            email,
        };
        console.log("User Payload:", userPayload);

        const user = await Users.create(userPayload);

        return res.status(201).send({ message: "User registered successfully!" });

    } catch (error: unknown) {
        console.error((error as Error).message);
    
        return res.status(500).send({ message: "Something went wrong" });
      }
    };