import { Request, Response } from "express";
import SkuService from "../services/skuServices";

class SkuController {
	async getAllSKUs(req: Request, res: Response) {
		try {
			const skus = await SkuService.getAllSKUs();
			res.json(skus);
		} catch (error) {
			if (error instanceof Error)
				res.status(500).json({ error: error.message });
			else res.status(500).json({ error: "internal server error" });
		}
	}

	async getSKUById(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const sku = await SkuService.getSKUById(id);
			if (!sku) return res.status(404).json({ error: "SKU not found" });
			res.json(sku);
		} catch (error) {
			if (error instanceof Error)
				res.status(500).json({ error: error.message });
			else res.status(500).json({ error: "internal server error" });
		}
	}

	async createSKU(req: Request, res: Response) {
		try {
			const sku = await SkuService.createSKU(req.body);
			res.status(201).json(sku);
		} catch (error) {
			if (error instanceof Error)
				res.status(500).json({ error: error.message });
			else res.status(500).json({ error: "internal server error" });
		}
	}

	async updateSKU(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const sku = await SkuService.updateSKU(id, req.body);
			res.json(sku);
		} catch (error) {
			if (error instanceof Error)
				res.status(500).json({ error: error.message });
			else res.status(500).json({ error: "internal server error" });
		}
	}

	async deleteSKU(req: Request, res: Response) {
		try {
			const { id } = req.params;
			await SkuService.deleteSKU(id);
			res.json({ message: "SKU deleted successfully" });
		} catch (error) {
			if (error instanceof Error)
				res.status(500).json({ error: error.message });
			else res.status(500).json({ error: "internal server error" });
		}
	}
}

export default new SkuController();
