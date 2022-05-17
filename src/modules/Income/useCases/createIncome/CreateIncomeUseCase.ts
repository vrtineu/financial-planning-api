import { ICreateIncomeDTO } from '@modules/Income/dtos/ICreateIncomeDTO';
import { Incomes } from '@modules/Income/model/Incomes';
import { isFromSameMonth } from '@utils/isFromSameMonth';

class CreateIncomeUseCase {
  public async execute({ date, description, value, id }: ICreateIncomeDTO) {
    const income = new Incomes({
      description,
      value,
      date,
    });

    const incomeAlreadyExists = await isFromSameMonth(
      { date, description, id },
      Incomes
    );

    if (incomeAlreadyExists)
      throw new Error('Receita já cadastrada para o mesmo mês');

    await income.save();

    return income;
  }
}

export { CreateIncomeUseCase };
