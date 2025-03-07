import express from "express";
import { createSong, getSongsByProducer, getAllSongs } from "./songController";

const router = express.Router();

router.post("/createSong", createSong);
router.get("/songs/", getAllSongs);
router.get("/songs/:producerId", getSongsByProducer);

export default router;
