import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import storeRouter from "./routes/storeRouter";
import skuRouter from "./routes/skuRouter";
import planningRouter from "./routes/planningRouter";
import authRouter from "./routes/authRoutes";
import { authenticate } from "./middlewares/authMiddleware";
import userRouter from "./routes/userRoutes";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/store", authenticate as any, storeRouter);
app.use("/api/sku", authenticate as any, skuRouter);
app.use("/api/planning", authenticate as any, planningRouter);
app.use("/api/user", authenticate as any, userRouter);
app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
	res.json({ message: "GSynergy" });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
