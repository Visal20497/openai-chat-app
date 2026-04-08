import { Router } from "express";
import { chatHandler } from "../controllers/aiController";

const router = Router();

router.post("/chat", chatHandler);

export default router;
