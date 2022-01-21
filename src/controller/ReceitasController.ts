import { Request, Response } from "express";
import Receitas from "../models/Receitas";
import connect from "../database";

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
        return res.status(400).json({ message: "Receita já cadastrada" });

      await receita.save();

      return res
        .status(201)
        .json({ message: "Receita cadastrada com sucesso" });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  async getReceitas(req: Request, res: Response) {
    try {
      const receitas = await Receitas.find().select("-__v -_id -id");

      if (!receitas)
        return res.status(404).json({ message: "Nenhuma receita cadastrada" });

      return res.status(200).json(receitas);
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  async getReceita(req: Request, res: Response) {
    try {
      const idReceita = req.params.id;
      const receita = await Receitas.findOne({ id: idReceita }).select(
        "-__v -_id -id"
      );

      if (!receita)
        return res.status(404).json({ message: "Receita não encontrada" });

      return res.status(200).json(receita);
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  async updateReceita(req: Request, res: Response) {
    try {
      const idReceita = req.params.id;
      const { descricao, valor, data } = req.body;

      const monthOfReceita = new Date(data).getMonth() + 1;
      const receita = await Receitas.findOne({
        $and: [
          { id: { $ne: idReceita } },
          { descricao },
          { $expr: { $eq: [{ $month: "$data" }, monthOfReceita] } },
        ],
      });

      if (receita)
        return res.status(400).json({ message: "Receita já cadastrada" });

      await Receitas.findOneAndUpdate(
        { id: idReceita },
        { descricao, valor, data }
      );

      return res
        .status(200)
        .json({ message: "Receita atualizada com sucesso" });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  async deleteReceita(req: Request, res: Response) {
    try {
      const idReceita = req.params.id;

      const receita = await Receitas.findOneAndDelete({ id: idReceita });

      if (!receita)
        return res.status(404).json({ message: "Receita não encontrada" });

      return res.status(200).json({ message: "Receita deletada com sucesso" });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }
}
