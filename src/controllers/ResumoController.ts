import { Request, Response } from "express";
import { connect } from "../database";
import { resDefaultMessage, resError } from "../utils";
import Receitas from "../models/Receitas";
import Despesas from "../models/Despesas";

export default class ResumoController {
  constructor() {
    connect();
  }

  async getResumoByYearAndMonth(req: Request, res: Response) {
    try {
      const { year, month } = req.params;

      const filterDate = {
        data: {
          $gte: new Date(`${year}-${month}-01`),
          $lte: new Date(`${year}-${month}-31`),
        },
      };

      const totalDespesas = await Despesas.aggregate([
        { $match: filterDate },
        { $group: { _id: null, total: { $sum: "$valor" } } },
      ]);

      const totalReceitas = await Receitas.aggregate([
        { $match: filterDate },
        { $group: { _id: null, total: { $sum: "$valor" } } },
      ]);

      const valuesOfDespesasByCategory = await Despesas.find(filterDate)
        .select("valor categoria -_id")
        .then((data) => {
          return data.reduce((acc, cur) => {
            const { categoria, valor } = cur;
            acc[categoria]
              ? (acc[categoria] += valor)
              : (acc[categoria] = valor);
            return acc;
          }, {} as { [key: string]: number });
        });

      if (!totalReceitas.length || !totalDespesas.length) {
        if (!totalReceitas.length && !totalDespesas.length)
          return resDefaultMessage(res, 404, "notFound");
        else if (!totalReceitas.length)
          return res.status(206).json({
            message: '"Receitas" not found',
            data: {
              "total-receitas": [],
              "total-despesas": totalDespesas[0].total,
            },
            "despesas-by-category": valuesOfDespesasByCategory,
          });
        else
          return res.status(206).json({
            message: '"Despesas" not found',
            data: {
              "total-receitas": totalReceitas[0].total,
              "total-despesas": [],
            },
            "despesas-by-category": [],
          });
      }

      return res.status(200).json({
        message: "Resumo das despesas e receitas",
        data: {
          "total-receitas": totalReceitas[0].total,
          "total-despesas": totalDespesas[0].total,
          saldo: totalReceitas[0].total - totalDespesas[0].total,
        },
        "despesas-by-category": valuesOfDespesasByCategory,
      });
    } catch (error) {
      return resError(res, error);
    }
  }
}
