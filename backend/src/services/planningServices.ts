import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface WeekEntry {
	weekNO: number;
	salesUnits: number;
	salesDollars: number;
	costDollars: number;
	gmDollars: number;
	gmPercentage: number;
}

interface MonthEntry {
	monthName: string;
	weeks: WeekEntry[];
}

interface SKUEntry {
	SKU: string;
	name: string;
	price: string;
	cost: string;
}

interface StoreEntry {
	Store: string;
	name: string;
}
interface planningDataType {
	Store: StoreEntry;
	SKU: SKUEntry;
	months: MonthEntry[];
}

interface PreviousGM {
	gmDollars: number;
	gmPercentage: number;
}

/**
 * Converts a week number (e.g., "W01") to its corresponding month name.
 */
const getMonthFromWeek = (weekNO: number): string => {
	const weekToMonthMap: { [key: number]: string } = {
		1: "Feb",
		2: "Feb",
		3: "Feb",
		4: "Feb",
		5: "Mar",
		6: "Mar",
		7: "Mar",
		8: "Mar",
		9: "Mar",
		10: "Apr",
		11: "Apr",
		12: "Apr",
		13: "Apr",
		14: "May",
		15: "May",
		16: "May",
		17: "May",
		18: "Jun",
		19: "Jun",
		20: "Jun",
		21: "Jun",
		22: "Jun",
		23: "Jul",
		24: "Jul",
		25: "Jul",
		26: "Jul",
		27: "Aug",
		28: "Aug",
		29: "Aug",
		30: "Aug",
		31: "Sep",
		32: "Sep",
		33: "Sep",
		34: "Sep",
		35: "Sep",
		36: "Oct",
		37: "Oct",
		38: "Oct",
		39: "Oct",
		40: "Nov",
		41: "Nov",
		42: "Nov",
		43: "Nov",
		44: "Dec",
		45: "Dec",
		46: "Dec",
		47: "Dec",
		48: "Dec",
		49: "Jan",
		50: "Jan",
		51: "Jan",
		52: "Jan",
	};

	return weekToMonthMap[weekNO] || "Unknown";
};

// Define all months and weeks
const allMonths = [
	{ name: "Feb", weeks: [1, 2, 3, 4] },
	{ name: "Mar", weeks: [5, 6, 7, 8, 9] },
	{ name: "Apr", weeks: [10, 11, 12, 13] },
	{ name: "May", weeks: [14, 15, 16, 17] },
	{ name: "Jun", weeks: [18, 19, 20, 21, 22] },
	{ name: "Jul", weeks: [23, 24, 25, 26] },
	{ name: "Aug", weeks: [27, 28, 29, 30] },
	{ name: "Sep", weeks: [31, 32, 33, 34, 35] },
	{ name: "Oct", weeks: [36, 37, 38, 39] },
	{ name: "Nov", weeks: [40, 41, 42, 43] },
	{ name: "Dec", weeks: [44, 45, 46, 47, 48] },
	{ name: "Jan", weeks: [49, 50, 51, 52] },
];

/**
 * Fetches and processes planning data, grouping it by store, SKU, and month.
 */
