import { Request, Response } from "express";
import { connect } from "../database";
import { resError } from "../utils/responseStatusCode";
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

      const valuesOfReceitas = await Receitas.find(filterDate).select(
        "valor -_id"
      );

      const valuesOfDespesas = await Despesas.find(filterDate).select(
        "valor categoria -_id"
      );

      const valuesOfDespesasByCategory = valuesOfDespesas.reduce(
        (acc, curr) => {
          const { categoria, valor } = curr;

          acc[categoria] ? (acc[categoria] += valor) : (acc[categoria] = valor);

          return acc;
        },
        {} as { [key: string]: number }
      );

      const totalReceitas = valuesOfReceitas.reduce((acc, cur) => {
        return acc + cur.valor;
      }, 0);

      const totalDespesas = valuesOfDespesas.reduce((acc, cur) => {
        return acc + cur.valor;
      }, 0);

      return res.status(200).json({
        message: "Resumo das despesas e receitas",
        data: {
          "total receitas": totalReceitas,
          "total despesas": totalDespesas,
          saldo: totalReceitas - totalDespesas,
        },
        "despesas por categoria": valuesOfDespesasByCategory,
      });
    } catch (error) {
      return resError(res, error);
    }
  }
}
