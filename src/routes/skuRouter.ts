import { Router } from "express";
import SKUController from "../controllers/skuControllers";
import { authenticate } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", SKUController.getAllSKUs);
router.get("/:id", SKUController.getSKUById as any);
router.post("/", SKUController.createSKU);
router.put("/:id", SKUController.updateSKU);
router.delete("/:id", SKUController.deleteSKU);

export default router;
