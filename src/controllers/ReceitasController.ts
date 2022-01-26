import { Request, Response } from "express";
import Receitas from "../models/Receitas";
import { connect } from "../database";
import { resDefaultMessage, resError } from "../utils/responseStatusCode";
import { isFromSameMonth } from "../services";

export default class ReceitasController {
  constructor() {
    connect();
  }

  async createReceita(req: Request, res: Response) {
    try {
      const { descricao, valor, data } = req.body;
      const receita = new Receitas({
        descricao,
        valor,
        data,
      });

      const receitaAlreadyExists = await isFromSameMonth(req, Receitas);

      if (receitaAlreadyExists)
        return resDefaultMessage(res, 400, "registered");

      await receita.save();

      return resDefaultMessage(res, 201, "success");
    } catch (error) {
      return resError(res, error);
    }
  }

  async getReceitas(req: Request, res: Response) {
    try {
      const { descricao } = req.query;
      const regexParam = new RegExp(`^${descricao}$`, "i");
      const filter = descricao ? { descricao: regexParam } : {};

      const receitas = await Receitas.find(filter).select(
        "-__v -_id -idReceita"
      );

      if (!receitas || !receitas.length || descricao === "")
        return resDefaultMessage(res, 404, "notFound");

      return res.status(200).json(receitas);
    } catch (error) {
      return resError(res, error);
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
      return resError(res, error);
    }
  }

  async updateReceita(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const { descricao, valor, data } = req.body;

      const receita = await isFromSameMonth(req, Receitas);

      if (receita) return resDefaultMessage(res, 400, "registered");

      await Receitas.findOneAndUpdate(
        { idReceita: id },
        { descricao, valor, data }
      );

      return resDefaultMessage(res, 200, "updated");
    } catch (error) {
      return resError(res, error);
    }
  }

  async deleteReceita(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      const receita = await Receitas.findOneAndDelete({ idReceita: id });

      if (!receita) return resDefaultMessage(res, 404, "notFound");

      return resDefaultMessage(res, 200, "deleted");
    } catch (error) {
      return resError(res, error);
    }
  }

  async getReceitasByYearAndMonth(req: Request, res: Response) {
    try {
      const { year, month } = req.params;
      const filter = {
        data: {
          $gte: new Date(`${year}-${month}-01`),
          $lte: new Date(`${year}-${month}-31`),
        },
      };

      const receitas = await Receitas.find(filter).select(
        "-__v -_id -idReceita"
      );

      if (!receitas || !receitas.length)
        return resDefaultMessage(res, 404, "notFound");

      return res.status(200).json(receitas);
    } catch (error) {
      return resError(res, error);
    }
  }
}
