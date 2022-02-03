import { Router } from "express";
import receitasRouter from "./receitas";
import despesasRouter from "./despesas";
import resumoRouter from "./resumo";
import userRouter from "./auth";
import authMiddleware from "../middlewares";

const router: Router = Router();
router.use(authMiddleware);

router.use("/receitas", receitasRouter);
router.use("/despesas", despesasRouter);
router.use("/resumo", resumoRouter);
router.use("/login", userRouter);

export default router;
