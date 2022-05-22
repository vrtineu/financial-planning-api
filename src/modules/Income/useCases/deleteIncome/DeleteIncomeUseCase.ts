import { AppError } from '@errors/AppError';
import { Incomes } from '@modules/Income/model/Incomes';

class DeleteIncomeUseCase {
  public async execute(
    id: number,
    userId: string
  ): Promise<{ message: string }> {
    const income = await Incomes.findOneAndDelete({ incomeId: id, userId });

    if (!income) throw new AppError('Receita não encontrada', 404);

    return {
      message: 'Receita deletada com sucesso',
    };
  }
}

export { DeleteIncomeUseCase };
