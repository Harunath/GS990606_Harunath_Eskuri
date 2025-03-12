import { PrismaClient } from "@prisma/client";
import { skuData } from "./seed/skus/SKUData";
import { storeData } from "./seed/store/storeData";
import { planningData } from "./seed/planning/planningData";

const prisma = new PrismaClient();

async function main() {
	const stores = await prisma.store.createMany({
		data: storeData,
		skipDuplicates: true,
	});

	// Seed SKUs
	const skus = await prisma.sKU.createMany({
		data: skuData,
		skipDuplicates: true,
	});
	await prisma.planning.createMany({
		data: planningData,
		skipDuplicates: true,
	});

	("Database seeding completed.");
}

main()
	.catch((error) => {
		console.error(error);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
