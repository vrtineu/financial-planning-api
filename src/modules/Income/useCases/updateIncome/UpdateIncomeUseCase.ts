import { AppError } from 'errors/AppError';
import { IUpdateIncomeDTO } from 'modules/Income/dtos/IUpdateIncomeDTO';
import { Incomes } from 'modules/Income/model/Incomes';
import { isFromSameMonth } from 'utils/isFromSameMonth';

class UpdateIncomeUseCase {
  public async execute({ date, description, id, value }: IUpdateIncomeDTO) {
    const idExists = await Incomes.findOne({ incomeId: id });
    if (!idExists) throw new AppError('Receita não encontrada', 404);

    const income = await isFromSameMonth({ date, description, id }, Incomes);
    if (income) throw new AppError('Receita já cadastrada');

    await Incomes.findOneAndUpdate(
      { incomeId: id },
      { description, value, date }
    );

    return {
      message: 'Receita atualizada com sucesso',
    };
  }
}

export { UpdateIncomeUseCase };
