import { Router } from "express";
import DespesasController from "../controller/DespesasController";

const despesasRouter: Router = Router();
const despesasController = new DespesasController();

despesasRouter.post("/", despesasController.createDespesa);

export default despesasRouter;
