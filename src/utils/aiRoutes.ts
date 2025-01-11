import express from "express";
import { mergeLyrics, generateAlternativeLyrics } from "./aiCall";

const router = express.Router();


router.post("/merge-lyrics", mergeLyrics);
router.post("/alternative", generateAlternativeLyrics);

export default router;