import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class SkuService {
	async getAllSKUs() {
		return prisma.sKU.findMany();
	}

	async getSKUById(id: string) {
		return prisma.sKU.findUnique({ where: { id } });
	}

	async createSKU(data: {
		id: string;
		label: string;
		class: string;
		department: string;
		price: number;
		cost: number;
	}) {
		return prisma.sKU.create({ data });
	}

	async updateSKU(
		id: string,
		data: {
			Label?: string;
			Class?: string;
			Department?: string;
			Price?: number;
			Cost?: number;
		}
	) {
		return prisma.sKU.update({ where: { id }, data });
	}

	async deleteSKU(id: string) {
		return prisma.sKU.delete({ where: { id } });
	}
}

export default new SkuService();
