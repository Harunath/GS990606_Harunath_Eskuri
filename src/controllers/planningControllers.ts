import { Request, Response } from "express";
import {
	getPlanningData,
	getStorePlanningData,
} from "../services/planningServices";

class PlanningController {
	async getAllPlanningReport(req: Request, res: Response) {
		try {
			const report = await getPlanningData();
			res.json(report);
		} catch (error) {
			if (error instanceof Error)
				res.status(500).json({ error: error.message });
			else res.status(500).json({ error: "internal server error" });
		}
	}
	async getStorePlanningReport(req: Request, res: Response) {
		try {
			const Store = req.body.store;
			const report = await getStorePlanningData(Store);
			res.json(report);
		} catch (error) {
			if (error instanceof Error)
				res.status(500).json({ error: error.message });
			else res.status(500).json({ error: "internal server error" });
		}
	}
}

export default new PlanningController();
