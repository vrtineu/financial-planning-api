import { Request, Response } from "express";
import Despesas from "../models/Despesas";
import { connect } from "../database";
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

  async getDespesas(req: Request, res: Response) {
    try {
      const despesas = await Despesas.find().select("-__v -_id -idDespesa");

      if (!despesas)
        return responseStatusCode(res, 404, "Nenhuma despesa encontrada");

      return responseStatusCode(res, 200, despesas);
    } catch (error) {
      return responseStatusCode(res, 400, { error });
    }
  }

  async getDespesa(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const despesa = await Despesas.findOne({ idDespesa: id }).select(
        "-__v -_id -idDespesa"
      );

      if (!despesa)
        return responseStatusCode(res, 404, "Nenhuma despesa encontrada");

      return responseStatusCode(res, 200, despesa);
    } catch (error) {
      return responseStatusCode(res, 400, { error });
    }
  }

  async updateDespesa(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const { descricao, valor, data } = req.body;

      const monthOfDespesa = new Date(data).getMonth() + 1;
      const despesa = await Despesas.findOne({
        $and: [
          { idDespesa: { $ne: id } },
          { descricao },
          { $expr: { $eq: [{ $month: "$data" }, monthOfDespesa] } },
        ],
      });

      if (despesa) return responseStatusCode(res, 400, "Despesa já cadastrada");

      await Despesas.findOneAndUpdate(
        { idDespesa: id },
        { descricao, valor, data }
      );

      return responseStatusCode(res, 200, "Despesa atualizada com sucesso");
    } catch (error) {
      return responseStatusCode(res, 400, { error });
    }
  }

  async deleteDespesa(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      const despesa = await Despesas.findOneAndDelete({ idDespesa: id });

      if (!despesa)
        return responseStatusCode(res, 404, "Nenhuma despesa encontrada");

      return responseStatusCode(res, 200, "Despesa deletada com sucesso");
    } catch (error) {
      return responseStatusCode(res, 400, { error });
    }
  }
}
