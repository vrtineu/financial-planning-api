import { AppError } from 'errors/AppError';
import { Incomes } from 'modules/Income/model/Incomes';

class GetIncomeUseCase {
  public async execute(id: number) {
    const income = await Incomes.findOne({ incomeId: id }).select(
      '-__v -_id -incomeId'
    );

    if (!income) throw new AppError('Receita não encontrada', 404);

    return income;
  }
}

export { GetIncomeUseCase };
