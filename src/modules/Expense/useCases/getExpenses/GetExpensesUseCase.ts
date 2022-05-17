import { AppError } from '@errors/AppError';
import { Expenses } from '@modules/Expense/model/Expenses';

class GetExpensesUseCase {
  public async execute(description: string) {
    const regexParam = new RegExp(`^${description}$`, 'i');

    const filter = description ? { description: regexParam } : {};

    const expenses = await Expenses.find(filter).select('-__v -_id -expenseId');

    if (!expenses || !expenses.length || description === '')
      throw new AppError('notFound', 404);

    return expenses;
  }
}

export { GetExpensesUseCase };
