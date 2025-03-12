import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
import bcrypt from "bcryptjs";

export const registerUser = async (email: string, password: string) => {
	const hashedPassword = await bcrypt.hash(password, 10);
	return prisma.user.create({
		data: { email, password: hashedPassword },
	});
};

export const findUserByEmail = async (email: string) => {
	return prisma.user.findUnique({ where: { email } });
};
