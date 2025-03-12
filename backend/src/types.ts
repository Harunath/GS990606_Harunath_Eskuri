import { Request } from "express";

export interface AuthRequest extends Request {
	user: { id: string }; // Modify based on your JWT payload structure
}
