import { Router } from "express";
import {getUser,createUser,deleteUser} from "./usersController"
import { authMiddleware } from "../../middleware/auth.middleware";


const router =  Router();

router.get("/:id?",authMiddleware, getUser);
router.post("/create", createUser);
router.delete("/:id", deleteUser);


export default router;