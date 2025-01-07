import { Request, Response } from "express";
import { Song } from "./song.model";
import { Lyrics } from "../lyricsModule/lyrics.model";
import { mergeLyrics } from "../../utils/aiCall";


export const createSong = async (req: Request, res: Response): Promise<void> => {
    const { title, lyricIds, producerId } = req.body;

    try {
        if (!title || !lyricIds || lyricIds.length !== 2 || !producerId) {
            res.status(400).send({ message: "Title, 2 lyrics, and producerId are required." });
            return;
        }

        const lyricsData = await Lyrics.find({ _id: { $in: lyricIds } });
        if (lyricsData.length !== 2) {
            res.status(400).send({ message: "Invalid lyrics selected." });
            return;
        }

        const mergedLyrics = await mergeLyrics(lyricsData[0].content, lyricsData[1].content);

        const newSong = await Song.create({
            title,
            lyrics: mergedLyrics,
            originalLyrics: lyricIds,
            producerId,
        });

        res.status(201).send({ message: "Song created successfully!", song: newSong });
    } catch (error) {
        console.error("Error creating song:", error instanceof Error ? error.message : "Unknown error");
        res.status(500).send({ message: "Failed to create song." });
    }
};

export const getAllSongs = async (req: Request, res: Response): Promise<void> => {
    try {
        const songs = await Song.find().populate("producerId"); 

        res.status(200).send(songs);
    } catch (error) {
        console.error("Error fetching songs:", error instanceof Error ? error.message : "Unknown error");
        res.status(500).send({ message: "Failed to fetch songs." });
    }
};

