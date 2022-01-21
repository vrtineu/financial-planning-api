import receitasRouter from "./receitas";
import { Router } from "express";

const router: Router = Router();

router.use("/receitas", receitasRouter);

export default router;
