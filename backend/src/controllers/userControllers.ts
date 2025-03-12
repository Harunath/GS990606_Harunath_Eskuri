import { Response } from "express";
import { AuthRequest } from "../types";
import { getUserService, updateUserService } from "../services/userServices";

export const getUser = async (req: AuthRequest, res: Response) => {
	try {
		const userId = req.user.id; // Assuming `req.user` is set in `authMiddleware`
		const user = await getUserService(userId);
		if (!user) return res.status(404).json({ message: "User not found" });

		res.json(user);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
};

export const updateUser = async (req: AuthRequest, res: Response) => {
	try {
		const userId = req.user.id;
		const { name, profilePic } = req.body;

		// Build the update object dynamically
		const updateData: { name?: string; profilePic?: string } = {};
		if (name) updateData.name = name;
		if (profilePic) updateData.profilePic = profilePic;

		// If nothing is provided, return an error
		if (Object.keys(updateData).length === 0) {
			return res.status(400).json({ message: "No data provided" });
		}

		const updatedUser = await updateUserService(userId, updateData);
		res.json(updatedUser);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
};
