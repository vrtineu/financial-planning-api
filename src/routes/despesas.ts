import { Router } from "express";
import DespesasController from "../controllers/DespesasController";

const despesasRouter: Router = Router();
const despesasController = new DespesasController();

despesasRouter.post("/", despesasController.createDespesa);
despesasRouter.get("/", despesasController.getDespesas);
despesasRouter.get("/:id", despesasController.getDespesa);
despesasRouter.get("/:year/:month", despesasController.getDespesasByYearAndMonth);
despesasRouter.put("/:id", despesasController.updateDespesa);
despesasRouter.delete("/:id", despesasController.deleteDespesa);

export default despesasRouter;
