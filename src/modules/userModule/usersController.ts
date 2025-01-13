import { Request, Response } from "express";
import { Users } from "./users.model.js";
import { Types } from "mongoose";
import multer from "multer";




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
      const { username, password, role, email, description, channelName, profile_picture } = req.body;
    
      try {
          if (role === "song_producer" && !channelName) {
              return res.status(400).json({ message: "Channel name is required for song producers." });
          }
  
          const user = await Users.create({
              username,
              password,
              email,
              description,
              profile_picture,
              role: role || "user",
              channelName: role === "song_producer" ? channelName : undefined,
          });
    
          return res.status(201).json({
              message: "User created successfully.",
              user,
          });
      } catch (error: unknown) {
          if (error instanceof Error) {
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


export const bookmarkChannel = async (req: Request, res: Response): Promise<any> => {
  const { userId, producerId } = req.body;

  try {
    const producer = await Users.findById(producerId);
    if (!producer || producer.role !== 'song_producer') {
      return res.status(404).send({ message: "Producer not found or invalid ID" });
    }

    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    
    user.bookmarkedChannels = user.bookmarkedChannels || [];
    user.bookmarkedChannels.push(producerId);
    await user.save();

    return res.status(200).send({ message: "Channel bookmarked successfully" });

  } catch (error) {
    console.error("Error bookmarking channel", error);
    return res.status(500).send({ message: "Something went wrong :(" });
  }
};



export const addComment = async (req: Request, res: Response): Promise<any> => {
  const { userId, songId, comment } = req.body;

  try {
    if (!userId || !songId || !comment) {
      return res.status(400).send({ message: "All fields are required!" });
    }

    const producer = await Users.findOne({ "songs._id": songId });
    if (!producer) {
      return res.status(404).send({ message: "Song not found." });
    }

    const song = producer.songs?.find((song) => song._id.toString() === songId.toString());
    if (!song) {
      return res.status(404).send({ message: "Song not found." });
    }

    song.comments?.push({
      user: userId,
      content: comment,
      created_at: new Date(),
    });
    
    await producer.save();

    return res.status(200).send({
      message: "Comment added successfully.",
      updatedSong: song,
    });
  } catch (error) {
    console.error("Error adding comment:", error);
    return res.status(500).send({ message: "Something went wrong :(" });
  }
};



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); 
  },
});

const upload = multer({ storage });


export const updateUser = async (req: Request, res: Response): Promise<any> => {
  const id = req.params.id;
  const updates = req.body;

  try {


    if (req.file) {
      req.body.profile_picture = `/uploads/${req.file.filename}`;
    }

    if (updates.role === "song_producer" && !updates.channelName) {
      return res.status(400).send({ message: "Channel name is required for song producers." });
    }

    const user = await Users.findById(id);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }


    Object.keys(updates).forEach((key) => {
      if (key in user) {
        (user as any)[key] = updates[key];
      }
    });

    await user.save();

    return res.status(200).json({
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    console.error("Error updating user", error);
    return res.status(500).send({ message: "Something went wrong :(" });
  }
};