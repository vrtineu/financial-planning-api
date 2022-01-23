import { Request } from "express";
import { Model } from "mongoose";
import { Receita } from "../models/Receitas";
import { Despesa } from "../models/Despesas";

export async function isFromSameMonthToCreate(
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

export async function isFromSameMonthToUpdateReceita(
  req: Request,
  model: Model<Receita>
) {
  const { descricao, data } = req.body;
  const id = Number(req.params.id);
  const monthOfRequest = new Date(data).getUTCMonth() + 1;

  const findRequest = await (model as Model<Receita>).find({
    $and: [
      { descricao },
      { $expr: { $eq: [{ $month: "$data" }, monthOfRequest] } },
      { idReceita: { $ne: id } },
    ],
  });

  return findRequest.length;
}

export async function isFromSameMonthToUpdateDespesa(
  req: Request,
  model: Model<Despesa>
) {
  const { descricao, data } = req.body;
  const id = Number(req.params.id);
  const monthOfRequest = new Date(data).getUTCMonth() + 1;

  const findRequest = await (model as Model<Despesa>).find({
    $and: [
      { descricao },
      { $expr: { $eq: [{ $month: "$data" }, monthOfRequest] } },
      { idDespesa: { $ne: id } },
    ],
  });

  return findRequest.length;
}
