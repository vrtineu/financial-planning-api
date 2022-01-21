import { Request, Response } from "express";
import Despesas from "../models/Despesas";
import { connect } from "../database";
import { resDefaultMessage, resError } from "../utils/responseStatusCode";

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

      if (findDespesa.length) return resDefaultMessage(res, 400, "registered");

      await despesa.save();

      return resDefaultMessage(res, 201, "sucess");
    } catch (error) {
      return resError(res, { error });
    }
  }

  async getDespesas(req: Request, res: Response) {
    try {
      const despesas = await Despesas.find().select("-__v -_id -idDespesa");

      if (!despesas) return resDefaultMessage(res, 404, "notFound");

      return res.status(200).json(despesas);
    } catch (error) {
      return resError(res, { error });
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
      return resError(res, { error });
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

      if (despesa) return resDefaultMessage(res, 400, "registered");

      await Despesas.findOneAndUpdate(
        { idDespesa: id },
        { descricao, valor, data }
      );

      return resDefaultMessage(res, 200, "updated");
    } catch (error) {
      return resError(res, { error });
    }
  }

  async deleteDespesa(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      const despesa = await Despesas.findOneAndDelete({ idDespesa: id });

      if (!despesa) return resDefaultMessage(res, 404, "notFound");

      return resDefaultMessage(res, 200, "deleted");
    } catch (error) {
      return resError(res, { error });
    }
  }
}
