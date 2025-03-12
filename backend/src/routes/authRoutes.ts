import express from "express";
import { signup, login } from "../controllers/authControllers";

const router = express.Router();

router.post("/signup", signup as any);
router.post("/login", login);

export default router;
