import { Router } from "express";
import ResumoController from "../controllers/ResumoController";

const resumoRouter = Router();
const resumoController = new ResumoController();

resumoRouter.get("/:year/:month", resumoController.getResumoByYearAndMonth);

export default resumoRouter;
