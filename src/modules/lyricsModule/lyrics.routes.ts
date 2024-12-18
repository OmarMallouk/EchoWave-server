import { Router } from "express";
import { getLyrics, createLyric, deleteLyric } from "./lyricsController";
import { authMiddleware } from "../../middleware/auth.middleware";


const router =  Router();

// router.get("/:id?",authMiddleware, getUser);
router.get("/:id?", getLyrics);
router.post("/create", createLyric);
router.delete("/:id", deleteLyric);


export default router;