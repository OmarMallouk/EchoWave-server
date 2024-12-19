import { Router } from "express";
import { getChannel, createChannel,deleteChannel } from "./channelController";
import { authMiddleware } from "../../middleware/auth.middleware";

const router =  Router();

// router.get("/:id?",authMiddleware, getUser);
router.get("/:id?", getChannel);
router.post("/create", createChannel);
router.delete("/:id", deleteChannel);


export default router;