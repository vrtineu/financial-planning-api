import { AppError } from '@errors/AppError';
import { ICreateIncomeDTO } from '@modules/Income/dtos/ICreateIncomeDTO';
import { IIncome, Incomes } from '@modules/Income/model/Incomes';
import { isFromSameMonth } from '@utils/isFromSameMonth';

class CreateIncomeUseCase {
  public async execute({
    date,
    description,
    value,
    userId,
  }: ICreateIncomeDTO): Promise<IIncome> {
    const income = new Incomes({
      description,
      value,
      date,
      userId,
    });

    const incomeAlreadyExists = await isFromSameMonth(
      { date, description },
      Incomes
    );

    if (incomeAlreadyExists)
      throw new AppError('Receita já cadastrada para o mesmo mês');

    await income.save();

    return income;
  }
}

export { CreateIncomeUseCase };
