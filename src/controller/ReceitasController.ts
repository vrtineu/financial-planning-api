import { Request, Response } from "express";
import Receitas from "../models/Receitas";
import { connect } from "../database";
import { responseStatusCode } from "../utils/responseStatusCode";

export default class ReceitasController {
  constructor() {
    connect();
  }

  async createReceita(req: Request, res: Response) {
    try {
      const { descricao, valor, data } = req.body;

      const monthOfReceita = new Date(data).getMonth() + 1;
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

      if (findReceita.length)
        return responseStatusCode(res, 400, "Receita já cadastrada");

      await receita.save();

      return responseStatusCode(res, 201, "Receita cadastrada com sucesso");
    } catch (error) {
      return responseStatusCode(res, 400, { error });
    }
  }

  async getReceitas(req: Request, res: Response) {
    try {
      const receitas = await Receitas.find().select("-__v -_id -idReceita");

      if (!receitas)
        return responseStatusCode(res, 404, "Nenhuma receita encontrada");

      return responseStatusCode(res, 200, receitas);
    } catch (error) {
      return responseStatusCode(res, 400, { error });
    }
  }

  async getReceita(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const receita = await Receitas.findOne({ idReceita: id }).select(
        "-__v -_id -idReceita"
      );

      if (!receita)
        return responseStatusCode(res, 404, "Receita não encontrada");

      return responseStatusCode(res, 200, receita);
    } catch (error) {
      return responseStatusCode(res, 400, { error });
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

      if (receita) return responseStatusCode(res, 400, "Receita já cadastrada");

      await Receitas.findOneAndUpdate(
        { idReceita: id },
        { descricao, valor, data }
      );

      return responseStatusCode(res, 200, "Receita atualizada com sucesso");
    } catch (error) {
      return responseStatusCode(res, 400, { error });
    }
  }

  async deleteReceita(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      const receita = await Receitas.findOneAndDelete({ idReceita: id });

      if (!receita)
        return responseStatusCode(res, 404, "Receita não encontrada");

      return responseStatusCode(res, 200, "Receita deletada com sucesso");
    } catch (error) {
      return responseStatusCode(res, 400, { error });
    }
  }
}
