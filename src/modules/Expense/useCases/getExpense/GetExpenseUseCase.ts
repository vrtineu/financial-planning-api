import { AppError } from '@errors/AppError';
import { Expenses, IExpense } from '@modules/Expense/model/Expenses';

class GetExpenseUseCase {
  public async execute(expenseId: number, userId: string): Promise<IExpense> {
    const expense = await Expenses.findOne({ expenseId, userId }).select(
      '-__v -_id -expenseId'
    );

    if (!expense) throw new AppError('Nenhuma despesa encontrada', 404);

    return expense;
  }
}

export { GetExpenseUseCase };
