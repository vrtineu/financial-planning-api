import { AppError } from '@errors/AppError';
import { IIncome, Incomes } from '@modules/Income/model/Incomes';

class GetIncomesUseCase {
  public async execute(
    description: string,
    userId: string
  ): Promise<IIncome[]> {
    const regexParam = new RegExp(`^${description}$`, 'i');

    const filter = description
      ? { description: regexParam, userId }
      : { userId };

    const incomes = await Incomes.find(filter).select('-__v -_id -incomeId');

    if (!incomes || !incomes.length || description === '')
      throw new AppError('notFound', 404);

    return incomes;
  }
}

export { GetIncomesUseCase };
