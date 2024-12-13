import { Router } from "express";
import { login,register, } from "../controller/AuthController";

const router = new Router();

router.post("/login", login);
router.post("/register", register);

export default router;