export const getPlanningData = async (): Promise<planningDataType[]> => {
	const planningData = await prisma.planning.findMany({
		include: { store: true, sku: true },
		orderBy: [{ storeId: "asc" }, { skuId: "asc" }, { week: "asc" }],
	});

	// Group data by store & SKU
	const dataMap = new Map<string, planningDataType>();

	for (const plan of planningData) {
		const storeKey = `${plan.storeId}-${plan.skuId}`;

		let planning = dataMap.get(storeKey);
		if (!planning) {
			// Initialize store & SKU entry
			planning = {
				Store: { Store: plan.storeId, name: plan.store.label },
				SKU: {
					SKU: plan.skuId,
					name: plan.sku.label,
					price: String(plan.sku.price),
					cost: String(plan.sku.cost),
				},
				months: [],
			};

			// Create empty months and weeks
			allMonths.forEach((month) => {
				planning!.months.push({
					monthName: month.name,
					weeks: month.weeks.map((week) => ({
						weekNO: week,
						salesUnits: 0,
						salesDollars: 0,
						costDollars: 0,
						gmDollars: 0,
						gmPercentage: 0,
					})),
				});
			});

			dataMap.set(storeKey, planning);
		}

		// Get the correct month entry
		const weekNumber = parseInt(plan.week.replace("W", ""), 10);
		const monthName = getMonthFromWeek(weekNumber);
		const monthEntry = planning.months.find((m) => m.monthName === monthName);

		// Calculate values
		const salesDollars = parseFloat(
			(Number(plan.units) * Number(plan.sku.price)).toFixed(2)
		);
		const costDollars = parseFloat(
			(Number(plan.units) * Number(plan.sku.cost)).toFixed(2)
		);
		const gmDollars = parseFloat((salesDollars - costDollars).toFixed(2));
		const gmPercentage =
			Number(plan.units) > 0 ? (gmDollars / salesDollars) * 100 : 0;

		// Update the correct week
		const weekEntry = monthEntry?.weeks.find((w) => w.weekNO === weekNumber);
		if (weekEntry) {
			weekEntry.salesUnits = Number(plan.units);
			weekEntry.salesDollars = salesDollars;
			weekEntry.costDollars = costDollars;
			weekEntry.gmDollars = gmDollars;
			weekEntry.gmPercentage = gmPercentage;
		}
	}

	// Convert map to array
	return Array.from(dataMap.values());
};

export const getStorePlanningData = async (
	store: string
): Promise<planningDataType[]> => {
	const planningData = await prisma.planning.findMany({
		where: { storeId: store },
		include: { store: true, sku: true },
		orderBy: [{ storeId: "asc" }, { skuId: "asc" }, { week: "asc" }],
	});

	// Group data by store & SKU
	const dataMap = new Map<string, planningDataType>();

	for (const plan of planningData) {
		const storeKey = `${plan.storeId}-${plan.skuId}`;

		let planning = dataMap.get(storeKey);
		if (!planning) {
			// Initialize store & SKU entry
			planning = {
				Store: { Store: plan.storeId, name: plan.store.label },
				SKU: {
					SKU: plan.skuId,
					name: plan.sku.label,
					price: String(plan.sku.price),
					cost: String(plan.sku.cost),
				},
				months: [],
			};

			// Create empty months and weeks
			allMonths.forEach((month) => {
				planning!.months.push({
					monthName: month.name,
					weeks: month.weeks.map((week) => ({
						weekNO: week,
						salesUnits: 0,
						salesDollars: 0,
						costDollars: 0,
						gmDollars: 0,
						gmPercentage: 0,
					})),
				});
			});

			dataMap.set(storeKey, planning);
		}

		// Get the correct month entry
		const weekNumber = parseInt(plan.week.replace("W", ""), 10);
		const monthName = getMonthFromWeek(weekNumber);
		const monthEntry = planning.months.find((m) => m.monthName === monthName);

		// Calculate values
		const salesDollars = parseFloat(
			(Number(plan.units) * Number(plan.sku.price)).toFixed(2)
		);
		const costDollars = parseFloat(
			(Number(plan.units) * Number(plan.sku.cost)).toFixed(2)
		);
		const gmDollars = parseFloat((salesDollars - costDollars).toFixed(2));
		const gmPercentage =
			Number(plan.units) > 0 ? (gmDollars / salesDollars) * 100 : 0;

		// Update the correct week
		const weekEntry = monthEntry?.weeks.find((w) => w.weekNO === weekNumber);
		if (weekEntry) {
			weekEntry.salesUnits = Number(plan.units);
			weekEntry.salesDollars = salesDollars;
			weekEntry.costDollars = costDollars;
			weekEntry.gmDollars = gmDollars;
			weekEntry.gmPercentage = gmPercentage;
		}
	}

	// Convert map to array
	return Array.from(dataMap.values());
};
