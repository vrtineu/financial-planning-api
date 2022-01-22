import { Router } from "express";
import ReceitasController from "../controllers/ReceitasController";
import { validateReceita } from "../middlewares";

const receitasRouter = Router();
const receitasController = new ReceitasController();

receitasRouter.post("/", validateReceita, receitasController.createReceita);
receitasRouter.get("/", validateReceita, receitasController.getReceitas);
receitasRouter.get("/:id", validateReceita, receitasController.getReceita);
receitasRouter.put("/:id", validateReceita, receitasController.updateReceita);
receitasRouter.delete("/:id", validateReceita, receitasController.deleteReceita);

export default receitasRouter;
