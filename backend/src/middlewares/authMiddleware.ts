import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../types";

export const authenticate = (
	req: AuthRequest,
	res: Response,
	next: NextFunction
) => {
	const token = req.header("Authorization")?.replace("Bearer ", "");
	if (!token) return res.status(401).json({ error: "Unauthorized" });

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
			id: string;
		};
		req.user = decoded; // Now TypeScript won't complain

		next();
	} catch (err) {
		res.status(401).json({ error: "Invalid token" });
	}
};
