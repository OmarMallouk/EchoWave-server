import { Request, Response } from "express";
import { Users } from "../userModule/users.model";
import { Lyrics } from "../lyricsModule/lyrics.model";
import { mergeLyrics } from "../../utils/aiCall";


export const createSong = async (req: Request, res: Response): Promise<any> => {
    const { title, content, user , _id} = req.body;

    try {
        if (!title || !content || !user) {
            return res.status(400).send({ message: "All fields are required!" });
        }

        const userToUpdate = await Users.findById(user);
        if (!userToUpdate) {
            return res.status(404).send({ message: "User not found." });
        }

        const newSong = {
            _id,
            title,
            content,
            created_at: new Date(),
        };

        userToUpdate.songs = userToUpdate.songs ?? [];
        userToUpdate.songs.push(newSong);
        await userToUpdate.save();

        return res.status(201).send({
            message: "Song created successfully!",
            song: newSong,
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error creating song:", error.message);
        } else {
            console.error("An unknown error occurred.");
        }
        return res.status(500).send({ message: "Something went wrong :(" });
    }
};





export const getAllSongs = async (req: Request, res: Response): Promise<void> => {
    try {
        const songs = await Users.find().populate("producerId"); 

        res.status(200).send(songs);
    } catch (error) {
        console.error("Error fetching songs:", error instanceof Error ? error.message : "Unknown error");
        res.status(500).send({ message: "Failed to fetch songs." });
    }
};

export const getSongsByProducer = async (req: Request, res: Response): Promise<void> => {
    const { producerId } = req.params;

    try {
        const songs = await Users.find({ producerId });
        res.status(200).send(songs);
    } catch (error) {
        console.error("Error fetching songs:", error instanceof Error ? error.message : "Unknown error");
        res.status(500).send({ message: "Failed to fetch songs." });
    }
};