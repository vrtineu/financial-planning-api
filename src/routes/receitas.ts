import { Router } from "express";
import ReceitasController from "../controller/ReceitasController";

const receitasRouter = Router();
const receitasController = new ReceitasController();

receitasRouter.post("/", receitasController.createReceita);

export default receitasRouter;