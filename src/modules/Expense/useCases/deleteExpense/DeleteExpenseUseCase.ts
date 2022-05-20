import { AppError } from '@errors/AppError';
import { Expenses } from '@modules/Expense/model/Expenses';

class DeleteExpenseUseCase {
  public async execute(
    expenseId: number,
    userId: string
  ): Promise<{ message: string }> {
    const expense = await Expenses.findOneAndDelete({ expenseId, userId });

    if (!expense) throw new AppError('Nenhuma despesa encontrada', 404);

    return {
      message: 'Expense deleted',
    };
  }
}

export { DeleteExpenseUseCase };
