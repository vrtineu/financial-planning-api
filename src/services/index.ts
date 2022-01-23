import { Request } from "express";
import { Model } from "mongoose";
import { Receita } from "../models/Receitas";
import { Despesa } from "../models/Despesas";

export async function isFromSameMonth(
  req: Request,
  model: Model<Receita> | Model<Despesa>
) {
  const { descricao, data } = req.body;
  const monthOfRequest = new Date(data).getUTCMonth() + 1;

  const findRequest = await (model as Model<Receita | Despesa>).find({
    $and: [
      { descricao },
      { $expr: { $eq: [{ $month: "$data" }, monthOfRequest] } },
    ],
  });

  return findRequest.length;
}
