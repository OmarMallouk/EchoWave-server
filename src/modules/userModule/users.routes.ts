import { Router } from "express";
import {getUser,createUser,deleteUser, addComment, bookmarkChannel} from "./usersController"
import { authMiddleware } from "../../middleware/auth.middleware";



const router =  Router();

// router.get("/:id?",authMiddleware, getUser);
router.get("/:id?", getUser);
router.post("/create", createUser);
router.post("/comment", addComment);
router.post("/bookmark", bookmarkChannel);
router.delete("/:id", deleteUser);


export default router;