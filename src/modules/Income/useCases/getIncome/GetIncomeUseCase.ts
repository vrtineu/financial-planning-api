import { AppError } from '@errors/AppError';
import { IIncome, Incomes } from '@modules/Income/model/Incomes';

class GetIncomeUseCase {
  public async execute(id: number, userId: string): Promise<IIncome> {
    const income = await Incomes.findOne({ incomeId: id, userId }).select(
      '-__v -_id -incomeId'
    );

    if (!income) throw new AppError('Receita não encontrada', 404);

    return income;
  }
}

export { GetIncomeUseCase };
