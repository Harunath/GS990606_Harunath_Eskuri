import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class StoreService {
	async getAllStores() {
		return prisma.store.findMany();
	}

	async getStoreById(id: string) {
		return prisma.store.findUnique({ where: { id } });
	}

	async createStore(data: {
		id: string;
		label: string;
		city: string;
		state: string;
	}) {
		return prisma.store.create({ data });
	}

	async updateStore(
		id: string,
		data: { name?: string; city?: string; state?: string }
	) {
		return prisma.store.update({ where: { id }, data });
	}

	async deleteStore(id: string) {
		return prisma.store.delete({ where: { id } });
	}
}

export default new StoreService();
