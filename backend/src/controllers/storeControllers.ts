import { Request, Response } from "express";
import StoreService from "../services/storeServices";

class StoreController {
	async getAllStores(req: Request, res: Response) {
		try {
			const stores = await StoreService.getAllStores();
			res.json(stores);
		} catch (error) {
			if (error instanceof Error)
				res.status(500).json({ error: error.message });
			else res.status(500).json({ error: "internal server error" });
		}
	}

	async getStoreById(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const store = await StoreService.getStoreById(id);
			if (!store) return res.status(404).json({ error: "Store not found" });
			res.json(store);
		} catch (error) {
			if (error instanceof Error)
				res.status(500).json({ error: error.message });
			else res.status(500).json({ error: "internal server error" });
		}
	}

	async createStore(req: Request, res: Response) {
		try {
			const store = await StoreService.createStore(req.body);
			res.status(201).json(store);
		} catch (error) {
			if (error instanceof Error)
				res.status(500).json({ error: error.message });
			else res.status(500).json({ error: "internal server error" });
		}
	}

	async updateStore(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const store = await StoreService.updateStore(id, req.body);
			res.json(store);
		} catch (error) {
			if (error instanceof Error)
				res.status(500).json({ error: error.message });
			else res.status(500).json({ error: "internal server error" });
		}
	}

	async deleteStore(req: Request, res: Response) {
		try {
			const { id } = req.params;
			await StoreService.deleteStore(id);
			res.json({ message: "Store deleted successfully" });
		} catch (error) {
			if (error instanceof Error)
				res.status(500).json({ error: error.message });
			else res.status(500).json({ error: "internal server error" });
		}
	}
}

export default new StoreController();
