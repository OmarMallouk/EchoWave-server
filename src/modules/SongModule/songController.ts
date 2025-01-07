import { Request, Response } from "express";
import { Song } from "./song.model";
import { Lyrics } from "../lyricsModule/lyrics.model";
import { mergeLyrics } from "../../utils/aiCall";


export const createSong = async (req: Request, res: Response): Promise<void> => {
    const { title, lyricIds, producerId } = req.body;

    try {
   
    } catch (error) {
        console.error("Error creating song:", error instanceof Error ? error.message : "Unknown error");
        res.status(500).send({ message: "Failed to create song." });
    }
};

