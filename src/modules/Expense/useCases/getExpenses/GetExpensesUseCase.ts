import { AppError } from '@errors/AppError';
import { Expenses, IExpense } from '@modules/Expense/model/Expenses';

class GetExpensesUseCase {
  public async execute(
    description: string,
    userId: string
  ): Promise<IExpense[]> {
    const regexParam = new RegExp(`^${description}$`, 'i');

    const filter = description
      ? { description: regexParam, userId }
      : { userId };

    const expenses = await Expenses.find(filter).select('-__v -_id -expenseId');

    if (!expenses || !expenses.length || description === '')
      throw new AppError('Nenhuma despesa encontrada', 404);

    return expenses;
  }
}

export { GetExpensesUseCase };
