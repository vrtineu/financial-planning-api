import { Router } from "express";
import receitasRouter from "./receitas";
import despesasRouter from "./despesas";

const router: Router = Router();

router.use("/receitas", receitasRouter);
router.use("/despesas", despesasRouter);

export default router;
