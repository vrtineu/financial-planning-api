import { Router } from "express";

import ReceitasController from "../controllers/ReceitasController";
import { validate, bodyFields } from "../middlewares/validation";

const receitasRouter = Router();
const receitasController = new ReceitasController();

receitasRouter.post("/", bodyFields, validate, receitasController.createReceita);

receitasRouter.get("/", receitasController.getReceitas);
receitasRouter.get("/:id", receitasController.getReceita);
receitasRouter.get("/:year/:month", receitasController.getReceitasByYearAndMonth);

receitasRouter.put("/:id", bodyFields, validate, receitasController.updateReceita);

receitasRouter.delete("/:id", receitasController.deleteReceita);

export default receitasRouter;
