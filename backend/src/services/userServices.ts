import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUserService = async (userId: string) => {
	return await prisma.user.findUnique({
		where: { id: userId },
		select: { id: true, email: true, name: true, profilePic: true }, // Exclude password
	});
};

export const updateUserService = async (
	userId: string,
	data: { name?: string; profilePic?: string }
) => {
	return await prisma.user.update({
		where: { id: userId },
		data,
		select: { id: true, email: true, name: true, profilePic: true },
	});
};
