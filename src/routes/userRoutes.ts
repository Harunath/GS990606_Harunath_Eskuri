import express from "express";
import { getUser, updateUser } from "../controllers/userControllers";

const router = express.Router();

// Get user details (protected route)
router.get("/", getUser as any);

// Update user details (protected route)
router.put("/", updateUser as any);

export default router;
