import { Request, Response } from "express";
import Despesas from "../models/Despesas";
import connect from "../database";
import { responseStatusCode } from "../utils/responseStatusCode";

export default class DespesasController {
  constructor() {
    connect();
  }

  async createDespesa(req: Request, res: Response) {
    try {
      const { descricao, valor, data } = req.body;

      const monthOfDespesa = new Date(data).getMonth() + 1;
      const despesa = new Despesas({
        descricao,
        valor,
        data,
      });

      const findDespesa = await Despesas.find({
        $and: [
          { descricao },
          { $expr: { $eq: [{ $month: "$data" }, monthOfDespesa] } },
        ],
      });

      if (findDespesa.length)
        return responseStatusCode(res, 400, "Despesa já cadastrada");

      await despesa.save();

      return responseStatusCode(res, 201, "Despesa cadastrada com sucesso");
    } catch (error) {
      return responseStatusCode(res, 400, { error });
    }
  }
}
