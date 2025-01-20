import { Router } from "express";
import {getUser,createUser,deleteUser, addComment, bookmarkChannel, updateUser} from "./usersController";
import { authMiddleware } from "../../middleware/auth.middleware";
import multer from "multer";


const upload = multer({ dest: 'uploads/' })
const router =  Router();

// router.get("/:id?",authMiddleware, getUser);
router.get("/:id?", getUser);
router.post("/create", createUser);
router.post("/comment", addComment);
router.post("/bookmark", bookmarkChannel);
router.delete("/:id", deleteUser);
router.put("/:id", upload.single('profile_picture'), updateUser);


export default router;