import { Request, Response } from "express";
import Receitas from "../models/Receitas";
import { connect } from "../database";
import { resDefaultMessage, resError } from "../utils/responseStatusCode";

export default class ReceitasController {
  constructor() {
    connect();
  }

  async createReceita(req: Request, res: Response) {
    try {
      const { descricao, valor, data } = req.body;

      const monthOfReceita = new Date(data).getUTCMonth() + 1;
      const receita = new Receitas({
        descricao,
        valor,
        data,
      });

      const findReceita = await Receitas.find({
        $and: [
          { descricao },
          { $expr: { $eq: [{ $month: "$data" }, monthOfReceita] } },
        ],
      });

      if (findReceita.length) return resDefaultMessage(res, 400, "registered");

      await receita.save();

      return resDefaultMessage(res, 201, "success");
    } catch (error) {
      return resError(res, { error });
    }
  }

  async getReceitas(req: Request, res: Response) {
    try {
      const receitas = await Receitas.find().select("-__v -_id -idReceita");

      if (!receitas) return resDefaultMessage(res, 404, "notFound");

      return res.status(200).json(receitas);
    } catch (error) {
      return resError(res, { error });
    }
  }

  async getReceita(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const receita = await Receitas.findOne({ idReceita: id }).select(
        "-__v -_id -idReceita"
      );

      if (!receita) return resDefaultMessage(res, 404, "notFound");

      return res.status(200).json(receita);
    } catch (error) {
      return resError(res, { error });
    }
  }

  async updateReceita(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const { descricao, valor, data } = req.body;

      const monthOfReceita = new Date(data).getMonth() + 1;
      const receita = await Receitas.findOne({
        $and: [
          { idReceita: { $ne: id } },
          { descricao },
          { $expr: { $eq: [{ $month: "$data" }, monthOfReceita] } },
        ],
      });

      if (receita) return resDefaultMessage(res, 400, "registered");

      await Receitas.findOneAndUpdate(
        { idReceita: id },
        { descricao, valor, data }
      );

      return resDefaultMessage(res, 200, "updated");
    } catch (error) {
      return resError(res, { error });
    }
  }

  async deleteReceita(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      const receita = await Receitas.findOneAndDelete({ idReceita: id });

      if (!receita) return resDefaultMessage(res, 404, "notFound");

      return resDefaultMessage(res, 200, "deleted");
    } catch (error) {
      return resError(res, { error });
    }
  }
}
