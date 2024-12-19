import { Router } from "express";
import { getOriginality,createOriginality,deleteOriginality } from "./originalityController";
import { authMiddleware } from "../../middleware/auth.middleware";

const router =  Router();

// router.get("/:id?",authMiddleware, getUser);
router.get("/:id?", getOriginality);
router.post("/create", createOriginality);
router.delete("/:id", deleteOriginality);


export default router;