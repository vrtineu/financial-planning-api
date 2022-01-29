import { Request, Response } from "express";
import Despesas from "../models/Despesas";
import { connect } from "../database";
import { resDefaultMessage, resError } from "../utils/responseStatusCode";
import { isFromSameMonth } from "../services";

export default class DespesasController {
  constructor() {
    connect();
  }

  async createDespesa(req: Request, res: Response) {
    try {
      const { descricao, valor, data, categoria } = req.body;

      const despesa = new Despesas({
        descricao,
        valor,
        data,
        categoria,
      });

      const despesaAlreadyExists = await isFromSameMonth(req, Despesas);

      if (despesaAlreadyExists)
        return resDefaultMessage(res, 400, "registered");

      await despesa.save();

      return resDefaultMessage(res, 201, "success");
    } catch (error) {
      return resError(res, error);
    }
  }

  async getDespesas(req: Request, res: Response) {
    try {
      const { descricao } = req.query;
      const regexParam = new RegExp(`^${descricao}$`, "i");
      const filter = descricao ? { descricao: regexParam } : {};

      const despesas = await Despesas.find(filter).select(
        "-__v -_id -idDespesa"
      );

      if (!despesas || !despesas.length || descricao === "")
        return resDefaultMessage(res, 404, "notFound");

      return res.status(200).json(despesas);
    } catch (error) {
      return resError(res, error);
    }
  }

  async getDespesa(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const despesa = await Despesas.findOne({ idDespesa: id }).select(
        "-__v -_id -idDespesa"
      );

      if (!despesa) return resDefaultMessage(res, 404, "notFound");

      return res.status(200).json(despesa);
    } catch (error) {
      return resError(res, error);
    }
  }

  async updateDespesa(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const { descricao, valor, data } = req.body;
      let { categoria } = req.body;
      if (!categoria) categoria = "Outros";

      const idExists = await Despesas.findOne({ idDespesa: id });
      if (!idExists) return resDefaultMessage(res, 404, "notFound");

      const despesa = await isFromSameMonth(req, Despesas);

      if (despesa) return resDefaultMessage(res, 400, "registered");

      await Despesas.findOneAndUpdate(
        { idDespesa: id },
        { descricao, valor, data, categoria }
      );

      return resDefaultMessage(res, 200, "updated");
    } catch (error) {
      return resError(res, error);
    }
  }

  async deleteDespesa(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      const despesa = await Despesas.findOneAndDelete({ idDespesa: id });

      if (!despesa) return resDefaultMessage(res, 404, "notFound");

      return resDefaultMessage(res, 200, "deleted");
    } catch (error) {
      return resError(res, error);
    }
  }

  async getDespesasByYearAndMonth(req: Request, res: Response) {
    try {
      const { year, month } = req.params;
      const filter = {
        data: {
          $gte: new Date(`${year}-${month}-01`),
          $lte: new Date(`${year}-${month}-31`),
        },
      };

      const despesas = await Despesas.find(filter).select(
        "-__v -_id -idDespesa"
      );

      if (!despesas || !despesas.length)
        return resDefaultMessage(res, 404, "notFound");

      return res.status(200).json(despesas);
    } catch (error) {
      return resError(res, error);
    }
  }
}
