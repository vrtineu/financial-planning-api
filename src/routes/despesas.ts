import { Router } from "express";
import { check } from "express-validator";

import DespesasController from "../controllers/DespesasController";
import { validate, bodyFields } from "../middlewares/validation";

const despesasRouter: Router = Router();
const despesasController = new DespesasController();

despesasRouter.post(
  "/",
  [...bodyFields, check("categoria", "Categoria must be string").isString()],
  validate,
  despesasController.createDespesa
);

despesasRouter.get("/", despesasController.getDespesas);
despesasRouter.get("/:id", despesasController.getDespesa);
despesasRouter.get("/:year/:month", despesasController.getDespesasByYearAndMonth);

despesasRouter.put(
  "/:id",
  [...bodyFields, check("categoria", "Categoria must be string").isString()],
  validate,
  despesasController.updateDespesa
);

despesasRouter.delete("/:id", despesasController.deleteDespesa);

export default despesasRouter;
