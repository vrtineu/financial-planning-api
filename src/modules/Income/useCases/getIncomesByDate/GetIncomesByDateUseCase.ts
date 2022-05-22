import { AppError } from '@errors/AppError';
import { IIncome, Incomes } from '@modules/Income/model/Incomes';

class GetIncomesByDateUseCase {
  public async execute(
    year: number,
    month: number,
    userId: string
  ): Promise<IIncome[]> {
    const filter = {
      date: {
        $gte: new Date(`${year}-${month}-01`),
        $lte: new Date(`${year}-${month}-31`),
      },
      userId,
    };

    const incomes = await Incomes.find(filter).select('-__v -_id -incomeId');

    if (!incomes || !incomes.length)
      throw new AppError('Nenhuma receita encontrada', 404);

    return incomes;
  }
}

export { GetIncomesByDateUseCase };
