import { FilterQuery, Model } from 'mongoose';

import { IExpense } from '../modules/Expense/model/Expenses';
import { IIncome } from '../modules/Income/model/Incomes';

interface IRequest {
  date: Date;
  description: string;
  id: number;
}

export async function isFromSameMonth(
  { date, description, id }: IRequest,
  model: Model<IIncome> | Model<IExpense>
): Promise<number> {
  const monthOfRequest = new Date(date).getUTCMonth() + 1;

  const filter: FilterQuery<IIncome | IExpense> = {
    description,
    $expr: { $eq: [{ $month: '$date' }, monthOfRequest] },
  };

  const idType = Object.keys(model.schema.paths)[0];

  if (id) filter[idType] = { $ne: id };

  const findRequest = await (model as Model<IIncome | IExpense>).find(filter);

  return findRequest.length;
}
