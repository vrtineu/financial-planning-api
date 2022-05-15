import { Router } from "express";

import { authMiddleware } from "../middlewares";
import despesasRouter from "./despesas";
import receitasRouter from "./receitas";
import resumoRouter from "./resumo";
import userRouter from "./user";

const router: Router = Router();

router.use(authMiddleware);

router.use("/receitas", receitasRouter);
router.use("/despesas", despesasRouter);
router.use("/resumo", resumoRouter);
router.use("/", userRouter);

export default router;
