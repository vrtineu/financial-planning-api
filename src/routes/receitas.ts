import { Router } from "express";
import ReceitasController from "../controllers/ReceitasController";

const receitasRouter = Router();
const receitasController = new ReceitasController();

receitasRouter.post("/", receitasController.createReceita);
receitasRouter.get("/", receitasController.getReceitas);
receitasRouter.get("/:id", receitasController.getReceita);
receitasRouter.get("/:year/:month", receitasController.getReceitasByYearAndMonth);
receitasRouter.put("/:id", receitasController.updateReceita);
receitasRouter.delete("/:id", receitasController.deleteReceita);

export default receitasRouter;
