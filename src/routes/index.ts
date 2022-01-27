import { Router } from "express";
import receitasRouter from "./receitas";
import despesasRouter from "./despesas";
import resumoRouter from "./resumo";

const router: Router = Router();

router.use("/receitas", receitasRouter);
router.use("/despesas", despesasRouter);
router.use("/resumo", resumoRouter);

export default router;
