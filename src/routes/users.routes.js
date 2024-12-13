import { Router } from "express";
import { getUser, createUser, deleteUser } from "../controller/usersController.js";



const router = new Router();

router.get("/:id?", getUser);
router.post("/create", createUser);
router.delete("/:id", deleteUser);


export default router;