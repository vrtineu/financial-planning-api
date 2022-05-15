import { Request } from "express";
import { FilterQuery, Model } from "mongoose";

import { Despesa } from "../models/Despesas";
import { Receita } from "../models/Receitas";

export async function isFromSameMonth(req: Request, model: Model<Receita> | Model<Despesa>) {
  const id = req.params?.id;
  const { descricao, data } = req.body;

  const monthOfRequest = new Date(data).getUTCMonth() + 1;
  const filter: FilterQuery<Receita | Despesa> = {
    descricao,
    $expr: { $eq: [{ $month: "$data" }, monthOfRequest] },
  };

  const idType = Object.keys(model.schema.paths)[0];

  if (id) filter[idType] = { $ne: id };

  const findRequest = await (model as Model<Receita | Despesa>).find(filter);

  return findRequest.length;
}
