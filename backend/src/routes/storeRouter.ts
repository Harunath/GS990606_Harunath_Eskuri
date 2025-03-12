import { Router } from "express";
import StoreController from "../controllers/storeControllers";

const router = Router();

router.get("/", StoreController.getAllStores);
router.get("/:id", StoreController.getStoreById as any);
router.post("/", StoreController.createStore);
router.put("/:id", StoreController.updateStore);
router.delete("/:id", StoreController.deleteStore);

export default router;
