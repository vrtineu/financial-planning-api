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
        return res.status(400).json({ error: "Receita já cadastrada" });

      await receita.save();

      return res
        .status(201)
        .json({ message: "Receita cadastrada com sucesso" });
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  }
}
