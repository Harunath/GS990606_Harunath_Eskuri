import { Request, Response } from "express";
import { registerUser, findUserByEmail } from "../services/authServices";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt";

export const signup = async (req: Request, res: Response) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(400).json({ error: "All fields are required" });
	}

	const existingUser = await findUserByEmail(email);
	if (existingUser) {
		return res.status(400).json({ error: "User already exists" });
	}

	const user = await registerUser(email, password);
	const token = generateToken(user.id);

	return res.status(201).json({ token, userId: user.id });
};

export const login = async (req: Request, res: Response) => {
	const { email, password } = req.body;
	if (!email || !password) {
		res.status(400).json({ error: "All fields are required" });
		return;
	}

	const user = await findUserByEmail(email);
	if (!user) {
		res.status(400).json({ error: "Invalid credentials" });
		return;
	}

	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) {
		res.status(400).json({ error: "Invalid credentials" });
		return;
	}

	const token = generateToken(user.id);
	res.json({ token, userId: user.id });
};
